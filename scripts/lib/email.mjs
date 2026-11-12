// Builds styles/email.css: the semantic tokens resolved to hex, one class per brand, for
// email templates (email clients don't support CSS variables). Also checks that the
// "Color in email" table in 13-email.md quotes the same hex values.

import { BRANDS } from "./tokens.mjs";
import { plain, rowsOf } from "./markdown.mjs";

const STATUSES = ["success", "warning", "danger", "info", "neutral"];
// The email body ground (13-email.md, "White, not Birch, in email"): the palette's White.
const EMAIL_GROUND = "#FFFFFF";

export function emailCss(tokenCtx, brandName, d13, check) {
  const out = [
    "/* Generated from docs/design-system/09-tokens.md by scripts/build-showcase.mjs. Do not edit. */",
    "/* Email colors, light mode, as hex values (see docs/design-system/13-email.md, \"Color in email\").",
    "   Put .email-<brand> on the outermost wrapper and the role classes inside it, then run the",
    "   template through the email tool's CSS inliner so every value ends up in a style attribute. */",
  ];
  const quoted = {};
  for (const b of BRANDS) {
    const c = tokenCtx(b, false);
    const hex = (name) => {
      const v = c.hex(name);
      if (!v) check("error", "Email", `\`${name}\` has no hex value for \`${b}\`, so styles/email.css can't use it`, "09-tokens.md");
      return v ?? "#000000";
    };
    // Email sits on White, not Birch (13-email.md, principle 2); bands and button labels keep their own colors.
    const ground = EMAIL_GROUND, birch = hex("--background"), text = hex("--foreground"), dark = hex("--brand-dark");
    const support = hex("--brand-support"), supportText = hex("--brand-support-foreground");
    const button = hex("--primary"), buttonText = hex("--primary-foreground");
    quoted[b] = new Set([ground, birch, text, dark, support, supportText, button, buttonText]);
    const k = `.email-${b}`;
    out.push(
      "",
      `/* ${brandName(b)} */`,
      `${k} { background-color: ${ground}; color: ${text}; }`,
      `${k} a { color: ${text}; text-decoration: underline; }`,
      `/* Header and dark bands: only with a reversed logo (13-email.md). */`,
      `${k} .email-band { background-color: ${dark}; color: ${birch}; }`,
      `${k} .email-band a { color: ${birch}; }`,
      `${k} .email-support { background-color: ${support}; color: ${supportText}; }`,
      `${k} .email-button { background-color: ${button}; color: ${buttonText}; }`,
      `${k} a.email-button { color: ${buttonText}; text-decoration: none; }`,
    );
  }
  // Status colors are shared by every brand. Always pair them with an icon and a text label.
  const s = tokenCtx("fip", false);
  out.push("", "/* Status, the same in every brand. Always with an icon and a text label. */");
  for (const st of STATUSES) {
    const v = (part) => s.hex(`--status-${st}-${part}`) ?? "#000000";
    out.push(`.email-status-${st} { background-color: ${v("bg")}; color: ${v("fg")}; border-color: ${v("border")}; }`);
  }

  // Every hex in a brand's row of the doc table must be one of that brand's email values.
  const rows = rowsOf(d13?.section(/^Color in email$/)?.table("Brand", "Primary button"));
  if (!rows.length) check("error", "Email", 'No "Color in email" table with Brand and Primary button columns', "13-email.md");
  for (const r of rows) {
    const b = BRANDS.find((x) => brandName(x) === plain(r.brand));
    if (!b) { check("error", "Email", `"Color in email" names an unknown brand: ${plain(r.brand)}`, "13-email.md"); continue; }
    for (const [col, cell] of Object.entries(r)) for (const m of String(cell).matchAll(/#[0-9A-Fa-f]{6}\b/g))
      if (!quoted[b].has(m[0].toUpperCase())) check("error", "Email", `"Color in email", ${plain(r.brand)}, ${col}: \`${m[0]}\` doesn't match the tokens`, "13-email.md");
  }
  return out.join("\n") + "\n";
}
