# Color

Color is the main way the house of brands tells people where they are. Typography, spacing, icons and motion stay shared; color and logos change. This file defines the named palette, the shared foundation, usage ratios, the tonal scales, the semantic layer that components use, and the rules for each brand.

> **Source of values.** Named colors come from the *Food Integrity Project Style Guide* (draft for review), which supersedes the older per-program guides. The Food Integrity Project palette is marked **proposed** in that guide. `TODO(brand): confirm the parent palette (Cacao, Loam, Milkweed Leaf) once the guide leaves draft.` Stone and the four status colors are interface additions this system needs; they are not in the brand guide.

## The model: one ground, one dark, one signature

Every brand is built from the same four parts. This comes straight from the brand guide.

| Part | What it is | Rule |
|---|---|---|
| **Birch** | `#FFFDEB`, the shared background | Default background for every brand, print and digital. **Never substitute pure white.** Any layout that starts on Birch already belongs to the family |
| **One dark** | Cacao, Forest or Dark Matter | Each brand has exactly one dark. It sets all body type and every inverted panel |
| **Supporting tint** | Loam, Seafoam, Almond or Corn Flower | Warms or structures the surface underneath |
| **One signature** | Milkweed Leaf, Monarch, Dragon Fruit or Romanesco | The color a viewer should name when asked which brand they just saw. Never more than about a tenth of a layout |
| **Frost** | `#F3F4F2`, the utility neutral | Interface and document furniture: table stripes, form fields, disabled states, data panels, image wells. Never a page ground, never counted in a brand ratio |

## How color is organized in code

There are three layers. Components only ever touch the top one.

| Layer | Example | Who uses it |
|---|---|---|
| 1. Palette (raw scales) | `--monarch-400`, `--forest-900` | Token files only. Never referenced in components |
| 2. Semantic tokens | `--primary`, `--brand-signature`, `--status-success-bg` | Every component, every page |
| 3. Brand context | `data-brand="nongmo"` on a wrapper | Swaps what the semantic tokens point to |

Because components only use semantic tokens, a button written once renders as a Non-GMO Project button, a Non-UPF Verified button or a Food Integrity Project button depending on where it sits.

## Named palette

| Name | Hex | Role | Brand | Notes |
|---|---|---|---|---|
| **Birch** | `#FFFDEB` | Ground | All (shared) | Default background everywhere |
| **Frost** | `#F3F4F2` | Utility neutral | All (shared) | Fields, stripes, disabled, data panels |
| **Cacao** | `#241A15` | Dark | Food Integrity Project | From the logo. Warm near-black that matches Forest and Dark Matter in weight. Sets type; the guide says it is never a fill except inverted panels |
| **Loam** | `#6B5644` | Supporting tone | Food Integrity Project | Brown of turned soil, a lighter tone of Cacao |
| **Milkweed Leaf** | `#5F7A52` | Signature | Food Integrity Project | Grey-green of the plant the monarch cannot breed without. Green is the one hue no program owns, and it sits opposite Monarch orange |
| **Forest** | `#053220` | Dark | Non-GMO Project, Food Integrity Collective | Carries type and structure |
| **Seafoam** | `#DDEED6` | Supporting tint | Non-GMO Project | Fills panels and cards where Birch alone is too flat |
| **Monarch** | `#F18A00` | Signature | Non-GMO Project | One point of emphasis per view. Fills, rules and large display only, never paragraphs or small labels |
| **Dark Matter** | `#0A2041` | Dark | Non-UPF Verified | Replaces Forest as the type and structure color, which keeps this program visually separate from Non-GMO Project at shelf distance |
| **Almond** | `#F5DFCE` | Supporting tint | Non-UPF Verified | Does the warming work underneath |
| **Dragon Fruit** | `#CE1B6A` | Signature | Non-UPF Verified | The seal color. Keep it to the mark, headlines and single emphasis elements |
| **Corn Flower** | `#9EB6DE` | Supporting accent | Food Integrity Collective | Mid-tone. Holds shapes, charts and panels. Never small text |
| **Romanesco** | `#D3D95E` | Signature | Food Integrity Collective | Mid-tone. Holds shapes, charts and panels. Never small text |
| **Stone** | `#6B746F` | Interface neutral | All (shared) | System addition. Neutral status, disabled states, comparison chart series |
| **Success** | `#2F7D4A` | Status | All (shared) | System addition |
| **Warning** | `#B7791F` | Status | All (shared) | System addition |
| **Danger** | `#B4372F` | Status | All (shared) | System addition |
| **Info** | `#2F6DA3` | Status | All (shared) | System addition |

