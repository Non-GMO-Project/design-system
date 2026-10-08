# Responsive design

How layouts and components adapt from a 320px phone to a wide desktop. Shoppers check products on phones in the aisle, brands and Technical Administrators work on laptops, members move between both, so every surface is designed for the smallest screen first and grows from there.

## Principles

1. **Mobile first.** Start with the 320px layout, then add columns and chrome as space allows. Never design desktop first and squeeze.
2. **Same content, same features.** A phone gets the same information and actions as a desktop, arranged differently. No "lite" versions and no "use a computer for this" dead ends.
3. **Thumbs, not cursors.** Touch targets are large, primary actions sit within reach, and nothing depends on hover.
4. **Components adapt to their container.** A card or table responds to the space it is given, using container queries, so it works in a sidebar, a sheet or a full page without special cases.
5. **Fast on a mid-range phone on a slow connection.** Performance is part of responsive design, not a separate concern.

## Breakpoints

These are Tailwind's defaults, so `sm:`, `md:`, `lg:`, `xl:` and `2xl:` utilities line up with this table. Breakpoints are minimum widths: styles without a prefix are the phone layout.

| Name | Min width | Typical devices | Layout |
|---|---|---|---|
| base | 0 | Phones in portrait | One column, 16px gutters, menu behind a button, sheets open from the bottom |
| sm | 640px | Large phones in landscape, small tablets | One or two columns, 16px gutters |
| md | 768px | Tablets in portrait | Two columns, 24px gutters, side sheets |
| lg | 1024px | Tablets in landscape, small laptops | App sidebar appears, top navigation on public sites, 32px gutters |
| xl | 1280px | Laptops and desktops | Full layouts, three or four card columns |
| 2xl | 1536px | Wide screens | Content stops growing at its container maximum; extra space becomes margin |

Container maximum widths live in `06-ui-framework.md` (prose 66ch, narrow 640px, default 1200px, wide 1440px).

## Layout behavior

| Element | Small (under 640px) | Medium (640 to 1023px) | Large (1024px and up) |
|---|---|---|---|
| Page gutters | 16px | 24px | 32px |
| Public site navigation | Menu button opens a `Sheet` from the left | Same as small | `NavigationMenu` top bar |
| App navigation | Hidden; menu button opens it as a `Sheet` | Sidebar collapsed to icons, labels in tooltips | Full sidebar |
| Card grids | One column | Two columns | Three or four columns |
| Forms | One column, full-width fields; long forms keep the primary action in a sticky bottom bar | One column, 640px maximum | Same as medium |
| Data tables | Stacked cards (five columns or fewer), or horizontal scroll inside the table container with the first column sticky | Horizontal scroll if needed | Full table |
| Side panel (`Sheet`) | Opens as a bottom `Drawer`, up to 85% of the screen height | Side `Sheet` | Side `Sheet` |
| `Dialog` | Full width with 16px margins; actions stacked, primary on top | Centered, 520px maximum | Same as medium |
| `Tabs` | Scroll sideways; never wrap to two rows | All visible if they fit | All visible |
| Filters | Button opens a `Sheet` with a "Show 24 results" button | `Popover` | `Popover` |
| Toasts | Full width at the bottom, above the safe area | Bottom right | Bottom right |
| Hero | Display type scales down with `clamp()`; image stacks above or below text | Text and image side by side if the image helps | Side by side |
| Footer | Columns stack; endorsement line last | Two columns | One row of columns |
| Brand or program switcher | `Select` | Segmented control if it fits | Segmented control |

## Container queries

Components that can appear in different widths (cards, tables, stat groups, forms in sheets) style themselves against their container, not the viewport. Tailwind CSS v4 supports this without a plugin.

```tsx
<div className="@container">
  <article className="grid gap-4 @md:grid-cols-[120px_1fr]">
    <ProductImage />
    <ProductDetails />
  </article>
</div>
```

Use viewport breakpoints for page structure (navigation, gutters, columns of the page). Use container queries for everything inside a region.

## Touch and input

