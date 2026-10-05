// A small Markdown reader for the design-system docs. It understands the subset
// the docs use (headings, tables, fenced code, lists, blockquotes, paragraphs)
// and keeps them as data so the showcase can render tables as live examples.

export const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const slug = (s) =>
  String(s).toLowerCase().replace(/<[^>]+>/g, "").replace(/[`*_]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Strip inline Markdown to plain text.
export const plain = (s) =>
  String(s ?? "").replace(/`([^`]*)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();

// Inline Markdown to HTML. TODO(...) markers get a highlight so they stand out in the showcase.
export function inline(s) {
  const codes = [];
  let out = esc(s).replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  out = out
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*([^*\s][^*]*)\*(?!\w)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => {
    const c = codes[i];
    return /^TODO\(/.test(c) ? `<code class="todo">${c}</code>` : `<code>${c}</code>`;
  });
}

const splitRow = (line) =>
  line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));

export function parse(text, file = "") {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) { i++; continue; }
    let m;
    if ((m = line.match(/^```(\w*)/))) {
      const body = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++]);
      i++;
      blocks.push({ type: "code", lang: m[1], text: body.join("\n") });
    } else if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      blocks.push({ type: "heading", level: m[1].length, text: m[2].trim() });
      i++;
    } else if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
      const headers = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(splitRow(lines[i++]));
      blocks.push({ type: "table", headers, rows });
    } else if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        let item = lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "");
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i])) item += " " + lines[i++].trim();
        items.push(item);
      }
      blocks.push({ type: "list", ordered, items });
    } else if (/^>\s?/.test(line)) {
      const body = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) body.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: body.join(" ").trim() });
    } else if (/^---+\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
    } else if (/^<!--/.test(line)) {
      while (i < lines.length && !/-->/.test(lines[i])) i++;
      i++;
    } else {
      const body = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6}\s|```|\s*\||>|\s*([-*]|\d+\.)\s)/.test(lines[i]) && !/^<!--/.test(lines[i])) body.push(lines[i++]);
      blocks.push({ type: "p", text: body.join(" ") });
    }
  }
  return new Doc(file, blocks, text);
}

export class Doc {
  constructor(file, blocks, raw) {
    this.file = file;
    this.blocks = blocks;
    this.raw = raw;
    this.title = plain(blocks.find((b) => b.type === "heading" && b.level === 1)?.text ?? file);
  }

  // Blocks under the first heading matching `re`, up to the next heading of the same or higher level.
  section(re) {
    const start = this.blocks.findIndex((b) => b.type === "heading" && re.test(plain(b.text)));
    if (start < 0) return null;
    const level = this.blocks[start].level;
    let end = this.blocks.findIndex((b, j) => j > start && b.type === "heading" && b.level <= level);
    if (end < 0) end = this.blocks.length;
    return new Doc(this.file, this.blocks.slice(start + 1, end), "");
  }

  // Sub-sections at the next heading level, as [{title, doc}].
  subsections(level) {
    const out = [];
    this.blocks.forEach((b, j) => {
      if (b.type !== "heading" || b.level !== level) return;
      let end = this.blocks.findIndex((x, k) => k > j && x.type === "heading" && x.level <= level);
      if (end < 0) end = this.blocks.length;
      out.push({ title: plain(b.text), doc: new Doc(this.file, this.blocks.slice(j + 1, end), "") });
    });
    return out;
  }

  tables() { return this.blocks.filter((b) => b.type === "table"); }

  // First table whose headers include every name in `cols` (case-insensitive).
  table(...cols) {
    return this.tables().find((t) => cols.every((c) => t.headers.some((h) => plain(h).toLowerCase() === c.toLowerCase()))) ?? null;
  }

  lists() { return this.blocks.filter((b) => b.type === "list"); }
  paragraphs() { return this.blocks.filter((b) => b.type === "p").map((b) => b.text); }
  code(lang) { return this.blocks.filter((b) => b.type === "code" && (!lang || b.lang === lang)); }

  // Value of a "**Label:** value" line near the top of a file.
  field(label) {
    const re = new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.*)$`, "im");
    return this.raw.match(re)?.[1]?.trim() ?? null;
  }
}

// Table rows as objects keyed by lower-cased plain header text.
export const rowsOf = (table) =>
  table ? table.rows.map((r) => Object.fromEntries(table.headers.map((h, i) => [plain(h).toLowerCase(), r[i] ?? ""]))) : [];

// Render blocks to HTML (used for the source-doc view and for prose).
export function render(blocks, { headingOffset = 0, idPrefix = "" } = {}) {
  let html = "";
  for (const b of blocks) {
    if (b.type === "heading") {
      const lvl = Math.min(6, b.level + headingOffset);
      html += `<h${lvl} id="${idPrefix}${slug(b.text)}">${inline(b.text)}</h${lvl}>`;
    } else if (b.type === "p") html += `<p>${inline(b.text)}</p>`;
    else if (b.type === "quote") html += `<blockquote>${inline(b.text)}</blockquote>`;
    else if (b.type === "hr") html += "<hr>";
    else if (b.type === "code") html += `<pre class="code" data-lang="${esc(b.lang)}"><code>${esc(b.text)}</code></pre>`;
    else if (b.type === "list") {
      const tag = b.ordered ? "ol" : "ul";
      html += `<${tag}>${b.items.map((it) => `<li>${inline(it)}</li>`).join("")}</${tag}>`;
    } else if (b.type === "table") html += renderTable(b);
  }
  return html;
}

// Tables carry data-label on each cell so they can stack into cards in narrow containers (12-responsive.md).
export const renderTable = (t, cls = "stack-table") =>
  `<div class="table-wrap cq"><table class="${cls}"><thead><tr>${t.headers.map((h) => `<th scope="col">${inline(h)}</th>`).join("")}</tr></thead><tbody>${t.rows
    .map((r) => `<tr>${t.headers.map((h, i) => `<td data-label="${esc(plain(h))}">${inline(r[i] ?? "")}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
