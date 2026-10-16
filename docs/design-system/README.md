# Food Integrity Project Digital Design System

**Version:** 0.30 (draft for review)
**Owner:** Food Integrity Project design team. `TODO(design): name an owner and a reviewer.`
**Applies to:** every interface built for the Food Integrity Project and its programs: Non-GMO Project, Non-UPF Verified and Food Integrity Collective.
**Brand source:** *Food Integrity Project Style Guide* (draft for review). Where this system and the older per-program guides disagree, the Food Integrity Project Style Guide wins, and accessibility wins over both.

This folder is the design framework that people and Claude Code both follow. It defines how things look, move and behave so that a page built this week and a tool built next year feel like they came from the same family.

Values marked `TODO(...)` still need a decision. Everything else is a working default.

## How the folder is organized

| File | What it covers | Read it when |
|---|---|---|
| `README.md` | This file. Rules that apply everywhere, file map, how to use the system with Claude and other AI assistants | Always, first |
| `01-brand-architecture.md` | The canopy and its three programs, which name leads, written reference, endorsement, multi-program views | Any page that names a program, any multi-program view |
| `02-color.md` | Birch, the one dark, the signature, usage ratios, tonal scales, semantic tokens, status, pairings, charts | Any styling work |
| `03-typography.md` | Lora, Avenir (Nunito Sans on web), Quicksand; context pairings; type scale | Any text-heavy layout, any new page |
| `04-logos-and-marks.md` | Marks, asset inventory, endorsement lockups, clear space, minimum sizes | Headers, footers, anything showing a logo or seal |
| `05-iconography.md` | Icon library, named icon registry, sizes, usage rules | Any icon |
| `06-ui-framework.md` | Tech stack, interaction types to components, component rules, layout, patterns, UI writing | Building any UI |
| `07-motion.md` | Durations, easing, named animations, signature moment, reduced motion | Anything that animates or transitions |
| `08-accessibility.md` | WCAG 2.2 AA requirements and how this system meets them | Always. This file wins every conflict |
| `09-tokens.md` | The CSS variables and Tailwind wiring that implement all of the above | Setting up a project, adding a token |
| `10-writing.md` | Audiences, voice by brand, tone by situation, UI copy patterns, word list, claims and citations, grammar and mechanics (from the Writer's Guide) | Writing any interface text, page, email or campaign |
| `11-ux.md` | UX principles, audiences and jobs, information architecture, core flows, feedback timing, UX definition of done | Designing or building any flow or screen |
| `12-responsive.md` | Breakpoints, layout behavior per screen size, container queries, touch and input, safe areas, performance budgets, device testing | Any layout, any component that changes with screen size |
| `13-email.md` | Email types, anatomy, color and type that survive email clients, logos and seals, buttons, footer content, send checklist | Any email template, newsletter or campaign |
| `trademark/*.md` | One trademark usage guide per verification program (Non-GMO Project Verified, Non-UPF Verified), written for participants. Each is also published as a standalone page in `trademark/` | Anything showing a certification seal, any material for licensees |
| `brands/*.md` | One profile per brand: role, color roles, ratio, logos, imagery, voice, do and don't | Work scoped to one brand |

## The model in one paragraph

There is one shared system (Birch ground, type, spacing, components, icons, motion, accessibility) and four brand contexts layered on top (Food Integrity Project, Non-GMO Project, Non-UPF Verified, Food Integrity Collective). Each brand is one dark for type, one supporting tint and one signature color on a Birch ground. Brands change color, logo, imagery and tone of voice. They do not change how a button works, how a form validates or how a dialog opens. In code, a brand context is a `data-brand` attribute on a wrapper; components read semantic tokens and adapt automatically.

## Rules that apply everywhere

1. **Accessibility wins.** If a visual rule anywhere conflicts with `08-accessibility.md`, accessibility wins.
2. **Start on Birch.** Every brand's background is Birch `#FFFDEB`. Never substitute pure white.
3. **Semantic tokens only.** Components never contain hex values, raw palette variables or arbitrary Tailwind colors.
4. **One brand context per surface.** A page or region speaks for one brand. One program, one accent: Monarch and Dragon Fruit never appear in the same layout. The one exception is program chips in multi-program views (see `01-brand-architecture.md`).
5. **Status is shared and never color alone.** Verified, on hold and terminated look the same in every brand and always pair color, icon and label.
6. **Logos and seals are assets, never drawings.** Always use the official files. Never recreate a logo or certification seal in SVG, CSS, canvas or text.
7. **Use the component library before building.** Check `06-ui-framework.md` for the component that fits the interaction type. Build custom only when nothing fits, and build on the same primitives.
8. **Motion explains change.** Animate to show what happened after someone acts. Do not decorate.
9. **Plain words.** Sentence case, verbs on buttons, the same word for the same action through a whole flow. Never abbreviate the parent to "FIP", or the programs to "NGP" or "FIC", in external copy. See `10-writing.md`.
10. **Every state, no dead ends.** Every screen has loading, empty, error and success states and always offers a next step. See `11-ux.md`.

## The showcase

`index.html` at the repository root is a visual reference of the whole system: logos and seals, color and contrast, type, icons, components, motion, accessibility, writing, UX, responsive behavior, email, trademark usage and each brand profile, with switches for brand and dark mode. A floating **Feedback** button in the bottom corner opens a new issue on the repository's GitHub issues page, so anyone viewing the guide can report a problem or suggest a change.

The build also writes one standalone page per program trademark doc, `trademark/non-gmo-project.html` and `trademark/non-upf-verified.html`. Each is a single file with its fonts, styles and mark images inlined and internal TODOs left out, so it can be sent to participants on its own.

The build also writes `styles/tokens.css`, `styles/tailwind.css` and `styles/fonts.css`, which apps import instead of copying CSS out of the docs (see `09-tokens.md`).

It is **generated from these Markdown files** by `scripts/build-showcase.mjs`. Do not edit `index.html` by hand. The build reads the tables and CSS blocks on these pages, so changing a value here changes the showcase. It also checks the docs as it goes: contrast ratios, asset files, icon names, token references. Problems show in a "Build checks" panel at the top of the page.

| Command | What it does |
|---|---|
| `npm run build` | Rebuild `index.html`, the `styles/` files and the trademark pages once |
| `npm run dev` | Rebuild on every change to `docs/`, `public/brand/` or the scripts, and serve at http://localhost:4321 with live reload |
| `npm run watch` | Rebuild on every change, without the server |
| `npm run colors` | Regenerate color scales and pairings from `scripts/palette.config.json` |
| `npm run check` | Fail if anything generated is out of date or a check fails (for CI) |
| `npm run todos` | List every open `TODO(...)` |

**How it stays current automatically:**

1. **While you work:** `npm run dev` watches the docs and rebuilds within a moment of saving. The open page reloads itself.
2. **When Claude Code edits a doc:** a `PostToolUse` hook in `.claude/settings.json` rebuilds after every edit to a file in `docs/design-system/`.
3. **On commit:** the pre-commit hook in `.githooks/` rebuilds and stages `index.html`, `styles/` and the trademark pages whenever a doc is part of the commit. `npm install` turns the hook on.
4. **In CI:** `npm run check` fails the build if someone committed docs without rebuilding.

## Placeholder convention

| Marker | Meaning |
|---|---|
| `TODO(design): ...` | A design decision or official value is needed |
| `TODO(dev): ...` | An implementation step is needed |
| `TODO(brand): ...` | Needs sign-off from brand or communications leadership |

Run `npm run todos` to see what is still open. The showcase lists them too.

## Use it with AI

Claude and other AI assistants can follow this system if they read it before they work. The whole system is public on GitHub: [github.com/Non-GMO-Project/design-system](https://github.com/Non-GMO-Project/design-system).

1. **Claude Code, or any assistant working in a code repository:** copy `docs/design-system/` into the project and add the block from [Using this with Claude Code](https://github.com/Non-GMO-Project/design-system/blob/main/docs/design-system/README.md#using-this-with-claude-code) to its `CLAUDE.md` (or the tool's own instructions file, such as `AGENTS.md` or `.github/copilot-instructions.md`). The assistant then reads the system before any UI work.
2. **Chat assistants (Claude, ChatGPT, Gemini and others):** give the assistant the GitHub link, or attach `README.md` and the topic files your task touches. Name the brand context.
3. **Check what comes back** against the rules above and the showcase. When the system has no answer, the assistant should say so and leave a `TODO(design)` rather than invent a style.
4. **Report gaps as issues.** When the assistant finds something this system should cover, or a rule that is wrong, unclear or contradicts another, it opens a [new issue on the repository](https://github.com/Non-GMO-Project/design-system/issues/new) (Claude Code and other coding assistants can use the `gh` CLI), or drafts one for the person to file if it can't. One issue per gap: what the task needed, which file and section it checked, what it used instead and where it left the `TODO(design)`. The repository is public, so the issue describes only the design-system gap: no client or partner names, internal links, personal details or unreleased information.

Sample prompt:

```text
Follow the Food Integrity Project Digital Design System:
https://github.com/Non-GMO-Project/design-system

Read docs/design-system/README.md first, then the topic files this task touches
(for example 02-color, 06-ui-framework, 10-writing).

Brand context: Non-GMO Project.
Task: design a page that lists a company's Verified products.

Use Birch as the background, semantic tokens only, the official logo and seal
files, and color + icon + label for every status. If the system has no answer,
say so and leave a TODO(design) note instead of inventing a style, then open
an issue at https://github.com/Non-GMO-Project/design-system/issues/new
(or draft one for me) that describes the gap.
```

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
  10-writing (any copy), 11-ux (any flow or screen), 12-responsive (any layout),
  13-email (any email template or campaign), trademark/<program> (anything showing a
  certification seal).
- For work scoped to one program, also read docs/design-system/brands/<brand>.md.

Hard rules:
- Start on Birch, never pure white. Use semantic tokens and existing components.
  No hex values or one-off colors in components.
- Never draw or approximate a logo or certification seal. Use <BrandLogo /> and official assets.
- Monarch and Dragon Fruit never share a layout, except in program chips.
- Every status shows color + icon + text label.
- Respect prefers-reduced-motion.
- If the design system has no answer, say so, choose the closest existing pattern,
  and leave a TODO(design) comment rather than inventing a new style silently.
  Then open an issue at github.com/Non-GMO-Project/design-system describing the gap
  (with `gh issue create`, or draft one for a person to file). The repository is
  public: describe only the gap, never client names, internal links or unreleased work.
```

### What Claude Code should do when the system is silent

1. Use the closest existing token, component or pattern.
2. Leave a `TODO(design):` comment at that spot explaining the gap.
3. Open an issue on [the design system repository](https://github.com/Non-GMO-Project/design-system/issues/new) with `gh issue create`, or draft one for a person to file if it has no GitHub access. Say what the task needed, what it used instead and where the `TODO(design)` is. Leave out anything private to the project: the repository is public.
4. Mention the gap and the issue in its summary of the work so a person can decide.

It should not invent new colors, fonts, icon styles or animation curves.

## Changing the system

- Change colors in `scripts/palette.config.json` and run `npm run colors`; change semantic mappings in `09-tokens.md`. Regenerate scales rather than editing single steps.
- The showcase rebuilds itself (see above). Check the "Build checks" panel after any change.
- Record the change below with the date and reason.
- Bump the version. Breaking changes (a token renamed or removed) bump the first number.

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.30 | 2026-10-16 | The signature moment is no longer tied to verification (#54). It marks any milestone a person has worked toward, such as a product turning Verified, a member joining, a registration or a completed donation; routine saves and small confirmations still use `status-change` or a toast. Same sequence, timing and brand glow. `07` has a table of example events, and the Food Integrity Project, Collective and Non-UPF Verified profiles match. The showcase demo now has all four brands, each with its own example event |
| 0.29 | 2026-10-16 | Removed "Research and measurement" from `11-ux.md` and the showcase UX section (#55), with its TODO about analytics tooling and success metrics |
| 0.28 | 2026-10-16 | White `#FFFFFF` and Black `#000000` added to the named palette (#49), as the colors of the white (reversed) and one-color black logo and seal files. They are not backgrounds, type or UI colors: Birch stays the ground and each brand's dark sets type. `palette.config.json`, `02` and the generated palette block in `09` (`--white`, `--black`) updated. The showcase palette cards no longer leave a gap above the color on shorter cards; the color now always sits at the top |
| 0.27 | 2026-10-16 | Showcase fix (#50): the empty-state example's button icon was drawn at the 48px empty-state size in the muted color, because the empty-state icon style also matched icons inside the button. It now applies only to the empty state's own icon, so the button icon is the standard 20px in the button's text color |
| 0.26 | 2026-10-16 | The showcase's endorsement line examples now show the Non-UPF Verified logo (#48). A program with no reversed logo, currently Non-UPF Verified, gets its example on Birch with its color logo and the parent logo, and a note says why, as the email samples already do. Dark footers stay where a reversed logo exists. The reversed Non-UPF Verified logo and the Birch parent mark are still open in `04` |
| 0.25 | 2026-10-16 | Verification statuses confirmed (#41): a verification is Verified, On hold (warning, `CirclePause`), Withdrawn (neutral) or Terminated (danger, `CircleX`). Lapsed is gone; it was a reporting detail, not a status. Expiry is not a status either: a Verified product shows "Verified, expires December 1, 2026" in the warning set from 90 days before expiry, and `StatusBadge` takes an `expires` prop for it. Renewal leaves the product Verified while the renewal application is "In review", which replaces "Renewal in review" in `11`. A new "Other statuses" table in `02` keeps In progress, In review, Complete and Not eligible for applications, agreements and other processes. Icon registry, rule 5, `06`, `10`, `11`, `13` and the showcase updated to match; the lifecycle TODO in `02` is closed |
| 0.24 | 2026-10-16 | AI assistants now report gaps as GitHub issues (#45). "Use it with AI" has a fourth step: when the system has no answer, or a rule is wrong or unclear, the assistant leaves a `TODO(design)` and opens an issue on the repository (or drafts one for a person to file), describing only the gap since the repository is public. The sample prompt, the Claude Code block and "What Claude Code should do when the system is silent" say the same |
| 0.23 | 2026-10-16 | Icon spec gaps (#43): stroke width is 2 at 14px (`icon-xs`) as well as 16px, so small icons in badges and chips don't thin out. The icon-to-label gap is 4px (`gap-1`) with `icon-sm` and `icon-xs`, replacing 6px, which wasn't on the spacing scale; 8px (`gap-2`) stays for `icon-md` and larger. The showcase badges and chips use the 4px gap, and its empty-state icons use the 1.75 stroke the spec sets for 20px and above |
| 0.22 | 2026-10-17 | Showcase and tooling pass. The showcase favicon is now the Food Integrity Project mark (it was the Non-UPF Verified icon, behind a media query browsers no longer match). The interim parent logo no longer uses a multiply blend and sits on a Birch plate in dark mode. The logo demo reads its minimum sizes from `04`. The showcase keeps working when browser storage is blocked, only confirms a copy that succeeded, and its Undo toasts stay 10 seconds and pause on hover and focus. Accessibility fixes in the generated markup: meaningful alt text for asset images and the top-bar logo, no skipped heading levels, no `aria-selected` on table rows, no focusable non-interactive card. The build now warns about any file in `public/brand/` that no doc mentions; the butterfly-wing photo is documented in `04` with a TODO for its source and rights. `04` lists which files are still raster only and notes that marks may leave out the lockup. The Non-UPF Verified participant page lists the vector color seal. Participant pages drop bare TODOs too and hide an empty contact line. Removed the October 2026 live-site audit (`docs/audits/`), which described the sites against v0.4 |
| 0.21 | 2026-10-17 | Accessibility, motion and component consistency pass. Touch targets: `08` now says 44 x 44px minimum on touch and public pages (24px floor for dense desktop tools), matching `11` and `12`, and `06` button sizes point to it. Toasts with an action pause on hover and focus and stay at least 10 seconds; Undo is reachable elsewhere too. HoverCard is supplementary only. Collapsed sidebars open as a `Sheet` on touch instead of relying on tooltips. Button loading uses `aria-disabled` and `aria-busy` so focus stays. New success-state pattern in `06`; `StatusBadge` gains `program` and `date`. Reduced motion: `07` and `09` now agree; `animate-pulse` stops and `animate-spin` slows in `tokens.css`, and tw-animate classes need `motion-reduce:animate-none`. `07` pulse and spin timings match Tailwind, exits use the next shorter token, the 400ms limit covers transitions only and `status-change` uses standard easing. `12` layout columns follow the `md` breakpoint and h1 no longer claims to scale. Email: contrast rule matches `06` for light button fills, support band wording fixed, PNG logo TODO added. Seal minimums in `12` and `13` point to `04` instead of repeating numbers |
| 0.20 | 2026-10-17 | Color and token consistency pass. Charts: the 3:1 rule is now against the surface a chart sits on, and the three categorical colors that fall short on Birch (orange, sky blue, reddish purple) need an outline or pattern plus direct labels. Dark mode: `--brand-dark` and `--gradient-hero` step up to the card shade so inverted panels no longer vanish into the page. The Collective's `--primary-hover` now goes one step lighter (Romanesco 100), as `02` says. `02` no longer allows two program signatures side by side on house-level pages (matching `01` and rule 4), describes the Food Integrity Project's Loam-based neutrals and Forest's dark-mode input step, and notes the neutral status exception. Non-UPF Verified profile: 80px seal minimum, matching `04`. Font stacks in `03` match `09`. Smaller wording fixes in `01`, `03`, the brand profiles and the palette config |
| 0.19 | 2026-10-17 | Writing consistency pass against `10-writing.md`: sample copy in the showcase and docs now spells out months, writes Verified as a capitalized adjective, says "mark" and "the Butterfly" rather than "seal" in copy, "the Standard", "participants", "not eligible" (not "declined"), 12-hour times and numerals in UI. Renamed "Certification status" to "Verification status" in `02` (and the showcase heading). The abbreviation rule now covers "NGP" and "FIC" too (README rule 9, `01`). `08`'s reading level matches `10` (8th to 10th grade). Serial commas removed from doc prose. The root README and `CLAUDE.md` use the system's full name |
| 0.18 | 2026-10-16 | Program chips now use each program's signature color (#6): a Milkweed Leaf, Monarch, Dragon Fruit or Romanesco fill with Birch or Forest text and dot (4.6:1 to 9.3:1), so programs are easy to tell apart in multi-program tables and filters. They are the one exception to "Monarch and Dragon Fruit never appear in the same layout", noted in rule 4, the Claude Code block, `01`, `02`, `06` and both program profiles. Generic filter chips keep the subtle tint |
| 0.17 | 2026-10-16 | Updated `10-writing.md` to the *Writer's Guide* (Sixth Edition, September 2025) (#29): new Audiences section (general, business, technical) with AP Style for public material and Chicago for technical; 8th to 10th grade reading level; a second reader before anything public is published; the word list now carries the guide's terms (GMO vs GM, "the Project", "the Standard", Verified vs verified, the Butterfly, participant, Technical Administrator, ultraprocessed, wellbeing and others); no serial comma, which settles the open TODO; dates spelled out ("December 1, 2026"), times as "3 pm Pacific", date ranges with a hyphen; bulleted list punctuation, compound modifiers, species names and citation rules. "Ultra-processed" is now "ultraprocessed" in `01`, `08` and the Non-UPF Verified profile, and status dates in `02`, `06` and `11` spell out the month. The showcase shows the Audiences table. Brand fonts and colors still follow the Food Integrity Project Style Guide |
| 0.16 | 2026-10-15 | Added "Use it with AI" to `README.md` (#27): brief steps for Claude Code, coding assistants and chat assistants, a sample prompt and the GitHub link. The showcase Overview shows it, with a button to copy the prompt |
| 0.15 | 2026-10-15 | The showcase has a floating Feedback button that opens a new GitHub issue in a new tab. Toasts in the showcase now sit above it |
| 0.14 | 2026-10-15 | Added Non-GMO Project vector files (#24): the full-color and black Verification Mark, the black corporate logo, the black Butterfly, a filled two-color Butterfly and the butterfly avatar for social profiles. New lockup names `avatar` and `filled` in the naming scheme. The seal SVGs also appear on the Non-GMO Project participant page |
| 0.13 | 2026-10-15 | Added one-color black vector files for Non-UPF Verified (#22): the organizational logo, the primary and circular seals and the icon (`*-mono-dark.svg`), plus three URL graphics in `public/brand/nonupf/graphics/` whose usage is still to be defined. The seal SVGs also appear on the Non-UPF Verified participant page |
| 0.12 | 2026-10-15 | Added interim SVGs of the Food Integrity Project logo (`fip-logo-horizontal-color.svg`) and, for the first time, its butterfly mark alone (`fip-mark-color.svg`), both on transparent backgrounds. They are traced from the style guide raster, an approved exception to the no-redraw rule until the design team supplies source files. The showcase now shows the transparent logo |
| 0.11 | 2026-10-14 | Added two icons to the registry in `05-iconography.md` for activity timelines (#19): `domain.task` (`ListTodo`) for a person's to-dos and follow-ups, kept separate from `domain.review`, and `domain.history` (`History`) for activity history and its empty state. The design team still needs to confirm both picks |
| 0.10 | 2026-10-13 | The build now also generates `styles/tailwind.css` (the Tailwind CSS v4 wiring from `09-tokens.md`) and `styles/fonts.css` (`@font-face` rules for the self-hosted fonts in `public/fonts/`), so apps import them with `styles/tokens.css` instead of copying code blocks (#16). `npm run check` flags them when stale and the pre-commit hook stages them. `09-tokens.md` and `03-typography.md` now tell consumers to import the generated files |
| 0.9 | 2026-10-09 | Added photography sourcing (#13): shared sources, rights, credits, verified products and AI rules in `01-brand-architecture.md`, and a photo library line in each brand profile's Imagery section |
| 0.8 | 2026-10-08 | Removed "What to change from recent sends" from `13-email.md` so the guide only describes how to work going forward (#11). Its one rule not covered elsewhere, no emoji as icons, moved to the email Accessibility section |
| 0.7 | 2026-10-08 | Added verified products trademark usage (#9): `trademark/non-gmo-project.md` (from Trademark Use Guide v2.2) and `trademark/non-upf-verified.md` (from Trademark Use Guide v1.0), each also generated as a standalone participant page in `trademark/`. Added the official white and bilingual Non-GMO Project Verified Marks and replaced the Non-UPF Verified seal files with the 900px originals from the program kit. Seal minimum sizes and clear space in `04` now follow each program's guide (Non-UPF Verified primary seal: 80px on screen) |
| 0.6 | 2026-10-08 | Added `13-email.md` (email types, anatomy, color and type for email clients, logos and seals, buttons, footer, send checklist, and what to change from recent sends) (#7). The showcase has a new Email section with a sample email per brand |
| 0.5 | 2026-10-08 | Renamed the system to "Food Integrity Project Digital Design System" to make clear it covers digital applications, not print (#1). The showcase title, top bar and eyebrow now say "Digital design system" |
| 0.4 | 2026-10-05 | Added `12-responsive.md` (breakpoints, layout behavior, container queries, touch, safe areas, performance, testing). The showcase now works on phones: mobile navigation, brand select, stacked tables, bottom drawers, no sideways scrolling at 320px |
| 0.3 | 2026-10-05 | Added `10-writing.md` (voice, tone, UI copy, word list, claims, mechanics) and `11-ux.md` (principles, audiences, core flows, feedback timing, definition of done). Interface-writing rules in `06` now point to `10` |
| 0.2 | 2026-10-05 | Adopted the Food Integrity Project Style Guide: Birch ground, one dark per brand, official palettes (Cacao, Loam, Milkweed Leaf; Forest, Seafoam, Monarch; Dark Matter, Almond, Dragon Fruit; Corn Flower, Romanesco), Lora + Avenir/Nunito Sans + Quicksand, endorsement lockups. Removed template colors (Furrow, Grain, Leaf, Beet, Radish, Borage, Heirloom). Renamed `--brand-secondary` to `--brand-signature`; added `--brand-dark`, `--brand-support`, `--field`; removed `--house-accent`. Added generated showcase and color scripts |
| 0.1 | 2026-10-05 | Example template created for design team review |
