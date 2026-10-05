# Logos and marks

This file sets how logos and certification seals are stored, chosen and placed. It contains no logo artwork. The files live in `public/brand/` and come from the design team. Source for the rules: *Food Integrity Project Style Guide*, section 04, plus each program's trademark guide.

## Two different things: logos and seals

| | Organizational logo | Certification seal |
|---|---|---|
| What it says | "This is us" | "This product meets a standard" |
| Examples | Food Integrity Project logo, Non-GMO Project logo, Collective mark | Non-GMO Project Verified, Non-UPF Verified |
| Where it appears | Headers, footers, emails, social, documents | Product packaging (under license), verified product pages, education about the seal |
| Governed by | This design system | This design system **and** the program's licensing and trademark rules |

The most important rule in this file: **a seal is a claim about a product.** Showing it next to a product says that product is verified. Never place a seal near a product, brand or company that is not currently verified, and never use a seal as decoration.

To show verification status inside an interface (a table, a search result), use `StatusBadge` from `06-ui-framework.md`. Reserve seal artwork for product detail pages where the product is verified, and for education pages that explain what the seal means.

## The marks

| Mark | Kind | Color rule |
|---|---|---|
| Food Integrity Project | Parent mark (butterfly + "food integrity project") | Cacao on Birch, or reversed to Birch on Cacao. Other single-color pairings only for special design considerations |
| Non-GMO Project | Organizational logo (butterfly + wordmark, Monarch) | Supplied colors only |
| Non-GMO Project Verified | Certification seal | Artwork is fixed by the standard. Never recolored, cropped or redrawn. Full color or the supplied one-color file |
| Non-UPF Verified | Certification seal, rectangular (primary) and circular (secondary) | Dragon Fruit, or single-color Dark Matter for one-color printing. White reversed file for dark grounds |
| Food Integrity Collective | Mark (hand, sprout and butterfly) | Supplied green, black or white files |

## Asset inventory

What is in `public/brand/` today. The showcase build checks this table against the folder and flags missing or unlisted files.

| File | Brand | Asset | Tone | Status |
|---|---|---|---|---|
| `fip/fip-logo-horizontal-color.png` | fip | logo | color | Raster pulled from the style guide PDF. Replace with SVG in Cacao |
| `nongmo/nongmo-logo-horizontal-color.png` | nongmo | logo | color | Raster, 300px wide |
| `nongmo/nongmo-seal-verified-color.jpg` | nongmo | seal | color | Official full-color seal |
| `nongmo/nongmo-seal-verified-mono-dark.jpg` | nongmo | seal | mono-dark | Official one-color seal |
| `nonupf/nonupf-seal-verified-color.png` | nonupf | seal | color | Primary rectangular mark, Dragon Fruit |
| `nonupf/nonupf-seal-verified-mono-dark.png` | nonupf | seal | mono-dark | Primary mark, Dark Matter |
| `nonupf/nonupf-seal-verified-mono-light.png` | nonupf | seal | mono-light | Primary mark, white, for dark grounds |
| `nonupf/nonupf-seal-circular-color.png` | nonupf | seal | color | Secondary circular mark. Only when the primary cannot fit |
| `nonupf/nonupf-seal-circular-mono-dark.png` | nonupf | seal | mono-dark | Secondary circular mark, Dark Matter |
| `nonupf/nonupf-seal-circular-mono-light.png` | nonupf | seal | mono-light | Secondary circular mark, white |
| `nonupf/nonupf-mark-color.png` | nonupf | mark | color | Icon in circle. Favicon and app icon only; the icon alone needs approval elsewhere |
| `collective/collective-mark-color.png` | collective | mark | color | Green mark |
| `collective/collective-mark-mono-dark.png` | collective | mark | mono-dark | Black mark |
| `collective/collective-mark-mono-light.png` | collective | mark | mono-light | White mark |

Still needed:

- `TODO(design): SVG versions of every file above. PNG and JPG are stand-ins.`
- `TODO(design): Food Integrity Project logo in Cacao and reversed Birch, plus the mark alone (butterfly) for favicons.`
- `TODO(design): Non-GMO Project reversed logo and butterfly avatar.`
- `TODO(design): a Non-UPF Verified organizational logo. Today only the seal exists, and a seal is not a logo.`
- `TODO(design): a Food Integrity Collective wordmark or lockup. Today only the symbol exists. The older guide called this the umbrella mark; confirm it now belongs to the Collective.`
- `TODO(design): endorsement lockup files (horizontal and stacked) for each program.`

## Naming

`{brand}-{asset}-{lockup}-{tone}.{ext}`

| Part | Values |
|---|---|
| brand | `fip`, `nongmo`, `nonupf`, `collective` |
| asset | `logo` (with wordmark), `mark` (symbol only), `seal` |
| lockup | `horizontal`, `stacked`, `endorsed`, `verified` (seals), `circular` (secondary seal) |
| tone | `color`, `reversed` (for dark or brand grounds), `mono-dark` (one color, dark), `mono-light` (one color, light) |

SVG for everything on screen once supplied. PNG only where a platform requires it (touch icons, social images, email clients that block SVG).

