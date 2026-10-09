# Non-GMO Project

**Brand context:** `data-brand="nongmo"`
**Role:** Consumer-facing seal. The established mark, with the highest recognition. Leads on pack and in retail. Runs Non-GMO Project Verified.
**Voice:** Confident, established, shopper-facing.

## Who it speaks to

Shoppers who look for the seal, brands and manufacturers seeking verification, Technical Administrators, retailers. Two shopper groups from earlier research: "Food as Medicine" (health and clean labels, cautious about technology) and "Agents of Intelligent Change" (younger, systemic impact, forward-looking).

## Personality

Trustworthy, nurturing, confident, playful. Friendly to shoppers, exacting with brands. Respects all living things and conveys deep technical expertise in a warm, engaging way.

## Color roles

| Role | Color | Hex | Token |
|---|---|---|---|
| Ground | Birch | `#FFFDEB` | `--background` |
| Dark (all type, structure) | Forest | `#053220` | `--foreground`, `--brand-dark` |
| Supporting tint | Seafoam | `#DDEED6` | `--brand-support`, `--secondary` |
| Signature | Monarch | `#F18A00` | `--primary`, `--brand-signature` |
| Utility | Frost | `#F3F4F2` | `--muted`, `--field` |

**Ratio:** 55 Birch, 25 Forest, 12 Seafoam, 8 Monarch.

Forest carries type and structure; Monarch is reserved for a single point of emphasis per view. Seafoam fills panels and cards where Birch alone is too flat. Monarch on Birch fails contrast for body text: use it for fills, rules and large display only, never for paragraphs or small labels. Primary buttons are Monarch with Forest text (5.6:1).

## Logos and seal

`nongmo-logo-*` and `nongmo-seal-verified-*`. Four distinct assets: the organizational logo (butterfly + wordmark), the Verification Mark (the seal), the butterfly avatar for social profiles, and the trademarked Butterfly, used sparingly. The seal follows `../04-logos-and-marks.md` and the Trademark User Guide. In product lists use `StatusBadge status="verified"`; reserve the seal for verified product detail pages and seal education.

## Typography

Shared system. The older Lora + Quicksand + Copperplate stack becomes the house stack (Lora + Avenir + Quicksand); Copperplate is retired.

## Imagery

Fine-line botanical illustrations are a signature element, used with restraint between content blocks and next to educational content (high-risk crops, new GMOs). They live in `public/brand/nongmo/illustrations/`. Photography: rich, warm, natural tones; food preparation, farming, family meals, grocery shopping, community; intentionally inclusive; a clear focal point; real, not staged.

**Photo library.** Use the shared sources in `01-brand-architecture.md`, "Photography sourcing". `TODO(brand): link a Non-GMO Project photo library, if one exists.`

`TODO(design): confirm whether the butterfly can be used as a standalone illustration element outside the trademark rules.`

## Voice

Direct and reassuring. Active voice, plain language, short sentences. Explains what "verified" covers and what it does not. Avoids fear-based language about GMOs; states standards and facts. Messaging pillars: nature (humility), freedom (openness), change (positivity).

## Motion

Shared system. The signature "Verified" moment may use a single Monarch flutter in the glow.

## Typical surfaces

Product and brand finder, seal education pages, brand enrollment and verification flows, Non-GMO Project emails.

## Do

- Let Monarch be the one thing a viewer remembers, once per view.
- Use Seafoam panels to give structure without adding a new color.

## Don't

- Use Monarch as text, or for anything that could mean "warning".
- Put Monarch and Dragon Fruit in the same layout.
- Put the seal next to anything that is not currently verified.
- Use the retired orange `#DF7838` or eggplant `#221C35` in new work.
