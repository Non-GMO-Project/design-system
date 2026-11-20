# Iconography

One icon library for every brand, used through a named registry so the same idea always gets the same icon.

## Library

**Lucide** (`lucide-react` 1.52 or later in apps, `lucide-static` for this showcase; see the version list in `06-ui-framework.md`, "Stack"). It is the default icon set for shadcn/ui, it is open source (ISC license), every icon shares the same 24px grid and stroke style, and it covers both general UI and food and agriculture subjects (Wheat, Sprout, Leaf, ChefHat, FlaskConical, ScanBarcode). Its round caps and joins sit comfortably next to Quicksand's rounded terminals.

Do not mix in icons from other libraries. If Lucide lacks something, see "Custom icons" below.

The showcase build resolves every name in the registry below against the installed Lucide version and flags any that do not exist.

## Style

| Property | Value |
|---|---|
| Grid | 24 x 24 |
| Style | Outline (stroke). No filled icons except where a filled state is the point (a selected star) |
| Stroke width | 1.75 at 20px and above; 2 at 16px and 14px, so small icons don't thin out |
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

Icon and text sit on the same center line. Gap between icon and label: 8px (`gap-2`) with `icon-md` and larger, 4px (`gap-1`) with `icon-sm` and `icon-xs`, as in badges and chips. Both are on the spacing scale in `06-ui-framework.md`.

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
| `action.save` | `Save` | Save a form or a draft |
| `action.send` | `Send` | Send a message, an invitation or a document |
| `action.reply` | `Reply` | Reply to a message or a comment |
| `action.compose` | `SquarePen` | Start a new message |
| `action.attach` | `Paperclip` | Attach a file; a file on a message |
| `action.link` | `Link2` | Link two records; insert a link, including in the text editor |
| `action.unlink` | `Link2Off` | Remove a link; disconnect an account |
| `action.disconnect` | `Unplug` | Disconnect a connected app |
| `action.connect` | `Plug` | Connect an app or an account |
| `action.merge` | `Merge` | Merge two duplicate records |
| `action.restore` | `ArchiveRestore` | Restore something archived |
| `action.undo` | `Undo2` | Undo; take back a step |
| `action.start` | `Play` | Start a job or a routine |
| `action.stop` | `Square` | Stop a recording |
| `action.skip` | `SkipForward` | Skip to the next item in a review queue |
| `action.view` | `Eye` | Preview; shown to the public. Seeing the app as another person uses `action.view-as` |
| `action.hide` | `EyeOff` | Hide from the public |
| `action.view-as` | `ScanEye` | See the app as another person sees it |
| `action.move-up` | `ArrowUp` | Move an item up in a builder |
| `action.move-down` | `ArrowDown` | Move an item down in a builder |
| `action.drag` | `GripVertical` | Drag handle |
| `action.rearrange` | `Move` | Rearrange a layout |
| `action.mention` | `AtSign` | Mention a colleague |
| `action.give-feedback` | `MessageSquarePlus` | Send feedback; add a comment |
| `action.add-to-list` | `ListPlus` | Add items to a list |
| `action.schedule` | `CalendarPlus` | Set a date or a follow-up |
| `action.remind` | `AlarmClock` | A reminder to follow up |
| `action.sign` | `PenLine` | Sign a document |
| `action.rate-up` | `ThumbsUp` | "Did this help?": yes |
| `action.rate-down` | `ThumbsDown` | "Did this help?": no |
| `action.feature` | `Star` | Feature or favorite something |
| `action.mark-read` | `MailOpen` | Mark as read |
| `action.mute` | `BellOff` | Stop notifications for something |
| `action.open-panel` | `PanelRight` | Open the details panel |
| `action.collapse-sidebar` | `PanelLeftClose` | Fold the sidebar |
| `action.expand-sidebar` | `PanelLeftOpen` | Unfold the sidebar |
| `action.choose` | `ChevronsUpDown` | Open a picker (combobox) |

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
| `status.verified` | `BadgeCheck` | Product is Verified |
| `status.in-progress` | `CircleDashed` | In progress (applications, enrollment, other processes) |
| `status.pending` | `Clock` | In review, waiting on review |
| `status.expiring` | `CalendarClock` | Verified, expiry date approaching |
| `status.on-hold` | `CirclePause` | Verification on hold |
| `status.terminated` | `CircleX` | Verification terminated |
| `status.not-eligible` | `Ban` | Not eligible |
| `status.withdrawn` | `CircleMinus` | Verification withdrawn |
| `status.locked` | `Lock` | No permission, read-only |
| `status.new` | `CircleDot` | New or unread |
| `status.not-started` | `Circle` | A step not started yet. Not `CircleDashed`, which is `status.in-progress` |
| `status.waiting-long` | `Hourglass` | Waiting too long; stalled |
| `status.screened` | `ShieldAlert` | Suspected spam or a risky file |
| `status.disabled` | `CircleSlash` | Switched off; not in use |
| `status.no-results` | `SearchX` | Nothing found; page not found |
| `status.image-missing` | `ImageOff` | A picture couldn't be loaded |
| `status.not-placed` | `MapPinOff` | An item that couldn't be placed on a map |
| `status.idea` | `Lightbulb` | An idea, on a roadmap |
| `status.building` | `Hammer` | Being built, on a roadmap |
| `status.transition` | `MoveRight` | From one status to another, in a history |
| `status.sub-item` | `CornerDownRight` | A result or a step nested under another |
| `status.due` | `Calendar` | A due date (`status.expiring` keeps `CalendarClock`) |

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
| `domain.task` | `ListTodo` | A to-do or follow-up task for a person, such as a staff to-do or call follow-up. Not for evaluations or checklists (`domain.review`) |
| `domain.history` | `History` | Activity history, a timeline of events and its empty state ("No activity recorded yet") |
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
| `domain.opportunity` | `TrendingUp` | A sales opportunity. Growth in a chart uses `domain.chart` |
| `domain.win` | `Trophy` | An opportunity won |
| `domain.agreement` | `FileSignature` | An agreement to sign or signed |
| `domain.discussion` | `NotebookPen` | Staff discussion on a record |
| `domain.note` | `StickyNote` | An internal note |
| `domain.knowledge` | `BookOpen` | Knowledge articles and guidance |
| `domain.passkey` | `KeyRound` | A passkey; strong sign-in |
| `domain.api-key` | `Key` | An API key or token |
| `domain.webhook` | `Webhook` | Webhooks for developers |
| `domain.certificate` | `Award` | A certificate. `BadgeCheck` stays only on `status.verified` |
| `domain.form` | `ClipboardList` | A form people fill in |
| `domain.booking` | `CalendarCheck` | A call booked through a form |
| `domain.credit` | `HandCoins` | A credit or refund on an invoice |
| `domain.rate` | `Percent` | A billing rate or a discount |
| `domain.spreadsheet-export` | `FileSpreadsheet` | Export to an accounting system or spreadsheet |
| `domain.time-off` | `CalendarOff` | Someone away (for assigning work) |
| `domain.transcript` | `FileAudio` | A call's transcript |
| `domain.technical-administrator` | `Stamp` | A certifying body that verifies products |
| `domain.dataset` | `TableProperties` | A dataset for reports |
| `domain.database` | `Database` | Data and sync status |
| `domain.resources` | `FolderOpen` | Files and resources to download |
| `domain.chart` | `ChartColumn` | A chart, usage figures or growth |
| `domain.code` | `CodeXml` | Developer documentation |
| `domain.launch` | `Rocket` | Launch and rollout progress |
| `domain.roadmap` | `Map` | A roadmap |
| `domain.design-system` | `LayoutTemplate` | Design and UI reference |
| `domain.admin` | `Shield` | The admin area |
| `domain.apps` | `LayoutGrid` | An app launcher; widgets |