| Topic | Rule |
|---|---|
| Target size | 44 x 44px minimum on touch screens and public pages; 24 x 24px is the absolute floor (WCAG 2.2) |
| Spacing | At least 8px between adjacent targets |
| Hover | Never the only way to reach information or an action. Style hover only inside `@media (hover: hover)` |
| Tooltips | Information in a tooltip must also be reachable by tap or be shown inline on touch screens |
| Primary actions | Within thumb reach: bottom of the screen on long mobile flows, full width on small screens |
| Keyboards | Set `type`, `inputmode` and `autocomplete` so phones show the right keyboard and can autofill |
| Gestures | Every swipe or drag has a tap alternative |
| Orientation | Works in portrait and landscape; never lock orientation |

| Field | Attributes |
|---|---|
| Email | `type="email" autocomplete="email"` |
| Phone | `type="tel" autocomplete="tel"` |
| UPC or other code | `inputmode="numeric" autocomplete="off"` |
| Postal code | `autocomplete="postal-code"` (US ZIP: `inputmode="numeric"`) |
| One-time code | `inputmode="numeric" autocomplete="one-time-code"` |
| Search | `type="search" enterkeyhint="search"` |

## Type and images

- Display and h1 sizes scale with `clamp()`; everything from h3 down keeps its size.
- Body text is never below 16px. This also stops iOS from zooming into form fields.
- Prose keeps its 66ch maximum; on phones the screen width is the limit.
- Images use `srcset` and `sizes` (or `next/image`) and always reserve their space with `width`, `height` or `aspect-ratio`, so nothing jumps as they load.
- Crop or swap images for small screens when the subject would become too small to read (art direction with `<picture>`).
- Logos follow `04-logos-and-marks.md`: under 400px of header space, use the mark with the brand name in its accessible label. Seals never go below their screen minimums in `04-logos-and-marks.md` (72px wide; 80px for the Non-UPF Verified primary seal).

## Viewport and safe areas

- Use `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Never disable zoom.
- Pad fixed and sticky bars with `env(safe-area-inset-bottom)` and friends so they clear notches and home indicators.
- Use `dvh` units (`100dvh`) for full-height layouts, not `vh`, so mobile browser toolbars do not cover content.
- When the on-screen keyboard opens, the focused field stays visible. Do not put the only submit button behind the keyboard.
- Sticky headers stay short on phones (56px or less) so they do not hide the focused element.

## Performance budgets

Measured on a mid-range Android phone over a 4G connection.

| Metric | Budget |
|---|---|
| Largest Contentful Paint | Under 2.5 seconds |
| Interaction to Next Paint | Under 200ms |
| Cumulative Layout Shift | Under 0.1 |
| JavaScript per route | Under 170 KB compressed |
| Images below the fold | Lazy loaded |
| Fonts | WOFF2, Latin and Latin Extended subsets only, `font-display: swap` |

`TODO(dev): wire these budgets into CI with Lighthouse CI or a similar check.`

## Testing

| Width | Represents | Check |
|---|---|---|
| 320px | Smallest phones, and any screen at 400% zoom | Nothing scrolls sideways except data tables and code; WCAG 1.4.10 reflow |
| 375 to 393px | Most phones | Primary flows end to end with touch, including the on-screen keyboard |
| 768px | Tablets in portrait | Two-column layouts, side sheets |
| 1024px | Tablets in landscape, small laptops | Sidebar and top navigation appear correctly |
| 1440px | Desktop | Full layouts, container maximums hold |

Test on real devices before release: at least one recent iPhone (Safari) and one mid-range Android phone (Chrome). Browser device emulation is for development, not sign-off.

## Rules for Claude Code

- Write mobile-first styles: unprefixed classes for phones, `sm:` to `2xl:` to add layout as space grows.
- Use the layout behavior table for every component that changes with screen size. Do not invent new breakpoints.
- Use container queries (`@container`) for components that can sit in regions of different widths.
- No horizontal page scrolling at 320px. Tables and code blocks may scroll inside their own container.
- Never hide content or actions on small screens to make a layout fit. Rearrange it.
- Every touch target is at least 44 x 44px on public and touch surfaces.
