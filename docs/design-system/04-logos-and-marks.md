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
| Non-GMO Project | Organizational logo (butterfly + wordmark, Monarch) | Supplied colors, or Birch one color on dark grounds |
| Non-GMO Project Verified | Certification seal | Artwork is fixed by the standard. Never recolored, cropped or redrawn. Full color or the supplied one-color file |
| Non-UPF Verified logo | Organizational logo (circle icon + "NON UPF VERIFIED") | Dragon Fruit, or Birch one color on dark grounds. Not a seal: it identifies the program, not a verified product |
| Non-UPF Verified | Certification seal, rectangular (primary) and circular (secondary) | Dragon Fruit, or one color: Dark Matter (Pantone 282 C, the `mono-dark` PNGs from the kit) or black (the `mono-black` SVGs). White `mono-light` file for dark grounds |
| Food Integrity Collective | Mark (hand, sprout and butterfly) and lockup | Forest, black, or Birch one color on dark grounds |

## Asset inventory

What is in `public/brand/` today. The showcase build checks this table against the folder and flags missing or unlisted files. Files marked "media library" were taken from the program website's WordPress media library on 2026-10-06, at the largest size published there.

| File | Brand | Asset | Tone | Status |
|---|---|---|---|---|
| `fip/fip-logo-horizontal-mono-dark.svg` | fip | logo | mono-dark | Interim vector, traced from the style guide raster in dark gray `#35363A`. The one-color source for the Cacao, Birch and PNG versions below. Replace with the design team's source file |
| `fip/fip-mark-mono-dark.svg` | fip | mark | mono-dark | Interim butterfly mark alone, cut from the same trace, dark gray `#35363A`. The one-color source for the Cacao and Birch marks. Replace with the design team's source file |
| `fip/fip-logo-horizontal-color.svg` | fip | logo | color | Cacao horizontal logo, transparent. Derived by the build from `fip-logo-horizontal-mono-dark.svg`. The showcase uses it |
| `fip/fip-mark-color.svg` | fip | mark | color | Cacao butterfly mark alone, transparent. Derived by the build from `fip-mark-mono-dark.svg`. For favicons, avatars, tight spaces and the endorsement line |
| `fip/fip-logo-horizontal-reversed.svg` | fip | logo | reversed | Birch, for dark grounds. Derived by the build from `fip-logo-horizontal-mono-dark.svg` |
| `fip/fip-logo-horizontal-reversed.png` | fip | logo | reversed | Birch, transparent, 960px wide. Derived by the build. For email dark bands |
| `fip/fip-mark-reversed.svg` | fip | mark | reversed | Birch mark alone, for dark grounds. Derived by the build from `fip-mark-mono-dark.svg` |
| `fip/fip-logo-horizontal-color.png` | fip | logo | color | Transparent PNG, 960px wide, rendered by the build in Cacao from `fip-logo-horizontal-mono-dark.svg` (see "Derived files"). For email and anywhere SVG is not supported. It replaces the raster pulled from the style guide PDF, which had a white background |
| `fip/fip-logo-stacked-mono-dark.svg` | fip | logo | mono-dark | Stacked logo (butterfly above "food integrity project"), one-color black `#231F20`, vector. Source file from the design team, supplied 2026-11-20 |
| `fip/fip-logo-stacked-mono-dark.png` | fip | logo | mono-dark | Black stacked logo, transparent, 960px wide. Derived by the build |
| `fip/fip-logo-stacked-color.svg` | fip | logo | color | Cacao stacked logo, for Birch and White grounds. Derived by the build |
| `fip/fip-logo-stacked-color.png` | fip | logo | color | Cacao stacked logo, transparent, 960px wide. Derived by the build |
| `fip/fip-logo-stacked-reversed.svg` | fip | logo | reversed | Birch stacked logo, for dark grounds. Derived by the build |
| `fip/fip-logo-stacked-reversed.png` | fip | logo | reversed | Birch stacked logo, transparent, 960px wide. Derived by the build |
| `nongmo/nongmo-logo-horizontal-color.png` | nongmo | logo | color | Corporate logo in orange, 913 x 432, transparent. nongmoproject.org media library (`NGP_corp_logo_new.png`) |
| `nongmo/nongmo-logo-horizontal-reversed.png` | nongmo | logo | reversed | Birch corporate logo, transparent, 960px wide. Derived by the build from `nongmo-logo-horizontal-mono-dark.svg`. For email dark bands. It replaces the white PNG from the media library |
| `nongmo/nongmo-logo-horizontal-mono-dark.svg` | nongmo | logo | mono-dark | Corporate logo, one-color black `#231F20`, vector. Supplied in #24 |
| `nongmo/nongmo-logo-horizontal-reversed.svg` | nongmo | logo | reversed | Birch corporate logo, for dark grounds. Derived by the build from `nongmo-logo-horizontal-mono-dark.svg` |
| `nongmo/nongmo-mark-color.svg` | nongmo | mark | color | The Butterfly, vector. Media library (`butterfly-logo.svg`). Its orange is `#F18C20`, slightly off Monarch `#F18A00` |
| `nongmo/nongmo-mark-mono-dark.svg` | nongmo | mark | mono-dark | The Butterfly, one-color black `#231F20`, vector. Supplied in #24 |
| `nongmo/nongmo-mark-reversed.svg` | nongmo | mark | reversed | Birch Butterfly, for dark grounds. Derived by the build from `nongmo-mark-mono-dark.svg` |
| `nongmo/nongmo-mark-filled-color.svg` | nongmo | mark | color | The Butterfly with Monarch `#F18A00` wings and a black `#231F20` outline, as drawn in the Verification Mark, vector. Supplied in #24 |
| `nongmo/nongmo-mark-avatar-color.svg` | nongmo | mark | color | Butterfly avatar: the filled Butterfly on a green check, in a light blue circle with a white ring. For social profiles. Vector. Supplied in #24 |
| `nongmo/nongmo-seal-verified-color.svg` | nongmo | seal | color | Official full-color Verification Mark, vector. Supplied in #24 |
| `nongmo/nongmo-seal-verified-color.png` | nongmo | seal | color | Official full-color Verification Mark, 1205 x 882, lossless. Media library (`NGPV_full_color-1.png`) |
| `nongmo/nongmo-seal-verified-mono-dark.svg` | nongmo | seal | mono-dark | Official single-color black Verification Mark with keyline, `#231F20`, vector. Supplied in #24 |
| `nongmo/nongmo-seal-verified-mono-dark.jpg` | nongmo | seal | mono-dark | Official single-color black Verification Mark with keyline, 4706 x 3503. Program trademark kit (`NGPV_single_color_black.jpg`). Kept for download and print; the SVG replaces it on screen and on the participant page |
| `nongmo/nongmo-seal-verified-mono-light.png` | nongmo | seal | mono-light | Official single-color white Verification Mark, 2163 x 1593, transparent. Program trademark kit (`NGPV_single_color_white.png`) |
| `nongmo/nongmo-seal-bilingual-color.jpg` | nongmo | seal | color | Official bilingual (English and French) Verification Mark, full color, 595 x 298. For products sold in Canada. Program trademark kit (`NGPV_Bilingual_full_color.jpg`) |
| `nongmo/nongmo-seal-bilingual-mono-dark.jpg` | nongmo | seal | mono-dark | Official bilingual Verification Mark, single-color black, 595 x 298. Program trademark kit (`NGPV_Bilingual_single_color_black.jpg`) |
| `nongmo/nongmo-seal-bilingual-mono-dark.svg` | nongmo | seal | mono-dark | Official bilingual Verification Mark, single-color black `#222222`, vector. Source file from the program, supplied 2026-11-21 |
| `nongmo/nongmo-seal-fsis-mono-dark.svg` | nongmo | seal | mono-dark | Official Mark for FSIS ("NON-GMO PROJECT VERIFIED", vertical), single-color black `#231F20`, vector. Only on FSIS single-ingredient products, always with the required FSIS text. Source file from the program, supplied 2026-11-21 |
| `nonupf/nonupf-logo-horizontal-color.svg` | nonupf | logo | color | Organizational logo (circle icon + NON UPF VERIFIED), Dragon Fruit, vector. Taken from nonultraprocessed.org, where it is labeled "Non-UPF Verified corporate logo" |
| `nonupf/nonupf-logo-horizontal-mono-black.svg` | nonupf | logo | mono-black | Organizational logo, one-color black `#231F20`, vector. Supplied in #22 |
| `nonupf/nonupf-logo-horizontal-reversed.svg` | nonupf | logo | reversed | Birch organizational logo, for dark grounds. Derived by the build from `nonupf-logo-horizontal-mono-black.svg` |
| `nonupf/nonupf-logo-horizontal-reversed.png` | nonupf | logo | reversed | Birch, transparent, 960px wide. Derived by the build. For email dark bands |
| `nonupf/nonupf-logo-horizontal-color.png` | nonupf | logo | color | Dragon Fruit, transparent, 960px wide. Rendered by the build from `nonupf-logo-horizontal-color.svg`. For email headers on White |
| `nonupf/nonupf-seal-verified-color.svg` | nonupf | seal | color | Primary rectangular mark, Dragon Fruit, vector. nonultraprocessed.org media library (`non-upf-package-logo.svg`) |
| `nonupf/nonupf-seal-verified-mono-black.svg` | nonupf | seal | mono-black | Primary rectangular mark, one-color black `#231F20`, vector. Supplied in #22 |
| `nonupf/nonupf-seal-verified-color.png` | nonupf | seal | color | Primary rectangular mark, pink (Pantone 214 C), 900 x 675, transparent. Program trademark kit (`Primary_Non-UPF_Verified_pink.png`). Use where SVG is not supported, such as email |
| `nonupf/nonupf-seal-verified-mono-dark.png` | nonupf | seal | mono-dark | Primary mark, navy (Pantone 282 C), 900 x 675. Program trademark kit (`Primary_Non-UPF_Verified_navy.png`) |
| `nonupf/nonupf-seal-verified-mono-light.png` | nonupf | seal | mono-light | Primary mark, white, for dark grounds, 900 x 675. Program trademark kit (`Primary_Non-UPF_Verified_white.png`) |
| `nonupf/nonupf-seal-circular-mono-black.svg` | nonupf | seal | mono-black | Secondary circular mark, one-color black `#231F20`, vector. Only when the primary cannot fit. Supplied in #22 |
| `nonupf/nonupf-seal-circular-color.png` | nonupf | seal | color | Secondary circular mark, pink, 900 x 900. Only when the primary cannot fit. Program trademark kit (`Secondary_Non-UPF_Verified_pink.png`) |
| `nonupf/nonupf-seal-circular-mono-dark.png` | nonupf | seal | mono-dark | Secondary circular mark, navy, 900 x 900. Program trademark kit (`Secondary_Non-UPF_Verified_navy.png`) |
| `nonupf/nonupf-seal-circular-mono-light.png` | nonupf | seal | mono-light | Secondary circular mark, white, 900 x 900. Program trademark kit (`Secondary_Non-UPF_Verified_white.png`) |
| `nonupf/nonupf-mark-color.png` | nonupf | mark | color | Icon in circle. Favicon, app icon and social avatar only; the icon alone needs approval elsewhere |
| `nonupf/nonupf-mark-mono-black.svg` | nonupf | mark | mono-black | Icon in circle, one-color black `#231F20`, vector. Favicon, app icon and social avatar only; the icon alone needs approval elsewhere. Supplied in #22 |
| `nonupf/nonupf-mark-reversed.svg` | nonupf | mark | reversed | Birch icon in circle, derived by the build from `nonupf-mark-mono-black.svg`. Favicon, app icon and social avatar only, like the color icon |
| `collective/collective-logo-horizontal-mono-dark.svg` | collective | logo | mono-dark | Full lockup (mark + "Food Integrity Collective" in serif), one-color black `#231F20`, vector. Source file from the design team, supplied 2026-11-20 |
| `collective/collective-logo-horizontal-mono-dark.png` | collective | logo | mono-dark | Black lockup, transparent, 960px wide. Derived by the build |
| `collective/collective-logo-horizontal-color.svg` | collective | logo | color | Forest lockup for Birch and White grounds. Derived by the build |
| `collective/collective-logo-horizontal-color.png` | collective | logo | color | Forest lockup, transparent, 960px wide. Derived by the build. For email headers on White |
| `collective/collective-logo-horizontal-reversed.svg` | collective | logo | reversed | Birch lockup, for dark grounds. Derived by the build |
| `collective/collective-logo-horizontal-reversed.png` | collective | logo | reversed | Birch lockup, transparent, 960px wide. Derived by the build. For email dark bands |
| `collective/collective-mark-mono-dark.svg` | collective | mark | mono-dark | Hand, sprout and butterfly mark, one-color black `#231F20`, vector. Source file from the design team, supplied 2026-11-20 |
| `collective/collective-mark-mono-dark.png` | collective | mark | mono-dark | Black mark, transparent, 512px. Derived by the build |
| `collective/collective-mark-color.svg` | collective | mark | color | Forest mark. Derived by the build |
| `collective/collective-mark-color.png` | collective | mark | color | Forest mark, transparent, 512px. Derived by the build. It replaces the earlier green PNG |
| `collective/collective-mark-reversed.svg` | collective | mark | reversed | Birch mark, for dark grounds. Derived by the build |
| `collective/collective-mark-reversed.png` | collective | mark | reversed | Birch mark, transparent, 512px. Derived by the build |

