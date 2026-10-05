#!/usr/bin/env node
// Claude Code PostToolUse hook (see .claude/settings.json).
// After Claude edits a design-system doc, the palette config or the showcase
// scripts, rebuild index.html. If the build reports errors, exit 2 so Claude
// sees them and fixes the doc in the same turn.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let input = "";
for await (const chunk of process.stdin) input += chunk;

let file = "";
try {
  const data = JSON.parse(input);
  file = data.tool_input?.file_path ?? data.tool_input?.notebook_path ?? "";
} catch {
  process.exit(0);
}
const rel = relative(root, file);
const watched = /^(docs\/design-system\/|scripts\/(palette\.config\.json|showcase\/|lib\/|build-showcase\.mjs|generate-color-scales\.mjs)|public\/brand\/)/;
if (!file || rel.startsWith("..") || !watched.test(rel)) process.exit(0);

const run = (script) => spawnSync(process.execPath, [join(root, "scripts", script)], { cwd: root, encoding: "utf8" });

if (rel === "scripts/palette.config.json") {
  const colors = run("generate-color-scales.mjs");
  if (colors.status !== 0) {
    process.stderr.write(`Color scale generation failed after editing ${rel}:\n${colors.stderr || colors.stdout}`);
    process.exit(2);
  }
}

const build = run("build-showcase.mjs");
const out = (build.stdout || "") + (build.stderr || "");
if (build.status !== 0) {
  process.stderr.write(`Showcase build crashed after editing ${rel}:\n${out}`);
  process.exit(2);
}
const errors = out.split("\n").filter((l) => l.trim().startsWith("✗"));
if (errors.length) {
  process.stderr.write(`index.html was rebuilt after editing ${rel}, but the build checks found ${errors.length} error(s). Fix them in the docs:\n${errors.join("\n")}\n`);
  process.exit(2);
}
process.stdout.write(out.split("\n")[0] + "\n");
