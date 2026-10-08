#!/usr/bin/env node
// Builds index.html (the visual showcase) and styles/tokens.css from the
// Markdown in docs/design-system. Nothing in index.html is written by hand.
//
//   node scripts/build-showcase.mjs            build once
//   node scripts/build-showcase.mjs --watch    rebuild when docs, assets or scripts change
//   node scripts/build-showcase.mjs --serve    with --watch: serve on :4321 with live reload
//   node scripts/build-showcase.mjs --check    exit 1 if outputs are stale or a check fails

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, copyFileSync, statSync, watch, openSync, readSync, closeSync } from "node:fs";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, relative } from "node:path";
import { parse, esc, plain, rowsOf } from "./lib/markdown.mjs";
import { extractCss, resolver } from "./lib/tokens.mjs";
import { createRenderer } from "./showcase/render.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(root, "docs/design-system");
const args = new Set(process.argv.slice(2));

// ---------- inputs ----------
function readDocs() {
  const files = ["README.md", ...readdirSync(DOCS).filter((f) => /^\d\d-.*\.md$/.test(f)).sort()];
  if (existsSync(join(DOCS, "brands"))) {
    // House order: parent first, then the programs in the order 01-brand-architecture.md sets.
    const order = ["food-integrity-project", "non-gmo-project", "non-upf-verified", "food-integrity-collective"];
    const rank = (f) => (order.indexOf(f.replace(/\.md$/, "")) + 1 || 99);
    files.push(...readdirSync(join(DOCS, "brands")).filter((f) => f.endsWith(".md")).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b)).map((f) => `brands/${f}`));
  }
  return Object.fromEntries(files.map((f) => [f, parse(readFileSync(join(DOCS, f), "utf8"), f)]));
}

const kebab = (name) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase();
const iconCache = new Map();
function iconSvg(lucide, cls = "icon") {
  const key = `${lucide}|${cls}`;
  if (iconCache.has(key)) return iconCache.get(key);
  const file = lucide && join(root, "node_modules/lucide-static/icons", `${kebab(lucide)}.svg`);
  let svg;
  if (file && existsSync(file)) {
    svg = readFileSync(file, "utf8")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s(width|height)="24"/g, "")
      .replace(/class="[^"]*"/, `class="${cls}" aria-hidden="true" focusable="false"`)
      .replace(/\s*\n\s*/g, " ")
      .trim();
  } else {
    svg = `<svg data-missing class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>`;
  }
  iconCache.set(key, svg);
  return svg;
}

function imageSize(path) {
  try {
    const fd = openSync(path, "r");
    const buf = Buffer.alloc(65536);
    readSync(fd, buf, 0, buf.length, 0);
    closeSync(fd);
    if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) { i++; continue; }
        const m = buf[i + 1];
        if (m >= 0xc0 && m <= 0xc3) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } catch {}
  return null;
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
}

function readAssets(doc04, checks) {
  const rows = rowsOf(doc04?.section(/^Asset inventory$/)?.table("File", "Brand", "Asset"));
  if (!rows.length) checks.push({ level: "error", area: "Logos", message: "Asset inventory table not found", file: "04-logos-and-marks.md" });
  const listed = rows.map((r) => {
    const file = plain(r.file);
    const abs = join(root, "public/brand", file);
    const exists = existsSync(abs);
    if (!exists) checks.push({ level: "error", area: "Logos", message: `Listed asset \`${file}\` is missing from public/brand/`, file: "04-logos-and-marks.md" });
    const base = file.split("/").pop();
    if (!/^(fip|nongmo|nonupf|collective)-(logo|mark|seal)-[a-z]+-(color|reversed|mono-dark|mono-light)\.(svg|png|jpg)$/.test(base) && !/^(fip|nongmo|nonupf|collective)-(logo|mark|seal)-(color|reversed|mono-dark|mono-light)\.(svg|png|jpg)$/.test(base))
      checks.push({ level: "warn", area: "Logos", message: `\`${base}\` does not follow the naming scheme {brand}-{asset}-{lockup}-{tone}.{ext}`, file: "04-logos-and-marks.md" });
    return { file, path: `public/brand/${file}`, brand: plain(r.brand), kind: plain(r.asset), tone: plain(r.tone), status: r.status ?? "", exists, listed: true, size: exists ? imageSize(abs) : null };
  });
  for (const abs of walk(join(root, "public/brand"))) {
    const rel = relative(join(root, "public/brand"), abs);
    if (/-(logo|mark|seal)-/.test(rel) && !listed.some((a) => a.file === rel))
      checks.push({ level: "warn", area: "Logos", message: `\`public/brand/${rel}\` exists but is not in the asset inventory`, file: "04-logos-and-marks.md" });
  }
  return listed;
}