Files still to come (vector versions of raster files) are tracked as `question` issues on GitHub.

## Derived files

Logos on dark grounds use a Birch one-color version, never the color logo and never white. The build makes these from the official one-color vector files below, along with transparent PNGs for email. It swaps the source's single color for Birch and changes nothing else, and it refuses a source with more than one color, so no artwork is redrawn. Never edit these files by hand: change the source or this table, and the build writes them again.

| File | Source | Color | Width |
|---|---|---|---|
| `fip/fip-logo-horizontal-color.svg` | `fip/fip-logo-horizontal-mono-dark.svg` | Cacao | |
| `fip/fip-mark-color.svg` | `fip/fip-mark-mono-dark.svg` | Cacao | |
| `fip/fip-logo-horizontal-reversed.svg` | `fip/fip-logo-horizontal-mono-dark.svg` | Birch | |
| `fip/fip-logo-horizontal-reversed.png` | `fip/fip-logo-horizontal-mono-dark.svg` | Birch | 960 |
| `fip/fip-logo-horizontal-color.png` | `fip/fip-logo-horizontal-mono-dark.svg` | Cacao | 960 |
| `fip/fip-mark-reversed.svg` | `fip/fip-mark-mono-dark.svg` | Birch | |
| `fip/fip-logo-stacked-mono-dark.png` | `fip/fip-logo-stacked-mono-dark.svg` | As drawn | 960 |
| `fip/fip-logo-stacked-color.svg` | `fip/fip-logo-stacked-mono-dark.svg` | Cacao | |
| `fip/fip-logo-stacked-color.png` | `fip/fip-logo-stacked-mono-dark.svg` | Cacao | 960 |
| `fip/fip-logo-stacked-reversed.svg` | `fip/fip-logo-stacked-mono-dark.svg` | Birch | |
| `fip/fip-logo-stacked-reversed.png` | `fip/fip-logo-stacked-mono-dark.svg` | Birch | 960 |
| `nongmo/nongmo-logo-horizontal-reversed.svg` | `nongmo/nongmo-logo-horizontal-mono-dark.svg` | Birch | |
| `nongmo/nongmo-logo-horizontal-reversed.png` | `nongmo/nongmo-logo-horizontal-mono-dark.svg` | Birch | 960 |
| `nongmo/nongmo-mark-reversed.svg` | `nongmo/nongmo-mark-mono-dark.svg` | Birch | |
| `nonupf/nonupf-logo-horizontal-reversed.svg` | `nonupf/nonupf-logo-horizontal-mono-black.svg` | Birch | |
| `nonupf/nonupf-logo-horizontal-reversed.png` | `nonupf/nonupf-logo-horizontal-mono-black.svg` | Birch | 960 |
| `nonupf/nonupf-logo-horizontal-color.png` | `nonupf/nonupf-logo-horizontal-color.svg` | As drawn | 960 |
| `nonupf/nonupf-mark-reversed.svg` | `nonupf/nonupf-mark-mono-black.svg` | Birch | |
| `collective/collective-logo-horizontal-mono-dark.png` | `collective/collective-logo-horizontal-mono-dark.svg` | As drawn | 960 |
| `collective/collective-logo-horizontal-color.svg` | `collective/collective-logo-horizontal-mono-dark.svg` | Forest | |
| `collective/collective-logo-horizontal-color.png` | `collective/collective-logo-horizontal-mono-dark.svg` | Forest | 960 |
| `collective/collective-logo-horizontal-reversed.svg` | `collective/collective-logo-horizontal-mono-dark.svg` | Birch | |
| `collective/collective-logo-horizontal-reversed.png` | `collective/collective-logo-horizontal-mono-dark.svg` | Birch | 960 |
| `collective/collective-mark-mono-dark.png` | `collective/collective-mark-mono-dark.svg` | As drawn | 512 |
| `collective/collective-mark-color.svg` | `collective/collective-mark-mono-dark.svg` | Forest | |
| `collective/collective-mark-color.png` | `collective/collective-mark-mono-dark.svg` | Forest | 512 |
| `collective/collective-mark-reversed.svg` | `collective/collective-mark-mono-dark.svg` | Birch | |
| `collective/collective-mark-reversed.png` | `collective/collective-mark-mono-dark.svg` | Birch | 512 |

