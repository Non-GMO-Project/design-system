// Derived logo files: the Birch one-color versions for dark grounds and transparent PNGs,
// made from the official one-color vector sources listed in 04-logos-and-marks.md, "Derived files".
// Recoloring swaps the single source color for Birch and changes nothing else; a source with more
// than one color is refused, so artwork is never redrawn or approximated.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { plain, rowsOf } from "./markdown.mjs";

const COLOR = /((?:fill|stroke|stop-color)\s*(?:=\s*["']|:\s*))(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/g;
const IGNORE = new Set(["none", "currentcolor", "transparent", "inherit"]);

// colors: official palette colors by lowercase name or label, for example { birch: "#FFFDEB", forest: "#053220" }.
export function derivedLogos(doc04, root, colors, checks) {
  const rows = rowsOf(doc04?.section(/^Derived files$/)?.table("File", "Source", "Color"));
  if (!rows.length) {
    checks.push({ level: "error", area: "Logos", message: "Derived files table not found", file: "04-logos-and-marks.md" });
    return [];
  }
  const out = [];
  for (const r of rows) {
    const file = plain(r.file);
    const src = plain(r.source);
    const color = plain(r.color).toLowerCase();
    const width = parseInt(plain(r.width ?? ""), 10);
    const srcAbs = join(root, "public/brand", src);
    const fail = (message) => checks.push({ level: "error", area: "Logos", message, file: "04-logos-and-marks.md" });
    if (!existsSync(srcAbs) || !src.endsWith(".svg")) { fail(`Derived file \`${file}\` needs an SVG source; \`${src}\` is missing or not SVG`); continue; }
    let svg = readFileSync(srcAbs, "utf8");
    if (color !== "as drawn") {
      const hex = colors[color];
      if (!hex) { fail(`Derived file \`${file}\`: \`${r.color}\` is not a named palette color`); continue; }
      const used = new Set([...svg.matchAll(COLOR)].map((m) => m[2].toLowerCase()).filter((c) => !IGNORE.has(c)));
      if (used.size !== 1) { fail(`Derived file \`${file}\`: source \`${src}\` uses ${used.size} colors (${[...used].join(", ")}); only one-color sources can be recolored`); continue; }
      svg = svg.replace(COLOR, (m, pre, c) => (IGNORE.has(c.toLowerCase()) ? m : pre + hex));
    }
    if (file.endsWith(".svg")) out.push([`public/brand/${file}`, svg]);
    else if (file.endsWith(".png")) {
      if (!width) { fail(`Derived PNG \`${file}\` needs a width`); continue; }
      const png = new Resvg(svg, { fitTo: { mode: "width", value: width }, background: "rgba(0,0,0,0)" }).render().asPng();
      out.push([`public/brand/${file}`, Buffer.from(png)]);
    } else fail(`Derived file \`${file}\` must be .svg or .png`);
  }
  return out;
}

// Icons and share images: an official file (recolored only when its source is one color) placed on a
// transparent or Birch canvas, from 04-logos-and-marks.md, "Icons and share images". Placing artwork on a
// background is layout, not redrawing. Sources may be files on disk or derived files from this build.
export function composedIcons(doc04, root, colors, checks, derived = new Map()) {
  const rows = rowsOf(doc04?.section(/^Icons and share images$/)?.table("File", "Source", "Color", "Size"));
  if (!rows.length) {
    checks.push({ level: "error", area: "Logos", message: "Icons and share images table not found", file: "04-logos-and-marks.md" });
    return [];
  }
  const out = [];
  for (const r of rows) {
    const file = plain(r.file);
    const src = plain(r.source);
    const color = plain(r.color).toLowerCase();
    const fail = (message) => checks.push({ level: "error", area: "Logos", message, file: "04-logos-and-marks.md" });
    const [w, h] = plain(r.size).split(/\s*[x×]\s*/).map((n) => parseInt(n, 10));
    const W = w, H = h || w;
    const ground = plain(r.ground ?? "None").toLowerCase();
    const share = parseInt(plain(r.artwork ?? "100"), 10) / 100;
    let svg = derived.has(src) ? String(derived.get(src)) : existsSync(join(root, "public/brand", src)) ? readFileSync(join(root, "public/brand", src), "utf8") : null;
    if (!svg || !src.endsWith(".svg")) { fail(`Icon \`${file}\` needs an SVG source; \`${src}\` is missing or not SVG`); continue; }
    if (!W || !share) { fail(`Icon \`${file}\` needs a size and an artwork share`); continue; }
    if (color !== "as drawn") {
      const hex = colors[color];
      if (!hex) { fail(`Icon \`${file}\`: \`${r.color}\` is not a named palette color`); continue; }
      const used = new Set([...svg.matchAll(COLOR)].map((m) => m[2].toLowerCase()).filter((c) => !IGNORE.has(c)));
      if (used.size !== 1) { fail(`Icon \`${file}\`: source \`${src}\` uses ${used.size} colors; only one-color sources can be recolored`); continue; }
      svg = svg.replace(COLOR, (m, pre, c) => (IGNORE.has(c.toLowerCase()) ? m : pre + hex));
    }
    let bg = "";
    if (ground !== "none") {
      const hex = colors[ground];
      if (!hex) { fail(`Icon \`${file}\`: ground \`${r.ground}\` is not a named palette color`); continue; }
      bg = `<rect width="${W}" height="${H}" fill="${hex}"/>`;
    }
    const bw = W * share, bh = H * share;
    const art = `<image href="data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}" x="${((W - bw) / 2).toFixed(2)}" y="${((H - bh) / 2).toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}" preserveAspectRatio="xMidYMid meet"/>`;
    const page = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${bg}${art}</svg>`;
    if (file.endsWith(".svg")) out.push([`public/brand/${file}`, page]);
    else if (file.endsWith(".png")) out.push([`public/brand/${file}`, Buffer.from(new Resvg(page, { fitTo: { mode: "width", value: W }, background: "rgba(0,0,0,0)" }).render().asPng())]);
    else fail(`Icon \`${file}\` must be .svg or .png`);
  }
  return out;
}
