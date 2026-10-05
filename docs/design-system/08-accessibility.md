# Accessibility

**Target: WCAG 2.2 Level AA**, for every brand and every surface, public or internal. Staff tools are not exempt; staff and partners include people with disabilities too.

This file wins any conflict with the rest of the design system, including the brand guide.

## How this system already helps

| Requirement | Where it is handled |
|---|---|
| Text contrast 4.5:1 (3:1 for large text) | Approved pairings in `02-color.md`, computed against Birch; the showcase audits every semantic pairing in every brand and mode |
| Non-text contrast 3:1 (input borders, focus rings, icons that carry meaning) | `--input` is the brand dark family at 600 (4.2:1 or more on Frost); `--ring` is the brand dark, or Birch in dark mode |
| Color is not the only signal | Status = color + icon + label (`StatusBadge`); links are underlined |
| Keyboard access and focus management | Radix primitives under shadcn/ui |
| Visible focus | 2px ring with offset on every interactive element, never removed |
| Reduced motion | Token durations collapse to 0; see `07-motion.md` |
| Text resize to 200% | rem-based type scale; no fixed-height text containers |
| Minimum text size | Body never below 16px on the web (also a brand guide rule) |
| Consistent navigation and identification | Shared components and icon registry across brands |

## Requirements for everything built

### Structure
- One `h1` per page. Heading levels in order.
- Landmarks: `header`, `nav`, `main`, `footer`. One `main` per page.
- A "Skip to main content" link as the first focusable element.
- Page `<title>` describes the page, then the brand: "Verified products | Non-GMO Project".
- `lang` set on `<html>`; `lang` on any passage in another language.

### Keyboard
- Everything that works with a pointer works with a keyboard.
- Focus order follows reading order.
- Dialogs trap focus and return it to the trigger on close (Radix does this; do not break it).
- No keyboard traps. Escape closes overlays.

### Targets
- Interactive targets at least 24 x 24px (the 2.2 AA minimum); aim for 44 x 44px on touch and public pages.
- `sm` buttons (32px) are for dense desktop tables only.

### Forms
- Every input has a visible label linked with `for` / `id`.
- Errors are text, linked with `aria-describedby`, announced, and say how to fix the problem.
- Do not ask for the same information twice in one flow (2.2 redundant entry).
- Authentication must not rely on memory puzzles alone; support password managers and paste (2.2 accessible authentication).

### Images and media
- Meaningful images get alt text that says what matters in context. Decorative images (botanical illustrations, gradients) get `alt=""`.
- Charts get a text summary and a data table alternative.
- Video gets captions; audio gets a transcript.

### Dynamic content
- Toasts and live result counts use `aria-live="polite"`. Errors that block progress use `role="alert"`.
- Content that appears on hover or focus can be dismissed, hovered and stays until dismissed (tooltips and hover cards).
- Sticky headers and footers must not hide the focused element (2.2 focus not obscured).

### Motion and time
- Respect `prefers-reduced-motion`.
- No content flashes more than three times per second.
- Session timeouts warn at least two minutes ahead and allow extension.

### Language
- Plain language. Aim for a reading level around grade 8 on public pages.
- Expand an abbreviation the first time it appears on a page (Non-UPF: non-ultra-processed food; TA: Technical Administrator; GMO: genetically modified organism).

## Brand-specific risks

| Brand | Risk | Rule |
|---|---|---|
| All | Birch is close to white, so tints read as almost nothing | Separate surfaces with `--border` and elevation, not by tint alone |
| All | Eyebrows are uppercase and tracked | Four words or fewer; never for essential information; screen readers get the same text in sentence case if it reads oddly |
| Food Integrity Project | Milkweed Leaf with Birch text is 4.6:1, close to the limit | Never lighten the primary or set its label below 15px; use milkweed-700 for hover |
| Food Integrity Project | Milkweed Leaf and success green are both green | Status always uses icon + label. Never use the brand primary to mean "success" |
| Non-GMO Project | Monarch orange is close to warning amber | Monarch never means "warning". Warnings use the warning status set with its icon |
| Non-GMO Project and Collective | Monarch and Romanesco fail as text on Birch (2.4:1 and 1.4:1) | Fills, rules and large display only. Text on those fills is Forest |
| Non-GMO Project and Collective | They share Forest as their dark | Program identity comes from logo, tint and signature, never from the dark alone. Always show the program name |
| Non-UPF Verified | Dragon Fruit sits near danger red | Never use Dragon Fruit for errors, validation or anything near form fields. Errors use the danger status set |
| Food Integrity Collective | Corn Flower fails as text (2.0:1) | Panels, charts and shapes only |
| Food Integrity Collective | The Romanesco primary is a light fill on Birch (1.4:1) | The label carries the meaning. Never make a Romanesco button icon-only; keep the visible focus ring |

## Testing

| When | How |
|---|---|
| While building | `eslint-plugin-jsx-a11y`; Storybook a11y addon if Storybook is used |
| Every build of this repo | `npm run check` recomputes every documented contrast ratio and the semantic-pairing audit |
| Every pull request | Automated axe checks with `@axe-core/playwright` on key pages, in light and dark, for each brand context |
| Before release | Keyboard-only pass; screen reader pass (VoiceOver on Safari, NVDA on Firefox or Chrome); 200% zoom and 320px width check |
| Quarterly | Review with people who use assistive technology. `TODO(design): set up a panel or partner.` |

Automated tools catch roughly a third of issues. Manual checks are required.

## Rules for Claude Code

- Treat every item in "Requirements for everything built" as a requirement, not a suggestion.
- When adding a color pairing not in `02-color.md`, compute and state its contrast ratio.
- Never remove focus outlines. Never use `div` or `span` as a button.
- When unsure whether something is accessible, choose the more accessible option and note the question.