The Collective's color files are Forest, its artwork color (see `brands/food-integrity-collective.md`).

Certification seals are not derived. On dark grounds they use the white files each program supplies, as their trademark guides require.

Other Non-UPF Verified artwork in `public/brand/nonupf/graphics/` (not logos, so not in the inventory above), one-color black `#231F20` vectors supplied in #22, all built around the program URL: `nonupf-graphic-url-vertical.svg` ("nonultraprocessed.org" set vertically with a small NON UPF), `nonupf-graphic-url-badge.svg` (the icon in a circle under an arc of "nonultraprocessed.org") and `nonupf-graphic-url-wave.svg` ("NONULTRAPROCESSED.ORG" on a wave with NON UPF). They are submarks. Use them on social media, merchandise and campaign collateral, and as watermarks; they need no approval. Use them only once the corporate logo or the verification mark is already established in the piece, never in place of either.

Other Collective artwork in `public/brand/collective/` (not logos, so not in the inventory above): `campaign/collective-campaign-nourish-life-badge.png` and `collective-campaign-nourish-life-badge-light.png` (the "Food should nourish life" badge), and `illustrations/collective-petals-*.png` (the petals motif). These files still use the Collective's earlier colors, green `#255330` and lime `#E2E98D`. They are to be recolored to Forest and Romanesco, and the earlier colors are retired; the design team supplies the recolored files, which replace these under the same names.

