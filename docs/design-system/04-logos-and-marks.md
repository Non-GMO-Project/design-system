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
| Non-UPF Verified logo | Organizational logo (circle icon + "NON UPF VERIFIED") | Dragon Fruit. Not a seal: it identifies the program, not a verified product |
| Non-UPF Verified | Certification seal, rectangular (primary) and circular (secondary) | Dragon Fruit, or single-color Dark Matter for one-color printing. White reversed file for dark grounds |
| Food Integrity Collective | Mark (hand, sprout and butterfly) | Supplied green, black or white files |

## Asset inventory

What is in `public/brand/` today. The showcase build checks this table against the folder and flags missing or unlisted files. Files marked "media library" were taken from the program website's WordPress media library on 2026-10-06, at the largest size published there.

| File | Brand | Asset | Tone | Status |
|---|---|---|---|---|
| `fip/fip-logo-horizontal-color.svg` | fip | logo | color | Interim vector with a transparent background, traced from the PNG below in its dark gray `#35363A`. The showcase uses it. Replace with the design team's source file in Cacao |
| `fip/fip-mark-color.svg` | fip | mark | color | Interim butterfly mark alone, transparent, cut from the same trace. For favicons, avatars and tight spaces. Replace with the design team's source file |
| `fip/fip-logo-horizontal-color.png` | fip | logo | color | Raster pulled from the style guide PDF, 500 x 237, on a white background (not transparent). Source for the traced SVGs above; use those instead |
| `nongmo/nongmo-logo-horizontal-color.png` | nongmo | logo | color | Corporate logo in orange, 913 x 432, transparent. nongmoproject.org media library (`NGP_corp_logo_new.png`) |
| `nongmo/nongmo-logo-horizontal-reversed.png` | nongmo | logo | reversed | White corporate logo for Forest and other dark grounds, 913 x 432, transparent. Media library (`NGP_corp_logo_new_white.png`) |
| `nongmo/nongmo-logo-horizontal-mono-dark.svg` | nongmo | logo | mono-dark | Corporate logo, one-color black `#231F20`, vector. Supplied in #24 |
| `nongmo/nongmo-mark-color.svg` | nongmo | mark | color | The Butterfly, vector. Media library (`butterfly-logo.svg`). Its orange is `#F18C20`, slightly off Monarch `#F18A00` |
| `nongmo/nongmo-mark-mono-dark.svg` | nongmo | mark | mono-dark | The Butterfly, one-color black `#231F20`, vector. Supplied in #24 |
| `nongmo/nongmo-mark-filled-color.svg` | nongmo | mark | color | The Butterfly with Monarch `#F18A00` wings and a black `#231F20` outline, as drawn in the Verification Mark, vector. Supplied in #24 |
| `nongmo/nongmo-mark-avatar-color.svg` | nongmo | mark | color | Butterfly avatar: the filled Butterfly on a green check, in a light blue circle with a white ring. For social profiles. Vector. Supplied in #24 |
| `nongmo/nongmo-seal-verified-color.svg` | nongmo | seal | color | Official full-color Verification Mark, vector. Supplied in #24 |
| `nongmo/nongmo-seal-verified-color.png` | nongmo | seal | color | Official full-color Verification Mark, 1205 x 882, lossless. Media library (`NGPV_full_color-1.png`) |
| `nongmo/nongmo-seal-verified-mono-dark.svg` | nongmo | seal | mono-dark | Official single-color black Verification Mark with keyline, `#231F20`, vector. Supplied in #24 |
| `nongmo/nongmo-seal-verified-mono-dark.jpg` | nongmo | seal | mono-dark | Official single-color black Verification Mark with keyline, 4706 x 3503. Program trademark kit (`NGPV_single_color_black.jpg`) |
| `nongmo/nongmo-seal-verified-mono-light.png` | nongmo | seal | mono-light | Official single-color white Verification Mark, 2163 x 1593, transparent. Program trademark kit (`NGPV_single_color_white.png`) |
| `nongmo/nongmo-seal-bilingual-color.jpg` | nongmo | seal | color | Official bilingual (English and French) Verification Mark, full color, 595 x 298. For products sold in Canada. Program trademark kit (`NGPV_Bilingual_full_color.jpg`) |
| `nongmo/nongmo-seal-bilingual-mono-dark.jpg` | nongmo | seal | mono-dark | Official bilingual Verification Mark, single-color black, 595 x 298. Program trademark kit (`NGPV_Bilingual_single_color_black.jpg`) |
| `nonupf/nonupf-logo-horizontal-color.svg` | nonupf | logo | color | Organizational logo (circle icon + NON UPF VERIFIED), Dragon Fruit, vector. Taken from nonultraprocessed.org, where it is labeled "Non-UPF Verified corporate logo" |
| `nonupf/nonupf-logo-horizontal-mono-dark.svg` | nonupf | logo | mono-dark | Organizational logo, one-color black `#231F20`, vector. Supplied in #22 |
| `nonupf/nonupf-seal-verified-color.svg` | nonupf | seal | color | Primary rectangular mark, Dragon Fruit, vector. nonultraprocessed.org media library (`non-upf-package-logo.svg`) |
| `nonupf/nonupf-seal-verified-mono-dark.svg` | nonupf | seal | mono-dark | Primary rectangular mark, one-color black `#231F20`, vector. Supplied in #22 |
| `nonupf/nonupf-seal-verified-color.png` | nonupf | seal | color | Primary rectangular mark, pink (Pantone 214 C), 900 x 675, transparent. Program trademark kit (`Primary_Non-UPF_Verified_pink.png`). Use where SVG is not supported, such as email |
| `nonupf/nonupf-seal-verified-mono-dark.png` | nonupf | seal | mono-dark | Primary mark, navy (Pantone 282 C), 900 x 675. Program trademark kit (`Primary_Non-UPF_Verified_navy.png`) |
| `nonupf/nonupf-seal-verified-mono-light.png` | nonupf | seal | mono-light | Primary mark, white, for dark grounds, 900 x 675. Program trademark kit (`Primary_Non-UPF_Verified_white.png`) |
| `nonupf/nonupf-seal-circular-mono-dark.svg` | nonupf | seal | mono-dark | Secondary circular mark, one-color black `#231F20`, vector. Only when the primary cannot fit. Supplied in #22 |
| `nonupf/nonupf-seal-circular-color.png` | nonupf | seal | color | Secondary circular mark, pink, 900 x 900. Only when the primary cannot fit. Program trademark kit (`Secondary_Non-UPF_Verified_pink.png`) |
| `nonupf/nonupf-seal-circular-mono-dark.png` | nonupf | seal | mono-dark | Secondary circular mark, navy, 900 x 900. Program trademark kit (`Secondary_Non-UPF_Verified_navy.png`) |
| `nonupf/nonupf-seal-circular-mono-light.png` | nonupf | seal | mono-light | Secondary circular mark, white, 900 x 900. Program trademark kit (`Secondary_Non-UPF_Verified_white.png`) |
| `nonupf/nonupf-mark-color.png` | nonupf | mark | color | Icon in circle. Favicon and app icon only; the icon alone needs approval elsewhere |
| `nonupf/nonupf-mark-mono-dark.svg` | nonupf | mark | mono-dark | Icon in circle, one-color black `#231F20`, vector. Favicon and app icon only; the icon alone needs approval elsewhere. Supplied in #22 |
| `collective/collective-logo-horizontal-mono-light.png` | collective | logo | mono-light | Full lockup (mark + "Food Integrity Collective" in serif), cream `#FEFDF0` on transparent, 1501 x 509. foodintegritycollective.org header (`food_integrity_cream.png`) |
| `collective/collective-mark-color.png` | collective | mark | color | Green mark |
| `collective/collective-mark-mono-dark.png` | collective | mark | mono-dark | Black mark |
| `collective/collective-mark-mono-light.png` | collective | mark | mono-light | White mark |

