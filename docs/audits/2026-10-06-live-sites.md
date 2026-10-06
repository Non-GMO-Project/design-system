# Live site audit: nongmoproject.org and nonultraprocessed.org

**Date:** 2026-10-06
**Compared against:** design system v0.4 (`docs/design-system/`)
**Method:** Both home pages loaded in headless Chrome at 1440px (desktop) and 393px (iPhone 16). Computed styles were read from the rendered page: fonts, text and background colors by area, buttons, headings, contrast of every text element against its background, images without `alt`, targets under 24px, landmarks, and horizontal overflow. Home pages only; inner pages were not checked.

## Summary

Both sites already run on the new palette. Forest, Monarch, Seafoam, Frost and Birch are on nongmoproject.org; Dark Matter, Dragon Fruit, Almond, Frost and Birch are on nonultraprocessed.org, all at their exact hex values. Primary buttons match the system's mappings exactly: Monarch with Forest text (5.6:1), and Dragon Fruit with Birch text (5.1:1). Lora headings match. Neither site scrolls sideways on a phone.

The gaps fall into four groups:

1. **Where the sites depart from the brand guide.** Non-GMO Project is a dark-ground site, sets body text in Quicksand, and uses uppercase buttons.
2. **Accessibility.** There's a Dragon Fruit on Almond contrast failure, images without `alt`, small targets, a scrolling ticker with no pause control, and missing landmarks on Non-UPF Verified.
3. **Brand architecture and wording.** The Non-UPF Verified site calls itself part of the Food Integrity Collective, and both sites say "certification".
4. **Where the system should learn from the sites.** The italic signature word in headlines, an existing Non-UPF Verified logo lockup, Avenir on the web, and Lora 400 at display sizes.

## What matches

| Area | nongmoproject.org | nonultraprocessed.org | System |
|---|---|---|---|
| Palette | Forest `#053220`, Monarch `#F18A00`, Seafoam `#DDEED6`, Frost, Birch | Dark Matter `#0A2041`, Dragon Fruit `#CE1B6A`, Almond `#F5DFCE`, Frost, Birch | Same values |
| Primary button | Monarch fill, Forest text, 5.6:1 | Dragon Fruit fill, Birch text, 5.1:1 | Same mapping |
| Headings | Lora | Lora | Lora |
| Eyebrows | Quicksand caps with a rule ("News and events") | | Matches the guide's eyebrow |
| Mobile | No horizontal scroll at 393px | No horizontal scroll at 393px | Required |
| Logo and seal | Official Non-GMO Project logo and seal | Official Non-UPF Verified mark | Asset rules |

## Departures from the brand guide and system

| # | Finding | Site | System says | Recommendation |
|---|---|---|---|---|
| 1 | The page is about 90% Forest by area: a dark-ground site with Birch text | Non-GMO Project | Birch is the default background for every brand; ratio 55 Birch / 25 Forest | **Brand decision.** Either the site moves toward Birch, or the system adds an approved "inverted" page mode for Non-GMO Project. Today they disagree |
| 2 | Body copy is set in Quicksand 400 and 700 | Non-GMO Project | Quicksand is never for paragraphs; body is Avenir (Nunito Sans on web) | Move body text to the sans when the site is next revised |
| 3 | Buttons and navigation are uppercase ("GET VERIFIED", "WHY NON GMO") | Non-GMO Project | Sentence case everywhere except eyebrows | Switch to sentence case. Uppercase Quicksand is harder to read and conflicts with `10-writing.md` |
| 4 | Monarch appears many times per view: nav CTA, hero CTA, headline word | Non-GMO Project | One point of emphasis per view; signature about 8% | Keep one Monarch CTA per view; secondary CTAs in Birch (the site already has a Birch "Find products" button) |
| 5 | Buttons use title case ("Apply for Verification") and vague labels ("Learn more", "Explore") | Both | Sentence case, verb + object | "Apply for verification", "Read about the standard" |
| 6 | Button radius is 8px on one site and 4px on the other | Both | Buttons `rounded-md` (8px) | Align Non-UPF Verified to 8px |
| 7 | Headings and body text are Tailwind greys (`#111827`, `#374151`), not Dark Matter | Non-UPF Verified | One dark sets all body type | Set text to Dark Matter. Contrast is fine either way; this is brand consistency |
| 8 | The builder palette still holds retired colors: Deep Eggplant `#221C35` (set as body text color) and Pale Blush `#F6E0CF` | Non-GMO Project | Retired in `02-color.md` | Remove them from the Breakdance global palette so editors cannot pick them |
| 9 | Builder palette entries are named by UUID (`--bde-palette-color-1-cab6e146…`) | Both | Semantic token names | Rename the global colors in Breakdance to the system names (Birch, Forest, Monarch…) |