### People and contact

| Name | Lucide | Use |
|---|---|---|
| `person.single` | `User` | One person |
| `person.group` | `Users` | Several people, members |
| `person.add` | `UserPlus` | Invite or add a person |
| `person.remove` | `UserX` | End someone's access. An unassigned item uses `person.unassign` or the text "Unassigned" |
| `person.assign-to-me` | `UserCheck` | Assign to me |
| `person.unassign` | `UserMinus` | Unassign me; unassigned |
| `person.owner` | `UserRound` | Who something is assigned to |
| `person.team` | `UsersRound` | A team (`person.group` is a list of people) |
| `contact.email` | `Mail` | Email |
| `contact.phone` | `Phone` | Phone |
| `contact.message` | `MessageSquare` | Message, comment |
| `contact.location` | `MapPin` | Address, location |
| `contact.website` | `Globe` | Website |
| `contact.call` | `PhoneCall` | Place a call, log a call |
| `contact.hang-up` | `PhoneOff` | End a call |
| `contact.mute` | `MicOff` | Mute the microphone |
| `contact.record` | `Mic` | Record a greeting; a recording |
| `contact.voicemail` | `Voicemail` | A voicemail |
| `contact.headset` | `Headphones` | The in-browser phone |
| `contact.dialpad-delete` | `Delete` | Delete a digit |
| `contact.inbound` | `ArrowDownLeft` | A received message or call |
| `contact.outbound` | `ArrowUpRight` | A sent message or call |
| `contact.conversation` | `MessagesSquare` | A conversation thread (`contact.message` is one message) |
| `contact.delivered` | `MailCheck` | An email was sent or delivered |

### Text formatting

For rich-text editors. Inserting a link uses `action.link`.

| Name | Lucide | Use |
|---|---|---|
| `format.bold` | `Bold` | Bold text |
| `format.italic` | `Italic` | Italic text |
| `format.underline` | `Underline` | Underlined text |
| `format.heading` | `Heading2` | A heading |
| `format.bulleted-list` | `List` | A bulleted list |
| `format.highlight` | `Highlighter` | Highlighted text |
| `format.table` | `Table` | Insert a table |

### Views

| Name | Lucide | Use |
|---|---|---|
| `view.list` | `LayoutList` | A list view |
| `view.board` | `Columns3` | A board (kanban) view |
| `view.inbox` | `Inbox` | An inbox or queue |
| `view.checklist` | `ListChecks` | "My items" lists |
| `view.map` | `MapPinned` | A map view. Not `Map`, which is `domain.roadmap` |

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
3. Custom icons go through design review.

Never use a logo, seal or the Butterfly as an icon.

## Rules for Claude Code

- Import icons through the registry, by purpose name. Do not import from `lucide-react` directly in feature code.
- If no registry name fits, add one to the registry with a comment, pick the closest Lucide icon and mention it in your summary.
- Never draw a custom icon without being asked.
