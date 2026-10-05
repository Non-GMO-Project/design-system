# Motion

Motion in this system answers people. When someone opens, closes, saves, filters or confirms something, motion shows what changed and where it went. Motion does not decorate, does not loop for attention, and switches off for anyone who asks their device for less motion.

The brand guide does not cover motion; everything here is a system decision. It matches the brand's "plain, unhurried" voice: calm, short, never showy.

## Principles

1. **Respond, then settle.** Most motion starts from a person's action and finishes quickly.
2. **Show cause and effect.** Things enter from where they came from and leave toward where they went: a sheet slides from the edge it lives on, a deleted row collapses in place.
3. **Fast in apps, calmer on public pages.** Staff tools should feel instant. Public pages may take a little more time for one orchestrated moment.
4. **One signature moment.** Each product gets at most one moment of delight (see "Signature moment"). Everything else stays quiet.
5. **Reduced motion is a first-class mode,** not an afterthought.

## Duration tokens

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 0ms | State changes that need no transition (checkbox tick color) |
| `--duration-fast` | 120ms | Hover, press, focus, small color and opacity changes |
| `--duration-base` | 200ms | Most UI: dropdowns, tooltips, toggles, accordions |
| `--duration-moderate` | 280ms | Dialogs, sheets, toasts, tab content |
| `--duration-slow` | 400ms | Page-level transitions, large layout changes |
| `--duration-deliberate` | 640ms | The signature moment only |

Exits run about 20% faster than entrances. Nothing in product UI runs longer than 400ms except the signature moment.

## Easing tokens

| Token | Curve | Use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Things that move or resize on screen |
| `--ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Things appearing (decelerate into place) |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving (accelerate away) |
| `--ease-emphasized` | `cubic-bezier(0.3, 0, 0, 1.15)` | Slight overshoot. Signature moment and success confirmations only |

For Motion (`motion/react`) springs:

| Name | Config | Use |
|---|---|---|
| `spring.snappy` | `{ type: "spring", stiffness: 500, damping: 35 }` | Layout shifts, reordering, toggles |
| `spring.gentle` | `{ type: "spring", stiffness: 260, damping: 30 }` | Sheets, drawers, shared element moves |

Keep these in `lib/motion.ts` and import them. Do not write ad hoc spring values.

## Named animations

Use these by name. Each lists what triggers it, so it is clear the motion answers something. The showcase has a live demo of each.

| Name | What it does | Duration / easing | Trigger | Built with |
|---|---|---|---|---|
| `fade-in` / `fade-out` | Opacity 0 to 1 | base, enter / exit | Tooltips, overlays (backdrop) | tw-animate-css `animate-in fade-in` |
| `pop-in` | Opacity + scale 0.96 to 1 | base, enter | Dropdowns, popovers, combobox lists, from their trigger origin | tw-animate-css `zoom-in-95` |
| `dialog-in` | Opacity + scale 0.98 to 1 + 4px rise | moderate, enter | Dialog, AlertDialog open | tw-animate-css |
| `sheet-in` | Slide from its edge | moderate, `spring.gentle` | Sheet, Drawer open | shadcn default, tuned to tokens |
| `toast-in` | Slide 8px from its stack edge + fade | moderate, enter | Toast appears | Sonner config |
| `expand` / `collapse` | Height auto + fade content | base, standard | Accordion, Collapsible, "show more" | Radix CSS vars `--radix-accordion-content-height` |
| `tab-switch` | Indicator slides; content cross-fades | base, standard | Tab change | Motion `layoutId` for indicator |
| `row-enter` | New row fades in with brand-subtle background that fades out over 1s | base, then 1000ms linear | A record is added to a list or table | CSS |
| `row-exit` | Row fades and collapses height | base, exit | A record is deleted or archived | Motion `AnimatePresence` |
| `reorder` | Items glide to new positions | `spring.snappy` | Sorting, drag and drop | Motion `layout` |
| `press` | Scale to 0.98 | fast, standard | Pointer down on buttons and cards that act | CSS `active:scale-[0.98]` |
| `hover-lift` | Shadow 1 to 2 | fast, standard | Hover on interactive cards only (not static cards) | CSS |
| `focus-ring` | Ring appears | instant | Keyboard focus | CSS. Never animated slowly |
| `skeleton` | Gentle opacity pulse 1 to 0.6 | 1.5s loop | Loading placeholders | `animate-pulse` |
| `spin` | Rotation | 0.8s linear loop | `status.loading` icon in buttons | `animate-spin` |
| `status-change` | Badge cross-fades to new status, icon scales 0.9 to 1 | moderate, emphasized | A record's status changes while on screen | Motion |
| `field-error` | Error message fades in under field; no shake | base, enter | Validation fails | CSS |
| `page-enter` | Content fades in with 8px rise, one time | slow, enter | Route change on public pages only | Motion or View Transitions API |

Shaking fields, bouncing icons, parallax, auto-playing carousels and scroll-jacking are not part of this system.

## Signature moment

**"Verified."** When a verification turns to Verified while someone is watching (a reviewer approves, a brand sees the result), the status badge plays one short sequence: the badge-check icon draws its stroke, the badge settles from scale 0.94 to 1 with `--ease-emphasized`, and a glow in `--brand-signature` blooms once behind it and fades. Total 640ms. It plays once per event, never on page load, never in lists of many records.

This is the one place the system allows delight. The glow takes each brand's signature (a Monarch flutter for Non-GMO Project, Dragon Fruit for Non-UPF Verified), but the shape and timing stay the same. The badge itself keeps status colors. Seals are never animated.

The Collective has no verification. Its equivalent is event registration and joining: the same shape with a "You're registered" or "Welcome, member" state. Non-UPF Verified scan results are information, not verification, so a scan result uses `status-change`, never the signature moment.

`TODO(design): approve or replace the signature moment.`

## Public page orchestration

A public landing page may have one orchestrated entrance: eyebrow, hero headline, supporting text and primary action appear in sequence, 60ms apart, using `page-enter`. Sections further down do not each animate in as you scroll. If a section needs attention, use layout and content, not motion.

## Reduced motion

When `prefers-reduced-motion: reduce` is set:

- Duration tokens collapse to 0 (already handled in `09-tokens.md`).
- Movement (slide, scale, rise) is removed. Opacity fades of 120ms or less may stay, because they help orientation without motion.
- `skeleton` pulse stops; skeletons show static.
- `spin` keeps running, slowed, because a still spinner looks broken. Pair it with "Loading" text.
- The signature moment becomes an instant state change.
- In Motion, wrap the app in `<MotionConfig reducedMotion="user">`.

## Performance

- Animate only `opacity` and `transform`. Avoid animating `width`, `height`, `top`, `left`, shadows on large areas, or filters, except height in accordions where Radix handles it.
- No animation should drop frames on a mid-range phone. Test on a throttled CPU.
- Use `will-change` only during the animation, never permanently.

## Rules for Claude Code

- Use the named animations and tokens. Do not invent durations, easing curves or springs.
- Every animation must have a trigger from the table. If you cannot name the trigger, do not animate.
- Never animate logos beyond a fade, and never animate seals.
- Always handle reduced motion. Use `MotionConfig reducedMotion="user"` and token durations.
