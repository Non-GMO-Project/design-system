#!/usr/bin/env node
// Regenerates every tonal scale from scripts/palette.config.json using the
// method in docs/design-system/02-color.md ("How the scales were built"), then
// writes the results into the two places that need them:
//   - 02-color.md, between <!-- scales:start --> and <!-- scales:end -->
//   - 09-tokens.md, between /* palette:start */ and /* palette:end */
// Usage: node scripts/generate-color-scales.mjs [--check]
//   --check  exit 1 if the docs are out of date instead of writing them.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { hexToOklch, oklchToHex, ratio } from "./lib/color.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs/design-system");
const config = JSON.parse(readFileSync(join(root, "scripts/palette.config.json"), "utf8"));
const { steps, targets } = config;
const BIRCH = config.singles.find((s) => s.name === "birch").hex;

const closestStep = (L) => targets.reduce((best, t, i) => (Math.abs(t - L) < Math.abs(targets[best] - L) ? i : best), 0);

export function buildScale({ hex, pins = [] }) {
  const base = hexToOklch(hex);
  const bi = closestStep(base.L);
  const bt = targets[bi];
  const out = targets.map((t, i) => {
    // Spread lightness so the base lands exactly and the ends stay fixed.
    const w = i < bi ? (t - targets[0]) / (bt - targets[0]) : i > bi ? (t - targets.at(-1)) / (bt - targets.at(-1)) : 1;
    const L = t + (base.L - bt) * w;
    // Less chroma toward the light end, slightly less toward the dark end.
    const f = i < bi ? 0.14 + 0.86 * ((1 - t) / (1 - base.L)) ** 1.1 : i > bi ? 1 - 0.3 * ((base.L - L) / Math.max(0.01, base.L - 0.2)) : 1;
    // Very dark bases have tiny chroma; give lighter steps enough to read as the hue.
    const C = Math.max(base.C, i < bi ? Math.min(0.06, base.C * 3) : base.C) * Math.max(0.12, f);
    return oklchToHex({ L, C: i === bi ? base.C : Math.min(C, 0.37), H: base.H });
  });
  out[bi] = hex.toUpperCase();
  for (const p of pins) out[closestStep(hexToOklch(p).L)] = p.toUpperCase();
  return { values: out, baseIndex: bi, pinIndexes: pins.map((p) => closestStep(hexToOklch(p).L)) };
}

const results = config.scales.map((s) => ({ ...s, ...buildScale(s) }));

// ---------- 02-color.md tables ----------
let md = "";
for (const s of results) {
  md += `\n### ${s.label}\n\n`;
  md += `| ${steps.join(" | ")} |\n|${steps.map(() => "---").join("|")}|\n`;
  md += `| ${s.values.map((v, i) => (i === s.baseIndex ? `**\`${v}\`**` : s.pinIndexes.includes(i) ? `*\`${v}\`*` : `\`${v}\``)).join(" | ")} |\n`;
  md += `| ${s.values.map((v) => ratio(v, BIRCH).toFixed(1)).join(" | ")} |\n`;
}

// ---------- 02-color.md approved pairings ----------
const all = Object.fromEntries([
  ...config.singles.map((s) => [s.name, s.hex.toUpperCase()]),
  ...results.flatMap((s) => s.values.map((v, i) => [`${s.name}-${steps[i]}`, v])),
]);
const use = (r) => (r >= 4.5 ? "All text" : r >= 3 ? "Large text (24px, or 19px bold) and UI shapes only" : "Fills and decoration only, never text");
let pairs = "| Text | On | Ratio | OK for |\n|---|---|---|---|\n";
for (const [fg, bg] of config.pairings) {
  if (!all[fg] || !all[bg]) throw new Error(`pairing ${fg} on ${bg}: unknown palette step`);
  const r = ratio(all[fg], all[bg]);
  pairs += `| \`${fg}\` | \`${bg}\` | ${r.toFixed(1)}:1 | ${use(r)} |\n`;
}

// ---------- 09-tokens.md palette CSS ----------
let css = ":root {\n";
for (const s of config.singles) css += `  --${s.name}: ${s.hex.toUpperCase()};\n`;
for (const s of results) {
  css += `  /* ${s.label.toLowerCase()} */\n`;
  s.values.forEach((v, i) => (css += `  --${s.name}-${steps[i]}: ${v};\n`));
}
css += "}";

// Apply every marker replacement for a file in sequence, so several edits to one file compose.
function replaceBetween(text, file, start, end, body) {
  const a = text.indexOf(start), b = text.indexOf(end);
  if (a < 0 || b < 0) throw new Error(`${file}: markers ${start} / ${end} not found`);
  return text.slice(0, a + start.length) + body + text.slice(b);
}

const plan = {
  "02-color.md": [
    ["<!-- scales:start -->", "<!-- scales:end -->", md + "\n"],
    ["<!-- pairings:start -->", "<!-- pairings:end -->", "\n" + pairs],
  ],
  "09-tokens.md": [["/* palette:start */\n", "\n/* palette:end */", css]],
};
const edits = Object.entries(plan).map(([file, steps]) => {
  const path = join(docs, file);
  const text = readFileSync(path, "utf8");
  const next = steps.reduce((t, [s, e, body]) => replaceBetween(t, file, s, e, body), text);
  return { path, text, next };
});

const stale = edits.filter((e) => e.text !== e.next);
if (process.argv.includes("--check")) {
  if (stale.length) {
    console.error("Color scales are out of date in: " + stale.map((e) => e.path).join(", ") + "\nRun: npm run colors");
    process.exit(1);
  }
  console.log("Color scales are up to date.");
} else {
  for (const e of stale) writeFileSync(e.path, e.next);
  console.log(stale.length ? `Updated ${stale.length} file(s).` : "Color scales already up to date.");
}
