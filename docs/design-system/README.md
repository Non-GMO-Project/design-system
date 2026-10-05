# Food Integrity Project Design System

**Version:** 0.3 (draft for review)
**Owner:** Food Integrity Project design team. `TODO(design): name an owner and a reviewer.`
**Applies to:** every interface built for the Food Integrity Project and its programs: Non-GMO Project, Non-UPF Verified and Food Integrity Collective.
**Brand source:** *Food Integrity Project Style Guide* (draft for review). Where this system and the older per-program guides disagree, the Food Integrity Project Style Guide wins, and accessibility wins over both.

This folder is the design framework that people and Claude Code both follow. It defines how things look, move and behave so that a page built this week and a tool built next year feel like they came from the same family.

Values marked `TODO(...)` still need a decision. Everything else is a working default.

## How the folder is organized

| File | What it covers | Read it when |
|---|---|---|
| `README.md` | This file. Rules that apply everywhere, file map, how Claude Code should use the system | Always, first |
| `01-brand-architecture.md` | The canopy and its three programs, which name leads, written reference, endorsement, multi-program views | Any page that names a program, any multi-program view |
| `02-color.md` | Birch, the one dark, the signature, usage ratios, tonal scales, semantic tokens, status, pairings, charts | Any styling work |
| `03-typography.md` | Lora, Avenir (Nunito Sans on web), Quicksand; context pairings; type scale | Any text-heavy layout, any new page |
| `04-logos-and-marks.md` | Marks, asset inventory, endorsement lockups, clear space, minimum sizes | Headers, footers, anything showing a logo or seal |
| `05-iconography.md` | Icon library, named icon registry, sizes, usage rules | Any icon |
| `06-ui-framework.md` | Tech stack, interaction types to components, component rules, layout, patterns, UI writing | Building any UI |
| `07-motion.md` | Durations, easing, named animations, signature moment, reduced motion | Anything that animates or transitions |
| `08-accessibility.md` | WCAG 2.2 AA requirements and how this system meets them | Always. This file wins every conflict |
| `09-tokens.md` | The CSS variables and Tailwind wiring that implement all of the above | Setting up a project, adding a token |
| `10-writing.md` | Voice by brand, tone by situation, UI copy patterns, word list, claims, grammar and mechanics | Writing any interface text, page, email or campaign |
| `11-ux.md` | UX principles, audiences and jobs, information architecture, core flows, feedback timing, UX definition of done | Designing or building any flow or screen |
| `brands/*.md` | One profile per brand: role, color roles, ratio, logos, imagery, voice, do and don't | Work scoped to one brand |

## The model in one paragraph

There is one shared system (Birch ground, type, spacing, components, icons, motion, accessibility) and four brand contexts layered on top (Food Integrity Project, Non-GMO Project, Non-UPF Verified, Food Integrity Collective). Each brand is one dark for type, one supporting tint and one signature color on a Birch ground. Brands change color, logo, imagery and tone of voice. They do not change how a button works, how a form validates or how a dialog opens. In code, a brand context is a `data-brand` attribute on a wrapper; components read semantic tokens and adapt automatically.

## Rules that apply everywhere

1. **Accessibility wins.** If a visual rule anywhere conflicts with `08-accessibility.md`, accessibility wins.
2. **Start on Birch.** Every brand's background is Birch `#FFFDEB`. Never substitute pure white.
3. **Semantic tokens only.** Components never contain hex values, raw palette variables or arbitrary Tailwind colors.
4. **One brand context per surface.** A page or region speaks for one brand. One program, one accent: Monarch and Dragon Fruit never appear in the same layout.
5. **Status is shared and never color alone.** Verified, lapsed and pending look the same in every brand and always pair color, icon and label.
6. **Logos and seals are assets, never drawings.** Always use the official files. Never recreate a logo or certification seal in SVG, CSS, canvas or text.
7. **Use the component library before building.** Check `06-ui-framework.md` for the component that fits the interaction type. Build custom only when nothing fits, and build on the same primitives.
8. **Motion explains change.** Animate to show what happened after someone acts. Do not decorate.
9. **Plain words.** Sentence case, verbs on buttons, the same word for the same action through a whole flow. Never abbreviate the parent to "FIP" in external copy. See `10-writing.md`.
10. **Every state, no dead ends.** Every screen has loading, empty, error and success states and always offers a next step. See `11-ux.md`.

## The showcase

`index.html` at the repository root is a visual reference of the whole system: logos and seals, color and contrast, type, icons, components, motion, accessibility, writing, UX and each brand profile, with switches for brand and dark mode.

