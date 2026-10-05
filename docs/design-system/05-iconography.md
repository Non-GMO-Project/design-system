# Iconography

One icon library for every brand, used through a named registry so the same idea always gets the same icon.

## Library

**Lucide** (`lucide-react` in apps, `lucide-static` for this showcase). It is the default icon set for shadcn/ui, it is open source (ISC license), every icon shares the same 24px grid and stroke style, and it covers both general UI and food and agriculture subjects (Wheat, Sprout, Leaf, ChefHat, FlaskConical, ScanBarcode). Its round caps and joins sit comfortably next to Quicksand's rounded terminals.

Do not mix in icons from other libraries. If Lucide lacks something, see "Custom icons" below.

The showcase build resolves every name in the registry below against the installed Lucide version and flags any that do not exist. `TODO(dev): pin the same lucide-react version in app package.json files.`

## Style

| Property | Value |
|---|---|
| Grid | 24 x 24 |
| Style | Outline (stroke). No filled icons except where a filled state is the point (a selected star) |
| Stroke width | 1.75 at 20px and above; 2 at 16px |
| Corners and caps | Round (Lucide default) |
| Color | `currentColor`, so icons inherit text color |

## Sizes

| Token | px | Use |
|---|---|---|
| `icon-xs` | 14 | Inside dense badges and chips |
| `icon-sm` | 16 | Inline with `body-sm`, table actions, input adornments |
| `icon-md` | 20 | Default. Buttons, menus, list items |
| `icon-lg` | 24 | Navigation, page header actions |
| `icon-xl` | 32 | Feature lists, cards that lead with an icon |
| `icon-2xl` | 48 | Empty states |

Icon and text sit on the same center line. Gap between icon and label: 8px (`gap-2`) at md, 6px at sm.

## Color rules

| Situation | Color |
|---|---|
| Default | Inherit the text color (the brand dark) |
| Feature lists on program pages | `--brand-text`, optionally on a `--brand-support` circle |
| Status | The matching `--status-*-icon` |
| On primary buttons | `--primary-foreground` |
| Disabled | Inherit the disabled text color |

Icons never carry meaning by color alone, and are never tinted in Monarch, Corn Flower or Romanesco at small sizes (they fail 3:1 on Birch).

## The icon registry

Code refers to icons by **purpose**, not by Lucide name. That way, if the team decides "edit" should be a different icon, it changes in one place.

```tsx
// components/icons.ts
import { Plus, Pencil, Trash2 /* ... */ } from "lucide-react";
export const icons = {
  "action.add": Plus,
  "action.edit": Pencil,
  "action.delete": Trash2,
  // ...
} as const;
export type IconName = keyof typeof icons;

// usage
<Icon name="status.verified" size="sm" />
```

### Actions

| Name | Lucide | Use |
|---|---|---|
| `action.add` | `Plus` | Create a new item |
| `action.edit` | `Pencil` | Edit in place or open an editor |
| `action.delete` | `Trash2` | Permanent delete (always confirm) |
| `action.archive` | `Archive` | Archive, reversible |
| `action.duplicate` | `CopyPlus` | Duplicate a record |
| `action.copy` | `Copy` | Copy to clipboard |
| `action.download` | `Download` | Download a file |
| `action.upload` | `Upload` | Upload a file |
| `action.export` | `FileDown` | Export data |
| `action.share` | `Share2` | Share or send |
| `action.refresh` | `RefreshCw` | Reload data |
| `action.filter` | `ListFilter` | Open filters |
| `action.sort` | `ArrowUpDown` | Sort control |
| `action.search` | `Search` | Search |
| `action.more` | `Ellipsis` | Overflow menu |
| `action.close` | `X` | Close dialog, sheet, chip |
| `action.confirm` | `Check` | Confirm, select |
| `action.external` | `ExternalLink` | Opens another site or a new tab |
| `action.print` | `Printer` | Print |

### Navigation

| Name | Lucide | Use |
|---|---|---|
| `nav.home` | `House` | Home |
| `nav.dashboard` | `LayoutDashboard` | Dashboard |
| `nav.menu` | `Menu` | Open mobile navigation |
| `nav.back` | `ArrowLeft` | Back |
| `nav.forward` | `ArrowRight` | Next step |
| `nav.expand` | `ChevronDown` | Expand, open select |
| `nav.collapse` | `ChevronUp` | Collapse |
| `nav.next` | `ChevronRight` | Drill in, breadcrumbs, pagination |
| `nav.previous` | `ChevronLeft` | Pagination |
| `nav.settings` | `Settings` | Settings |
| `nav.help` | `CircleHelp` | Help |
| `nav.notifications` | `Bell` | Notifications |
| `nav.account` | `CircleUser` | Account menu |
| `nav.sign-out` | `LogOut` | Sign out |

### Status and feedback

Always paired with a text label.