Retired from the older guides: Non-GMO Project Orange `#DF7838`, Deep Eggplant `#221C35`, Pale Blush `#F6E0CF`, Deep Green `#2A5135`; Non-UPF Magenta `#CE0F69` and Navy `#041E42` (print Pantone equivalents of Dragon Fruit and Dark Matter); the earlier Collective greens `#3A6B35` and `#1A2E1A`. Use the digital palette above for all screen work.

## Usage ratios

Read left to right: background, dark, supporting tint, signature accent. The accent never exceeds roughly a tenth of a layout. If a design needs more accent to feel alive, add contrast in scale or imagery instead. Frost sits outside every ratio on purpose.

| Brand | Background | Dark | Supporting | Signature |
|---|---|---|---|---|
| Food Integrity Project | 60 Birch | 24 Cacao | 6 Loam | 10 Milkweed Leaf |
| Non-GMO Project | 55 Birch | 25 Forest | 12 Seafoam | 8 Monarch |
| Non-UPF Verified | 55 Birch | 25 Dark Matter | 12 Almond | 8 Dragon Fruit |
| Food Integrity Collective | 50 Birch | 25 Forest | 15 Corn Flower | 10 Romanesco |

## Tonal scales

Every named color has an 11-step scale from 50 (lightest) to 950 (darkest), so interfaces have tints for hover and selection, mid tones for borders and dark-mode values without inventing colors. **Bold** marks the official color, kept exact. *Italic* marks another official value pinned into the scale (Frost in Stone). The second row is the WCAG contrast ratio against Birch.

Generated by `npm run colors` from `scripts/palette.config.json`. Do not edit these tables by hand.

<!-- scales:start -->
### Stone

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| *`#F3F4F2`* | `#E8EFEB` | `#D3DDD8` | `#BAC7C0` | `#9AACA2` | `#7A9185` | **`#6B746F`** | `#555D59` | `#404844` | `#2D3330` | `#1B211E` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.3 | 3.2 | 4.7 | 6.6 | 9.2 | 12.5 | 15.9 |

### Cacao

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FCF5F2` | `#F3EBE7` | `#E2D8D3` | `#CDC0BA` | `#B3A39A` | `#9A867C` | `#826C60` | `#6D5447` | `#583D2F` | `#432718` | **`#241A15`** |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.3 | 3.3 | 4.8 | 6.8 | 9.6 | 13.2 | 16.6 |

### Loam

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FCF5F0` | `#F3EBE4` | `#E3D8CF` | `#CFC0B4` | `#B7A392` | `#9E8671` | `#886B53` | **`#6B5644`** | `#544131` | `#3D2E20` | `#291C10` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.3 | 3.3 | 4.7 | 6.7 | 9.4 | 12.7 | 16.1 |

### Milkweed Leaf

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F3F9F1` | `#E8EFE5` | `#D4DED0` | `#BBC8B5` | `#9BAD92` | `#7C9271` | **`#5F7A52`** | `#4B633F` | `#374D2C` | `#24371B` | `#14240B` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.3 | 3.3 | 4.6 | 6.4 | 9.0 | 12.5 | 15.9 |

### Forest

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F1F9F5` | `#E6EFEA` | `#D1DDD6` | `#B7C6BE` | `#96A99F` | `#768E81` | `#597466` | `#3E5D4D` | `#244736` | **`#053220`** | `#032618` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.4 | 3.4 | 4.9 | 7.1 | 10.1 | 13.8 | 15.8 |

### Seafoam

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#EFFBEB` | **`#DDEED6`** | `#CCDCC5` | `#B6C6B0` | `#9BAA95` | `#818E7B` | `#697664` | `#535F4E` | `#3F493A` | `#2B3527` | `#192216` |
| 1.0 | 1.1 | 1.4 | 1.7 | 2.3 | 3.3 | 4.6 | 6.5 | 9.2 | 12.4 | 15.9 |

### Monarch

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FFF5EC` | `#FFE8D6` | `#FFD0AA` | `#FAB273` | **`#F18A00`** | `#CA7300` | `#A75E00` | `#874B00` | `#683900` | `#4B2700` | `#321800` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.4 | 3.4 | 4.8 | 6.7 | 9.4 | 12.8 | 16.1 |