// Self-host the three web families from @fontsource-variable (latin and latin-ext only).
function fonts(checks) {
  const families = [
    ["lora", ["index.css", "wght-italic.css"]],
    ["nunito-sans", ["index.css"]],
    ["quicksand", ["index.css"]],
  ];
  const outDir = join(root, "public/fonts");
  let css = "";
  for (const [pkg, sheets] of families) {
    const dir = join(root, "node_modules/@fontsource-variable", pkg);
    for (const sheet of sheets) {
      const p = join(dir, sheet);
      if (!existsSync(p)) {
        if (!existsSync(outDir)) checks.push({ level: "warn", area: "Typography", message: `Font package @fontsource-variable/${pkg} not installed and no copy in public/fonts. Run npm install`, file: "03-typography.md" });
        continue;
      }
      for (const m of readFileSync(p, "utf8").matchAll(/(\/\*[^*]*\*\/\s*)?@font-face\s*\{[^}]*\}/g)) {
        const block = m[0];
        const url = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
        if (!url || !/-latin-(ext-)?wght/.test(url)) continue;
        mkdirSync(outDir, { recursive: true });
        const dest = join(outDir, url);
        if (!existsSync(dest) || statSync(dest).size !== statSync(join(dir, "files", url)).size) copyFileSync(join(dir, "files", url), dest);
        css += block
          .replace(/\/\*[^*]*\*\/\s*/, "")
          .replace(/font-family:\s*'([^']+) Variable'/, "font-family: '$1'")
          .replace(/url\(\.\/files\//g, "url(public/fonts/")
          .replace(/,\s*url\([^)]*\.woff\)[^;]*/, "")
          .replace(/\s+/g, " ") + "\n";
      }
    }
  }
  if (!css && existsSync(outDir)) {
    // No node_modules: reuse the previously copied files.
    for (const f of readdirSync(outDir).filter((x) => x.endsWith(".woff2"))) {
      const fam = f.startsWith("lora") ? "Lora" : f.startsWith("nunito") ? "Nunito Sans" : "Quicksand";
      const range = f.includes("latin-ext") ? "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF" : "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
      css += `@font-face { font-family: '${fam}'; font-style: ${f.includes("italic") ? "italic" : "normal"}; font-display: swap; font-weight: ${fam === "Quicksand" ? "300 700" : fam === "Lora" ? "400 700" : "200 1000"}; src: url(public/fonts/${f}) format('woff2-variations'); unicode-range: ${range}; }\n`;
    }
  }
  return css;
}