Photography in `public/brand/fip/`: `fip-photo-butterfly-wing.jpg`, a close-up of a butterfly wing. It is no longer shown in the showcase. Its source, license and credit are not on record yet, as "Photography sourcing" in `01-brand-architecture.md` requires.

"Program trademark kit" files came from the artwork folders each program sends licensees, received 2026-10-08. The kits also hold EPS, AI and full-size JPG files for print; those stay with the programs and are not stored here. The bilingual mark in white and the French mark are not in the kit as web files; the one-color bilingual and FSIS marks were supplied as vectors on 2026-11-21.

Program trademark guides (the rules for seal use on pack and in marketing). Each program also has a trademark usage page in this system, written for participants: `trademark/non-gmo-project.md` and `trademark/non-upf-verified.md`, published as standalone pages at `trademark/non-gmo-project.html` and `trademark/non-upf-verified.html`:

- Non-GMO Project Trademark Use Guide v2.2: https://www.nongmoproject.org/wp-content/uploads/NGP-trademark-use-guide-v2.2.pdf
- Non-UPF Verified Trademark Use Guide (December 2025): https://nonultraprocessed.org/wp-content/uploads/2026/06/non-upf-verified-trademark-use-guide-v1.pdf

## Icons and share images

The build makes every brand's favicon, app icons, social avatar and share image from the files above, so none are exported by hand. Each places an official file, centered, on a transparent or Birch square: that is layout, not redrawing. A one-color source may be recolored to a palette color, as in "Derived files"; anything else is used as drawn. Artwork is the share of the canvas the artwork's box takes, so the maskable icon keeps the mark inside the center safe zone and the avatar keeps it inside the circle platforms crop to. Never edit these files by hand.

