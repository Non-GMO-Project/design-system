# Typography

One set of typefaces serves every brand. Color and logos tell the brands apart; type keeps the family together. Source: *Food Integrity Project Style Guide*, section 03.

## Three faces, three jobs

| Role | Token | Family | Job | Never |
|---|---|---|---|---|
| Serif | `--font-serif` | **Lora** | Headlines by default. May set running text wherever reading is sustained: donor reports, essays, standards documents. Italic for pull quotes | Labels, buttons, table cells |
| Sans | `--font-sans` | **Avenir** (print and desktop), **Nunito Sans** (web and apps) | Running text, captions, tables and interface copy. May go large for statistics and pack callouts, with tracking tightened above 80px | |
| Accent | `--font-accent` | **Quicksand** | Eyebrows, labels, buttons and seal wordmarks. May carry the headline where a piece needs warmth over authority | Paragraphs |
| Mono | `--font-mono` | System monospace | Code, API keys, record IDs where character-level accuracy matters | Prose |

**Avenir on screens.** Avenir is a licensed desktop face. Nunito Sans is the approved substitute where it cannot be embedded, which includes every website and app until a web license exists. The sans stack puts Nunito Sans first so every device renders the same face. `TODO(design): decide whether to buy an Avenir web license. If so, put "Avenir Next" first in --font-sans.`

All three web families are open-licensed (SIL Open Font License) and self-hosted. In Next.js, load them with `next/font/google`, which self-hosts at build time and adjusts fallback metrics to avoid layout shift. Each stack keeps system fallbacks after the hosted face.

