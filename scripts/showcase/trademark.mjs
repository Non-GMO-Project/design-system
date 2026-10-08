// Builds one standalone page per program trademark doc (docs/design-system/trademark/*.md),
// for sharing with participants. Each page is a single file: CSS, fonts and mark images are
// inlined, so it works when emailed or hosted anywhere. Internal TODO markers are left out.

import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { esc, inline, plain, slug, render } from "../lib/markdown.mjs";

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const dataUri = (abs) => `data:${MIME[extname(abs)] ?? "application/octet-stream"};base64,${readFileSync(abs).toString("base64")}`;

// Drop `TODO(...): ...` code spans; a block that was only a TODO disappears.
const stripTodo = (s) => (s ?? "").replace(/\s*`TODO\([^`]*`/g, "").trim();
function cleanBlocks(blocks) {
  return blocks
    .map((b) => {
      if (b.type === "p" || b.type === "quote") return { ...b, text: stripTodo(b.text) };
      if (b.type === "list") return { ...b, items: b.items.map(stripTodo).filter(Boolean) };
      if (b.type === "table") return { ...b, rows: b.rows.map((r) => r.map(stripTodo)) };
      return b;
    })
    .filter((b) => !((b.type === "p" || b.type === "quote") && !b.text) && !(b.type === "list" && !b.items.length));
}

const mailto = (html) => html.replace(/(^|[\s(>])([a-z0-9.]+@[a-z0-9-]+\.[a-z]{2,})/gi, (_, pre, addr) => `${pre}<a href="mailto:${addr}">${addr}</a>`);

const PAGE_CSS = `
body { background: var(--background); color: var(--foreground); margin: 0; }
.tm-header { background: var(--brand-dark); color: var(--birch); }
.tm-header__inner, .tm-main, .tm-footer { max-width: 60rem; margin: 0 auto; padding-left: max(1rem, env(safe-area-inset-left)); padding-right: max(1rem, env(safe-area-inset-right)); }
.tm-header__inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding-top: 1rem; padding-bottom: 1rem; }
.tm-header img { height: 48px; width: auto; display: block; }
.tm-header .eyebrow { color: var(--birch); margin: 0; }
.tm-main { padding-top: 2.5rem; padding-bottom: 3rem; }
.tm-main h1 { margin: 0 0 1rem; }
.tm-main h2 { margin: 3rem 0 1rem; scroll-margin-top: 1rem; }
.tm-main section > p, .tm-main section > ul, .tm-main section > ol, .tm-lead { max-width: 44rem; }
.tm-meta { display: grid; gap: 0.5rem; margin: 1.5rem 0; }
.tm-meta p { margin: 0; }
.tm-toc ol { columns: 2 16rem; margin: 0; padding-left: 1.25rem; }
.tm-toc li { margin: 0.25rem 0; break-inside: avoid; }
.tm-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr)); gap: 1rem; margin: 1rem 0 1.5rem; }
.tm-mark { margin: 0; display: grid; grid-template-rows: auto 1fr; border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; background: var(--card); color: var(--card-foreground); }
.tm-mark__art { display: grid; place-items: center; min-height: 11rem; padding: 1.5rem; background: var(--birch); }
.tm-mark__art--dark { background: var(--brand-dark); }
.tm-mark__art img { max-width: 100%; max-height: 8rem; width: auto; height: auto; }
.tm-mark figcaption { padding: 0.75rem 1rem 1rem; display: grid; gap: 0.25rem; }
.tm-footer { padding-top: 1.5rem; padding-bottom: 2.5rem; border-top: 1px solid var(--border); }
@media print {
  .tm-header { background: none; color: inherit; }
  .tm-toc { display: none; }
  .tm-mark, .tm-main table { break-inside: avoid; }
}
`;

export function trademarkPage({ file, doc, root, assets, brandName, fontCss, tokensCss, typeCss, showcaseCss, check }) {
  const brand = doc.field("Brand context")?.match(/data-brand="(\w+)"/)?.[1];
  if (!brand) check("error", "Trademark", "No **Brand context:** line with a data-brand value", file);
  const program = plain(doc.field("Program") ?? brandName(brand));

  const img = (rel, alt, cls = "") => {
    const abs = join(root, "public/brand", rel);
    if (!existsSync(abs)) { check("error", "Trademark", `\`${rel}\` is listed but missing from public/brand/`, file); return ""; }
    if (!assets.some((a) => a.file === rel)) check("warn", "Trademark", `\`${rel}\` is not in the asset inventory in 04-logos-and-marks.md`, file);
    return `<img src="${dataUri(abs)}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}>`;
  };

  // Header logo: reversed or mono-light horizontal logo for the dark band, else the color logo on Birch.
  const light = assets.find((a) => a.brand === brand && a.exists && /logo-horizontal-(reversed|mono-light)/.test(a.file));
  const color = assets.find((a) => a.brand === brand && a.exists && /logo-horizontal-color/.test(a.file));
  const headLogo = light ? img(light.file, program) : color ? img(color.file, program) : `<strong>${esc(program)}</strong>`;
  const headerStyle = light ? "" : ` style="background:var(--birch);color:var(--brand-dark);border-bottom:1px solid var(--border)"`;

  // A table with a File column becomes a gallery of the official files.
  const gallery = (t) => {
    const fi = t.headers.findIndex((h) => plain(h).toLowerCase() === "file");
    return `<div class="tm-gallery">${t.rows
      .map((r) => {
        const rel = plain(r[fi]);
        const tone = assets.find((a) => a.file === rel)?.tone ?? "";
        const rest = t.headers.map((h, i) => (i === fi || !r[i] ? "" : i === (fi === 0 ? 1 : 0) ? `<strong>${inline(r[i])}</strong>` : `<span class="small">${inline(r[i])}</span>`)).join("");
        return `<figure class="tm-mark"><div class="tm-mark__art${/mono-light|reversed/.test(tone) ? " tm-mark__art--dark" : ""}">${img(rel, plain(r[fi === 0 ? 1 : 0]))}</div><figcaption>${rest}</figcaption></figure>`;
      })
      .join("")}</div>`;
  };

  // Intro: paragraphs before the first H2, minus the **Field:** lines.
  const firstH2 = doc.blocks.findIndex((b) => b.type === "heading" && b.level === 2);
  const intro = cleanBlocks(doc.blocks.slice(0, firstH2 < 0 ? doc.blocks.length : firstH2)).filter((b) => b.type === "p" && !/^\*\*\w[\w ]*:\*\*/.test(b.text));
  const sections = (doc.blocks.some((b) => b.type === "heading" && b.level === 2) ? doc.subsections(2) : []).map(({ title, doc: sub }) => {
    const body = cleanBlocks(sub.blocks)
      .map((b) => (b.type === "table" && b.headers.some((h) => plain(h).toLowerCase() === "file") ? gallery(b) : render([b], { headingOffset: 0 })))
      .join("");
    return { title, id: slug(title), html: `<section aria-labelledby="${slug(title)}"><h2 id="${slug(title)}">${esc(title)}</h2>${body}</section>` };
  });

  const field = (label) => stripTodo(doc.field(label) ?? "");
  const meta = [["Who this is for", field("For")], ["Based on", field("Source")], ["Questions", field("Contact")]]
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${inline(v)}</p>`)
    .join("");

  const pageFonts = fontCss.replace(/url\(public\/fonts\/([^)]+)\)/g, (m, f) => {
    const abs = join(root, "public/fonts", f);
    return existsSync(abs) ? `url(${dataUri(abs)})` : m;
  });

  return `<!doctype html>
<!-- Generated by scripts/build-showcase.mjs from docs/design-system/${file}. Do not edit by hand: run npm run build. -->
<html lang="en" data-brand="${esc(brand ?? "")}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light">
<title>${esc(doc.title)}</title>
<style>
${pageFonts}
${tokensCss}
${typeCss}
${showcaseCss}
${PAGE_CSS}
</style>
</head>
<body>
<header class="tm-header"${headerStyle}><div class="tm-header__inner">${headLogo}<p class="eyebrow"${light ? "" : ' style="color:inherit"'}>Trademark usage</p></div></header>
<main class="tm-main" id="main">
<h1>${esc(doc.title)}</h1>
<div class="tm-lead prose">${mailto(render(intro))}</div>
<div class="card tm-meta">${mailto(meta)}</div>
<nav class="tm-toc" aria-labelledby="toc-h"><h2 id="toc-h" class="t-h4" style="margin:0 0 0.5rem">On this page</h2><ol>${sections.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join("")}</ol></nav>
${mailto(sections.map((s) => s.html).join("\n"))}
</main>
<footer class="tm-footer small muted">${inline(field("Source"))}<br>${mailto(`Questions: ${esc(field("Contact"))}`)}</footer>
</body>
</html>
`;
}
