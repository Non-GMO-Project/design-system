// Turns the parsed design-system docs into showcase sections.
// Every section reads its content from the Markdown tables, so editing a doc
// changes the page. Problems found while reading are pushed to ctx.checks.

import { esc, inline, plain, slug, rowsOf, render, renderTable } from "../lib/markdown.mjs";
import { ratio, contrast } from "../lib/color.mjs";
import { BRANDS, gradientStops } from "../lib/tokens.mjs";

export function createRenderer(ctx) {
  const { docs, checks, palette, labelToName, tokenCtx, iconSvg, assets } = ctx;
  const check = (level, area, message, file) => checks.push({ level, area, message, file });

  // ---------- shared helpers ----------
  const registry = {};
  const d05 = docs["05-iconography.md"];
  for (const t of d05?.section(/^The icon registry$/)?.tables() ?? []) {
    for (const r of rowsOf(t)) if (r.name && r.lucide) registry[plain(r.name)] = plain(r.lucide);
  }
  const icon = (purpose, cls = "icon") => {
    const lucide = registry[purpose];
    if (!lucide) {
      check("warn", "Icons", `Icon purpose \`${purpose}\` is used by the showcase but not in the registry`, "05-iconography.md");
      return iconSvg(null, cls);
    }
    return iconSvg(lucide, cls);
  };

  const brandNames = {};
  const fam = rowsOf(docs["01-brand-architecture.md"]?.section(/^The family$/)?.table("Brand", "Role"));
  for (const r of fam) brandNames[plain(r["data-brand"])] = plain(r.brand);
  for (const b of BRANDS) if (!brandNames[b]) check("error", "Brand architecture", `No row for \`data-brand="${b}"\` in "The family" table`, "01-brand-architecture.md");
  const brandName = (b) => brandNames[b] ?? b;

  const statusSets = { success: "success", warning: "warning", danger: "danger", info: "info", neutral: "neutral", stone: "neutral" };
  const certRows = rowsOf(docs["02-color.md"]?.section(/^Certification status$/)?.table("Certification state", "Status set"));
  if (!certRows.length) check("error", "Color", `"Certification status" table not found`, "02-color.md");
  const badge = (row) => {
    const set = statusSets[plain(row["status set"]).toLowerCase()] ?? "neutral";
    return `<span class="badge badge--${set}">${icon(plain(row.icon), "icon")}${esc(plain(row.label))}</span>`;
  };
  const cert = (state) => {
    const row = certRows.find((r) => plain(r["certification state"]).toLowerCase().startsWith(state)) ?? certRows.find((r) => plain(r["certification state"]).toLowerCase().includes(state));
    if (!row) check("warn", "Color", `Certification status "${state}" is used by the showcase but not in the Certification status table`, "02-color.md");
    return row ?? { "status set": "neutral", icon: "status.info", label: state };
  };

  const readable = (hex) => (contrast(hex, palette.birch) >= contrast(hex, palette["stone-950"]) ? "var(--birch)" : "var(--stone-950)");
  const varForHex = (hex) => Object.entries(palette).find(([, v]) => v === hex.toUpperCase())?.[0];

  const asset = (brand, ...prefer) => {
    for (const p of prefer) {
      // Skip restricted files (the Non-UPF icon is approved for favicons only).
      const a = assets.find((x) => x.brand === brand && x.file.includes(p) && x.exists && !/favicon/i.test(x.status));
      if (a) return a;
    }
    return null;
  };
  const logoImg = (brand, { height = 40, tone = "color", alt } = {}) => {
    const a =
      tone === "light"
        ? asset(brand, "logo-horizontal-reversed", "logo-horizontal-mono-light", "mark-mono-light", "mark-reversed")
        : asset(brand, "logo-horizontal-color", "logo-stacked-color", "mark-color");
    if (!a) return `<span class="placeholder-logo" style="height:${height}px;padding:0 0.75rem" role="img" aria-label="${esc(brandName(brand))}">${esc(brandName(brand))}</span>`;
    return `<img src="${esc(a.path)}" alt="${esc(alt ?? brandName(brand))}" style="height:${height}px;width:auto">`;
  };

  const source = (file, extra = "") =>
    `<p class="source-note">${icon("domain.document", "icon icon--sm")}<span>Generated from <a href="#doc-${slug(file)}"><code>${esc(file)}</code></a>${extra}</span></p>`;

  const section = (id, eyebrow, title, file, body, intro = "") =>
    `<section class="ds-section" id="${id}" aria-labelledby="${id}-h"><p class="eyebrow">${esc(eyebrow)}</p><h2 id="${id}-h">${esc(title)}</h2>${source(file)}${intro ? `<div class="prose">${intro}</div>` : ""}${body}</section>`;

  const need = (doc, re, file, what) => {
    const s = doc?.section(re);
    if (!s) check("error", what, `Section matching ${re} not found`, file);
    return s;
  };

  const tableOrWarn = (t, file, what) => {
    if (!t) check("error", what, `Expected table not found`, file);
    return t ? renderTable(t) : "";
  };

  const verdict = (r, min) =>
    r >= min
      ? `<span class="verdict verdict--pass">${icon("status.success", "icon")}${r.toFixed(1)}:1</span>`
      : `<span class="verdict verdict--fail">${icon("status.error", "icon")}${r.toFixed(1)}:1</span>`;

  // ---------- Overview ----------
  function overview() {
    const readme = docs["README.md"];
    const model = readme.section(/^The model in one paragraph$/);
    const rules = readme.section(/^Rules that apply everywhere$/);
    const ver = readme.field("Version");
    const src = readme.field("Brand source");
    return `<section class="ds-section" id="overview" aria-labelledby="overview-h">
      <div class="hero" data-brand-follow>
        <p class="eyebrow">Digital design system${ver ? " · version " + esc(plain(ver)) : ""}</p>
        <h1 id="overview-h" class="t-display" style="margin:0">${esc(readme.title)}</h1>
        <hr class="signature-rule">
        <p class="prose" style="margin:0">${model ? inline(model.paragraphs()[0] ?? "") : ""}</p>
      </div>
      ${source("README.md")}
      ${src ? `<p class="prose">${inline(src)}</p>` : ""}
      <h3>Rules that apply everywhere</h3>
      ${rules ? render(rules.blocks) : ""}
      <div id="checks-slot"></div>
    </section>`;
  }

  // ---------- 01 Brand architecture ----------
  function architecture() {
    const f = "01-brand-architecture.md";
    const d = docs[f];
    const cards = fam
      .map((r) => {
        const b = plain(r["data-brand"]);
        return `<article class="card ctx" data-brand="${esc(b)}" style="display:grid;gap:0.75rem;align-content:start">
          <div style="min-height:56px;display:flex;align-items:center">${logoImg(b, { height: 48 })}</div>
          <h4 style="margin:0">${esc(plain(r.brand))}</h4>
          <span class="chip">${esc(plain(r.brand))}</span>
          <p class="small" style="margin:0">${inline(r.role)}</p>
          <p class="small muted" style="margin:0"><strong>Speaks to:</strong> ${inline(r["speaks to"])}</p>
          <code>data-brand="${esc(b)}"</code>
        </article>`;
      })
      .join("");
    const leads = d.section(/^Which name leads$/);
    const written = d.section(/^Written reference$/);
    const shared = d.section(/^What is shared and what varies$/);
    const choosing = d.section(/^Choosing the brand context$/);
    const endorsement = d.section(/^Endorsement line$/);
    const line = plain(endorsement?.blocks.find((b) => b.type === "quote")?.text ?? "A program of the Food Integrity Project");
    const footers = BRANDS.filter((b) => b !== "fip")
      .map(
        (b) => `<div class="footer-demo ctx" data-brand="${b}" style="background:var(--brand-dark);color:var(--birch)">
          ${logoImg(b, { height: 40, tone: "light" })}
          <div class="endorse"><span class="lockup__rule" aria-hidden="true"></span>${logoImg("fip", { height: 20, tone: "light", alt: "" })}<span>${esc(line)}</span></div>
        </div>`
      )
      .join("");
    const chips = BRANDS.map((b) => `<span class="chip" data-brand="${b}">${esc(brandName(b))}</span>`).join("");
    return section(
      "architecture", "01 · Brand architecture", "The canopy over three programs", f,
      `<div class="grid" style="--min:230px">${cards}</div>
      <h3>Which name leads</h3>${tableOrWarn(leads?.table("Program leads", "Parent leads"), f, "Brand architecture")}
      ${written ? `<h4>Written reference</h4>${render(written.blocks)}` : ""}
      <h3>What is shared and what varies</h3>${shared ? render(shared.blocks.filter((b) => b.type !== "p" || !/^The principle/.test(b.text))) : ""}
      <h3>Choosing the brand context</h3>${choosing ? render(choosing.blocks) : ""}
      <h3>Program chips</h3><p class="prose">Records in multi-program views carry a chip that sets its own <code>data-brand</code>. Chips use the subtle tint and the dark, never the signature color.</p>
      <div class="row">${chips}</div>
      <h3>Endorsement line</h3><p class="prose">Every program surface carries the endorsement once, usually in the footer: <strong>${esc(line)}</strong>.</p>
      <div class="stack">${footers}</div>`,
      d.paragraphs()[0] ? `<p>${inline(d.paragraphs()[0])}</p>` : ""
    );
  }

  // ---------- 04 Logos and marks ----------
  function logos() {
    const f = "04-logos-and-marks.md";
    const d = docs[f];
    const inv = d.section(/^Asset inventory$/);
    const cards = assets
      .filter((a) => a.listed)
      .map((a) => {
        const dark = /mono-light|reversed/.test(a.file);
        return `<figure class="asset" data-brand="${esc(a.brand)}" style="margin:0">
          <div class="asset__art${dark ? " on-dark" : ""}">${a.exists ? `<img src="${esc(a.path)}" alt="${esc(brandName(a.brand))} ${esc(a.kind)}" loading="lazy">` : `<span class="placeholder-logo">Missing file</span>`}</div>
          <figcaption class="asset__meta"><code>${esc(a.file)}</code><span><strong>${esc(brandName(a.brand))}</strong> · ${esc(a.kind)} · ${esc(a.tone)}${a.size ? ` · ${a.size[0]}×${a.size[1]}px` : ""}</span><span class="muted">${inline(a.status)}</span></figcaption>
        </figure>`;
      })
      .join("");
    const still = inv?.lists()[0];
    const ngpSeal = asset("nongmo", "seal-verified-color");
    const upfSeal = asset("nonupf", "seal-verified-color");
    const fipLogo = asset("fip", "logo-horizontal-color");
    const lock = d.section(/^Endorsement lockups$/);
    const lockRules = lock?.tables()[1];
    const sealH = 96;
    const horiz = `<div class="card lockup" data-brand="nongmo">
        ${ngpSeal ? `<img src="${esc(ngpSeal.path)}" alt="Non-GMO Project Verified" style="height:${sealH}px">` : ""}
        <span class="lockup__rule" aria-hidden="true"></span>
        <div class="lockup__parent"><span class="eyebrow" style="margin:0">A program of</span>${fipLogo ? `<img src="${esc(fipLogo.path)}" alt="Food Integrity Project" style="height:${Math.round(sealH * 0.45)}px;width:auto;mix-blend-mode:multiply">` : ""}</div>
      </div>`;
    const stacked = `<div class="card lockup lockup--stacked" data-brand="nonupf">
        ${upfSeal ? `<img src="${esc(upfSeal.path)}" alt="Non-UPF Verified" style="height:${sealH}px">` : ""}
        <span class="lockup__rule" aria-hidden="true"></span>
        <span class="eyebrow" style="margin:0">A program of the Food Integrity Project</span>
      </div>`;
    const sizes = d.section(/^Clear space and size$/);
    const backgrounds = rowsOf(d.section(/^Backgrounds$/)?.table("Background", "Logo version"));
    const bgDemos = backgrounds
      .map((r, i) => {
        const bgName = plain(r.background);
        const dark = /dark|gradient/i.test(bgName);
        const photo = /photograph/i.test(bgName);
        const style = photo ? `background:url(public/brand/fip/fip-photo-butterfly-wing.jpg) center/cover` : dark ? "background:var(--brand-dark);color:var(--birch)" : i === 0 ? "background:var(--birch)" : "background:var(--frost)";
        return `<div class="bg-sample" data-brand="collective" style="${style}">${logoImg("collective", { height: 64, tone: dark || photo ? "light" : "color" })}<span style="${photo ? "background:var(--birch);color:var(--stone-950);padding:0 0.5rem;border-radius:4px" : ""}"><strong>${esc(bgName)}</strong><br>${inline(r["logo version"])}</span></div>`;
      })
      .join("");
    const never = d.section(/^Never$/)?.lists()[0];
    return section(
      "logos", "04 · Logos and marks", "Logos, seals and lockups", f,
      `<h3>Two different things</h3>${tableOrWarn(d.section(/^Two different things/)?.tables()[0], f, "Logos")}
      <h3>Asset inventory</h3><p class="prose">Every file listed in the doc, rendered from <code>public/brand/</code>. Light files sit on the brand dark.</p>
      <div class="grid" style="--min:220px">${cards}</div>
      ${still ? `<h4>Still needed</h4>${render([still])}` : ""}
      <h3>Endorsement lockups</h3>
      <div class="split">${horiz}${stacked}</div>
      ${lockRules ? renderTable(lockRules) : ""}
      <h3>Clear space and minimum size</h3>
      <div class="row" style="gap:2rem;align-items:flex-end;margin-bottom:1.5rem">
        ${upfSeal ? `<div class="clearspace" style="--x:18px"><img src="${esc(upfSeal.path)}" alt="Non-UPF Verified seal with clear space" style="height:96px"><span style="top:0;left:4px">X</span></div>` : ""}
        ${ngpSeal ? `<figure style="margin:0"><img src="${esc(ngpSeal.path)}" alt="Non-GMO Project Verified seal at minimum screen size" style="width:72px"><figcaption class="small muted">Seal at 72px</figcaption></figure>` : ""}
        ${fipLogo ? `<figure style="margin:0"><img src="${esc(fipLogo.path)}" alt="Food Integrity Project logo at minimum screen size" style="width:96px;mix-blend-mode:multiply"><figcaption class="small muted">Parent mark at 96px</figcaption></figure>` : ""}
      </div>
      ${sizes ? render(sizes.blocks) : ""}
      <h3>Backgrounds</h3><div class="grid" style="--min:200px">${bgDemos}</div>
      ${never ? `<h3>Never</h3><div class="do-dont"><div class="dont"><h5>${icon("status.lapsed", "icon")}Never</h5>${render([never])}</div></div>` : ""}`,
      `<p>${inline(d.paragraphs()[0] ?? "")}</p>`
    );
  }

  // ---------- 02 Color ----------
  function color() {
    const f = "02-color.md";
    const d = docs[f];

    const named = rowsOf(d.section(/^Named palette$/)?.table("Name", "Hex"));
    const swatches = named
      .map((r) => {
        const hex = plain(r.hex).toUpperCase();
        const label = plain(r.name);
        const name = labelToName[label.toLowerCase()];
        if (!name) check("warn", "Color", `"${label}" in Named palette has no matching entry in palette.config.json`, f);
        else if (!Object.entries(palette).some(([k, v]) => (k === name || k.startsWith(name + "-")) && v === hex))
          check("error", "Color", `${label} is ${hex} in the Named palette but not in the generated ${name} scale`, f);
        return `<button class="swatch" data-copy="${hex}" type="button" aria-label="Copy ${esc(label)} ${hex}">
          <div class="swatch__chip" style="background:${hex};color:${readable(hex)}">${hex}</div>
          <div class="swatch__body"><strong>${esc(label)}</strong><span class="small">${inline(r.role)} · ${inline(r.brand)}</span><span class="small muted">${ratio(hex, palette.birch).toFixed(1)}:1 on Birch</span></div>
        </button>`;
      })
      .join("");

    const ratioRows = rowsOf(d.section(/^Usage ratios$/)?.table("Brand", "Background"));
    const brandByName = Object.fromEntries(Object.entries(brandNames).map(([k, v]) => [v.toLowerCase(), k]));
    const bars = ratioRows
      .map((r) => {
        const parts = ["background", "dark", "supporting", "signature"].map((k) => {
          const m = plain(r[k]).match(/^(\d+)\s+(.+)$/);
          if (!m) return null;
          const name = labelToName[m[2].toLowerCase()];
          const hex = name && ctx.official[name];
          if (!hex) check("warn", "Color", `Usage ratio color "${m[2]}" not found in the palette`, f);
          return { pct: +m[1], label: m[2], hex: hex ?? palette["stone-500"] };
        }).filter(Boolean);
        const total = parts.reduce((s, p) => s + p.pct, 0);
        if (total !== 100) check("warn", "Color", `Usage ratio for ${plain(r.brand)} adds up to ${total}, not 100`, f);
        const b = brandByName[plain(r.brand).toLowerCase()] ?? "fip";
        return `<div class="ctx ratio-row" data-brand="${b}">
          <strong class="small">${esc(plain(r.brand))}</strong>
          <div><div class="ratio-bar" role="img" aria-label="${esc(parts.map((p) => `${p.pct}% ${p.label}`).join(", "))}">${parts.map((p) => `<div style="flex:${p.pct};background:${p.hex};color:${readable(p.hex)}">${p.pct} ${esc(p.label)}</div>`).join("")}</div><p class="ratio-legend small muted" aria-hidden="true">${esc(parts.map((p) => `${p.pct} ${p.label}`).join(" · "))}</p></div>
        </div>`;
      })
      .join("");

    // Tonal scales: render each table and check it against the generated CSS.
    const scaleSubs = d.section(/^Tonal scales$/)?.subsections(3).filter((s) => s.doc.tables()[0]?.headers[0] === "50") ?? [];
    if (!scaleSubs.length) check("error", "Color", "No tonal scale tables found. Run npm run colors", f);
    const scales = scaleSubs
      .map(({ title, doc }) => {
        const t = doc.tables()[0];
        const name = labelToName[title.toLowerCase()];
        const hexes = t.rows[0].map((c) => plain(c).toUpperCase());
        const ratios = t.rows[1] ?? [];
        t.headers.forEach((step, i) => {
          const css = palette[`${name}-${step}`];
          if (css && css !== hexes[i]) check("error", "Color", `${title} ${step}: 02-color.md says ${hexes[i]}, 09-tokens.md says ${css}. Run npm run colors`, f);
          const r = ratio(hexes[i], palette.birch).toFixed(1);
          if (ratios[i] && plain(ratios[i]) !== r) check("error", "Color", `${title} ${step}: documented ratio ${plain(ratios[i])} but computed ${r}`, f);
        });
        return `<h4>${esc(title)}</h4><div class="scale-wrap"><div class="scale">${t.headers
          .map((step, i) => {
            const isBase = /\*\*/.test(t.rows[0][i]);
            return `<button type="button" class="${isBase ? "is-base" : ""}" data-copy="${hexes[i]}" style="background:${hexes[i]};color:${readable(hexes[i])}" aria-label="Copy ${esc(title)} ${step} ${hexes[i]}${isBase ? " (official)" : ""}"><b>${step}</b><span>${hexes[i]}<br>${ratios[i] ? plain(ratios[i]) + ":1" : ""}</span></button>`;
          })
          .join("")}</div></div>`;
      })
      .join("");

    // Brand roles: resolved tokens for every brand in light and dark.
    const roleTokens = ["--background", "--foreground", "--muted-foreground", "--primary", "--primary-foreground", "--secondary", "--brand-dark", "--brand-tint", "--brand-subtle", "--brand-support", "--brand-signature", "--border", "--input", "--field", "--ring", "--chart-1"];
    const tok = (c, name) => {
      const hex = c.hex(name);
      const raw = c.raw(name) ?? "";
      const label = (raw.match(/var\(--([\w-]+)\)/) ?? [])[1] ?? raw;
      return hex ? `<span class="tok"><i style="background:${hex}"></i>${esc(label)}</span>` : `<span class="tok muted">${esc(label || "none")}</span>`;
    };
    const matrix = (dark) =>
      `<div class="table-wrap"><table class="token-matrix"><thead><tr><th scope="col">Token</th>${BRANDS.map((b) => `<th scope="col">${esc(brandName(b))}</th>`).join("")}</tr></thead><tbody>${roleTokens
        .map((t) => `<tr><td><code>${t}</code></td>${BRANDS.map((b) => `<td>${tok(tokenCtx(b, dark), t)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></div>`;

    // Status and certification.
    const certBadges = certRows.map((r) => badge(r)).join("");

    // Approved pairings: tiles plus a recomputed ratio.
    const pairRows = rowsOf(d.section(/^Approved text pairings$/)?.table("Text", "On", "Ratio"));
    if (!pairRows.length) check("error", "Color", "Approved text pairings table is empty. Run npm run colors", f);
    const pairs = pairRows
      .map((r) => {
        const fg = palette[plain(r.text)], bg = palette[plain(r.on)];
        if (!fg || !bg) {
          check("error", "Color", `Pairing ${plain(r.text)} on ${plain(r.on)} uses an unknown palette step`, f);
          return "";
        }
        const actual = ratio(fg, bg);
        const documented = parseFloat(plain(r.ratio));
        if (Math.abs(actual - documented) > 0.05) check("error", "Color", `Pairing ${plain(r.text)} on ${plain(r.on)}: documented ${documented}:1, computed ${actual.toFixed(1)}:1`, f);
        const min = /^All text/.test(plain(r["ok for"])) ? 4.5 : /^Large/.test(plain(r["ok for"])) ? 3 : 0;
        if (min && actual < min) check("error", "Color", `Pairing ${plain(r.text)} on ${plain(r.on)} is marked "${plain(r["ok for"])}" but is only ${actual.toFixed(1)}:1`, f);
        return `<div class="pair" style="background:${bg};color:${fg};border-color:${fg}">
          <span class="aa">Aa</span><span class="small" style="font-weight:700">${esc(plain(r.text))} on ${esc(plain(r.on))}</span><span class="small">${actual.toFixed(1)}:1 · ${esc(plain(r["ok for"]))}</span></div>`;
      })
      .join("");

    // Gradients, each inside its own brand context.
    const gradRows = rowsOf(d.section(/^Gradients/)?.table("Token", "Brand"));
    const gradients = gradRows
      .flatMap((r) => {
        const token = plain(r.token);
        const brands = /every brand/i.test(plain(r.brand)) ? BRANDS : [brandByName[plain(r.brand).toLowerCase()]].filter(Boolean);
        return brands.map((b) => {
          const c = tokenCtx(b, false);
          const value = c.get(token);
          if (!value) {
            check("error", "Color", `${token} is not defined for ${brandName(b)} in 09-tokens.md`, f);
            return "";
          }
          const stops = gradientStops(value);
          const weakest = stops.length ? Math.min(...stops.map((s) => ratio(palette.birch, s))) : 0;
          const textOk = /birch/i.test(plain(r["text allowed"]));
          if (textOk && weakest < 4.5) check("error", "Color", `${token} (${brandName(b)}) allows Birch text but its weakest stop is ${weakest.toFixed(1)}:1`, f);
          return `<div class="gradient-tile" data-brand="${b}" style="background:var(${token});color:var(--birch)">
            ${textOk ? `<strong>${esc(brandName(b))}</strong><span class="small">Birch text, weakest stop ${weakest.toFixed(1)}:1</span>` : `<span class="small" style="background:var(--birch);color:var(--stone-950);padding:0.125rem 0.5rem;border-radius:4px;justify-self:start;max-width:100%">${esc(brandName(b))} · decorative, no text</span>`}
            <code style="background:none;color:inherit">${esc(token)}</code></div>`;
        });
      })
      .join("");

    // Chart with a data table alternative.
    const series = [42, 35, 28, 24, 19, 15, 11, 8];
    const chartRows = rowsOf(d.section(/^Data visualization$/)?.table("Order", "Color"));
    const chart = `<div class="split"><figure style="margin:0"><svg viewBox="0 0 400 200" role="img" aria-labelledby="chart-t" style="width:100%;height:auto"><title id="chart-t">Example categorical bar chart using chart-1 to chart-8</title>
      ${series.map((v, i) => `<rect x="${12 + i * 48}" y="${190 - v * 4}" width="36" height="${v * 4}" rx="3" fill="var(--chart-${i + 1})"/><text x="${30 + i * 48}" y="${184 - v * 4}" text-anchor="middle" font-size="11" fill="currentColor">${v}</text>`).join("")}
      <line x1="0" y1="190" x2="400" y2="190" stroke="var(--border)"/></svg><figcaption class="small muted">Series 1 follows the brand. Switch brands to see it change.</figcaption></figure>
      <div class="table-wrap"><table><thead><tr><th scope="col">Series</th><th scope="col">Color</th><th scope="col" class="num">Value</th></tr></thead><tbody>${series
        .map((v, i) => `<tr><td>Series ${i + 1}</td><td><span class="tok"><i style="background:var(--chart-${i + 1})"></i>${inline(chartRows[i]?.color ?? `--chart-${i + 1}`)}</span></td><td class="num">${v}</td></tr>`)
        .join("")}</tbody></table></div></div>`;

    return section(
      "color", "02 · Color", "One ground, one dark, one signature", f,
      `<h3>The model</h3>${tableOrWarn(d.section(/^The model/)?.table("Part", "Rule"), f, "Color")}
      <h3>Named palette</h3><p class="small muted">Select a swatch to copy its hex.</p><div class="grid" style="--min:180px">${swatches}</div>
      <h3>Usage ratios</h3>${render(d.section(/^Usage ratios$/)?.blocks.filter((b) => b.type === "p") ?? [])}${bars}
      <h3>Tonal scales</h3><p class="prose small">The outlined step is the official color, kept exact. Ratios are against Birch.</p>${scales}
      <h3>Brand token mapping, light</h3>${matrix(false)}
      <h3>Brand token mapping, dark</h3>${matrix(true)}
      <h3>Status and certification</h3><p class="prose">Status never changes by brand and never relies on color alone.</p><div class="row">${certBadges}</div>
      <h3>Approved text pairings</h3><div class="grid" style="--min:170px">${pairs}</div>
      <h3>Gradients</h3><div class="grid" style="--min:240px">${gradients}</div>
      <h3>Data visualization</h3>${chart}`,
      `<p>${inline(d.paragraphs()[0] ?? "")}</p>`
    );
  }

  // ---------- Contrast audit (all semantic pairings, every brand and mode) ----------
  const AUDIT = [
    ["Body text", "--foreground", "--background", 4.5],
    ["Text on cards", "--card-foreground", "--card", 4.5],
    ["Help text", "--muted-foreground", "--background", 4.5],
    ["Help text on Frost panels", "--muted-foreground", "--muted", 4.5],
    ["Primary button", "--primary-foreground", "--primary", 4.5],
    ["Primary button, hover", "--primary-foreground", "--primary-hover", 4.5],
    ["Secondary button", "--secondary-foreground", "--secondary", 4.5],
    ["Links", "--brand-text", "--background", 4.5],
    ["Text on brand tint", "--foreground", "--brand-tint", 4.5],
    ["Help text on brand tint", "--muted-foreground", "--brand-tint", 4.5],
    ["Selected row", "--foreground", "--brand-subtle", 4.5],
    ["Support panel", "--brand-support-foreground", "--brand-support", 4.5],
    ["Signature fill", "--brand-signature-foreground", "--brand-signature", 4.5],
    ["Destructive button", "--destructive-foreground", "--destructive", 4.5],
    ["Input border on page", "--input", "--background", 3],
    ["Input border on field", "--input", "--field", 3],
    ["Focus ring", "--ring", "--background", 3],
    ...["success", "warning", "danger", "info", "neutral"].flatMap((s) => [
      [`Status ${s} text`, `--status-${s}-fg`, `--status-${s}-bg`, 4.5],
      [`Status ${s} icon`, `--status-${s}-icon`, `--status-${s}-bg`, 3],
    ]),
  ];
  function audit() {
    let fails = 0;
    const cell = (b, dark, fg, bg, min) => {
      const c = tokenCtx(b, dark);
      const a = c.hex(fg), z = c.hex(bg);
      if (!a || !z) {
        check("error", "Contrast", `${brandName(b)} ${dark ? "dark" : "light"}: cannot resolve ${!a ? fg : bg}`, "09-tokens.md");
        return `<td class="muted">n/a</td>`;
      }
      const r = ratio(a, z);
      if (r < min) {
        fails++;
        check("error", "Contrast", `${brandName(b)} ${dark ? "dark" : "light"}: ${fg} on ${bg} is ${r.toFixed(1)}:1, needs ${min}:1`, "09-tokens.md");
      }
      return `<td><span class="tok"><i style="background:${z};box-shadow:inset 0 0 0 5px ${a}"></i></span> ${verdict(r, min)}</td>`;
    };
    const heroRows = BRANDS.map((b) => {
      const stops = gradientStops(tokenCtx(b, false).get("--gradient-hero"));
      return stops.length ? Math.min(...stops.map((s) => ratio(palette.birch, s))) : 0;
    });
    const head = `<thead><tr><th scope="col">Pairing</th><th scope="col">Min</th>${BRANDS.map((b) => `<th scope="col">${esc(brandName(b))}</th>`).join("")}</tr></thead>`;
    const table = (dark) =>
      `<div class="table-wrap"><table>${head}<tbody>${AUDIT.map(([label, fg, bg, min]) => `<tr><td>${esc(label)}<br><code class="small">${fg} / ${bg}</code></td><td>${min}:1</td>${BRANDS.map((b) => cell(b, dark, fg, bg, min)).join("")}</tr>`).join("")}
      ${dark ? "" : `<tr><td>Birch text on hero gradient<br><code class="small">weakest stop</code></td><td>4.5:1</td>${heroRows.map((r) => `<td>${verdict(r, 4.5)}</td>`).join("")}</tr>`}</tbody></table></div>`;
    const html = `<h3>Contrast audit</h3><p class="prose">Every semantic text and UI pairing, resolved from <code>09-tokens.md</code> for each brand and mode and measured against WCAG 2.2 AA. This runs on every build.</p>
      <div class="tabs" data-tabs><div role="tablist" aria-label="Mode"><button role="tab" aria-selected="true" aria-controls="audit-light" id="audit-light-tab">Light</button><button role="tab" aria-selected="false" aria-controls="audit-dark" id="audit-dark-tab" tabindex="-1">Dark</button><span class="indicator" aria-hidden="true"></span></div>
      <div role="tabpanel" id="audit-light" aria-labelledby="audit-light-tab">${table(false)}</div><div role="tabpanel" id="audit-dark" aria-labelledby="audit-dark-tab" hidden>${table(true)}</div></div>`;
    heroRows.forEach((r, i) => r < 4.5 && check("error", "Contrast", `${brandName(BRANDS[i])}: Birch on --gradient-hero is ${r.toFixed(1)}:1`, "09-tokens.md"));
    return { html, fails };
  }

  // ---------- 03 Typography ----------
  function typography() {
    const f = "03-typography.md";
    const d = docs[f];
    const faces = rowsOf(d.section(/^Three faces/)?.table("Role", "Token", "Family"));
    const faceCards = faces
      .map((r) => `<div class="face"><span class="aa" style="font-family:var(${plain(r.token)})">Aa</span><strong>${inline(r.family)}</strong><code>${esc(plain(r.token))}</code><span class="small">${inline(r.job)}</span>${r.never ? `<span class="small muted">Never: ${inline(r.never)}</span>` : ""}</div>`)
      .join("");
    const scaleT = d.section(/^Type scale/)?.table("Token", "rem", "Line height");
    if (!scaleT) check("error", "Typography", "Type scale table not found", f);
    const samples = {
      display: "Integrity, at scale", h1: "Every claim stands on a standard", h2: "What verification covers", h3: "How products are tested", h4: "Card and dialog title", h5: "Minor heading",
      eyebrow: "Verified standards", "body-lg": "Body copy carries the argument; the headline only introduces it. Keep paragraphs to four or five lines on screen.",
      body: "Every verified product is reviewed against a published standard, and every claim we make can be traced back to it.", "body-sm": "Updated 3 days ago by the Verification team", label: "Product name",
      caption: "Last synced 09:42", code: "PRD-004213", data: "1,284  ·  98.6%",
    };
    const specimens = rowsOf(scaleT)
      .map((r) => {
        const t = plain(r.token);
        return `<div class="specimen"><div class="specimen__meta"><b>${esc(t)}</b>${esc(plain(r.family))} ${esc(plain(r.weight))} · ${esc(plain(r.px))}px / ${esc(plain(r["line height"]))}<br>${inline(r.use)}</div><div class="t-${slug(t)}">${esc(samples[t] ?? "The quick brown fox")}</div></div>`;
      })
      .join("");
    const pairings = rowsOf(d.section(/^Pair by context/)?.table("Context", "Pairing"))
      .map((r) => {
        const p = plain(r.pairing);
        const head = /^Quicksand/.test(p) ? "var(--font-accent)" : "var(--font-serif)";
        const body = /Lora \+ Quicksand/.test(p) ? "var(--font-serif)" : "var(--font-sans)";
        const label = /Quicksand/.test(p) ? "var(--font-accent)" : "var(--font-sans)";
        return `<article class="card"><p class="eyebrow" style="font-family:${label}">${esc(plain(r.context))}</p><h3 style="font-family:${head};margin-top:0;font-weight:${head.includes("accent") ? 700 : 500}">${/^Quicksand/.test(p) ? "Join us at the harvest table" : "What verification covers"}</h3><p style="font-family:${body}">Every verified product is reviewed against a published standard, and every claim can be traced back to it.</p><p class="small muted" style="margin:0"><strong>${esc(p)}.</strong> ${inline(r["how it works"])}</p></article>`;
      })
      .join("");
    const surface = d.section(/^Usage by surface$/);
    const rules = d.section(/^Rules$/);
    return section(
      "typography", "03 · Typography", "Three faces, three jobs", f,
      `<div class="grid" style="--min:240px">${faceCards}</div>
      <h3>Pair by context, not by habit</h3><div class="grid" style="--min:280px">${pairings}</div>
      <h3>Type scale</h3><p class="prose small">Rendered from the table. Change a size or weight in the doc and this updates.</p>${specimens}
      <h3>Usage by surface</h3>${surface ? render(surface.blocks) : ""}
      <h3>Rules</h3><div class="prose">${rules ? render(rules.blocks) : ""}</div>`
    );
  }

  // Generated CSS for the type scale classes.
  function typeCss() {
    const t = docs["03-typography.md"]?.section(/^Type scale/)?.table("Token", "rem", "Line height");
    return rowsOf(t)
      .map((r) => {
        const tok = plain(r.token);
        const fam = plain(r.family);
        const family = /mono/.test(fam) ? "var(--font-mono)" : /accent/.test(fam) ? "var(--font-accent)" : /^serif/.test(fam) ? "var(--font-serif)" : "var(--font-sans)";
        const size = plain(r.rem);
        const lh = plain(r["line height"]);
        const wt = plain(r.weight);
        let css = `.t-${slug(tok)}{font-family:${family};`;
        if (size !== "inherit") css += `font-size:${size.replace(/^relative$/, "inherit")};`;
        if (lh !== "inherit") css += `line-height:${lh};`;
        if (/^\d+$/.test(wt)) css += `font-weight:${wt};`;
        if (tok === "eyebrow") css += "text-transform:uppercase;letter-spacing:0.18em;";
        if (/tabular/.test(fam)) css += "font-variant-numeric:tabular-nums;";
        return css + "}";
      })
      .join("\n");
  }

  // ---------- 05 Iconography ----------
  function icons() {
    const f = "05-iconography.md";
    const d = docs[f];
    const sizes = rowsOf(d.section(/^Sizes$/)?.table("Token", "px"))
      .map((r) => `<div class="icon-tile">${iconSvg(registry["domain.crop"] ?? "Sprout", "").replace("<svg", `<svg style="width:${plain(r.px)}px;height:${plain(r.px)}px"`)}<strong>${esc(plain(r.token))}</strong><span class="muted">${esc(plain(r.px))}px</span></div>`)
      .join("");
    const groups = (d.section(/^The icon registry$/)?.subsections(3) ?? [])
      .map(({ title, doc }) => {
        const tiles = rowsOf(doc.tables()[0])
          .map((r) => {
            const lucide = plain(r.lucide);
            const svg = iconSvg(lucide, "");
            const missing = svg.includes("data-missing");
            if (missing) check("warn", "Icons", `Lucide has no icon named ${lucide} (registry name ${plain(r.name)})`, f);
            return `<div class="icon-tile${missing ? " is-missing" : ""}" title="${esc(plain(r.use ?? ""))}">${svg}<code>${esc(plain(r.name))}</code><span class="muted">${esc(lucide)}${missing ? " (not found)" : ""}</span></div>`;
          })
          .join("");
        return `<h4>${esc(title)}</h4><div class="grid" style="--min:120px">${tiles}</div>`;
      })
      .join("");
    const statusDemo = ["success", "warning", "danger", "info"].map((s) => `<span class="badge badge--${s}">${icon(`status.${s === "danger" ? "error" : s}`)}${s[0].toUpperCase() + s.slice(1)}</span>`).join("");
    return section(
      "icons", "05 · Iconography", "One library, one registry", f,
      `<h3>Sizes</h3><div class="grid" style="--min:110px">${sizes}</div>
      <h3>Color</h3><div class="row">${statusDemo}<button class="btn btn--default" type="button">${icon("action.add")}Add product</button><span class="row" style="color:var(--brand-text);gap:0.5rem">${icon("domain.standard")}Brand emphasis</span></div>
      <h3>Registry</h3><p class="prose small">Code refers to icons by purpose. Every name below is resolved against the installed Lucide version.</p>${groups}
      <h3>Usage rules</h3><div class="prose">${render(d.section(/^Usage rules$/)?.blocks ?? [])}</div>`,
      `<p>${inline(d.section(/^Library$/)?.paragraphs()[0] ?? "")}</p>`
    );
  }

  // ---------- 06 UI framework ----------
  function components() {
    const f = "06-ui-framework.md";
    const d = docs[f];
    const variants = rowsOf(d.section(/^Buttons$/)?.table("Variant", "Token use")).map((r) => plain(r.variant));
    const sizes = rowsOf(d.section(/^Buttons$/)?.table("Size", "Height"));
    if (!variants.length) check("error", "Components", "Button variant table not found", f);
    const labelFor = { default: "Submit for review", secondary: "Save draft", outline: "Filter", ghost: "Edit", destructive: "Delete product", link: "View standard" };
    const iconFor = { default: "nav.forward", outline: "action.filter", ghost: "action.edit", destructive: "action.delete" };
    const btn = (v, extra = "", label = labelFor[v] ?? v, attrs = "") =>
      `<button type="button" class="btn btn--${v} ${extra}" ${attrs}>${iconFor[v] && v !== "default" ? icon(iconFor[v]) : ""}${esc(label)}${v === "default" ? icon(iconFor[v]) : ""}</button>`;
    const buttonMatrix = `<div class="table-wrap"><table><thead><tr><th scope="col">Variant</th><th scope="col">Default</th><th scope="col">Hover</th><th scope="col">Focus</th><th scope="col">Pressed</th><th scope="col">Disabled</th></tr></thead><tbody>${variants
      .map((v) => `<tr><td><code>${esc(v)}</code></td><td>${btn(v)}</td><td>${btn(v, "is-hover")}</td><td>${btn(v, "is-focus")}</td><td>${btn(v, "is-active")}</td><td>${btn(v, "", undefined, "disabled")}</td></tr>`)
      .join("")}</tbody></table></div>`;
    const sizeRow = sizes
      .map((r) => {
        const s = plain(r.size);
        return s === "icon"
          ? `<span class="tooltip-wrap"><button type="button" class="btn btn--outline btn--icon" aria-label="More actions">${icon("action.more")}</button><span class="tooltip" role="tooltip">More actions</span></span>`
          : `<button type="button" class="btn btn--default ${s === "default" ? "" : "btn--" + s}">${esc(s)} · ${esc(plain(r.height))}</button>`;
      })
      .join("");

    const certAll = certRows.map(badge).join("");
    const chips = BRANDS.map((b) => `<span class="chip" data-brand="${b}">${esc(brandName(b))}</span>`).join("");
    const products = [
      ["Heritage Rolled Oats", "nongmo", "verified", "Brightfield Mills"],
      ["Stone-Ground Corn Tortillas", "nonupf", "pending", "Casa Maíz"],
      ["Sprouted Lentil Pasta", "nongmo", "expiring", "Good Acre Foods"],
      ["Cultured Oat Butter", "nonupf", "lapsed", "Northfold Dairy"],
      ["Wildflower Honey", "nongmo", "in progress", "Hive & Hollow"],
    ];
    const tableRows = products
      .map(([name, prog, st, brand], i) => `<tr ${i === 1 ? 'aria-selected="true"' : ""}><td data-label="Select"><input type="checkbox" aria-label="Select ${esc(name)}" ${i === 1 ? "checked" : ""}></td><td data-label="Product"><strong>${esc(name)}</strong><br><span class="small muted">${esc(brand)}</span></td><td data-label="Program"><span class="chip" data-brand="${prog}">${esc(brandName(prog))}</span></td><td data-label="Status">${badge(cert(st))}</td><td class="num" data-label="Units">${(1200 + i * 317).toLocaleString("en-US")}</td><td class="num" data-label="Actions"><button type="button" class="btn btn--ghost btn--sm">${icon("action.edit", "icon icon--sm")}Edit</button> <button type="button" class="btn btn--ghost btn--sm btn--icon" aria-label="More actions for ${esc(name)}">${icon("action.more", "icon icon--sm")}</button></td></tr>`)
      .join("");
    const alerts = [
      ["info", "status.info", "Review in progress", "The Verification team is reviewing 3 ingredients. We will email you when it is done."],
      ["success", "status.success", "Product submitted", "Heritage Rolled Oats is now in review."],
      ["warning", "status.warning", "Verification expires Dec 1, 2026", "Renew before then to keep the seal on pack."],
      ["danger", "status.error", "We could not upload the spec sheet", "The file is larger than 20 MB. Compress it or upload a PDF instead."],
    ]
      .map(([s, i, t, b]) => `<div class="alert alert--${s}" role="${s === "danger" ? "alert" : "status"}">${icon(i)}<strong>${t}</strong><p>${b}</p></div>`)
      .join("");
    const interaction = (d.section(/^Interaction types/)?.subsections(3) ?? [])
      .map(({ title, doc }) => `<details class="source-doc"><summary>${esc(title)} <span class="muted small">${doc.tables()[0]?.rows.length ?? 0} interactions</span></summary><div>${render(doc.blocks)}</div></details>`)
      .join("");
    const spacing = rowsOf(d.section(/^Spacing$/)?.table("Token", "px"))
      .map((r) => {
        const px = parseInt(plain(r.px), 10);
        return `<div class="space-row"><code>${esc(plain(r.token))}</code><div class="space-bar" style="width:${px}px;max-width:100%"></div><span class="small muted">${esc(plain(r.px))}px · ${inline(r["typical use"])}</span></div>`;
      })
      .join("");
    const radius = rowsOf(d.section(/^Shape and elevation$/)?.table("Token", "Value"))
      .map((r) => {
        const t = plain(r.token);
        const v = t === "rounded-full" ? "999px" : `var(--radius-${t.replace("rounded-", "")})`;
        return `<div style="display:grid;gap:0.5rem;justify-items:start"><div class="radius-box" style="border-radius:${v}"></div><code>${esc(t)}</code><span class="small muted">${inline(r.use)}</span></div>`;
      })
      .join("");
    const elev = rowsOf(d.section(/^Shape and elevation$/)?.table("Elevation", "Token"))
      .map((r) => {
        const n = plain(r.elevation);
        return `<div style="display:grid;gap:0.5rem"><div class="elev-box" style="box-shadow:${n === "0" ? "none" : `var(--elevation-${n})`}">${esc(n)}</div><span class="small muted">${inline(r.use)}</span></div>`;
      })
      .join("");
    const containers = rowsOf(d.section(/^Breakpoints and containers$/)?.table("Container", "Max width"))
      .map((r) => {
        const w = plain(r["max width"]);
        const px = /ch$/.test(w) ? parseFloat(w) * 8 : /%/.test(w) ? 1600 : parseInt(w, 10);
        return `<div class="container-bar" style="width:${Math.min(100, (px / 1600) * 100)}%">${esc(plain(r.container))} · ${esc(w)} · ${inline(r.use)}</div>`;
      })
      .join("");
    const surfaces = d.section(/^Surface types$/)?.tables()[0];
    const patterns = d.section(/^Standard patterns$/);
    const writing = d.section(/^Writing in the interface$/);

    return section(
      "components", "06 · UI framework", "Components and patterns", f,
      `<h3 id="c-buttons">Buttons</h3>${buttonMatrix}
      <h4>Sizes</h4><div class="row">${sizeRow}</div>
      <h4>Loading</h4><div class="row"><button type="button" class="btn btn--default" data-demo="loading">${icon("action.upload")}Upload spec sheet</button><span class="small muted">Spinner replaces the icon, the label stays, the button is disabled.</span></div>

      <h3 id="c-forms">Forms</h3>
      <form class="split" novalidate data-demo="form">
        <div class="stack">
          <div class="field"><label class="label" for="f-name">Product name</label><input class="input" id="f-name" name="name" required aria-describedby="f-name-help" placeholder="Heritage Rolled Oats"><p class="help" id="f-name-help">As it appears on pack.</p></div>
          <div class="field"><label class="label" for="f-upc">UPC <span class="optional">(optional)</span></label><input class="input" id="f-upc" inputmode="numeric" placeholder="012345678905" aria-describedby="f-upc-help"><p class="help" id="f-upc-help">12 digits, no spaces.</p></div>
          <div class="field"><label class="label" for="f-cat">Category</label><div class="select-wrap"><select class="select" id="f-cat"><option>Grains and cereals</option><option>Dairy and alternatives</option><option>Snacks</option><option>Beverages</option><option>Produce</option><option>Baking</option></select>${icon("nav.expand", "icon icon--sm")}</div></div>
          <div class="field"><label class="label" for="f-notes">Notes for the reviewer <span class="optional">(optional)</span></label><textarea class="textarea" id="f-notes" maxlength="500" aria-describedby="f-notes-help"></textarea><p class="help" id="f-notes-help">Up to 500 characters.</p></div>
        </div>
        <div class="stack">
          <fieldset><legend>Program</legend>${BRANDS.filter((b) => b === "nongmo" || b === "nonupf").map((b, i) => `<label class="check"><input type="radio" name="prog" ${i === 0 ? "checked" : ""}> ${esc(brandName(b))}</label>`).join("")}</fieldset>
          <fieldset><legend>Claims on pack</legend><label class="check"><input type="checkbox" checked> Organic</label><label class="check"><input type="checkbox"> Gluten-free</label><label class="check"><input type="checkbox"> Vegan</label></fieldset>
          <label class="switch"><input type="checkbox" role="switch" checked> Email me when the review is done</label>
          <div class="row"><button class="btn btn--default" type="submit">Submit for review</button><button class="btn btn--outline" type="reset">Cancel</button></div>
          <p class="small muted">Submit with an empty name to see <code>field-error</code>.</p>
        </div>
      </form>

      <h3 id="c-status">Status badges and program chips</h3><div class="row">${certAll}</div><div class="row" style="margin-top:1rem">${chips}</div>
      <h4>Filter chips</h4><div class="row" data-demo="chips"><span class="chip chip--removable" data-brand="nongmo">Non-GMO Project<button type="button" aria-label="Remove filter Non-GMO Project">${icon("action.close", "icon icon--xs")}</button></span><span class="chip chip--removable" data-brand="fip">Expiring this quarter<button type="button" aria-label="Remove filter Expiring this quarter">${icon("action.close", "icon icon--xs")}</button></span></div>

      <h3 id="c-cards">Cards and panels</h3>
      <div class="grid" style="--min:250px">
        <article class="card card--interactive" tabindex="0"><p class="eyebrow">Product</p><h4>Heritage Rolled Oats</h4><p class="small muted">Brightfield Mills · Grains</p>${badge(cert("verified"))}</article>
        <article class="card"><div class="stat"><span class="small muted">Products verified this quarter</span><span class="value">1,284</span><span class="small">${icon("status.success", "icon icon--sm")} 12% more than last quarter</span></div></article>
        <article class="panel-support"><h4 style="margin-top:0">Support panel</h4><p style="margin:0">Uses <code>--brand-support</code>: Loam, Seafoam, Almond or Corn Flower.</p></article>
        <article class="panel-dark"><p class="eyebrow" style="color:var(--birch)">Inverted panel</p><h4 style="margin-top:0">The brand dark</h4><p style="margin:0">Sets every inverted panel.</p></article>
      </div>
      <h4>Verified product detail</h4>
      <div class="card ctx" data-brand="nongmo" style="display:flex;gap:1.5rem;flex-wrap:wrap;align-items:center">
        ${asset("nongmo", "seal-verified-color") ? `<img src="${esc(asset("nongmo", "seal-verified-color").path)}" alt="Non-GMO Project Verified" style="width:112px">` : ""}
        <div><h4 style="margin:0">Heritage Rolled Oats</h4><p class="small muted">Brightfield Mills</p>${badge(cert("verified"))}<p class="small" style="margin:0.5rem 0 0">The seal appears only because this product is currently verified.</p></div>
      </div>

      <h3 id="c-feedback">Alerts</h3><div class="stack">${alerts}</div>

      <h3 id="c-table">Data table</h3>
      <div class="row" style="margin-bottom:0.75rem"><div class="field" style="flex:1;min-width:min(220px,100%)"><label class="label sr-only" for="t-search">Search products</label><input class="input" id="t-search" type="search" placeholder="Search products" data-demo="search"></div><button class="btn btn--outline" type="button">${icon("action.filter")}Filter</button><button class="btn btn--default" type="button" data-demo="add-row">${icon("action.add")}Add product</button></div>
      <p class="small muted" aria-live="polite" id="t-count">${products.length} products</p>
      <div class="table-wrap cq"><table class="data-table stack-table" id="demo-table"><thead><tr><th scope="col"><span class="sr-only">Select</span></th><th scope="col">Product</th><th scope="col">Program</th><th scope="col">Status</th><th scope="col" class="num">Units</th><th scope="col" class="num"><span class="sr-only">Actions</span></th></tr></thead><tbody>${tableRows}</tbody></table></div>
      <nav class="pagination" aria-label="Pagination"><button class="btn btn--ghost btn--sm" type="button" aria-label="Previous page">${icon("nav.previous", "icon icon--sm")}</button><button class="btn btn--outline btn--sm" type="button" aria-current="page">1</button><button class="btn btn--ghost btn--sm" type="button">2</button><button class="btn btn--ghost btn--sm" type="button">3</button><button class="btn btn--ghost btn--sm" type="button" aria-label="Next page">${icon("nav.next", "icon icon--sm")}</button><span class="small muted">Showing 1 to 5 of 42</span></nav>

      <h3 id="c-reveal">Tabs, accordion and menus</h3>
      <div class="split">
        <div class="tabs" data-tabs><div role="tablist" aria-label="Product record"><button role="tab" id="tb1" aria-controls="tp1" aria-selected="true">Overview</button><button role="tab" id="tb2" aria-controls="tp2" aria-selected="false" tabindex="-1">Ingredients</button><button role="tab" id="tb3" aria-controls="tp3" aria-selected="false" tabindex="-1">History</button><span class="indicator" aria-hidden="true"></span></div>
          <div role="tabpanel" id="tp1" aria-labelledby="tb1"><p>Rolled oats from a single mill, tested for GMO markers every lot.</p></div>
          <div role="tabpanel" id="tp2" aria-labelledby="tb2" hidden><p>Whole grain oats. That is the whole list.</p></div>
          <div role="tabpanel" id="tp3" aria-labelledby="tb3" hidden><ol class="timeline"><li><strong>Verified</strong><br><span class="small muted">Mar 4, 2026</span></li><li><strong>Lab test passed</strong><br><span class="small muted">Feb 20, 2026</span></li><li><strong>Enrolled</strong><br><span class="small muted">Jan 12, 2026</span></li></ol></div>
        </div>
        <div class="stack">
          <div class="accordion"><details><summary>What does verified cover?${icon("nav.expand")}</summary><div class="content">Ingredients, processing aids and testing against the published standard.</div></details><details><summary>How long does review take?${icon("nav.expand")}</summary><div class="content">Most reviews finish in four to six weeks.</div></details></div>
          <div class="row"><div style="position:relative"><button class="btn btn--outline" type="button" aria-haspopup="menu" aria-expanded="false" data-demo="menu">${icon("action.more")}Actions</button><div class="popover" role="menu" hidden><button role="menuitem" type="button">${icon("action.duplicate", "icon icon--sm")}Duplicate</button><button role="menuitem" type="button">${icon("action.export", "icon icon--sm")}Export</button><button role="menuitem" type="button">${icon("action.archive", "icon icon--sm")}Archive</button></div></div>
          <span class="tooltip-wrap"><button class="btn btn--ghost btn--icon" type="button" aria-label="Help">${icon("nav.help")}</button><span class="tooltip" role="tooltip">Help with this page</span></span></div>
        </div>
      </div>

      <h3 id="c-overlays">Dialogs, sheets and toasts</h3>
      <div class="row">
        <button class="btn btn--outline" type="button" data-open="demo-dialog">Open dialog</button>
        <button class="btn btn--destructive" type="button" data-open="demo-alert">${icon("action.delete")}Delete product</button>
        <button class="btn btn--outline" type="button" data-open="demo-sheet">Open record in sheet</button>
        <button class="btn btn--secondary" type="button" data-demo="toast">Show toast</button>
      </div>
      <dialog id="demo-dialog" aria-labelledby="dd-t"><h4 id="dd-t">Rename product</h4><div class="field"><label class="label" for="dd-name">Product name</label><input class="input" id="dd-name" value="Heritage Rolled Oats"></div><div class="actions"><button class="btn btn--outline" type="button" data-close>Cancel</button><button class="btn btn--default" type="button" data-close>Save changes</button></div></dialog>
      <dialog id="demo-alert" role="alertdialog" aria-labelledby="da-t" aria-describedby="da-d"><h4 id="da-t">Delete Heritage Rolled Oats?</h4><p id="da-d">This removes the product, its 3 documents and its review history. You cannot undo this.</p><div class="actions"><button class="btn btn--outline" type="button" data-close>Keep product</button><button class="btn btn--destructive" type="button" data-close>Delete product</button></div></dialog>
      <dialog id="demo-sheet" class="sheet" aria-labelledby="ds-t"><div class="row" style="justify-content:space-between"><h4 id="ds-t" style="margin:0">Heritage Rolled Oats</h4><button class="btn btn--ghost btn--icon" type="button" aria-label="Close" data-close>${icon("action.close")}</button></div><p class="small muted">Brightfield Mills</p>${badge(cert("verified"))}<ol class="timeline" style="margin-top:1.5rem"><li><strong>Verified</strong><br><span class="small muted">Mar 4, 2026</span></li><li><strong>Lab test passed</strong><br><span class="small muted">Feb 20, 2026</span></li></ol></dialog>

      <h3 id="c-progress">Progress, steps and loading</h3>
      <div class="split">
        <div class="stack"><div class="progress" role="progressbar" aria-label="Enrollment progress" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"><div style="width:60%"></div></div>
        <ol class="stepper" aria-label="Enrollment steps"><li data-state="done">Company</li><li data-state="done">Products</li><li aria-current="step">Documents</li><li>Review</li></ol>
        <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="#c-progress">Products</a></li><li>${icon("nav.next", "icon icon--sm")}<a href="#c-progress">Brightfield Mills</a></li><li>${icon("nav.next", "icon icon--sm")}<span aria-current="page">Heritage Rolled Oats</span></li></ol></nav></div>
        <div class="stack" aria-hidden="true"><div class="skeleton" style="height:20px;width:60%"></div><div class="skeleton" style="height:14px"></div><div class="skeleton" style="height:14px;width:85%"></div><div class="row"><div class="skeleton" style="height:36px;width:36px;border-radius:999px"></div><div class="skeleton" style="height:14px;width:40%"></div></div></div>
      </div>
      <h4>Empty state</h4>
      <div class="empty">${icon("domain.product")}<p style="margin:0.75rem 0">Products you submit for verification will appear here.</p><button class="btn btn--default" type="button">${icon("action.add")}Add your first product</button></div>
      <h4>People</h4><div class="row"><span class="avatar" aria-hidden="true">MR</span><span>Maya Reyes</span><span class="avatar" aria-hidden="true">JT</span><span>Jordan Tan</span></div>

      <h3>Which component for which interaction</h3>${interaction}
      <h3>Spacing</h3>${spacing}
      <h3>Radius</h3><div class="row" style="gap:2rem;align-items:flex-start">${radius}</div>
      <h3>Elevation</h3><div class="grid" style="--min:150px">${elev}</div>
      <h3>Containers</h3>${containers}
      <h3>Surface types</h3>${surfaces ? renderTable(surfaces) : ""}
      <h3>Standard patterns</h3><div class="prose">${patterns ? render(patterns.blocks) : ""}</div>
      <h3>Writing in the interface</h3><div class="prose">${writing ? render(writing.blocks) : ""}</div>`
    );
  }

  // ---------- 07 Motion ----------
  function motion() {
    const f = "07-motion.md";
    const d = docs[f];
    const durations = rowsOf(d.section(/^Duration tokens$/)?.table("Token", "Value"));
    const easings = rowsOf(d.section(/^Easing tokens$/)?.table("Token", "Curve"));
    const named = rowsOf(d.section(/^Named animations$/)?.table("Name", "What it does"));
    const durTiles = durations
      .map((r) => `<div class="motion-card"><header><code>${esc(plain(r.token))}</code><span class="small">${esc(plain(r.value))}</span></header><div class="track"><span class="dot"></span></div><p class="small muted" style="margin:0">${inline(r.use)}</p><button class="btn btn--outline btn--sm" type="button" data-play-track data-duration="${esc(plain(r.token))}" data-ease="--ease-standard">Play</button></div>`)
      .join("");
    const easeTiles = easings
      .map((r) => {
        const m = plain(r.curve).match(/cubic-bezier\(([^)]+)\)/);
        const [x1, y1, x2, y2] = m ? m[1].split(",").map(Number) : [0, 0, 1, 1];
        const Y = (y) => 86 - y * 72;
        return `<div class="motion-card"><header><code>${esc(plain(r.token))}</code></header><svg class="curve" viewBox="0 0 120 96" aria-hidden="true"><line x1="10" y1="86" x2="110" y2="14" stroke="var(--border)" stroke-dasharray="3 3"/><path d="M10 86 C ${10 + x1 * 100} ${Y(y1)}, ${10 + x2 * 100} ${Y(y2)}, 110 14" fill="none" stroke-width="2.5"/></svg><div class="track"><span class="dot"></span></div><p class="small muted" style="margin:0">${inline(r.use)}</p><button class="btn btn--outline btn--sm" type="button" data-play-track data-duration="--duration-slow" data-ease="${esc(plain(r.token))}">Play</button></div>`;
      })
      .join("");
    const tokenOf = (word, kind) => {
      const w = word.trim().toLowerCase();
      if (kind === "duration") return ["instant", "fast", "base", "moderate", "slow", "deliberate"].includes(w) ? `--duration-${w}` : null;
      return ["standard", "enter", "exit", "emphasized"].includes(w) ? `--ease-${w}` : null;
    };
    const DEMOS = new Set(["fade-in", "pop-in", "dialog-in", "sheet-in", "toast-in", "expand", "tab-switch", "row-enter", "row-exit", "reorder", "press", "hover-lift", "focus-ring", "skeleton", "spin", "status-change", "field-error", "page-enter"]);
    const namedTiles = named
      .map((r) => {
        const name = plain(r.name).split("/")[0].trim();
        const [dw, ew] = plain(r["duration / easing"]).split(",");
        const dur = tokenOf(dw ?? "", "duration") ?? "--duration-base";
        const ease = tokenOf(ew ?? "", "ease") ?? (/spring/.test(ew ?? "") ? "--ease-standard" : "--ease-standard");
        if (!DEMOS.has(name)) check("warn", "Motion", `No showcase demo for named animation "${name}"`, f);
        return `<div class="motion-card"><header><code>${esc(plain(r.name))}</code><span class="small muted">${esc(plain(r["duration / easing"]))}</span></header>
          <div class="stage" data-stage="${esc(name)}"></div>
          <p class="small" style="margin:0">${inline(r["what it does"])}</p><p class="small muted" style="margin:0"><strong>Trigger:</strong> ${inline(r.trigger)}</p>
          <button class="btn btn--outline btn--sm" type="button" data-play="${esc(name)}" data-duration="${dur}" data-ease="${ease}">Play</button></div>`;
      })
      .join("");
    const sig = d.section(/^Signature moment$/);
    const verified = cert("verified");
    const pending = cert("pending");
    const sigDemo = BRANDS.filter((b) => b !== "collective")
      .map((b) => `<div class="card ctx" data-brand="${b}" style="display:grid;gap:0.75rem;justify-items:start"><strong class="small">${esc(brandName(b))}</strong><div class="sig-wrap" data-sig><span class="sig-glow" aria-hidden="true"></span><span data-sig-badge aria-live="polite">${badge(pending)}</span></div><button class="btn btn--default btn--sm" type="button" data-play-sig>Approve verification</button></div>`)
      .join("");
    return section(
      "motion", "07 · Motion", "Motion answers people", f,
      `<div class="row" style="margin-bottom:1rem"><label class="switch"><input type="checkbox" role="switch" data-toggle-reduce> Simulate reduced motion</label></div>
      <h3>Principles</h3><div class="prose">${render(d.section(/^Principles$/)?.blocks ?? [])}</div>
      <h3>Durations</h3><div class="grid" style="--min:200px">${durTiles}</div>
      <h3>Easing</h3><div class="grid" style="--min:200px">${easeTiles}</div>
      <h3>Springs</h3>${tableOrWarn(d.section(/^Easing tokens$/)?.table("Name", "Config"), f, "Motion")}
      <h3>Named animations</h3><p class="prose small">Each demo reads its duration and easing tokens live, so changing them in <code>09-tokens.md</code> changes the demo.</p><div class="grid" style="--min:250px">${namedTiles}</div>
      <h3>Signature moment: "Verified"</h3><div class="prose">${sig ? render(sig.blocks.filter((b) => b.type === "p").slice(0, 2)) : ""}</div><div class="grid" style="--min:220px">${sigDemo}</div>
      <template id="tpl-verified">${badge(verified).replace("<span class=\"badge", "<span class=\"badge sig-badge")}</template><template id="tpl-pending">${badge(pending)}</template>
      <h3>Reduced motion</h3><div class="prose">${render(d.section(/^Reduced motion$/)?.blocks ?? [])}</div>`,
      `<p>${inline(d.paragraphs()[0] ?? "")}</p>`
    );
  }

  // ---------- 08 Accessibility ----------
  function accessibility(auditHtml) {
    const f = "08-accessibility.md";
    const d = docs[f];
    const reqs = (d.section(/^Requirements for everything built$/)?.subsections(3) ?? [])
      .map(({ title, doc }) => `<div class="card"><h4>${esc(title)}</h4><ul style="padding-left:1.25rem;margin:0">${doc.lists().flatMap((l) => l.items).map((i) => `<li class="small">${inline(i)}</li>`).join("")}</ul></div>`)
      .join("");
    return section(
      "accessibility", "08 · Accessibility", "WCAG 2.2 AA, everywhere", f,
      `<h3>How this system already helps</h3>${tableOrWarn(d.section(/^How this system already helps$/)?.tables()[0], f, "Accessibility")}
      ${auditHtml}
      <h3>Requirements for everything built</h3><div class="grid" style="--min:280px">${reqs}</div>
      <h3>Brand-specific risks</h3>${tableOrWarn(d.section(/^Brand-specific risks$/)?.tables()[0], f, "Accessibility")}
      <h3>Testing</h3>${tableOrWarn(d.section(/^Testing$/)?.tables()[0], f, "Accessibility")}`,
      `<p>${inline(d.paragraphs()[0] ?? "")}</p>`
    );
  }

  // ---------- 09 Tokens ----------
  function tokens() {
    const f = "09-tokens.md";
    const d = docs[f];
    const sw = d.section(/^How brand switching works$/);
    const names = tokenCtx("fip", false).names().filter((n) => !/^--(stone|cacao|loam|milkweed|forest|seafoam|monarch|dark-matter|almond|dragonfruit|cornflower|romanesco|success|warning|danger|info)-\d+$/.test(n) && n !== "--birch" && n !== "--frost");
    const live = `<div class="table-wrap"><table><thead><tr><th scope="col">Token</th><th scope="col">Current value</th></tr></thead><tbody>${names
      .map((n) => `<tr><td><code>${esc(n)}</code></td><td><span class="tok" data-live-token="${esc(n)}"><i style="background:var(${esc(n)})"></i><span></span></span></td></tr>`)
      .join("")}</tbody></table></div>`;
    return section(
      "tokens", "09 · Tokens", "The source the code reads", f,
      `${sw ? render(sw.blocks) : ""}
      <p class="row"><a class="btn btn--secondary" href="styles/tokens.css" download>${icon("action.download")}Download tokens.css</a><span class="small muted">Plain CSS, generated from 09-tokens.md. Works with or without Tailwind.</span></p>
      <h3>Semantic tokens in the current brand and mode</h3><p class="small muted">Values are read live from the page, so they change with the brand and dark mode switches.</p>${live}
      <h3>Tailwind CSS v4 wiring</h3>${render(d.section(/^Tailwind CSS v4 wiring$/)?.blocks ?? [])}
      <h3>Naming rules</h3>${render(d.section(/^Token naming rules$/)?.blocks ?? [])}`
    );
  }

  // ---------- Brand profiles ----------
  function brands() {
    const out = Object.entries(docs)
      .filter(([k]) => k.startsWith("brands/"))
      .map(([file, d]) => {
        const ctxAttr = d.field("Brand context") ?? "";
        const b = ctxAttr.match(/data-brand="(\w+)"/)?.[1];
        if (!b) {
          check("error", "Brands", `No **Brand context:** line with data-brand="..."`, file);
          return "";
        }
        const roles = rowsOf(d.section(/^Color roles$/)?.table("Role", "Color", "Hex"));
        roles.forEach((r) => {
          const name = labelToName[plain(r.color).toLowerCase()];
          const hex = plain(r.hex).toUpperCase();
          if (name && ctx.official[name] && ctx.official[name] !== hex) check("error", "Brands", `${plain(r.color)} is ${hex} here but ${ctx.official[name]} in palette.config.json`, file);
        });
        const ratioLine = d.section(/^Color roles$/)?.paragraphs().find((p) => /^\*\*Ratio:\*\*/.test(p));
        const roleSw = roles
          .map((r) => {
            const hex = plain(r.hex).toUpperCase();
            return `<button class="swatch" type="button" data-copy="${hex}" aria-label="Copy ${esc(plain(r.color))} ${hex}"><div class="swatch__chip" style="background:${hex};color:${readable(hex)}">${hex}</div><div class="swatch__body"><strong>${esc(plain(r.color))}</strong><span class="small">${inline(r.role)}</span><span class="small muted">${inline(r.token)}</span></div></button>`;
          })
          .join("");
        const text = (re) => d.section(re)?.paragraphs().map((p) => `<p>${inline(p)}</p>`).join("") ?? "";
        const list = (re) => d.section(re)?.lists()[0];
        const doL = list(/^Do$/), dontL = list(/^Don't$/);
        const brandAssets = assets.filter((a) => a.brand === b && a.exists && a.listed).slice(0, 4);
        const quote = d.blocks.find((x) => x.type === "quote");
        return `<article class="ds-section ctx" data-brand="${b}" id="brand-${b}" aria-labelledby="brand-${b}-h">
          <div class="hero">
            <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:flex-start">
              <div><p class="eyebrow">${esc(b === "fip" ? "Parent" : "Program")} · data-brand="${b}"</p><h2 id="brand-${b}-h" class="t-h1" style="margin:0">${esc(d.title)}</h2></div>
              <div class="logo-plate">${logoImg(b, { height: 48 })}</div>
            </div>
            <hr class="signature-rule">
            <p class="prose t-body-lg" style="margin:0 0 1.25rem">${inline(d.field("Role") ?? "")}</p>
            <div class="row"><button class="btn btn--default btn--lg" type="button">${esc({ fip: "Read the annual report", nongmo: "Find verified products", nonupf: "Apply for verification", collective: "Join us" }[b] ?? "Get started")}</button><span class="small">Voice: ${inline(d.field("Voice") ?? "")}</span></div>
          </div>
          ${source(file)}
          ${quote ? `<blockquote>${inline(quote.text)}</blockquote>` : ""}
          <div class="split">
            <div><h3 style="margin-top:0">Who it speaks to</h3>${text(/^Who it speaks to$/)}<h3>Personality</h3>${text(/^Personality$/)}</div>
            <div class="panel-support"><p class="eyebrow" style="color:inherit">In use</p><h3 style="margin-top:0">Sample card</h3><p>Text on the supporting color, with the status badge and program chip that appear in this context.</p>${badge(cert("verified"))} <span class="chip">${esc(d.title)}</span><p style="margin:1rem 0 0"><a href="#brand-${b}" style="color:inherit">A link in this context</a></p></div>
          </div>
          <h3>Color roles</h3><div class="grid" style="--min:170px">${roleSw}</div>
          ${ratioLine ? `<p class="small" style="margin-top:1rem">${inline(ratioLine)}</p>` : ""}
          ${text(/^Color roles$/).replace(/<p><strong>Ratio:[\s\S]*?<\/p>/, "")}
          <h3>Logos</h3>${text(/^Logos/)}${brandAssets.length ? `<div class="grid" style="--min:180px">${brandAssets.map((a) => `<div class="asset__art${/mono-light|reversed/.test(a.file) ? " on-dark" : ""}" style="border:1px solid var(--border);border-radius:var(--radius-md);min-height:150px"><img src="${esc(a.path)}" alt="${esc(brandName(b))} ${esc(a.kind)}" loading="lazy"></div>`).join("")}</div>` : ""}
          <div class="split"><div><h3>Imagery</h3>${text(/^Imagery$/)}</div><div><h3>Voice</h3>${text(/^Voice$/)}</div></div>
          <div class="split"><div><h3>Typography</h3>${text(/^Typography$/)}</div><div><h3>Motion</h3>${text(/^Motion$/)}</div></div>
          <h3>Typical surfaces</h3>${text(/^Typical surfaces$/)}
          <div class="do-dont">${doL ? `<div class="do"><h5>${icon("status.success")}Do</h5>${render([doL])}</div>` : ""}${dontL ? `<div class="dont"><h5>${icon("status.lapsed")}Don't</h5>${render([dontL])}</div>` : ""}</div>
        </article>`;
      });
    return `<section id="brands" aria-labelledby="brands-h"><div class="ds-section" style="border:0;padding-bottom:0"><p class="eyebrow">Brand profiles</p><h2 id="brands-h">The four brands</h2><p class="prose">Each profile renders inside its own <code>data-brand</code> context, whatever the brand switch says.</p></div>${out.join("")}</section>`;
  }

  // ---------- 10 Writing ----------
  function writing() {
    const f = "10-writing.md";
    const d = docs[f];
    if (!d) { check("error", "Writing", "10-writing.md not found", f); return ""; }
    const byName = Object.fromEntries(Object.entries(brandNames).map(([k, v]) => [v.toLowerCase(), k]));
    const voices = rowsOf(d.section(/^Voice by brand$/)?.table("Brand", "Voice"))
      .map((r) => {
        const b = byName[plain(r.brand).toLowerCase()];
        if (!b) check("warn", "Writing", `Voice table brand "${plain(r.brand)}" does not match a brand in 01-brand-architecture.md`, f);
        return `<article class="card ctx" ${b ? `data-brand="${b}"` : ""} style="display:grid;gap:0.5rem;align-content:start"><p class="eyebrow" style="margin:0">${esc(plain(r.brand))}</p><p class="t-h3" style="margin:0">${inline(r.voice)}</p><hr class="signature-rule" style="margin:0.25rem 0"><p class="small" style="margin:0"><strong>Sounds like:</strong> ${inline(r["sounds like"])}</p><p class="small muted" style="margin:0"><strong>Avoid:</strong> ${inline(r.avoid)}</p></article>`;
      })
      .join("");
    const toneKind = (s) => (/error/i.test(s) ? "danger" : /lapsed|expir/i.test(s) ? "warning" : /waiting/i.test(s) ? "info" : /granted|success/i.test(s) ? "success" : null);
    const tones = rowsOf(d.section(/^Tone by situation$/)?.table("Situation", "Tone", "Example"))
      .map((r) => {
        const kind = toneKind(plain(r.situation));
        const ex = plain(r.example).replace(/^"|"$/g, "");
        const sample = kind
          ? `<div class="alert alert--${kind}">${icon(kind === "danger" ? "status.error" : kind === "success" ? "status.verified" : `status.${kind === "warning" ? "expiring" : "info"}`)}<p style="grid-column:2">${esc(ex)}</p></div>`
          : `<blockquote style="margin:0">${esc(ex)}</blockquote>`;
        return `<div class="card" style="display:grid;gap:0.75rem;align-content:start"><div><strong>${esc(plain(r.situation))}</strong><br><span class="small muted">${inline(r.tone)}</span></div>${sample}</div>`;
      })
      .join("");
    const sample = (pattern, text) => {
      const p = pattern.toLowerCase();
      const s = esc(plain(text));
      if (/destructive/.test(p)) return `<button class="btn btn--destructive btn--sm" type="button">${s}</button>`;
      if (/button|cancel/.test(p)) return `<button class="btn ${/cancel/.test(p) ? "btn--outline" : "btn--default"} btn--sm" type="button">${s}</button>`;
      if (/toast/.test(p)) return `<span class="toast" style="animation:none;min-width:0;box-shadow:none">${icon("status.success")}<span class="small">${s}</span></span>`;
      if (/field error/.test(p)) return `<p class="error" style="animation:none">${icon("status.error")}${s}</p>`;
      if (/link/.test(p)) return `<a href="#writing">${s}</a>`;
      if (/status/.test(p)) return `<span class="badge badge--warning">${icon("status.expiring")}${s}</span>`;
      if (/page title/.test(p)) return `<span class="t-h4" style="font-family:var(--font-serif);font-weight:500">${s}</span>`;
      return `<span class="small">${s}</span>`;
    };
    const patterns = rowsOf(d.section(/^UI copy patterns$/)?.table("Pattern", "Do", "Don't"))
      .map((r) => `<div class="card" style="display:grid;gap:0.75rem;align-content:start"><strong>${esc(plain(r.pattern))}</strong>
        <div class="copy-pair"><span class="verdict verdict--pass">${icon("status.success")}Do</span><div>${sample(plain(r.pattern), r.do)}</div></div>
        <div class="copy-pair"><span class="verdict verdict--fail">${icon("status.error")}Don't</span><div class="small" style="text-decoration:line-through;text-decoration-color:var(--status-danger-icon)">${inline(r["don't"])}</div></div>
        ${r.why ? `<p class="small muted" style="margin:0">${inline(r.why)}</p>` : ""}</div>`)
      .join("");
    const block = (re) => { const s = d.section(re); return s ? render(s.blocks) : ""; };
    return section(
      "writing", "10 · Writing and copy", "How we sound", f,
      `<h3>Principles</h3><div class="prose">${block(/^Principles$/)}</div>
      <h3>Voice by brand</h3><p class="prose small">Each card renders in its own brand context.</p><div class="grid" style="--min:240px">${voices}</div>
      <h3>Tone by situation</h3><div class="grid" style="--min:300px">${tones}</div>
      <h3>UI copy patterns</h3><div class="grid" style="--min:280px">${patterns}</div>
      <h3>Word list</h3>${tableOrWarn(d.section(/^Word list$/)?.tables()[0], f, "Writing")}
      <h3>Names and claims</h3><div class="prose">${block(/^Names and claims$/)}</div>
      <h3>Grammar and mechanics</h3>${tableOrWarn(d.section(/^Grammar and mechanics$/)?.tables()[0], f, "Writing")}
      <div class="split"><div><h3>Inclusive language</h3>${block(/^Inclusive language$/)}</div><div><h3>Accessible copy</h3>${block(/^Accessible copy$/)}</div></div>`,
      `<p>${inline(d.paragraphs()[0] ?? "")}</p>`
    );
  }

  // ---------- 11 UX ----------
  function ux() {
    const f = "11-ux.md";
    const d = docs[f];
    if (!d) { check("error", "UX", "11-ux.md not found", f); return ""; }
    const principles = (d.section(/^UX principles$/)?.lists()[0]?.items ?? [])
      .map((it, i) => {
        const m = it.match(/^\*\*(.+?)\*\*\s*(.*)$/);
        return `<article class="card"><p class="eyebrow">Principle ${i + 1}</p><h4 style="margin:0 0 0.5rem;font-family:var(--font-serif);font-weight:500">${inline(m ? m[1] : it)}</h4><p class="small" style="margin:0">${inline(m ? m[2] : "")}</p></article>`;
      })
      .join("");
    const flows = (d.section(/^Core flows$/)?.subsections(3) ?? [])
      .map(({ title, doc }) => {
        const steps = doc.lists().find((l) => l.ordered)?.items ?? [];
        if (!steps.length) check("warn", "UX", `Flow "${title}" has no numbered steps`, f);
        const rules = doc.paragraphs().find((p) => /^Rules:/.test(p));
        return `<article class="card"><h4 style="margin-top:0">${esc(title)}</h4><ol class="flow">${steps.map((s) => `<li><span>${inline(s)}</span></li>`).join("")}</ol>${rules ? `<p class="small muted" style="margin:0.75rem 0 0">${inline(rules)}</p>` : ""}</article>`;
      })
      .join("");
    const dod = d.section(/^UX definition of done$/)?.lists()[0]?.items ?? [];
    const checklist = `<fieldset class="card"><legend class="sr-only">UX definition of done</legend>${dod.map((it, i) => `<label class="check" style="align-items:flex-start;padding:0.25rem 0"><input type="checkbox" data-dod="${i}" style="margin-top:4px"> <span>${inline(it)}</span></label>`).join("")}<p class="small muted" style="margin:0.75rem 0 0" aria-live="polite" data-dod-count>0 of ${dod.length} done</p></fieldset>`;
    const block = (re) => { const s = d.section(re); return s ? render(s.blocks) : ""; };
    return section(
      "ux", "11 · UX", "How it should work", f,
      `<h3>Principles</h3><div class="grid" style="--min:260px">${principles}</div>
      <h3>Who we design for</h3>${tableOrWarn(d.section(/^Who we design for$/)?.tables()[0], f, "UX")}
      <h3>Information architecture</h3><div class="prose">${block(/^Information architecture$/)}</div>
      <h3>Core flows</h3><div class="grid" style="--min:320px">${flows}</div>
      <h3>Speed and feedback</h3>${block(/^Speed and feedback$/)}
      <div class="split"><div><h3>Trust and verification</h3>${block(/^Trust and verification$/)}</div><div><h3>Mobile and in-store</h3>${block(/^Mobile and in-store$/)}</div></div>
      <h3>Notifications and email</h3>${block(/^Notifications and email$/)}
      <h3>Research and measurement</h3>${block(/^Research and measurement$/)}
      <h3>UX definition of done</h3><p class="prose small">Use it as a checklist for a flow. Checks are not saved.</p>${checklist}`,
      `<p>${inline(d.paragraphs()[0] ?? "")}</p>`
    );
  }

  // ---------- 12 Responsive ----------
  function responsive() {
    const f = "12-responsive.md";
    const d = docs[f];
    if (!d) { check("error", "Responsive", "12-responsive.md not found", f); return ""; }
    const bps = rowsOf(d.section(/^Breakpoints$/)?.table("Name", "Min width")).map((r) => ({ name: plain(r.name), min: parseInt(plain(r["min width"]), 10) || 0, devices: plain(r["typical devices"]), layout: plain(r.layout) }));
    if (!bps.length) check("error", "Responsive", "Breakpoints table not found", f);
    const max = 1600;
    const ruler = `<div class="bp-ruler" aria-hidden="true">${bps.map((b) => `<span class="bp-mark${b.min / max > 0.6 ? " bp-mark--end" : ""}" data-bp="${esc(b.name)}" style="left:${(b.min / max) * 100}%"><b>${esc(b.name)}</b>${b.min}px</span>`).join("")}<span class="bp-now" data-bp-indicator></span></div>`;
    const bpCards = bps.map((b) => `<div class="card bp-card" data-bp-card="${esc(b.name)}"><p class="eyebrow" style="margin:0">${esc(b.name)} · ${b.min}px and up</p><p class="small" style="margin:0.25rem 0"><strong>${esc(b.devices)}</strong></p><p class="small muted" style="margin:0">${esc(b.layout)}</p></div>`).join("");
    const testWidths = rowsOf(d.section(/^Testing$/)?.table("Width", "Represents")).map((r) => parseInt(plain(r.width), 10)).filter(Boolean);
    const previewWidths = [...new Set([320, ...testWidths.filter((w) => w > 320 && w <= 1024).map((w) => (w === 375 ? 393 : w))])].slice(0, 4);
    const products = [["Heritage Rolled Oats", "nongmo", "verified"], ["Stone-Ground Corn Tortillas", "nonupf", "pending"], ["Sprouted Lentil Pasta", "nongmo", "expiring"]];
    const cqTable = `<div class="table-wrap cq"><table class="stack-table data-table"><thead><tr><th scope="col">Product</th><th scope="col">Program</th><th scope="col">Status</th><th scope="col" class="num">Units</th></tr></thead><tbody>${products
      .map(([n, p, s], i) => `<tr><td data-label="Product"><strong>${esc(n)}</strong></td><td data-label="Program"><span class="chip" data-brand="${p}">${esc(brandName(p))}</span></td><td data-label="Status">${badge(cert(s))}</td><td class="num" data-label="Units">${(1200 + i * 317).toLocaleString("en-US")}</td></tr>`)
      .join("")}</tbody></table></div>`;
    const cqCards = `<div class="cq"><div class="cq-cards">${products.map(([n, p, s]) => `<article class="card cq-card"><div class="cq-card__img" aria-hidden="true">${icon("domain.product", "icon")}</div><div><h4 style="margin:0 0 0.25rem">${esc(n)}</h4><span class="chip" data-brand="${p}">${esc(brandName(p))}</span> ${badge(cert(s))}</div></article>`).join("")}</div></div>`;
    const block = (re) => { const s = d.section(re); return s ? render(s.blocks) : ""; };
    return `<section class="ds-section" id="responsive" aria-labelledby="responsive-h" data-bps='${esc(JSON.stringify(bps))}'>
      <p class="eyebrow">12 · Responsive</p><h2 id="responsive-h">From 320px to wide screens</h2>${source(f)}
      <div class="prose"><p>${inline(d.paragraphs()[0] ?? "")}</p></div>
      <p class="bp-readout" aria-live="polite" data-bp-readout></p>
      <h3>Principles</h3><div class="prose">${block(/^Principles$/)}</div>
      <h3>Breakpoints</h3>${ruler}<div class="grid" style="--min:200px;margin-top:1rem">${bpCards}</div>
      <h3>Container queries in action</h3>
      <p class="prose">The same table and cards, given less room. Drag the slider (or the corner of the frame): the table becomes stacked cards below 560px and the card grid drops columns, without any viewport breakpoint.</p>
      <div class="field" style="max-width:none"><label class="label" for="cq-range">Container width: <output data-cq-out for="cq-range">100%</output></label><input id="cq-range" type="range" min="280" max="1100" value="1100" step="10" data-cq-range></div>
      <div class="cq-frame" data-cq-frame><div class="stack">${cqTable}${cqCards}</div></div>
      ${block(/^Container queries$/)}
      <h3>Layout behavior by screen size</h3>${block(/^Layout behavior$/)}
      <h3>Touch and input</h3>
      <div class="row tt-demo"><div><button type="button" class="btn btn--outline tt tt--24" aria-label="24 pixel target">${icon("action.edit", "icon icon--sm")}</button><p class="small muted">24px: the absolute floor</p></div><div><button type="button" class="btn btn--outline tt tt--44" aria-label="44 pixel target">${icon("action.edit", "icon icon--sm")}</button><p class="small muted">44px: the touch minimum</p></div></div>
      ${block(/^Touch and input$/)}
      <div class="split"><div><h3>Type and images</h3>${block(/^Type and images$/)}</div><div><h3>Viewport and safe areas</h3>${block(/^Viewport and safe areas$/)}</div></div>
      <h3>Performance budgets</h3>${block(/^Performance budgets$/)}
      <h3>Testing</h3>${block(/^Testing$/)}
      <h4>Preview this showcase at device widths</h4>
      <div class="row">${previewWidths.map((w) => `<button type="button" class="btn btn--outline btn--sm" data-preview="${w}">${w}px</button>`).join("")}</div>
      <div class="previews" data-previews></div>
    </section>`;
  }

  // ---------- TODOs and source ----------
  function todos() {
    const items = [];
    for (const [file, d] of Object.entries(docs)) {
      for (const m of d.raw.matchAll(/`?TODO\((\w+)\):\s*([^`\n]+)`?/g)) items.push({ file, kind: m[1], text: m[2].trim() });
    }
    const kinds = [...new Set(items.map((i) => i.kind))].sort();
    const body = kinds
      .map((k) => `<h3>${esc(k)} <span class="muted small">${items.filter((i) => i.kind === k).length}</span></h3><ul class="todo-list">${items.filter((i) => i.kind === k).map((i) => `<li>${inline(i.text)} <a class="small" href="#doc-${slug(i.file)}">${esc(i.file)}</a></li>`).join("")}</ul>`)
      .join("");
    return { html: `<section class="ds-section" id="todos" aria-labelledby="todos-h"><p class="eyebrow">Open decisions</p><h2 id="todos-h">Open TODOs</h2><p class="prose">${items.length} markers across the docs. Run <code>npm run todos</code> for file and line numbers.</p>${body}</section>`, count: items.length };
  }

  function sources() {
    const files = Object.entries(docs)
      .map(([file, d]) => `<details class="source-doc" id="doc-${slug(file)}"><summary><span>${esc(d.title)}</span><code>${esc(file)}</code></summary><div>${render(d.blocks, { idPrefix: `doc-${slug(file)}-` })}</div></details>`)
      .join("");
    return `<section class="ds-section" id="source" aria-labelledby="source-h"><p class="eyebrow">Reference</p><h2 id="source-h">Source documents</h2><p class="prose">The full text of every file the showcase was built from.</p>${files}</section>`;
  }

  return { responsive, writing, ux, overview, architecture, logos, color, audit, typography, typeCss, icons, components, motion, accessibility, tokens, brands, todos, sources, icon, brandName };
}
