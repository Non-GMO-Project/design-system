# Brand architecture

The Food Integrity Project is the canopy over three symbiotic programs, each with its own audience and reputation. This file explains how the brands relate, what they share, what changes between them, and how to decide which brand an interface speaks for. Source: *Food Integrity Project Style Guide*, section 01.

## The family

| Brand | Role | Speaks to | `data-brand` |
|---|---|---|---|
| Food Integrity Project | Parent organization, institutional voice. Governance, funding, policy, employer brand | Funders, partners, press, policy audiences, staff, job seekers | `fip` |
| Non-GMO Project | Consumer-facing seal. The established mark, with the highest recognition; leads on pack and in retail | Shoppers, brands seeking verification, retailers, Technical Administrators | `nongmo` |
| Non-UPF Verified | Consumer-facing seal. The newer standard, deliberately distinct so the two seals never read as one | Shoppers avoiding ultra-processed food, whole-food brands, retailers, researchers | `nonupf` |
| Food Integrity Collective | Membership and advocacy. Speaks to industry and members rather than shoppers. Softer, editorial | Members, industry partners, advocates, event attendees | `collective` |

```
Food Integrity Project                    parent, institutional voice
├── Non-GMO Project                       consumer-facing seal (Non-GMO Project Verified)
├── Non-UPF Verified                      consumer-facing seal (non-ultra-processed food)
└── Food Integrity Collective             membership and advocacy
```

**Model: endorsed house of brands.** Each program leads with its own name and look in its own spaces. The Food Integrity Project appears as an endorser ("A program of the Food Integrity Project") rather than as the headline. On house-level surfaces, the Food Integrity Project leads and the programs appear as equals beneath it.

## Which name leads

| Program leads | Parent leads |
|---|---|
| Packaging, retail, shopper marketing, standard documentation, verification communications. The parent appears only as a small endorsement line, if at all | Annual reports, funder and policy communications, careers and recruiting, press releases about the organization, corporate email signatures |

### Written reference

- On first mention: "Non-GMO Project, a program of the Food Integrity Project." Afterwards, the program name alone.
- Never hyphenate or abbreviate the parent to "FIP" in external copy. (`fip` is fine as an internal code name.)
- Write "Non-GMO Project" and "Non-UPF Verified" exactly; expand "Non-UPF" (non-ultra-processed food) the first time it appears on a page.

### What stays separate

Program seals keep their own color, artwork and standards. The parent does not restyle them, and its palette never overrides a program palette in program materials. Program marks may not be substituted for, combined with or represented by each other's marks.

## What is shared and what varies

| Element | Shared across all brands | Varies by brand |
|---|---|---|
| Color | Birch ground, Frost utility neutral, Stone, status colors, chart palette | The one dark, the supporting tint, the signature |
| Logo | Placement rules, clear space, minimum sizes, file naming, endorsement rules | The logo itself, favicon, social avatar |
| Certification seals | Usage rules | The seal artwork (one per verification program) |
| Typography | Lora, Avenir (Nunito Sans on web), Quicksand; the scale; context pairings | Nothing |
| Icons | Library, registry, sizes, stroke | Nothing. Icons inherit the brand dark |
| Components | All behavior, structure, states, spacing | Colors only, through tokens |
| Motion | All durations, easing, named animations | One optional variation of the signature moment |
| Accessibility | Everything | Nothing |
| Imagery | Photography principles and sourcing rules (below) | Subjects, mood and photo libraries (see brand files) |
| Voice | Plain language, UI writing rules | Personality (see brand files) |

The principle: **brands change how things look, not how things work.** A person moving from the Non-GMO Project product search to the Collective member portal should never have to relearn a control.

**Birch is the family resemblance.** Any layout that starts on Birch already belongs to the group, whichever program fills it.

### Photography sourcing

Where photographs come from, for every brand. This covers photography only; illustrations and graphic motifs are brand assets (see each brand file). What a photo should show is set in each brand file under Imagery.

| Source | When to use it | Rights and credit |
|---|---|---|
| The brand's own photo library | First choice where one exists (see the brand file) | Covered by the commissioning contract |
| Commissioned shoots | Hero imagery and campaigns that need real people, places and products | A signed contract with the photographer that covers the intended uses |
| Adobe Stock | When no library image fits | Use within the terms of the organization's Adobe license |
| Unsplash, Kaboompics, Death to Stock | When no library or Adobe image fits | Check each image's license before use. Credit the photographer when the license asks for it |