### Dark Matter

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F2F7FE` | `#E8EDF6` | `#D4DCE6` | `#BCC5D3` | `#9EA9BB` | `#808EA3` | `#65758E` | `#4D5E7A` | `#354866` | `#1E3353` | **`#0A2041`** |
| 1.0 | 1.1 | 1.3 | 1.6 | 2.3 | 3.2 | 4.5 | 6.4 | 9.0 | 12.3 | 15.8 |

### Almond

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FFF5ED` | `#FFECDD` | **`#F5DFCE`** | `#DCC7B7` | `#BDAA9B` | `#9F8D7F` | `#847366` | `#6B5C50` | `#53453A` | `#3C3026` | `#281D14` |
| 1.0 | 1.1 | 1.2 | 1.5 | 2.1 | 3.1 | 4.4 | 6.2 | 8.9 | 12.4 | 16.0 |

### Dragon Fruit

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FFF3F6` | `#FFE5EB` | `#FFCBD8` | `#FAAABF` | `#ED81A1` | `#DF5584` | **`#CE1B6A`** | `#AB0054` | `#840040` | `#60002D` | `#40001B` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.4 | 3.5 | 5.1 | 7.1 | 9.9 | 13.3 | 16.6 |

### Corn Flower

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F2F7FF` | `#E7EFFD` | `#D3E0F6` | `#BACEEF` | **`#9EB6DE`** | `#8298BC` | `#687C9D` | `#506281` | `#3A4A66` | `#25334C` | `#121F35` |
| 1.0 | 1.1 | 1.3 | 1.5 | 2.0 | 2.8 | 4.1 | 6.0 | 8.7 | 12.3 | 16.1 |

### Romanesco

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F7FADC` | `#EAEEBD` | **`#D3D95E`** | `#BEC34C` | `#A3A833` | `#898D17` | `#717400` | `#5B5E00` | `#464800` | `#323400` | `#202100` |
| 1.0 | 1.1 | 1.4 | 1.8 | 2.4 | 3.4 | 4.8 | 6.7 | 9.3 | 12.6 | 16.0 |

### Success

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#EEFBF1` | `#E1F1E4` | `#C9E0CE` | `#ABCAB2` | `#84AF8E` | `#5C956C` | **`#2F7D4A`** | `#1D6638` | `#085128` | `#003B1A` | `#00270F` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.4 | 3.4 | 4.9 | 6.8 | 9.2 | 12.4 | 15.8 |

### Warning

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FFF5EA` | `#FAE9D7` | `#EDD5BA` | `#DEBB94` | `#CA9B62` | **`#B7791F`** | `#9A6200` | `#7D4E00` | `#613C00` | `#462A00` | `#2F1A00` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.4 | 3.5 | 4.9 | 6.9 | 9.5 | 12.8 | 16.1 |

### Danger

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#FFF4F2` | `#FFE5E1` | `#F8CDC6` | `#EAAFA7` | `#D88A80` | `#C46459` | **`#B4372F`** | `#98251F` | `#7C110F` | `#600003` | `#430001` |
| 1.0 | 1.1 | 1.4 | 1.8 | 2.6 | 3.8 | 5.8 | 7.8 | 10.5 | 13.6 | 16.5 |

### Info

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#F0F8FF` | `#E0EEFB` | `#C8DBEE` | `#A9C3DD` | `#82A5C8` | `#5B88B3` | **`#2F6DA3`** | `#1E5889` | `#0D4470` | `#003156` | `#00213C` |
| 1.0 | 1.1 | 1.3 | 1.7 | 2.5 | 3.6 | 5.3 | 7.2 | 9.8 | 13.0 | 15.9 |

<!-- scales:end -->

### What each step is for

| Steps | Job | Notes |
|---|---|---|
| 50 | Page tint, large quiet areas | Brand-flavored background behind sections |
| 100 to 200 | Subtle fills: selected rows, secondary buttons, tags | Text on it uses the brand dark |
| 300 | Borders on tinted areas, dividers | Decorative only, not a component boundary |
| 400 to 500 | Chart marks, dark-mode input borders | Check 3:1 before using for UI boundaries |
| 600 to 700 | First steps that usually pass 4.5:1 on Birch | Input borders (dark family 600), help text (dark family 700) |
| 800 to 900 | Hover on dark fills, inverted panels, dark-mode cards | |
| 950 | Darkest text, dark-mode backgrounds | |