It is **generated from these Markdown files** by `scripts/build-showcase.mjs`. Do not edit `index.html` by hand. The build reads the tables and CSS blocks on these pages, so changing a value here changes the showcase. It also checks the docs as it goes: contrast ratios, asset files, icon names, token references. Problems show in a "Build checks" panel at the top of the page.

| Command | What it does |
|---|---|
| `npm run build` | Rebuild `index.html` and `styles/tokens.css` once |
| `npm run dev` | Rebuild on every change to `docs/`, `public/brand/` or the scripts, and serve at http://localhost:4321 with live reload |
| `npm run watch` | Rebuild on every change, without the server |
| `npm run colors` | Regenerate color scales and pairings from `scripts/palette.config.json` |
| `npm run check` | Fail if anything generated is out of date or a check fails (for CI) |
| `npm run todos` | List every open `TODO(...)` |

**How it stays current automatically:**

1. **While you work:** `npm run dev` watches the docs and rebuilds within a moment of saving. The open page reloads itself.
2. **When Claude Code edits a doc:** a `PostToolUse` hook in `.claude/settings.json` rebuilds after every edit to a file in `docs/design-system/`.
3. **On commit:** the pre-commit hook in `.githooks/` rebuilds and stages `index.html` and `styles/tokens.css` whenever a doc is part of the commit. `npm install` turns the hook on.
4. **In CI:** `npm run check` fails the build if someone committed docs without rebuilding.

## Placeholder convention

| Marker | Meaning |
|---|---|
| `TODO(design): ...` | A design decision or official value is needed |
| `TODO(dev): ...` | An implementation step is needed |
| `TODO(brand): ...` | Needs sign-off from brand or communications leadership |

Run `npm run todos` to see what is still open. The showcase lists them too.

## Using this with Claude Code

Place this folder at `docs/design-system/` in each repository (or in a shared package that repositories pull in). Then add the block below to the repository's `CLAUDE.md`.

The block imports only this README with `@`, so it loads every session. The other files are listed as paths, not imports, so Claude Code reads them when the task needs them instead of loading all of them into every conversation.

```markdown
## Design system

All UI work follows the Food Integrity Project design system.

@docs/design-system/README.md

Before writing or changing UI:
- Identify the brand context for the work (see docs/design-system/01-brand-architecture.md).
- Read the topic files the task touches: 02-color, 03-typography, 04-logos-and-marks,
  05-iconography, 06-ui-framework, 07-motion, 08-accessibility, 09-tokens,
  10-writing (any copy), 11-ux (any flow or screen).
- For work scoped to one program, also read docs/design-system/brands/<brand>.md.

Hard rules:
- Start on Birch, never pure white. Use semantic tokens and existing components.
  No hex values or one-off colors in components.
- Never draw or approximate a logo or certification seal. Use <BrandLogo /> and official assets.
- Monarch and Dragon Fruit never share a layout.
- Every status shows color + icon + text label.
- Respect prefers-reduced-motion.
- If the design system has no answer, say so, choose the closest existing pattern,
  and leave a TODO(design) comment rather than inventing a new style silently.
```

### What Claude Code should do when the system is silent

1. Use the closest existing token, component or pattern.
2. Leave a `TODO(design):` comment at that spot explaining the gap.
3. Mention the gap in its summary of the work so a person can decide.

It should not invent new colors, fonts, icon styles or animation curves.

## Changing the system

- Change colors in `scripts/palette.config.json` and run `npm run colors`; change semantic mappings in `09-tokens.md`. Regenerate scales rather than editing single steps.
- The showcase rebuilds itself (see above). Check the "Build checks" panel after any change.
- Record the change below with the date and reason.
- Bump the version. Breaking changes (a token renamed or removed) bump the first number.

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.3 | 2026-10-05 | Added `10-writing.md` (voice, tone, UI copy, word list, claims, mechanics) and `11-ux.md` (principles, audiences, core flows, feedback timing, definition of done). Interface-writing rules in `06` now point to `10` |
| 0.2 | 2026-10-05 | Adopted the Food Integrity Project Style Guide: Birch ground, one dark per brand, official palettes (Cacao, Loam, Milkweed Leaf; Forest, Seafoam, Monarch; Dark Matter, Almond, Dragon Fruit; Corn Flower, Romanesco), Lora + Avenir/Nunito Sans + Quicksand, endorsement lockups. Removed template colors (Furrow, Grain, Leaf, Beet, Radish, Borage, Heirloom). Renamed `--brand-secondary` to `--brand-signature`; added `--brand-dark`, `--brand-support`, `--field`; removed `--house-accent`. Added generated showcase and color scripts |
| 0.1 | 2026-10-05 | Example template created for design team review |