| Name | Lucide | Use |
|---|---|---|
| `status.success` | `CircleCheck` | Saved, done, passed |
| `status.warning` | `TriangleAlert` | Needs attention |
| `status.error` | `CircleAlert` | Error, failed |
| `status.info` | `Info` | Information |
| `status.loading` | `LoaderCircle` | Loading (spin animation, see 07) |
| `status.verified` | `BadgeCheck` | Product or company is verified |
| `status.in-progress` | `CircleDashed` | Enrolled, in progress |
| `status.pending` | `Clock` | Waiting on review |
| `status.expiring` | `CalendarClock` | Verification expiring soon |
| `status.lapsed` | `CircleX` | Verification lapsed |
| `status.not-eligible` | `Ban` | Not eligible |
| `status.withdrawn` | `CircleMinus` | Withdrawn |
| `status.locked` | `Lock` | No permission, read-only |

`status.verified` uses a badge outline, not the certification seal. See `04-logos-and-marks.md`.

### Food integrity domain

| Name | Lucide | Use |
|---|---|---|
| `domain.product` | `Package` | Product |
| `domain.brand` | `Tag` | Consumer brand |
| `domain.company` | `Building2` | Company, organization |
| `domain.facility` | `Factory` | Manufacturing facility |
| `domain.retailer` | `Store` | Retailer |
| `domain.ingredient` | `Wheat` | Ingredient |
| `domain.crop` | `Sprout` | Crop, seed, agriculture |
| `domain.genetics` | `Dna` | Genetic modification topics |
| `domain.lab-test` | `FlaskConical` | Testing, lab results |
| `domain.inspection` | `Microscope` | Inspection, deep review |
| `domain.standard` | `FileCheck` | The Standard and standards documents (Non-GMO Project's long-standing "document with a check" motif) |
| `domain.compliance` | `ShieldCheck` | Compliance, policy |
| `domain.review` | `ClipboardCheck` | Evaluation, audit, checklist |
| `domain.supply-chain` | `Truck` | Supply chain, shipping |
| `domain.relationship` | `Network` | Supplier and facility relationships |
| `domain.scan` | `ScanBarcode` | Scan a product barcode |
| `domain.kitchen` | `ChefHat` | Home cooking, whole food (Non-UPF) |
| `domain.meal` | `Utensils` | Food, eating |
| `domain.shopper` | `ShoppingBasket` | Shoppers, consumer research |
| `domain.invoice` | `Receipt` | Billing, invoices |
| `domain.payment` | `CreditCard` | Payment |
| `domain.donate` | `HandHeart` | Donations |
| `domain.community` | `HeartHandshake` | Collective, membership |
| `domain.event` | `CalendarDays` | Events |
| `domain.campaign` | `Megaphone` | Campaigns, advocacy |
| `domain.learning` | `GraduationCap` | Courses, education |
| `domain.document` | `FileText` | Generic document |
| `domain.ai` | `Sparkles` | AI-generated or AI-assisted content (always disclose) |

### People and contact

| Name | Lucide | Use |
|---|---|---|
| `person.single` | `User` | One person |
| `person.group` | `Users` | Several people, members |
| `contact.email` | `Mail` | Email |
| `contact.phone` | `Phone` | Phone |
| `contact.message` | `MessageSquare` | Message, comment |
| `contact.location` | `MapPin` | Address, location |
| `contact.website` | `Globe` | Website |

## Usage rules

**Pair icons with text.** Icons support labels; they rarely replace them. Icon-only buttons are allowed only for universally understood actions (close, more, search, edit in a dense table row), and they must have an `aria-label` and a tooltip.

**One meaning per icon.** Do not reuse `action.delete`'s icon for "remove from list" unless it really deletes. Use `action.close` for removing a filter chip.

**Decorative icons are hidden.** When an icon sits next to text that says the same thing, add `aria-hidden="true"`.

**Do not decorate headings.** No icon in front of every heading or every card. Use icons where they help people scan or recognize.

**AI disclosure.** Any content generated or summarized by AI shows `domain.ai` with a label such as "AI summary".

**Icons are not illustrations.** Non-GMO Project's fine-line botanical drawings are illustration assets (`public/brand/nongmo/illustrations/`), used with restraint between content blocks. They are never shrunk into icons.

## Custom icons

When Lucide has nothing suitable:
1. Check Lucide again under other words.
2. If still nothing, draw the icon on Lucide's 24px grid with the same stroke, round caps and joins, and 2px padding. Save as `components/icons/custom/{name}.tsx` and add it to the registry.
3. Custom icons go through design review. `TODO(design): name the reviewer.`

Never use a logo, seal or the butterfly as an icon.

## Rules for Claude Code

- Import icons through the registry, by purpose name. Do not import from `lucide-react` directly in feature code.
- If no registry name fits, add one to the registry with a comment, pick the closest Lucide icon, and mention it in your summary.
- Never draw a custom icon without being asked.