## Choosing a variant

| Situation | Use |
|---|---|
| Site or app header, wide screens | Horizontal logo, color |
| Header on small screens (under 400px of space) | Mark only, with the brand name in the accessible label |
| Footer on a program page | Program logo, plus the endorsement line |
| Program page where the parent must be visible | Endorsement lockup (below) |
| On the brand dark or a hero gradient | Reversed or mono-light |
| Single-color printing, embossing, watermark | Mono |
| Favicon, app icon, social avatar | Mark, on Birch or the brand dark |
| Email header | Horizontal logo, PNG at 2x, with alt text |
| On photography | A Birch (light) mark dropped onto a calm part of the image |

## Endorsement lockups

How a program shows it belongs to the Food Integrity Project.

| Form | Layout | Use |
|---|---|---|
| Horizontal (preferred) | Program seal or logo, a hairline rule, then "A program of" above the parent mark and name | Site footers, decks, signage |
| Stacked (narrow formats) | Program seal or logo, a hairline rule below, then "A program of the Food Integrity Project" in Quicksand caps | Mobile footers, narrow print |

| Rule | Detail |
|---|---|
| Relative size | The parent mark is 40 to 50% of the program seal's height, and never larger than it |
| Separation | A hairline rule or a full clear-space gap always sits between the two marks, so they never read as one lockup |
| Color | In an endorsement, the parent mark is Cacao or reversed Birch only. It never adopts the program's accent |
| On pack | Certification seals appear alone on packaging. Endorsement lockups are for owned channels: sites, decks, signage, print |

Until lockup files exist, the `EndorsementLockup` component places the two official files with the rule between them. It never redraws either mark.

## Clear space and size

**Clear space:** X = the cap height of the wordmark. Nothing enters this zone: no type, rule, image edge or other mark. For the Non-UPF Verified seal, X is the height of the capital "N" in "Non-UPF", measured from the outside of the keyline.

**Minimum sizes:**

| Asset | Screen minimum | Print minimum |
|---|---|---|
| Certification seal | 72px wide | 0.5 in (12.7 mm) wide |
| Parent mark (Food Integrity Project) | 96px wide | 0.75 in (19 mm) wide |
| Non-UPF Verified secondary (circular) seal | 60px wide | 0.375 in wide |
| Program horizontal logo | 120px wide | 30 mm wide |
| Mark only | 24px | 8 mm |

The seal URL (nongmoproject.org, nonultraprocessed.org) must stay readable at every allowed size.

## Backgrounds

| Background | Logo version |
|---|---|
| Birch, Frost, white | Color |
| The brand's own dark, hero gradients | Reversed or mono-light |
| Photography | Birch (light) mark on a calm part of the image, with a scrim if needed |
| Another organization's color | Mono, or place on a Birch panel |

## Never

- Redraw, trace, approximate or rebuild a logo or seal in SVG, CSS, canvas, icon fonts or text.
- Recolor, add effects (shadows, glows, outlines, gradients), stretch, rotate or crop.
- Animate a seal. Logos may fade in with the page, nothing more.
- Lock the parent to a seal: no shared container, no touching edges, no combined mark. Endorsement is adjacency, not fusion.
- Rearrange lockup parts or build an endorsed lockup that reads as one mark.
- Put a logo inside a sentence as a word.
- Use a program logo to represent a different program, or substitute one program's mark for another.
- Show a seal on a product, brand or company that is not currently verified.
- Show the Non-UPF Verified seal on a product that also carries a bioengineered food disclosure.

## Accessible names

| Context | Alt text or accessible name |
|---|---|
| Logo linking to home | "{Brand name} home" |
| Logo that is not a link | "{Brand name}" |
| Logo next to the brand name in text | `alt=""` (decorative, the name is already there) |
| Seal on a verified product | "Non-GMO Project Verified" or "Non-UPF Verified" (the seal's meaning, not "seal image") |

## The BrandLogo component

All logos render through one component so the rules above are enforced in one place.

```tsx
<BrandLogo brand="nongmo" variant="horizontal" tone="color" href="/" />
<BrandLogo brand="collective" variant="mark" tone="mono-light" size={24} decorative />
<CertificationSeal program="nonupf" tone="color" size={96} />  // only renders inside a verified product context
<EndorsementLockup program="nongmo" layout="horizontal" />
```

Behavior:
- Picks the file from the naming scheme, so a missing asset fails loudly in development.
- Enforces minimum sizes.
- Sets alt text from the table above.
- If the asset file does not exist yet, renders a neutral placeholder box with the brand name and a `TODO(design)` console warning. It never generates artwork.

`TODO(dev): build BrandLogo, CertificationSeal and EndorsementLockup in components/brand/.`

## Rules for Claude Code

- Use `<BrandLogo />`, `<CertificationSeal />` and `<EndorsementLockup />`. Never `<img>` a logo directly in feature code, and never draw one.
- Pick the variant with the table in "Choosing a variant".
- Do not show `<CertificationSeal />` unless the data says the product is currently verified for that program.
- If asked to "make a logo" or "mock up the seal", do not produce artwork. Use the placeholder and flag it for the design team.
