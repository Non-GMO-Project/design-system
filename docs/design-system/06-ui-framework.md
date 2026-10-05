# UI framework

How interfaces are built: the stack, which component to use for each kind of interaction, how components behave, layout, and the standard patterns. Components look different per brand only through tokens; behavior is the same everywhere.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router), React, TypeScript | Matches the current platform direction (Vercel hosting) |
| Styling | Tailwind CSS v4 | Tokens wired in `09-tokens.md`. No CSS-in-JS |
| Component base | shadcn/ui, built on Radix UI primitives | Components are copied into `components/ui/` and owned by us. Accessible behavior (focus, keyboard, ARIA) comes from Radix |
| Icons | lucide-react, through the registry | See `05-iconography.md` |
| Fonts | Lora, Nunito Sans, Quicksand via `next/font/google` | See `03-typography.md` |
| Animation | CSS transitions and `tw-animate-css` for simple cases; Motion (`motion/react`) for layout, gestures and orchestration | See `07-motion.md` |
| Forms | React Hook Form + Zod, through the shadcn Form components | One Zod schema validates on client and server |
| Data tables | TanStack Table, rendered with shadcn Table | Sorting, filtering, pagination, column visibility |
| Charts | Recharts, through shadcn Chart | Colors from `--chart-*` |
| Toasts | Sonner (shadcn) | |
| Command palette, combobox | cmdk (shadcn Command) | |
| Mobile drawer | Vaul (shadcn Drawer) | |
| Dates | react-day-picker (shadcn Calendar), date-fns | |
| Theme | next-themes | Sets `.dark`; brand comes from `data-brand` |

`TODO(dev): pin versions in package.json and record them here when the first project is set up.`

### Working with shadcn/ui

- Add components with the shadcn CLI so they land in `components/ui/`.
- Customize the copied component once, in that file, to match this system. Do not override styles at every call site.
- Domain components (status badge, program chip, product card, endorsement lockup) live in `components/fip/` and are built from `components/ui/` pieces.
- Keep Radix accessibility behavior intact. Do not replace a Radix trigger with a `div`.

## Interaction types and which component to use

This table is the core of the framework. Find the interaction, use the component.

### Actions

| Interaction | Component | Rules |
|---|---|---|
| Main action on a screen or in a region | `Button` variant `default` (primary) | One per region. It is where the brand signature appears, so it is also the "single point of emphasis". Verb first: "Save changes", "Submit product" |
| Alternative action | `Button` variant `secondary` or `outline` | |
| Low-emphasis or repeated action (table rows, toolbars) | `Button` variant `ghost` | |
| Destructive action | `Button` variant `destructive` + `AlertDialog` | Always confirm. Name what will be lost |
| Navigation that looks like an action | `Button asChild` wrapping `Link` | Use links for navigation, buttons for actions |
| Several related actions on one item | `DropdownMenu` behind `action.more` | Put the most common one outside the menu |
| Toggle a view option on and off | `Toggle` or `ToggleGroup` | |
| Keyboard-first power actions (staff apps) | `Command` palette, opened with Cmd/Ctrl + K | |

### Choosing and entering

| Interaction | Component | Rules |
|---|---|---|
| Short free text | `Input` | Always with a visible `Label` |
| Long free text | `Textarea` | Show character limits before people hit them |
| Pick one of 2 to 5 options, all visible | `RadioGroup` | |
| Pick one of 6 to 15 options | `Select` | |
| Pick one of many, or searchable | `Combobox` (`Popover` + `Command`) | Use for brands, facilities, ingredients |
| Pick several of a few | `Checkbox` group | |
| Pick several of many | Multi-select combobox with chips | |
| On/off setting that applies immediately | `Switch` | |
| Yes/no inside a form that is submitted later | `Checkbox` | |
| A date | `DatePicker` (`Popover` + `Calendar`) | Also accept typed dates |
| A date range | `DateRangePicker` | |
| A number with bounds | `Input type="number"` with `inputMode` | Show units outside the field |
| A file | `FileDropzone` (domain component) | Show accepted types and size limit up front; show upload progress |
| A product barcode (mobile) | `BarcodeScanner` (domain component) | Always offer manual entry as a fallback |
| Verify a code (one-time password) | `InputOTP` | |

### Showing information

| Interaction | Component | Rules |
|---|---|---|
| A list of records to scan, sort, filter | `DataTable` (TanStack + Table) | Sticky header, pagination or virtual scroll over 100 rows |
| A grid of things to browse (products, events) | `Card` grid | Cards only when items are visual or heterogeneous; otherwise use a list or table |
| Key numbers | `StatCard` | Number in `data` style, label, comparison period |
| Status of a record | `StatusBadge` | Color + icon + label, always |
| Which program a record belongs to | `ProgramChip` | See `01-brand-architecture.md` |
| Progress through a known amount of work | `Progress` | |
| Steps in a process | `Stepper` (domain component) | Real sequences only |
| History of events | `Timeline` (domain component) | |
| Trends, comparisons | `Chart` | Label series directly; include a data table alternative |
| A person or organization | `Avatar` | Initials fallback |