The contrast row in each table wins over this guide.

## Semantic tokens

These are the only color names components use. The full mapping per brand and mode lives in `09-tokens.md`; the showcase renders it with live contrast checks.

### Core surfaces and text

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | Birch | Brand dark | Page background |
| `--foreground` | Brand dark | Birch | All body type |
| `--card`, `--popover` | Birch | Brand dark, one step lighter | Cards, panels, menus (separated by border and elevation, not by white) |
| `--muted` | Frost | Brand dark, one step lighter | Table header rows, data panels |
| `--muted-foreground` | Brand dark family, 700 | Brand dark family, 200 | Secondary text, help text, metadata |
| `--accent` | Frost | Brand dark family, 700 to 800 | Hover and highlighted rows in menus and lists (shadcn meaning, not brand accent) |
| `--field` | Frost | Brand dark, one step lighter | Form field fill |
| `--border` | Brand dark family, 200 | Brand dark family, 700 to 800 | Dividers, card outlines |
| `--input` | Brand dark family, 600 | Brand dark family, 500 | Form control borders (must reach 3:1 on Birch and Frost) |

**Naming collision to know about.** In shadcn/ui, `--accent` means "the hover background in menus", not "brand accent color". This system keeps the shadcn meaning so library components work untouched, and uses `--brand-signature` for the brand meaning.

### Brand tokens

| Token | Use |
|---|---|
| `--primary` / `--primary-foreground` | The main action in a region. Each brand's primary is its signature color, so the main action is the one place the signature appears |
| `--primary-hover` | Hover on primary. Light text on the fill: one step darker. Dark text on the fill: one step lighter |
| `--secondary` / `--secondary-foreground` | Secondary buttons and soft brand fills |
| `--brand-dark` | The brand's one dark, for inverted panels |
| `--brand-text` | Links and brand-colored text. Always the brand dark, always underlined in body text |
| `--brand-tint` | Section backgrounds |
| `--brand-subtle` | Selected states, tags |
| `--brand-border` | Borders on brand tints |
| `--brand-support` / `-foreground` | The supporting color at full strength, for panels and cards |
| `--brand-signature` / `-foreground` | The signature color, for highlights, rules, illustration and large display |
| `--ring` | Focus ring. The brand dark in light mode, Birch in dark mode, so it always reaches 3:1 |

### Brand roles at a glance

| Brand | `data-brand` | Dark | Primary (signature) | Text on primary | Support |
|---|---|---|---|---|---|
| Food Integrity Project | `fip` | Cacao | Milkweed Leaf | Birch | Loam |
| Non-GMO Project | `nongmo` | Forest | Monarch | Forest | Seafoam |
| Non-UPF Verified | `nonupf` | Dark Matter | Dragon Fruit | Birch | Almond |
| Food Integrity Collective | `collective` | Forest | Romanesco | Forest | Corn Flower |

Monarch and Romanesco are light, so their buttons carry Forest text. Milkweed Leaf and Dragon Fruit are mid-dark, so theirs carry Birch text. Ratios are listed below.

## Status colors (never re-themed)

Status colors mean the same thing in every brand. A lapsed verification is red whether you are in Non-GMO Project or Non-UPF Verified. Brands do not override these.

Status is never shown with color alone. Every status pairs a color with an icon and a text label (see `05-iconography.md`).

| Status token set | Built from | Means |
|---|---|---|
| `--status-success-*` | Success | Saved, complete, passed, verified |
| `--status-warning-*` | Warning | Needs attention, expiring soon |
| `--status-danger-*` | Danger | Error, destructive action, failed, lapsed |
| `--status-info-*` | Info | In review, neutral notice |
| `--status-neutral-*` | Stone and Frost | Not eligible, withdrawn |

Each set has four parts:

| Part | Light | Dark | Use |
|---|---|---|---|
| `-bg` | 50 | 950 | Badge and alert background |
| `-fg` | 800 | 200 | Text on the bg |
| `-border` | 300 | 800 | Alert and badge outline |
| `-icon` | 600 | 400 | Status icon |

### Certification status

Verification has its own vocabulary. These map onto the status sets so the UI stays consistent.