| File | Source | Color | Size | Ground | Artwork |
|---|---|---|---|---|---|
| `fip/icons/fip-favicon.svg` | `fip/fip-mark-color.svg` | As drawn | 32 | None | 100 |
| `fip/icons/fip-favicon-32.png` | `fip/fip-mark-color.svg` | As drawn | 32 | None | 100 |
| `fip/icons/fip-apple-touch-icon-180.png` | `fip/fip-mark-color.svg` | As drawn | 180 | Birch | 70 |
| `fip/icons/fip-icon-192.png` | `fip/fip-mark-color.svg` | As drawn | 192 | Birch | 70 |
| `fip/icons/fip-icon-512.png` | `fip/fip-mark-color.svg` | As drawn | 512 | Birch | 70 |
| `fip/icons/fip-icon-512-maskable.png` | `fip/fip-mark-color.svg` | As drawn | 512 | Birch | 56 |
| `fip/icons/fip-app-store-1024.png` | `fip/fip-mark-color.svg` | As drawn | 1024 | Birch | 70 |
| `fip/icons/fip-avatar-400.png` | `fip/fip-mark-color.svg` | As drawn | 400 | Birch | 62 |
| `fip/icons/fip-share-1200x630.png` | `fip/fip-logo-horizontal-color.svg` | As drawn | 1200 x 630 | Birch | 50 |
| `nongmo/icons/nongmo-favicon.svg` | `nongmo/nongmo-mark-color.svg` | As drawn | 32 | None | 100 |
| `nongmo/icons/nongmo-favicon-32.png` | `nongmo/nongmo-mark-color.svg` | As drawn | 32 | None | 100 |
| `nongmo/icons/nongmo-apple-touch-icon-180.png` | `nongmo/nongmo-mark-color.svg` | As drawn | 180 | Birch | 70 |
| `nongmo/icons/nongmo-icon-192.png` | `nongmo/nongmo-mark-color.svg` | As drawn | 192 | Birch | 70 |
| `nongmo/icons/nongmo-icon-512.png` | `nongmo/nongmo-mark-color.svg` | As drawn | 512 | Birch | 70 |
| `nongmo/icons/nongmo-icon-512-maskable.png` | `nongmo/nongmo-mark-color.svg` | As drawn | 512 | Birch | 56 |
| `nongmo/icons/nongmo-app-store-1024.png` | `nongmo/nongmo-mark-color.svg` | As drawn | 1024 | Birch | 70 |
| `nongmo/icons/nongmo-avatar-400.png` | `nongmo/nongmo-mark-avatar-color.svg` | As drawn | 400 | Birch | 100 |
| `nongmo/icons/nongmo-share-1200x630.png` | `nongmo/nongmo-logo-horizontal-mono-dark.svg` | Monarch | 1200 x 630 | Birch | 50 |
| `nonupf/icons/nonupf-favicon.svg` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 32 | None | 100 |
| `nonupf/icons/nonupf-favicon-32.png` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 32 | None | 100 |
| `nonupf/icons/nonupf-apple-touch-icon-180.png` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 180 | Birch | 70 |
| `nonupf/icons/nonupf-icon-192.png` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 192 | Birch | 70 |
| `nonupf/icons/nonupf-icon-512.png` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 512 | Birch | 70 |
| `nonupf/icons/nonupf-icon-512-maskable.png` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 512 | Birch | 56 |
| `nonupf/icons/nonupf-app-store-1024.png` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 1024 | Birch | 70 |
| `nonupf/icons/nonupf-avatar-400.png` | `nonupf/nonupf-mark-mono-black.svg` | Dragon Fruit | 400 | Birch | 62 |
| `nonupf/icons/nonupf-share-1200x630.png` | `nonupf/nonupf-logo-horizontal-color.svg` | As drawn | 1200 x 630 | Birch | 50 |
| `collective/icons/collective-favicon.svg` | `collective/collective-mark-color.svg` | As drawn | 32 | None | 100 |
| `collective/icons/collective-favicon-32.png` | `collective/collective-mark-color.svg` | As drawn | 32 | None | 100 |
| `collective/icons/collective-apple-touch-icon-180.png` | `collective/collective-mark-color.svg` | As drawn | 180 | Birch | 70 |
| `collective/icons/collective-icon-192.png` | `collective/collective-mark-color.svg` | As drawn | 192 | Birch | 70 |
| `collective/icons/collective-icon-512.png` | `collective/collective-mark-color.svg` | As drawn | 512 | Birch | 70 |
| `collective/icons/collective-icon-512-maskable.png` | `collective/collective-mark-color.svg` | As drawn | 512 | Birch | 56 |
| `collective/icons/collective-app-store-1024.png` | `collective/collective-mark-color.svg` | As drawn | 1024 | Birch | 70 |
| `collective/icons/collective-avatar-400.png` | `collective/collective-mark-color.svg` | As drawn | 400 | Birch | 62 |
| `collective/icons/collective-share-1200x630.png` | `collective/collective-logo-horizontal-color.svg` | As drawn | 1200 x 630 | Birch | 50 |