### Revealing and layering

| Interaction | Component | Rules |
|---|---|---|
| Switch between views of the same thing | `Tabs` | 2 to 6 tabs. Not for steps |
| Show and hide sections in place | `Accordion` or `Collapsible` | For FAQs, settings groups, long forms |
| Short hint on hover or focus | `Tooltip` | Non-essential only. Never put required information in a tooltip |
| Richer preview on hover | `HoverCard` | Preview of a linked record |
| Small interactive panel tied to a control | `Popover` | Filters, quick edits |
| Focused task that blocks the page | `Dialog` | Short tasks. Title states the task |
| Confirm a consequential choice | `AlertDialog` | Buttons repeat the action: "Delete product", not "OK" |
| Edit or inspect alongside the page | `Sheet` (side panel) | Record details from a table |
| Same as Sheet on mobile | `Drawer` (bottom) | |

### Navigation

| Interaction | Component | Rules |
|---|---|---|
| App-level navigation (staff, portal) | `Sidebar` (shadcn) | Collapsible to icons; labels in tooltips when collapsed |
| Site navigation (public) | `NavigationMenu` | Top bar; collapses to `Sheet` on mobile |
| Where am I in a hierarchy | `Breadcrumb` | Apps and deep content only |
| Move through pages of results | `Pagination` | Show total count |
| Jump anywhere | `Command` palette | Staff apps |

### Feedback

| Interaction | Component | Rules |
|---|---|---|
| Confirm something just happened | `Toast` (Sonner) | Past tense of the action: "Product submitted". Include Undo when possible |
| A problem or notice tied to a page or section | `Alert` | Stays until resolved. Says what happened and what to do |
| A problem with one field | Inline `FormMessage` | Under the field, linked with `aria-describedby` |
| Loading content | `Skeleton` | Shape of the real content. Not for under 300ms |
| Loading after an action | Button loading state | Spinner replaces icon, label stays, button disabled |
| Nothing here yet | `EmptyState` (domain component) | Say what will appear and offer the action that creates it |

## Component rules

### Buttons

| Variant | Token use | When |
|---|---|---|
| `default` | `bg-primary text-primary-foreground hover:bg-primary-hover` | The main action. Renders in the brand signature |
| `secondary` | `bg-secondary text-secondary-foreground` | Second action, soft brand presence |
| `outline` | `border-input bg-transparent text-foreground` | Neutral alternative, filter triggers |
| `ghost` | transparent, `hover:bg-accent` | Toolbars, table rows |
| `destructive` | `bg-destructive text-destructive-foreground` | Delete, remove, revoke |
| `link` | `text-brand-text underline underline-offset-4` | Inline actions in text |

Button text is the `label` style: Quicksand 600, sentence case.

| Size | Height | Use |
|---|---|---|
| `sm` | 32px | Dense tables and toolbars (desktop only) |
| `default` | 40px | Everywhere |
| `lg` | 48px | Public pages, mobile primary actions |
| `icon` | 40 x 40 | Icon-only, with `aria-label` |

States every interactive component must have: default, hover, focus-visible (ring), active/pressed, disabled, loading where relevant. Focus ring: 2px `--ring` with 2px offset, never removed.

Romanesco (Collective) and Monarch (Non-GMO Project) primary buttons are light fills on Birch. Their labels carry the meaning (WCAG 1.4.11 does not require the fill itself to reach 3:1), but never strip the label to an icon on these brands.

### Forms

- Labels above fields, always visible, in the `label` style. Placeholders are examples, not labels.
- Fields are filled with `--field` (Frost) and bordered with `--input`. Never a white field on Birch.
- Mark optional fields "(optional)" rather than marking required ones, unless most fields are optional.
- Validate on blur and on submit, not on every keystroke. Clear an error as soon as it is fixed.
- On submit failure: focus the first invalid field and show an `Alert` summary at the top for long forms.
- Group related fields with `fieldset` and `legend`.
- One column for forms. Two columns only for short, related pairs (first and last name).
- Long forms (enrollment, applications) become a `Stepper` flow with save-and-continue.

### StatusBadge

```tsx
<StatusBadge status="verified" />   // success colors, BadgeCheck icon, "Verified"
<StatusBadge status="expiring" date="2026-12-01" />  // "Expires Dec 1, 2026"
```

Uses `--status-*` tokens. The label is always visible text. Same component in every brand.

### ProgramChip

```tsx
<ProgramChip program="nongmo" />  // Seafoam chip, Forest dot, "Non-GMO Project"
```

Sets its own `data-brand`, uses `--brand-subtle`, `--brand-border` and `--brand-dark`. Never uses the signature color.

### Cards