Files still to come (reversed logos, vector versions of raster files, endorsement lockups) are tracked as `question` issues on GitHub.

Other Non-UPF Verified artwork in `public/brand/nonupf/graphics/` (not logos, so not in the inventory above), one-color black `#231F20` vectors supplied in #22, all built around the program URL: `nonupf-graphic-url-vertical.svg` ("nonultraprocessed.org" set vertically with a small NON UPF), `nonupf-graphic-url-badge.svg` (the icon in a circle under an arc of "nonultraprocessed.org") and `nonupf-graphic-url-wave.svg` ("NONULTRAPROCESSED.ORG" on a wave with NON UPF). The badge includes the icon, so the rule on the icon alone applies to it.

Other Collective artwork in `public/brand/collective/` (not logos, so not in the inventory above): `campaign/collective-campaign-nourish-life-badge.png` and `collective-campaign-nourish-life-badge-light.png` (the "Food should nourish life" badge), and `illustrations/collective-petals-*.png` (the petals motif). These files still use the Collective's earlier colors, green `#255330` and lime `#E2E98D`. They are to be recolored to Forest and Romanesco, and the earlier colors are retired; the design team supplies the recolored files, which replace these under the same names.

Photography in `public/brand/fip/`: `fip-photo-butterfly-wing.jpg`, a close-up of a butterfly wing used as the photography background example in the showcase. Its source, license and credit are not on record yet, as "Photography sourcing" in `01-brand-architecture.md` requires.