At 16px, the Food Integrity Project butterfly and the Non-UPF Verified icon stay clear. The Non-GMO Project outline Butterfly thins out but keeps its shape. The Food Integrity Collective mark's thin lines blur below 32px; it is used in full until a simplified favicon is supplied (tracked as a `question` issue).

## Naming

`{brand}-{asset}-{lockup}-{tone}.{ext}`

The lockup part is left out for a mark in its default form (`nongmo-mark-color.svg`).

| Part | Values |
|---|---|
| brand | `fip`, `nongmo`, `nonupf`, `collective` |
| asset | `logo` (with wordmark), `mark` (symbol only), `seal` |
| lockup | `horizontal`, `stacked`, `endorsed`, `verified` (seals), `circular` (secondary seal), `bilingual` (English and French seal), `fsis` (Non-GMO Project Mark for FSIS-regulated products), `avatar` (mark in a circle for social profiles), `filled` (a mark drawn with solid fills rather than outline) |
| tone | `color`, `reversed` (Birch one color, for dark or brand grounds), `mono-dark` (one color, dark: black, or the program's own one-color dark), `mono-black` (one color, black, for a program whose `mono-dark` files are not black), `mono-light` (one color, light) |

SVG for everything on screen once supplied. PNG only where a platform requires it (touch icons, social images, email clients that block SVG).

## Choosing a variant

| Situation | Use |
|---|---|
| Site or app header, wide screens | Horizontal logo, color |
| Header on small screens (under 400px of space) | Mark only, with the brand name in the accessible label |
| Footer on a program page | Program logo, plus the endorsement line |
| Program page where the parent must be visible | Endorsement lockup (below) |
| On the brand dark, a hero gradient, dark mode or any dark ground | The Birch `reversed` logo or mark. Never the color logo, never white. Seals use their white files (see "Derived files") |
| Single-color printing, embossing | Mono |
| Favicon, app icon, social avatar | Mark, on Birch: the generated files in `<brand>/icons/` |
| Email header | Horizontal logo, PNG at 2x, with alt text |
| On photography | The Birch `reversed` mark or logo on a calm part of the image |

## Logo by application

Which artwork and which file to use for each application, by program. Sizes are what each platform asks for; the artwork follows "Choosing a variant" above and the minimum sizes below.

| Application | Size and format | Artwork |
|---|---|---|
| Favicon | SVG, plus a 32 x 32px PNG fallback. Browsers draw it at 16 to 32px | Mark |
| Apple touch icon | 180 x 180px PNG with no transparency | Mark centered on a Birch square |
| Web app icon (manifest) | 192 x 192 and 512 x 512px PNG, plus a 512px maskable version with the mark inside the center 80% | Mark on a Birch square |
| App store icon | 1024 x 1024px PNG, square, no transparency (the store rounds the corners) | Mark on a Birch square |
| Social avatar (profile picture) | PNG, 400 x 400px or larger. Platforms crop it to a circle, so keep the artwork inside it | Mark, or the avatar file where one exists |
| Social share image (Open Graph) | 1200 x 630px PNG or JPG | Horizontal logo on Birch. A seal only when the page is about one verified product |
| Site or app header | SVG, at least 120px wide | Horizontal logo; the mark alone under 400px of space |
| Footer | SVG | Program logo plus the endorsement line |
| Email header | PNG at twice the display size, with alt text | Horizontal logo |
| Embossing, one-color use | SVG | Mono-dark (or `mono-black`); the Birch `reversed` file on dark grounds |
| Product page seal | SVG, at least the seal's screen minimum | Certification seal, only on a currently verified product |
| On photography | SVG | The Birch `reversed` mark or logo on a calm part of the image, with a scrim if needed |

Square icons and share images are made by placing the official file on a Birch background (see "Icons and share images"). That is layout, not redrawing: never change the artwork itself.

### Food Integrity Project

| Application | File |
|---|---|
| Favicon, touch and app icons, social avatar, share image | The files in `fip/icons/` (see "Icons and share images"): the butterfly in Cacao, on Birch |
| Header | `fip/fip-logo-horizontal-color.svg`; `fip/fip-mark-color.svg` in narrow headers |
| Footer | `fip/fip-logo-horizontal-color.svg` on Birch, or `fip/fip-logo-horizontal-reversed.svg` on Cacao |
| Square and narrow formats (mobile footers, share images, slides, signage) | `fip/fip-logo-stacked-color.svg` on Birch, or `fip/fip-logo-stacked-reversed.svg` on Cacao |
| One-color | `fip/fip-logo-stacked-mono-dark.svg` |
| Email header | `fip/fip-logo-horizontal-color.png` on White, or `fip/fip-logo-horizontal-reversed.png` on Cacao |
| Dark grounds, photography | `fip/fip-logo-horizontal-reversed.svg`, or `fip/fip-mark-reversed.svg` in tight spaces |

### Non-GMO Project

| Application | File |
|---|---|
| Favicon, touch and app icons, social avatar, share image | The files in `nongmo/icons/`: the outline Butterfly on Birch; the avatar file for the social avatar |
| Header | `nongmo/nongmo-logo-horizontal-color.png` on Birch, or `nongmo/nongmo-logo-horizontal-reversed.svg` on Forest; `nongmo/nongmo-mark-color.svg` in narrow headers |
| Footer | `nongmo/nongmo-logo-horizontal-reversed.svg` on Forest |
| Email header | `nongmo/nongmo-logo-horizontal-color.png` on White (913px wide, sharp up to 456px displayed), or `nongmo/nongmo-logo-horizontal-reversed.png` on Forest |
| One-color | `nongmo/nongmo-logo-horizontal-mono-dark.svg` or `nongmo/nongmo-mark-mono-dark.svg` |
| Product page seal | `nongmo/nongmo-seal-verified-color.svg`; `nongmo/nongmo-seal-verified-mono-light.png` on dark grounds; `nongmo/nongmo-seal-fsis-mono-dark.svg` for FSIS products, with the required text; `nongmo/nongmo-seal-bilingual-color.jpg` for products sold in Canada |
| Dark grounds, photography | `nongmo/nongmo-logo-horizontal-reversed.svg`, or `nongmo/nongmo-mark-reversed.svg` in tight spaces |

### Non-UPF Verified

| Application | File |
|---|---|
| Favicon, touch and app icons, social avatar, share image | The files in `nonupf/icons/`: the icon in Dragon Fruit on Birch. These and the social avatar are the only places the icon alone is approved; where a wider avatar fits, `nonupf/nonupf-logo-horizontal-color.svg` |
| Header | `nonupf/nonupf-logo-horizontal-color.svg` on Birch. In narrow headers keep the logo at 120px or wider, since the icon alone needs approval |
| Footer | `nonupf/nonupf-logo-horizontal-color.svg` on Birch, or `nonupf/nonupf-logo-horizontal-reversed.svg` on Dark Matter |
| Email header | `nonupf/nonupf-logo-horizontal-color.png` on White, or `nonupf/nonupf-logo-horizontal-reversed.png` on Dark Matter |
| One-color | `nonupf/nonupf-logo-horizontal-mono-black.svg` |
| Product page seal | `nonupf/nonupf-seal-verified-color.svg`; `nonupf/nonupf-seal-verified-mono-light.png` on dark grounds; `nonupf/nonupf-seal-circular-color.png` only where the primary cannot fit; `nonupf/nonupf-seal-verified-color.png` in email |
| Dark grounds, photography | `nonupf/nonupf-logo-horizontal-reversed.svg` |

### Food Integrity Collective

| Application | File |
|---|---|
| Favicon, touch and app icons, social avatar, share image | The files in `collective/icons/`: the mark in Forest on Birch |
| Header | `collective/collective-logo-horizontal-color.svg` on Birch, or `collective/collective-logo-horizontal-reversed.svg` on Forest; `collective/collective-mark-color.svg` in narrow headers |
| Footer | `collective/collective-logo-horizontal-reversed.svg` on Forest |
| Email header | `collective/collective-logo-horizontal-color.png` on White, or `collective/collective-logo-horizontal-reversed.png` on Forest |
| One-color | `collective/collective-logo-horizontal-mono-dark.svg` or `collective/collective-mark-mono-dark.svg` |
| Dark grounds, photography | `collective/collective-logo-horizontal-reversed.svg`, or `collective/collective-mark-reversed.svg` in tight spaces |

## Endorsement lockups

How a program shows it belongs to the Food Integrity Project.

| Form | Layout | Use |
|---|---|---|
| Horizontal (preferred) | Program seal or logo, a hairline rule, then one line: "A program of the", the parent butterfly, "Food Integrity Project", in Quicksand 600 caps, tracked like the `eyebrow` style | Site footers, decks, signage |
| Stacked (narrow formats) | Program seal or logo, a hairline rule below, then two tiers: "A program of" in Quicksand caps, and below it the parent butterfly followed by "Food Integrity Project" in Quicksand Bold, sentence case, at 20px on screen | Mobile footers, narrow print |

| Rule | Detail |
|---|---|
| Relative size | The line is 14px beside a 96px seal on screen (about 15% of the program mark's height), and 12px in compact footers. The butterfly is 1.5 times the text size: the one use of the parent mark below the 24px mark minimum. The endorsement never outweighs the program mark |
| Wrapping | When the horizontal line wraps, it breaks after "the", so the butterfly always stays with the name |
| Accessible name | The butterfly is decorative (`alt=""`): the text already reads "A program of the Food Integrity Project" |
| Separation | A hairline rule or a full clear-space gap always sits between the two marks, so they never read as one lockup |
| Color | The butterfly is Cacao on light grounds and Birch on dark ones, never the program's colors. The text takes `--muted-foreground` on light grounds and Birch on dark ones. |
| On pack | Certification seals appear alone on packaging. Endorsement lockups are for owned channels: sites, decks, signage, print |

There are no separate lockup files. The `EndorsementLockup` component builds each lockup from the program's official file and the parent butterfly (`fip-mark-color.svg`, or `fip-mark-reversed.svg` on dark grounds), with the rule between them and the words set in type, so a lockup always uses the current files. It never redraws either mark.

## Clear space and size

**Clear space:** X = the cap height of the wordmark. Nothing enters this zone: no type, rule, image edge or other mark. For the Non-GMO Project Verified Mark, X is the height of the capital "N" in "Non-GMO", measured from the white edge. For the Non-UPF Verified seal, X is the height of the capital "N" in "Non-UPF", measured from the outside of the keyline.

**Minimum sizes:**

| Asset | Screen minimum | Print minimum |
|---|---|---|
| Non-GMO Project Verified Mark | 72px wide (the program sets print sizes only) | 3/8 in tall and 1/2 in wide |
| Non-GMO Project bilingual Mark | 72px wide | 3/8 in tall and 3/4 in wide |
| Non-UPF Verified primary (rectangular) seal | 72px wide, the same as the Non-GMO Project Verified Mark | 3/8 in tall and 1/2 in wide |
| Parent logo (Food Integrity Project, horizontal) | 96px wide | 0.75 in (19 mm) wide |
| Non-UPF Verified secondary (circular) seal | 60px wide | 0.375 in wide |
| Program horizontal logo | 120px wide | 30 mm wide |
| Mark only | 24px | 8 mm |

The seal URL (nongmoproject.org, nonultraprocessed.org) must stay readable at every allowed size.

## Never

- Redraw, trace, approximate or rebuild a logo or seal in SVG, CSS, canvas, icon fonts or text.
- Recolor by hand, add effects (shadows, glows, outlines, gradients), stretch, rotate or crop.
- Animate a seal. Logos may fade in with the page, nothing more.
- Lock the parent to a seal: no shared container, no touching edges, no combined mark. Endorsement is adjacency, not fusion.
- Rearrange lockup parts or build an endorsed lockup that reads as one mark.
- Put a logo inside a sentence as a word. The one exception is the parent butterfly in the endorsement line (see "Endorsement lockups").
- Put a color or white logo on a dark ground. Logos on dark grounds are the Birch `reversed` files.
- Use a logo or seal as a watermark, or show one at any opacity other than 100%. Logos are not watermarks.
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

All logos render through one component so the rules above are enforced in one place. This repository specifies the components but does not ship code: each app builds them in its own `components/brand/` from this spec, the same way it owns its shadcn/ui components (see `06-ui-framework.md`). When a second app needs them, they move into a shared package.

```tsx
<BrandLogo brand="nongmo" variant="horizontal" tone="color" href="/" />
<BrandLogo brand="collective" variant="mark" tone="reversed" size={24} decorative />
<CertificationSeal program="nonupf" tone="color" size={96} />  // only renders inside a verified product context
<EndorsementLockup program="nongmo" layout="horizontal" />
```

Behavior:
- Picks the file from the naming scheme, so a missing asset fails loudly in development.
- Enforces minimum sizes.
- Sets alt text from the table above.
- On a dark ground (brand dark, hero gradient, dark mode, photography) it uses the Birch `reversed` tone and never a color or white logo file. Seals keep their programs' white `mono-light` files.
- If the asset file does not exist yet, renders a neutral placeholder box with the brand name and a console warning. It never generates artwork.

## Rules for Claude Code

- Use `<BrandLogo />`, `<CertificationSeal />` and `<EndorsementLockup />`. Never `<img>` a logo directly in feature code, and never draw one.
- Pick the variant with the table in "Choosing a variant" and the file with "Logo by application".
- Do not show `<CertificationSeal />` unless the data says the product is currently verified for that program.
- If asked to "make a logo" or "mock up the seal", do not produce artwork. Use the placeholder and flag it for the design team.
