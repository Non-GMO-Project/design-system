// Reads the CSS blocks in 09-tokens.md and resolves semantic tokens to hex
// values for any brand and mode, by replaying the cascade the browser would apply.

export const BRANDS = ["fip", "nongmo", "nonupf", "collective"];

export function extractCss(doc09) {
  const blocks = doc09.code("css").map((b) => b.text);
  const palette = blocks.find((t) => t.includes("palette:start")) ?? "";
  const semantic = blocks.find((t) => t.includes("Shared, light")) ?? "";
  const tailwind = blocks.find((t) => t.includes("@theme inline")) ?? "";
  // Static @theme values (radius, fonts, easing) become plain :root variables
  // so the tokens file works without Tailwind too.
  const statics = [...tailwind.matchAll(/@theme\s*\{([\s\S]*?)\n\}/g)].map((m) => m[1]).join("\n");
  const themeRoot = statics ? `:root {${statics}\n}` : "";
  return { palette, semantic, tailwind, themeRoot };
}

// Parse "selector { --a: b; }" rules (no nesting needed except @media, which is skipped).
export function parseRules(css) {
  const rules = [];
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
  for (const m of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = m[1].split(",").map((s) => s.trim()).filter(Boolean);
    const decls = {};
    for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) decls[d[1]] = d[2].trim();
    rules.push({ selectors, decls });
  }
  return rules;
}

// Does any selector in the rule apply to the root element of a context?
function matches(selectors, { brand, dark }) {
  return selectors.some((s) => {
    if (s === ":root") return true;
    if (s === ".dark") return dark;
    let m;
    if ((m = s.match(/^\[data-brand="(\w+)"\]$/))) return m[1] === brand;
    if ((m = s.match(/^\[data-brand="(\w+)"\]\.dark$/))) return dark && m[1] === brand;
    if ((m = s.match(/^\.dark \[data-brand="(\w+)"\]$/))) return dark && m[1] === brand;
    return false;
  });
}

const specificity = (sel) => (sel.match(/\.|\[|:root/g) || []).length;

export function resolver(paletteCss, semanticCss) {
  const rules = [...parseRules(paletteCss), ...parseRules(semanticCss)];
  return function context(brand, dark) {
    const ctx = { brand, dark };
    const vars = {};
    const weight = {};
    rules.forEach((r, order) => {
      const hit = r.selectors.filter((s) => matches([s], ctx));
      if (!hit.length) return;
      const spec = Math.max(...hit.map(specificity));
      for (const [k, v] of Object.entries(r.decls)) {
        const w = spec * 10000 + order;
        if (weight[k] === undefined || w >= weight[k]) { vars[k] = v; weight[k] = w; }
      }
    });
    const resolve = (value, depth = 0) => {
      if (depth > 20 || value == null) return null;
      return value.replace(/var\((--[\w-]+)\)/g, (_, name) => resolve(vars[name], depth + 1) ?? "MISSING");
    };
    return {
      raw: (name) => vars[name] ?? null,
      get: (name) => (vars[name] == null ? null : resolve(vars[name])),
      hex: (name) => {
        const v = vars[name] == null ? null : resolve(vars[name]);
        return v && /^#[0-9a-f]{6}$/i.test(v) ? v.toUpperCase() : null;
      },
      names: () => Object.keys(vars),
    };
  };
}

// Hex stops of a linear-gradient value.
export const gradientStops = (value) => (value ? [...value.matchAll(/#[0-9A-Fa-f]{6}/g)].map((m) => m[0].toUpperCase()) : []);