| Token | Stack |
|---|---|
| `--font-serif` | `"Lora", Charter, "Bitstream Charter", Cambria, Georgia, serif` |
| `--font-sans` | `"Nunito Sans", "Avenir Next", Avenir, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| `--font-accent` | `"Quicksand", "Nunito Sans", system-ui, sans-serif` |
| `--font-mono` | `ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace` |

## Pair by context, not by habit

| Context | Pairing | How it works |
|---|---|---|
| Documents and standards | Lora + Avenir | **The default.** Authority first: Lora sets every headline, Avenir carries the argument |
| Campaign and member work | Quicksand + Avenir | Warmth first. Quicksand takes the headline in sentence case above 60px; Lora sits out |
| Donor and editorial | Lora + Quicksand | Lora sets both headline and body; Quicksand handles labels, captions and furniture |

Typical fit: Food Integrity Project and Non-UPF Verified standards pages use the default; Food Integrity Collective member pages and campaigns lean on Quicksand + Avenir; the annual report and donor pieces use Lora + Quicksand.

## Type scale (web)

The brand guide sets its scale for 1920px slides (display 132px, slide title 76px, section head 44px, body 28px, eyebrow 22px). This is the same scale translated for screens: same faces, weights and line heights, sized in rem so it respects browser zoom.

Base size 16px. **Body text is never below 16px on the web.**

| Token | rem | px | Line height | Weight | Family | Use |
|---|---|---|---|---|---|---|
| `display` | clamp(2.75rem, 6vw, 4.5rem) | 44 to 72 | 1.02 | 500 | serif | One per page at most. Public hero headlines |
| `h1` | 2.5rem | 40 | 1.08 | 500 | serif | Page title |
| `h2` | 2rem | 32 | 1.15 | 500 | serif | Section head |
| `h3` | 1.5rem | 24 | 1.2 | 500 | serif | Subsection, card group title |
| `h4` | 1.25rem | 20 | 1.3 | 700 | sans | Card title, dialog title |
| `h5` | 1.125rem | 18 | 1.35 | 700 | sans | Minor heading, table group |
| `eyebrow` | 0.8125rem | 13 | 1.3 | 600 | accent | Short label above a heading. Uppercase, tracked 0.18em |
| `body-lg` | 1.125rem | 18 | 1.6 | 400 | sans or serif | Lead paragraphs, long-form reading |
| `body` | 1rem | 16 | 1.6 | 400 | sans | Default text |
| `body-sm` | 0.875rem | 14 | 1.5 | 400 | sans | Dense tables and help text in operational apps only |
| `label` | 0.9375rem | 15 | 1.3 | 600 | accent | Form labels, button text, tabs, chips |
| `caption` | 0.75rem | 12 | 1.4 | 400 | sans | Timestamps, footnotes. Never essential information |
| `code` | 0.875em | relative | inherit | 400 | mono | Inline code and identifiers |
| `data` | inherit | inherit | inherit | inherit | sans, `tabular-nums` | Numbers in tables and stats |

Serif body text (`body-lg` in Lora) gets line height 1.65, slightly more than sans, because serifs read better with a little more air.

Print minimums from the brand guide: 12pt body in print, 24px on a 1920 slide.

## Usage by surface

| | Public and program surfaces | Operational apps (staff, TA portal, internal tools) |
|---|---|---|
| Headings h1 to h3 | Lora | Lora for page titles (h1, h2); Nunito Sans 700 for h3 and below in dense views |
| Body | Nunito Sans; Lora allowed for long-form articles and standards documents | Nunito Sans |
| Labels and buttons | Quicksand | Quicksand |
| Density | Generous. `body` 16px minimum | Compact allowed. Tables can use `body-sm` |
| Display size | Allowed, once per page | Not used |
| Eyebrows | Allowed above section heads | Rare. Use a plain `h5` instead |

`TODO(design): the brand guide does not address operational apps. Confirm Lora page titles and Nunito Sans sub-headings for staff tools.`

Standards documents and policy pages are long-form reading: Lora body at `body-lg`, measure around 66 characters.

## Rules

**Measure.** Keep running text between 45 and 75 characters per line. Set `max-width: 66ch` on prose containers. Never exceed 80.

**Paragraphs.** Body copy carries the argument; the headline only introduces it. Keep paragraphs to four or five lines on screen.

**Weights.** Lora at 500 for headings (never bold). Sans at 400 for body, 700 for sub-headings and stats. Quicksand at 600 for labels and eyebrows. Never use weights below 400 for text.

**Case.** Sentence case for headings, buttons, labels, navigation and table headers. The one exception is the **eyebrow**: Quicksand 600, uppercase, letter-spacing 0.18em, four words or fewer. Proper nouns keep their capitals (Non-GMO Project, Non-UPF Verified).

**Hierarchy.** Do not skip heading levels in markup. Visual size can be adjusted with classes, but `h2` follows `h1`.

**Emphasis.** Use weight for emphasis in UI. Use italic in long-form for titles of works, pull quotes and genuine stress. Do not color a single word in a headline for effect.

**Numbers.** Use `font-variant-numeric: tabular-nums` in tables, stats and anything that updates live. Format with `Intl.NumberFormat`. Large statistics may be set in the sans at display size, tracking tightened (`-0.02em`) above 80px.

**Links.** Underlined in body text, `--brand-text` color. Navigation and buttons do not need underlines.

**Alignment.** Left-aligned by default. Center only short, standalone content (empty states, a single hero line, the stacked endorsement). Never justify.

**Text over images.** Only with a scrim or solid backing that keeps 4.5:1 contrast at every point.

## Brand variation

None. All four brands use the same three faces and the same scale. The context pairing (above) changes with the kind of piece, not with the brand.

Retired from the older guides: Copperplate (Non-GMO Project callouts) and system-only stacks (Food Integrity Collective). Do not use them in new work.

## Tailwind usage

```tsx
<p className="font-accent text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Verified standards</p>
<h1 className="font-serif text-[2.5rem]/[1.08] font-medium">What verification covers</h1>
<p className="max-w-[66ch] text-base/relaxed text-foreground">...</p>
<span className="text-sm text-muted-foreground">Updated 3 days ago</span>
<td className="text-sm tabular-nums">1,284</td>
```

`TODO(dev): add named text utilities (text-h1, text-eyebrow, text-body-sm and so on) in the tokens CSS with @utility so the scale names above become classes and the arbitrary values above disappear.`

## Rules for Claude Code

- Use the scale. No arbitrary font sizes outside the named tokens.
- Lora for headings, Nunito Sans for reading and interface text, Quicksand for labels, buttons and eyebrows. Never Quicksand for paragraphs.
- Prose containers always get a max width.
- Never load a font family beyond these three without a `TODO(design)` sign-off.