// ---------- build ----------
function build() {
  const checks = [];
  const docs = readDocs();
  const config = JSON.parse(readFileSync(join(root, "scripts/palette.config.json"), "utf8"));
  const labelToName = {};
  const official = {};
  for (const s of [...config.singles, ...config.scales]) {
    labelToName[s.label.toLowerCase()] = s.name;
    labelToName[s.name] = s.name;
    official[s.name] = s.hex.toUpperCase();
  }

  const d09 = docs["09-tokens.md"];
  const { palette: paletteCss, semantic, tailwind, themeRoot } = extractCss(d09);
  if (!paletteCss.includes("--birch")) checks.push({ level: "error", area: "Tokens", message: "Palette block is empty. Run npm run colors", file: "09-tokens.md" });
  if (!semantic) checks.push({ level: "error", area: "Tokens", message: 'No CSS block containing "Shared, light" found', file: "09-tokens.md" });
  const palette = Object.fromEntries([...paletteCss.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6});/g)].map((m) => [m[1], m[2].toUpperCase()]));
  const tokenCtx = resolver(paletteCss, semantic);

  // Every var() in the semantic block must exist.
  const defined = new Set([...`${paletteCss}\n${semantic}`.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  for (const m of semantic.matchAll(/var\((--[\w-]+)\)/g)) if (!defined.has(m[1])) checks.push({ level: "error", area: "Tokens", message: `\`${m[1]}\` is referenced but never defined`, file: "09-tokens.md" });
  for (const m of tailwind.matchAll(/var\((--[\w-]+)\)/g)) if (!defined.has(m[1]) && !/^--font-/.test(m[1])) checks.push({ level: "error", area: "Tokens", message: `Tailwind wiring references \`${m[1]}\`, which is not defined`, file: "09-tokens.md" });

  const assets = readAssets(docs["04-logos-and-marks.md"], checks);
  const fontCss = fonts(checks);
  const r = createRenderer({ docs, checks, palette, labelToName, official, tokenCtx, iconSvg, assets });

  const audit = r.audit();
  const sections = [
    ["overview", "Overview", r.overview()],
    ["architecture", "Brand architecture", r.architecture()],
    ["logos", "Logos and marks", r.logos()],
    ["color", "Color", r.color()],
    ["typography", "Typography", r.typography()],
    ["icons", "Iconography", r.icons()],
    ["components", "Components", r.components()],
    ["motion", "Motion", r.motion()],
    ["accessibility", "Accessibility", r.accessibility(audit.html)],
    ["writing", "Writing and copy", r.writing()],
    ["ux", "UX", r.ux()],
    ["responsive", "Responsive", r.responsive()],
    ["tokens", "Tokens", r.tokens()],
    ["brands", "Brands", r.brands()],
  ];
  const todo = r.todos();
  sections.push(["todos", `Open TODOs (${todo.count})`, todo.html], ["source", "Source documents", r.sources()]);

  // De-duplicate checks (the same issue can be found from several places).
  const seen = new Set();
  const unique = checks.filter((c) => { const k = `${c.level}|${c.message}`; if (seen.has(k)) return false; seen.add(k); return true; });
  const errors = unique.filter((c) => c.level === "error");
  const warns = unique.filter((c) => c.level === "warn");

  const hash = createHash("sha256");
  for (const d of Object.values(docs)) hash.update(d.raw);
  hash.update(JSON.stringify(config));
  for (const f of ["render.mjs", "styles.css", "app.js"]) hash.update(readFileSync(join(root, "scripts/showcase", f)));
  const sourceHash = hash.digest("hex").slice(0, 10);
  const version = plain(docs["README.md"].field("Version") ?? "");

  const checksHtml = `<details class="checks" ${errors.length ? "open" : ""}><summary>
      ${errors.length ? `<span class="badge badge--danger">${r.icon("status.error")}${errors.length} ${errors.length === 1 ? "error" : "errors"}</span>` : `<span class="badge badge--success">${r.icon("status.success")}No errors</span>`}
      ${warns.length ? `<span class="badge badge--warning">${r.icon("status.warning")}${warns.length} ${warns.length === 1 ? "warning" : "warnings"}</span>` : ""}
      <span>Build checks</span><span class="small muted" style="font-weight:400">Contrast, palette drift, assets, icon names and token references, checked on every build</span></summary>
      ${unique.length ? `<ul>${unique.map((c) => `<li><strong>${esc(c.area)}:</strong> ${esc(c.message).replace(/`([^`]+)`/g, "<code>$1</code>")} <span class="muted small">${esc(c.file ?? "")}</span></li>`).join("")}</ul>` : `<p class="small" style="margin:1rem 0 0">Everything the build checks is passing.</p>`}
    </details>`;

  const showcaseCss = readFileSync(join(root, "scripts/showcase/styles.css"), "utf8");
  const appJs = readFileSync(join(root, "scripts/showcase/app.js"), "utf8");
  const tokensCss = `/* Generated from docs/design-system/09-tokens.md by scripts/build-showcase.mjs. Do not edit. */\n\n${paletteCss.replace(/\/\* palette:(start|end) \*\/\n?/g, "")}\n\n${themeRoot}\n\n${semantic}\n`;

  const nav = sections
    .map(([id, label]) => {
      const sub = id === "brands" ? `<ol class="sub">${Object.entries(docs).filter(([k]) => k.startsWith("brands/")).map(([, d]) => { const b = d.field("Brand context")?.match(/data-brand="(\w+)"/)?.[1]; return b ? `<li><a href="#brand-${b}">${esc(d.title)}</a></li>` : ""; }).join("")}</ol>` : "";
      return `<li><a href="#${id}">${esc(label)}</a>${sub}</li>`;
    })
    .join("");

  const brandRadios = ["fip", "nongmo", "nonupf", "collective"].map((b) => `<label><input type="radio" name="brand" value="${b}"${b === "fip" ? " checked" : ""}><span>${esc(r.brandName(b))}</span></label>`).join("");
  const brandOptions = ["fip", "nongmo", "nonupf", "collective"].map((b) => `<option value="${b}">${esc(r.brandName(b))}</option>`).join("");
  const fipLogo = assets.find((a) => a.brand === "fip" && a.kind === "logo" && a.exists);

  const html = `<!doctype html>
<!-- Generated by scripts/build-showcase.mjs from docs/design-system. Do not edit by hand: run npm run build. Source hash ${sourceHash} -->
<html lang="en" data-brand="fip">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<title>Digital design system | Food Integrity Project</title>
<link rel="icon" href="public/brand/nonupf/nonupf-mark-color.png" media="(prefers-color-scheme: no-preference)">
<style>
${fontCss}
${tokensCss}
${r.typeCss()}
${showcaseCss}
</style>
</head>
<body>
<a class="btn btn--default skip" href="#main">Skip to main content</a>
<header class="topbar">
  <p class="topbar__title">${fipLogo ? `<img src="${esc(fipLogo.path)}" alt="">` : ""}<span>Digital design system <span class="muted small">v${esc(version.split(" ")[0])}</span></span></p>
  <button class="btn btn--outline btn--sm nav-toggle" type="button" data-open="mobile-nav" aria-haspopup="dialog">${r.icon("nav.menu", "icon icon--sm")}Sections</button>
  <fieldset class="segmented brand-seg"><legend class="sr-only">Brand context</legend>${brandRadios}</fieldset>
  <label class="brand-select"><span class="sr-only">Brand context</span><span class="select-wrap"><select class="select" name="brand">${brandOptions}</select>${r.icon("nav.expand", "icon icon--sm")}</span></label>
  <div class="topbar__toggles">
    <label class="switch"><input type="checkbox" role="switch" data-toggle-dark> Dark</label>
    <label class="switch"><input type="checkbox" role="switch" data-toggle-reduce> Reduce motion</label>
  </div>
</header>
<dialog id="mobile-nav" class="sheet sheet--left" aria-labelledby="mobile-nav-h">
  <div class="row" style="justify-content:space-between;margin-bottom:0.5rem"><h4 id="mobile-nav-h" style="margin:0">Sections</h4><button class="btn btn--ghost btn--icon" type="button" aria-label="Close sections" data-close>${r.icon("action.close")}</button></div>
  <nav aria-label="Sections menu" class="mnav"><ol>${nav}</ol></nav>
</dialog>
<div class="layout">
  <nav class="sidenav" aria-label="Sections"><ol>${nav}</ol></nav>
  <main id="main" tabindex="-1">
${sections.map(([id, , body]) => (id === "overview" ? body.replace('<div id="checks-slot"></div>', checksHtml) : body)).join("\n")}
  <footer class="small muted" style="padding-top:2rem">Built from ${Object.keys(docs).length} documents in <code>docs/design-system</code> · source hash <code>${sourceHash}</code> · ${errors.length} errors, ${warns.length} warnings.</footer>
  </main>
</div>
<template id="tpl-toast-icon">${r.icon("status.success")}</template>
<template id="tpl-error-icon">${r.icon("status.error")}</template>
<template id="tpl-spinner">${iconSvg(plain(rowsOf(docs["05-iconography.md"].section(/^Status and feedback$/)?.tables()[0]).find((x) => plain(x.name) === "status.loading")?.lucide ?? "LoaderCircle"), "icon spin")}</template>
<script>
${appJs}
</script>
</body>
</html>
`;
  return { html, tokensCss, errors, warns };
}

// ---------- outputs ----------
function writeOutputs() {
  const t0 = Date.now();
  const { html, tokensCss, errors, warns } = build();
  mkdirSync(join(root, "styles"), { recursive: true });
  const changed = [];
  for (const [p, body] of [["index.html", html], ["styles/tokens.css", tokensCss]]) {
    const abs = join(root, p);
    if (!existsSync(abs) || readFileSync(abs, "utf8") !== body) { writeFileSync(abs, body); changed.push(p); }
  }
  const status = `${errors.length} errors, ${warns.length} warnings`;
  console.log(`[showcase] ${changed.length ? "wrote " + changed.join(", ") : "no changes"} in ${Date.now() - t0}ms (${status})`);
  for (const c of [...errors, ...warns]) console.log(`  ${c.level === "error" ? "✗" : "!"} ${c.area}: ${c.message.replace(/`/g, "")}${c.file ? ` (${c.file})` : ""}`);
  return { errors };
}

if (args.has("--check")) {
  const { html, tokensCss, errors } = build();
  const stale = [["index.html", html], ["styles/tokens.css", tokensCss]].filter(([p, body]) => !existsSync(join(root, p)) || readFileSync(join(root, p), "utf8") !== body).map(([p]) => p);
  if (stale.length) console.error(`Out of date: ${stale.join(", ")}. Run npm run build.`);
  for (const e of errors) console.error(`✗ ${e.area}: ${e.message.replace(/`/g, "")} (${e.file})`);
  process.exit(stale.length || errors.length ? 1 : 0);
} else if (!args.has("--watch")) {
  writeOutputs();
} else {
  // Rebuild in a child process so edits to the build scripts themselves take effect.
  const clients = new Set();
  const rebuild = (why) => {
    if (why === "palette.config.json") spawnSync(process.execPath, [join(root, "scripts/generate-color-scales.mjs")], { stdio: "inherit" });
    const res = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], { stdio: "inherit" });
    if (res.status === 0) for (const c of clients) c.write("data: reload\n\n");
  };
  rebuild();
  let timer, last;
  for (const dir of ["docs", "public/brand", "scripts"]) {
    watch(join(root, dir), { recursive: true }, (_, file) => {
      if (!file || /(^|\/)\./.test(file)) return;
      last = file.split("/").pop();
      clearTimeout(timer);
      timer = setTimeout(() => { console.log(`[showcase] change: ${dir}/${file}`); rebuild(last); }, 150);
    });
  }
  console.log("[showcase] watching docs/, public/brand/ and scripts/");

  if (args.has("--serve")) {
    const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".md": "text/markdown; charset=utf-8" };
    const port = Number(process.env.PORT) || 4321;
    createServer((req, res) => {
      const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
      if (url === "/__reload") {
        res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
        res.write("retry: 1000\n\n");
        clients.add(res);
        req.on("close", () => clients.delete(res));
        return;
      }
      const path = join(root, url === "/" ? "index.html" : url);
      if (!path.startsWith(root) || !existsSync(path) || statSync(path).isDirectory()) { res.writeHead(404); res.end("Not found"); return; }
      let body = readFileSync(path);
      if (extname(path) === ".html") body = body.toString().replace("</body>", `<script>new EventSource("/__reload").onmessage=()=>location.reload()</script></body>`);
      res.writeHead(200, { "Content-Type": types[extname(path)] ?? "application/octet-stream", "Cache-Control": "no-store" });
      res.end(body);
    }).listen(port, () => console.log(`[showcase] http://localhost:${port} (live reload on)`));
  }
}