- **Direction.** The social team keeps curated [moodboards on Pinterest](https://www.pinterest.com/foodintegritycollective/). Use them for mood and subject, not as a source of images.
- **Know where every image came from.** Keep the license, download record or contract with the project, so the source and terms can be found later.
- **Credits** appear only when the license or contract requires them.
- **Real products must be verified.** If a photo shows an actual, identifiable product, that product must be verified by the program the piece speaks for.
- **AI-generated images** may be used for ideation and creative brainstorming only, not in published work. `TODO(brand): confirm whether AI-generated imagery is allowed in published work, and under what limits.`
- **No formal sign-off.** There is no required approval step for imagery. The brand and creative team can review images on request.

## Choosing the brand context

Ask "who is this surface speaking for, and who is it speaking to?"

| Surface | Brand context | Why |
|---|---|---|
| Organization website home, about, leadership, annual report, careers | `fip` | Parent leads |
| Staff tools and the internal operating system | `fip` | Staff work across all programs |
| Technical Administrator portal (works across programs) | `fip` chrome, program chips on records | Users handle more than one program |
| Non-GMO Project product finder, verification pages, brand enrollment | `nongmo` | Program leads |
| Non-UPF Verified consumer pages, scanning app, standards pages | `nonupf` | Program leads |
| Collective membership, events, advocacy, member portal | `collective` | Program leads |
| "Our programs" page comparing all three | `fip` page, each program card in its own context | House level with equal programs |
| Email from a program | That program | |
| Donation flow | `fip` unless the campaign is for one program | `TODO(brand): confirm` |

When unsure, use `fip`. The house context is always correct, just less specific.

## Multi-program views (operational apps)

Staff and partner tools often show records from several programs on one screen. Do not re-color the app chrome per record. Instead:

- The app shell, navigation and primary actions use `fip`.
- Each record that belongs to a program shows a **program chip**: the program name on that program's subtle tint (Seafoam, Almond, Corn Flower or Loam), with a dot in the program's dark. The chip sets its own `data-brand` so its colors are correct.
- Chips deliberately avoid the signature colors, so Monarch and Dragon Fruit never sit side by side in a table.
- Filters by program use the same chip.
- Detail views for a single program record may tint the page header with that program's `--brand-tint`. The rest of the page stays house level.

```tsx
<ProgramChip program="nonupf" />   // Almond chip, Dark Matter dot + "Non-UPF Verified"
```

## Endorsement and co-branding

### Endorsement line

Every program surface carries the endorsement once, usually in the footer:

> A program of the Food Integrity Project

- Set in Quicksand caps (`eyebrow` style) or `body-sm`, in `--muted-foreground`.
- Preceded by the parent mark in Cacao (or Birch on dark), at 40 to 50% of the program logo's height, separated by a hairline rule.
- Links to the organization website.

### Endorsement lockup

For headers or footers where the parent should be visible, use the lockups in `04-logos-and-marks.md`. Never fuse the two marks into one shape or container.

### Showing two programs together

Only on house-level surfaces. Rules:
- Each program appears in its own container with its own `data-brand`.
- Programs get equal size, equal weight, and a consistent order: Non-GMO Project, Non-UPF Verified, Food Integrity Collective. `TODO(brand): confirm order.`
- Never blend two program colors in one element, gradient or chart series.
- **Monarch and Dragon Fruit never appear in the same layout.** On house-level pages, program cards show their seal or logo, their dark and their supporting tint; the signature colors stay inside each program's own pages. `TODO(brand): confirm this reading of "one program, one accent" for house-level pages.`

### Partner brands (food companies, retailers)

When a partner's product or logo appears (a verified product listing, a retailer partnership page):
- Partner logos are content, shown on a neutral surface, never recolored.
- Our brand frames the content. The partner never sets our colors.
- Verification status on a partner product uses our status badge, not the partner's styling.
- On packaging the certification seal appears alone and never larger than the host brand's logo.

## Rules for Claude Code

- Before building, state the brand context you are using and why, based on the table above.
- Set `data-brand` at the layout or route group level, not on individual components.
- Never hard-code a program color to identify a program. Use `<ProgramChip />` or a nested `data-brand` wrapper.
- Never write "FIP" in user-facing copy.
- If a surface seems to need two brand contexts side by side and it is not a house-level page, stop and flag it.