"Program trademark kit" files came from the artwork folders each program sends licensees, received 2026-10-08. The kits also hold EPS, AI and full-size JPG files for print; those stay with the programs and are not stored here. The bilingual mark in white and the French and FSIS marks are not in the kit as web files.

Program trademark guides (the rules for seal use on pack and in marketing). Each program also has a trademark usage page in this system, written for participants: `trademark/non-gmo-project.md` and `trademark/non-upf-verified.md`, published as standalone pages at `trademark/non-gmo-project.html` and `trademark/non-upf-verified.html`:

- Non-GMO Project Trademark Use Guide v2.2: https://www.nongmoproject.org/wp-content/uploads/NGP-trademark-use-guide-v2.2.pdf
- Non-UPF Verified Trademark Use Guide (December 2025): https://nonultraprocessed.org/wp-content/uploads/2026/06/non-upf-verified-trademark-use-guide-v1.pdf

## Naming

`{brand}-{asset}-{lockup}-{tone}.{ext}`

The lockup part is left out for a mark in its default form (`nongmo-mark-color.svg`).

| Part | Values |
|---|---|
| brand | `fip`, `nongmo`, `nonupf`, `collective` |
| asset | `logo` (with wordmark), `mark` (symbol only), `seal` |
| lockup | `horizontal`, `stacked`, `endorsed`, `verified` (seals), `circular` (secondary seal), `bilingual` (English and French seal), `avatar` (mark in a circle for social profiles), `filled` (a mark drawn with solid fills rather than outline) |
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

## Logo by application

Which artwork and which file to use for each application, by program. Sizes are what each platform asks for; the artwork follows "Choosing a variant" above and the minimum sizes below.

| Application | Size and format | Artwork |
|---|---|---|
| Favicon | SVG, plus a 32 x 32px PNG fallback. Browsers draw it at 16 to 32px | Mark |
| Apple touch icon | 180 x 180px PNG with no transparency | Mark centered on a Birch or brand-dark square |
| Web app icon (manifest) | 192 x 192 and 512 x 512px PNG, plus a 512px maskable version with the mark inside the center 80% | Mark on a Birch or brand-dark square |
| App store icon | 1024 x 1024px PNG, square, no transparency (the store rounds the corners) | Mark on a Birch or brand-dark square |
| Social avatar (profile picture) | PNG, 400 x 400px or larger. Platforms crop it to a circle, so keep the artwork inside it | Mark, or the avatar file where one exists |
| Social share image (Open Graph) | 1200 x 630px PNG or JPG | Horizontal logo on Birch or the brand dark. A seal only when the page is about one verified product |
| Site or app header | SVG, at least 120px wide | Horizontal logo; the mark alone under 400px of space |
| Footer | SVG | Program logo plus the endorsement line |
| Email header | PNG at twice the display size, with alt text | Horizontal logo |
| Watermark, embossing, one-color use | SVG | Mono-dark, or mono-light on dark grounds |
| Product page seal | SVG, at least the seal's screen minimum | Certification seal, only on a currently verified product |
| On photography | SVG | Light mark or logo on a calm part of the image, with a scrim if needed |

Square icons and share images are made by placing the official file on a Birch or brand-dark background. That is layout, not redrawing: never change the artwork itself.

### Food Integrity Project

| Application | File |
|---|---|
| Favicon, touch and app icons, social avatar | `fip/fip-mark-color.svg` on Birch |
| Header, share image | `fip/fip-logo-horizontal-color.svg`; `fip/fip-mark-color.svg` in narrow headers |
| Footer and email | `fip/fip-logo-horizontal-color.svg` on Birch. No transparent PNG for email yet; the PNG in `fip/` has a white background |
| Dark grounds, photography, watermark | No reversed or one-color files yet |