| Certification state | Status set | Icon | Label |
|---|---|---|---|
| Verified | success | `status.verified` | Verified |
| Enrolled, in progress | info | `status.in-progress` | In progress |
| Pending review | info | `status.pending` | Pending review |
| Expiring soon | warning | `status.expiring` | Expires Dec 1, 2026 |
| Lapsed | danger | `status.lapsed` | Lapsed |
| Not eligible | neutral | `status.not-eligible` | Not eligible |
| Withdrawn | neutral | `status.withdrawn` | Withdrawn |

`TODO(design): confirm the certification lifecycle states with Verification and Standards teams before this list is treated as final.`

## Approved text pairings

Use these combinations and you will pass WCAG 2.2 AA without needing to check. Anything not on this list needs a contrast check before it ships. Ratios are computed by `npm run colors`.

<!-- pairings:start -->
| Text | On | Ratio | OK for |
|---|---|---|---|
| `cacao-950` | `birch` | 16.6:1 | All text |
| `loam-700` | `birch` | 6.7:1 | All text |
| `cacao-950` | `loam-100` | 14.4:1 | All text |
| `birch` | `milkweed-600` | 4.6:1 | All text |
| `birch` | `milkweed-700` | 6.4:1 | All text |
| `birch` | `loam-700` | 6.7:1 | All text |
| `birch` | `cacao-950` | 16.6:1 | All text |
| `birch` | `loam-800` | 9.4:1 | All text |
| `cacao-200` | `cacao-950` | 12.1:1 | All text |
| `cacao-200` | `cacao-900` | 9.7:1 | All text |
| `forest-900` | `birch` | 13.8:1 | All text |
| `forest-700` | `birch` | 7.1:1 | All text |
| `forest-900` | `seafoam-100` | 11.6:1 | All text |
| `forest-700` | `seafoam-100` | 6.0:1 | All text |
| `forest-900` | `monarch-400` | 5.6:1 | All text |
| `forest-900` | `monarch-300` | 7.8:1 | All text |
| `birch` | `forest-900` | 13.8:1 | All text |
| `birch` | `forest-800` | 10.1:1 | All text |
| `forest-200` | `forest-900` | 10.1:1 | All text |
| `forest-200` | `forest-800` | 7.4:1 | All text |
| `dark-matter-950` | `birch` | 15.8:1 | All text |
| `dark-matter-700` | `birch` | 6.4:1 | All text |
| `dark-matter-950` | `almond-200` | 12.6:1 | All text |
| `dark-matter-700` | `almond-200` | 5.1:1 | All text |
| `birch` | `dragonfruit-600` | 5.1:1 | All text |
| `birch` | `dragonfruit-700` | 7.1:1 | All text |
| `dragonfruit-600` | `birch` | 5.1:1 | All text |
| `birch` | `dark-matter-950` | 15.8:1 | All text |
| `birch` | `dark-matter-900` | 12.3:1 | All text |
| `dark-matter-200` | `dark-matter-950` | 11.7:1 | All text |
| `forest-900` | `romanesco-200` | 9.3:1 | All text |
| `forest-900` | `romanesco-300` | 7.4:1 | All text |
| `forest-900` | `cornflower-400` | 6.8:1 | All text |
| `forest-900` | `cornflower-200` | 10.6:1 | All text |
| `forest-700` | `cornflower-200` | 5.4:1 | All text |
| `forest-700` | `cornflower-50` | 6.7:1 | All text |
| `success-800` | `success-50` | 8.8:1 | All text |
| `warning-800` | `warning-50` | 9.0:1 | All text |
| `danger-800` | `danger-50` | 10.0:1 | All text |
| `info-800` | `info-50` | 9.4:1 | All text |
| `stone-800` | `frost` | 8.5:1 | All text |
| `birch` | `danger-600` | 5.8:1 | All text |
| `monarch-400` | `birch` | 2.4:1 | Fills and decoration only, never text |
| `cornflower-400` | `birch` | 2.0:1 | Fills and decoration only, never text |
| `romanesco-200` | `birch` | 1.4:1 | Fills and decoration only, never text |
| `monarch-500` | `birch` | 3.4:1 | Large text (24px, or 19px bold) and UI shapes only |
| `cornflower-600` | `birch` | 4.1:1 | Large text (24px, or 19px bold) and UI shapes only |
| `loam-600` | `frost` | 4.4:1 | Large text (24px, or 19px bold) and UI shapes only |
| `forest-600` | `frost` | 4.6:1 | All text |
| `dark-matter-600` | `frost` | 4.2:1 | Large text (24px, or 19px bold) and UI shapes only |
<!-- pairings:end -->