## Accessibility (WCAG 2.2 AA)

| # | Finding | Site | Severity | Fix |
|---|---|---|---|---|
| A1 | Dragon Fruit text on Almond is **4.0:1** at 16px, 13 instances (the scrolling ticker) | Non-UPF Verified | Fails 1.4.3 | Dark Matter text on Almond (12.6:1), or Dragon Fruit only at 24px and up |
| A2 | The ticker scrolls continuously with no pause control | Non-UPF Verified | Fails 2.2.2; breaks the system's motion rules | Make it static, or add pause and respect `prefers-reduced-motion` |
| A3 | Images with no `alt` attribute at all: 19 of 22 (Non-GMO Project), 12 of 20 (Non-UPF Verified) | Both | Fails 1.1.1 where meaningful | Decorative images get `alt=""`; meaningful ones get alt text. The seal's alt is "Non-GMO Project Verified" |
| A4 | Interactive targets under 24 x 24px: 17 (Non-GMO Project), 15 (Non-UPF Verified) | Both | 2.5.8 risk | Enlarge footer and social links, or add spacing so each has a 24px area |
| A5 | No `main` landmark and no skip link | Non-UPF Verified | Fails 2.4.1 | Add `<main>` and a "Skip to main content" link (Non-GMO Project has both) |
| A6 | No `footer` landmark detected | Both | Best practice | Wrap the site footer in `<footer>` |
| A7 | Hero headline colors one word in the signature color | Both | Passes contrast (Monarch on Forest 5.6:1, Dragon Fruit on Birch 5.1:1) | Fine for contrast; see S1 below |

## Brand architecture and wording

| # | Finding | Site | System says | Recommendation |
|---|---|---|---|---|
| B1 | "Non-UPF Verified is part of the Food Integrity Collective, a nonprofit initiative…" | Non-UPF Verified | The Food Integrity Project is the parent; the Collective is a membership program | **Brand decision.** Update the copy to "a program of the Food Integrity Project" when the new architecture launches |
| B2 | "A certification that goes beyond the label", "nonprofit certification", "most trusted third-party certifier" | Both | Word list: "verified", not "certified" | **Brand decision.** Live copy uses both words. Either allow "certification" for the program category and keep "verified" for product status, or update the copy |
| B3 | "ultraprocessed" (no hyphen) and "consumers" | Non-UPF Verified | "ultra-processed"; "shoppers" in public copy | Pick one spelling and add it to the word list; the system currently says hyphenated |

## What the system should learn from the sites