### Non-GMO Project

| Application | File |
|---|---|
| Favicon, touch and app icons | `nongmo/nongmo-mark-color.svg` on Birch |
| Social avatar | `nongmo/nongmo-mark-avatar-color.svg` |
| Header, share image | `nongmo/nongmo-logo-horizontal-color.png` on Birch, or `nongmo/nongmo-logo-horizontal-reversed.png` on Forest; `nongmo/nongmo-mark-color.svg` in narrow headers |
| Footer | `nongmo/nongmo-logo-horizontal-reversed.png` on Forest |
| Email header | `nongmo/nongmo-logo-horizontal-color.png` (913px wide, sharp up to 456px displayed) |
| Watermark, one-color | `nongmo/nongmo-logo-horizontal-mono-dark.svg` or `nongmo/nongmo-mark-mono-dark.svg` |
| Product page seal | `nongmo/nongmo-seal-verified-color.svg`; `nongmo/nongmo-seal-verified-mono-light.png` on dark grounds; `nongmo/nongmo-seal-bilingual-color.jpg` for products sold in Canada |
| On photography | `nongmo/nongmo-logo-horizontal-reversed.png` |

### Non-UPF Verified

| Application | File |
|---|---|
| Favicon, touch and app icons | `nonupf/nonupf-mark-color.png`, or `nonupf/nonupf-mark-mono-dark.svg` for a one-color favicon. These are the only places the icon alone is approved |
| Social avatar | Not set yet. The icon alone is approved only for favicons and app icons |
| Header, share image | `nonupf/nonupf-logo-horizontal-color.svg` on Birch. In narrow headers keep the logo at 120px or wider, since the icon alone needs approval |
| Footer | `nonupf/nonupf-logo-horizontal-color.svg` on Birch, until a reversed logo exists |
| Email header | No PNG of the logo yet for email clients that block SVG |
| Watermark, one-color | `nonupf/nonupf-logo-horizontal-mono-dark.svg` |
| Product page seal | `nonupf/nonupf-seal-verified-color.svg`; `nonupf/nonupf-seal-verified-mono-light.png` on dark grounds; `nonupf/nonupf-seal-circular-color.png` only where the primary cannot fit; `nonupf/nonupf-seal-verified-color.png` in email |
| Dark grounds, photography | No reversed logo yet |

### Food Integrity Collective

| Application | File |
|---|---|
| Favicon, touch and app icons, social avatar | `collective/collective-mark-color.png` on Birch, or `collective/collective-mark-mono-light.png` on Forest |
| Header, share image | `collective/collective-logo-horizontal-mono-light.png` on Forest. No color lockup for Birch yet |
| Footer and email header | `collective/collective-logo-horizontal-mono-light.png` on Forest (1501px wide) |
| Watermark, one-color | `collective/collective-mark-mono-dark.png`, or `collective/collective-mark-mono-light.png` on dark grounds |
| On photography | `collective/collective-mark-mono-light.png` |

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

**Clear space:** X = the cap height of the wordmark. Nothing enters this zone: no type, rule, image edge or other mark. For the Non-GMO Project Verified Mark, X is the height of the capital "N" in "Non-GMO", measured from the white edge. For the Non-UPF Verified seal, X is the height of the capital "N" in "Non-UPF", measured from the outside of the keyline.

**Minimum sizes:**

| Asset | Screen minimum | Print minimum |
|---|---|---|
| Non-GMO Project Verified Mark | 72px wide (the program sets print sizes only) | 3/8 in tall and 1/2 in wide |
| Non-GMO Project bilingual Mark | 72px wide | 3/8 in tall and 3/4 in wide |
| Non-UPF Verified primary (rectangular) seal | 80px wide | 3/8 in tall and 1/2 in wide |
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
- If the asset file does not exist yet, renders a neutral placeholder box with the brand name and a console warning. It never generates artwork.

## Rules for Claude Code

- Use `<BrandLogo />`, `<CertificationSeal />` and `<EndorsementLockup />`. Never `<img>` a logo directly in feature code, and never draw one.
- Pick the variant with the table in "Choosing a variant" and the file with "Logo by application".
- Do not show `<CertificationSeal />` unless the data says the product is currently verified for that program.
- If asked to "make a logo" or "mock up the seal", do not produce artwork. Use the placeholder and flag it for the design team.