Cards sit on Birch like the page and are separated by `--border` and elevation, not by white. Use `--brand-support` or `--brand-tint` fills for feature panels (Seafoam, Almond, Corn Flower). Do not wrap every section of a page in a card. Card hierarchy is shown by elevation and radius, not by putting cards in cards.

### Tables

- Left-align text, right-align numbers, `tabular-nums`.
- Header row on `--muted` (Frost). Optional zebra stripes in Frost.
- Row actions in a final column: one visible ghost button plus an overflow menu.
- Selected rows use `bg-brand-subtle`.
- Empty and error states inside the table body, not as a blank table.

### Inverted panels

The brand dark (`bg-brand-dark`, Birch text) is the only inverted surface: hero bands, footers, feature callouts. It is how a layout reaches its "25 dark" ratio without big blocks of body text.

## Layout

### Spacing

4px base. Use Tailwind's spacing scale, which already follows it.

| Token | px | Typical use |
|---|---|---|
| 1 | 4 | Icon to text in tight places |
| 2 | 8 | Inside controls, icon gaps |
| 3 | 12 | Between related small items |
| 4 | 16 | Default gap, card padding (compact) |
| 6 | 24 | Card padding, gap between form fields |
| 8 | 32 | Between groups |
| 12 | 48 | Between sections (apps) |
| 16 to 24 | 64 to 96 | Between sections (public pages) |

### Shape and elevation

Radius follows hierarchy rather than one value everywhere:

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | 4px | Inputs, checkboxes, badges, chips |
| `rounded-md` | 8px | Buttons, cards, menus, popovers |
| `rounded-lg` | 12px | Dialogs, sheets, large feature panels |
| `rounded-full` | | Avatars, switches, program chip dots, pills |

`TODO(design): the brand guide's own layouts use pill swatches and 16px card corners. Decide whether public pages adopt pill buttons and larger card radii.`

| Elevation | Token | Use |
|---|---|---|
| 0 | none, border only | Page sections, cards at rest in apps |
| 1 | `shadow-1` | Cards on tinted backgrounds, sticky headers |
| 2 | `shadow-2` | Hovered interactive cards, dropdowns, popovers |
| 3 | `shadow-3` | Sheets, drawers |
| 4 | `shadow-4` | Dialogs |

### Breakpoints and containers

Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. Design mobile first.

| Container | Max width | Use |
|---|---|---|
| Prose | 66ch | Articles, standards documents |
| Narrow | 640px | Forms, auth, single-task flows |
| Default | 1200px | Public pages |
| Wide | 1440px | Dashboards, data tables |
| Full | 100% | App shells with sidebar |

Page gutters: 16px mobile, 24px tablet, 32px desktop.

### Surface types

| | Public and program sites | Operational apps |
|---|---|---|
| Audience | Shoppers, brands, members, press | Staff, Technical Administrators, partners |
| Shell | Top navigation, footer with endorsement | Sidebar, top bar, no marketing footer |
| Density | Comfortable | Comfortable default, compact option for tables |
| Brand presence | Strong: follow the usage ratios, inverted hero, imagery | Quiet: Birch, the brand dark for type, signature only on primary actions |
| Motion | One orchestrated page moment allowed | Responsive to actions only |

## Standard patterns

**Empty state.** Icon (`icon-2xl`, muted), one sentence saying what will appear here, one primary action that creates it. No jokes, no illustrations of sad boxes.

**Error state.** Says what went wrong in plain words, what the person can do, and offers a retry. Never blames the person. Never just "Something went wrong".

**Loading.** Skeleton for content areas, spinner only inside buttons and small inline spots. Show skeletons only if loading takes more than 300ms.

**Confirmation.** Destructive or hard-to-undo actions confirm with `AlertDialog`. Everything else acts immediately and offers Undo in the toast.

**Search and filter.** Search input first, filter button opens a `Popover` (desktop) or `Sheet` (mobile), active filters show as removable chips, results count updates live with `aria-live="polite"`.

**Multi-step flows.** `Stepper` with named steps, progress saved per step, Back never loses data, final review step before submit.

**Program footer.** Program logo, the endorsement line "A program of the Food Integrity Project", links, legal. On the brand dark.

## Writing in the interface

All interface copy follows `10-writing.md` (voice, tone, UI copy patterns, word list). The short version: buttons say exactly what happens, toasts use the past tense, errors say what happened and how to fix it, and empty states invite the next action.

Flows, states and the UX definition of done live in `11-ux.md`.

## Rules for Claude Code

- Use the interaction table to choose components. Do not reach for a `Dialog` when the table says `Sheet`, or a `Select` when there are three options.
- Build with `components/ui/` and `components/fip/`. Add missing shadcn components with the CLI rather than writing from scratch.
- Every interactive element gets all states listed under Buttons, including visible focus.
- Every async view gets loading, empty and error states.
- Do not create new variants of a component for one screen. Add a variant to the component itself, or flag it.