| # | Observation | Proposed change to the system |
|---|---|---|
| S1 | Both sites set one phrase of the hero headline in Lora italic and the signature color ("*Non-GMO Project*", "*beyond*") | Today `03-typography.md` says "Do not color a single word in a headline for effect." This is an established brand device that passes contrast. Make it an approved display-only pattern: one phrase, italic, signature color, display and h1 only, contrast checked |
| S2 | nonultraprocessed.org has an organizational lockup (circle icon + "NON UPF VERIFIED") | **Done:** the site's SVG (`non-upf-title-logo.svg`) is now `public/brand/nonupf/nonupf-logo-horizontal-color.svg`, and `04-logos-and-marks.md` lists it. Reversed and one-color versions are still needed |
| S3 | nonultraprocessed.org serves Avenir as a web font | The system uses Nunito Sans because Avenir "cannot be embedded". Confirm whether a web license exists; if so, put Avenir first in `--font-sans` |
| S4 | Both sites set display headlines in Lora 400 | The system uses Lora 500 at every heading size. Consider 400 for `display` and `h1` |
| S5 | Non-GMO Project's dark ground with Birch text reads strongly and is accessible (13.8:1) | If brand approves finding 1, document a per-brand "page ground" token so a program can choose its dark as the default surface |
| S6 | Both sites run on WordPress with the Breakdance builder | Add a short "Applying the system in Breakdance" note: map global colors and fonts to the token names, and set button presets from `06-ui-framework.md` |

## Logo files found in the media libraries

Both sites expose their WordPress media library, which holds larger and vector versions of the marks than the pages display. These were added to `public/brand/`:

| File in the system | Source | Improvement |
|---|---|---|
| `nongmo-logo-horizontal-color.png` | `NGP_corp_logo_new.png`, 913 x 432 | Was 300 x 142 |
| `nongmo-logo-horizontal-reversed.png` | `NGP_corp_logo_new_white.png`, 913 x 432 | New: the reversed logo was missing |
| `nongmo-mark-color.svg` | `butterfly-logo.svg` | New: vector Butterfly |
| `nongmo-seal-verified-color.png` | `NGPV_full_color-1.png`, 1205 x 882 | Lossless PNG instead of JPEG |
| `nonupf-logo-horizontal-color.svg` | `non-upf-title-logo.svg` | New: organizational logo, vector |
| `nonupf-seal-verified-color.svg` | `non-upf-package-logo.svg` | Vector instead of PNG |

Not taken: watermarked marks (FSIS, bilingual, French, English) because they carry watermarks; small size variants; files the system already has at equal or better quality. The libraries also hold each program's Trademark Use Guide PDF, now linked from `04-logos-and-marks.md`.

## foodintegritycollective.org (added later the same day)

Checked for logo files; a light visual review only, not the full measurement run above. The site is on Squarespace.

| Finding | System says | Note |
|---|---|---|
| Header is clay pink (about `#E3A084`) with a cream logo; body ground is Birch-like cream; footer is lime | Collective is Birch ground, Forest dark, Corn Flower support, Romanesco signature | The site still uses the Collective's earlier palette. Clay is not in the new palette, and Corn Flower does not appear |
| Buttons are lime with Forest-green text ("Join Us!", "Learn More") | Primary is Romanesco with Forest text | Same idea, earlier lime (`#E2E98D`) instead of Romanesco (`#D3D95E`) |
| Headings and body are a serif that is not Lora | Lora headings, sans body | Typography predates the style guide |
| Artwork greens are `#22532D` to `#255330` | Forest `#053220` | Older Collective green |

Logo files taken: the full horizontal lockup in cream (`collective-logo-horizontal-mono-light.png`, 1501 x 509), the "Food should nourish life" badge in two versions, and three petals illustrations. Not taken: five petals colorways in teal, gold, clay and grey (off-palette), the favicon (smaller than the existing mark file), third-party podcast logos.

## Suggested order

1. Accessibility fixes A1 to A5. These are small and remove real barriers.
2. Brand decisions on findings 1 and 2, B1, B2 and S1. These change either the sites or the system.
3. Builder hygiene (findings 8 and 9, S6) so editors cannot drift.
4. Typography and case alignment (findings 2, 3, 5 and 7) in the next site revision.

## Limits of this audit

Home pages only, one load each, with the cookie banner present. Contrast was measured on solid backgrounds; text over photos was not measured. Automated checks catch roughly a third of accessibility issues; a keyboard and screen reader pass is still needed.