The last rows are here as warnings: Monarch, Corn Flower and Romanesco all fail as text on Birch. Set labels and captions in the brand's dark and let those colors hold fills, rules and large display.

## Gradients (decorative)

The brand guide does not define gradients. These are interface additions for hero bands and campaign art, built only from each brand's own colors. `TODO(brand): approve or remove.`

Rules:
1. At most one gradient surface per screen.
2. Never on buttons, inputs, badges, tables or anything a person needs to read closely.
3. Text on a gradient must pass 4.5:1 against **every** stop it crosses. The showcase computes the weakest stop.
4. Never mix two programs in one gradient. In particular, Monarch and Dragon Fruit never appear in the same layout.

| Token | Brand | Text allowed | Use |
|---|---|---|---|
| `--gradient-hero` | Every brand | Birch | Inverted hero bands, from the brand dark |
| `--gradient-ground` | Food Integrity Project | None | Loam into Milkweed Leaf. Decorative |
| `--gradient-flight` | Non-GMO Project | None | Forest into Monarch. Illustration and campaign art |
| `--gradient-harvest` | Non-UPF Verified | None | Dark Matter into Dragon Fruit. Decorative |
| `--gradient-gather` | Food Integrity Collective | None | Corn Flower into Romanesco. Decorative |

## Data visualization

Charts need more distinguishable colors than a brand palette can give. Use this categorical set, based on the Okabe-Ito palette, which stays distinguishable for the most common forms of color blindness.

| Order | Color | Note |
|---|---|---|
| 1 | `--chart-1` | Brand series: Milkweed Leaf, Monarch 500, Dragon Fruit, or Corn Flower 600. Always first, so charts feel on-brand |
| 2 | `#E69F00` | Orange |
| 3 | `#56B4E9` | Sky blue |
| 4 | `#009E73` | Bluish green |
| 5 | `#0072B2` | Blue |
| 6 | `#D55E00` | Vermillion |
| 7 | `#CC79A7` | Reddish purple |
| 8 | `stone-500` | "Other" and comparison series |

Rules: label series directly where possible instead of relying on a legend; use one brand ramp for sequential data (low = 200, high = 800); use the status sets only when the chart is literally about status. Chart marks need 3:1 against Birch, which is why Monarch and Corn Flower step down for `--chart-1`.

## How the scales were built

So the design team can tune a base hex and regenerate without guesswork:

1. Convert the base hex to OKLCH (a color space where equal steps in lightness look equal to the eye).
2. Place the base at the step whose target lightness it is closest to, and keep it exact. Targets: 50 = 0.975, 100 = 0.945, 200 = 0.89, 300 = 0.82, 400 = 0.73, 500 = 0.64, 600 = 0.555, 700 = 0.475, 800 = 0.395, 900 = 0.315, 950 = 0.24.
3. Spread lighter and darker steps evenly between the base and the ends, keeping hue fixed.
4. Lower chroma toward the light end and slightly toward the dark end so tints do not look neon and shades do not look muddy.
5. Pull any color that falls outside the sRGB gamut back in by reducing chroma only.
6. Recompute every contrast ratio.

`scripts/generate-color-scales.mjs` does all six steps. Edit `scripts/palette.config.json`, run `npm run colors`, and it rewrites the scale tables and pairings in this file and the palette block in `09-tokens.md`.

## Rules for Claude Code

- Never write a hex value, `rgb()` or a raw palette variable inside a component. Use semantic tokens or Tailwind classes mapped to them (`bg-primary`, `text-brand-text`, `border-border`).
- Backgrounds are Birch, never `#FFFFFF`. Pure white is allowed only inside imagery and partner logos.
- If a needed color has no semantic token, stop and add one to `09-tokens.md`, then use it. Do not inline it.
- Status meaning always comes from status tokens, never brand tokens.
- Monarch and Dragon Fruit never appear in the same layout. Never place two program signatures next to each other unless the page is a house-level page, and even then keep each inside its own `data-brand` container.
- Check contrast for any new pairing. If it is not in "Approved text pairings", compute it.
