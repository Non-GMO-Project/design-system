# Email

How the brand elements carry into email: newsletters, campaigns and service messages. Email is the one place the system cannot rely on its own code. Most clients ignore CSS variables and web fonts, strip `<style>` blocks or force their own dark mode, so every rule here is written to survive that. Sources: the brand profiles, `11-ux.md` (what to send and when) and recent sends from all three programs, reviewed for issue #7.

## Principles

1. **One sender, one brand.** Every email comes from one brand and carries only that brand's logo, colors and voice (`01-brand-architecture.md`). A Non-GMO Project newsletter can report Non-UPF Verified news in words and links, but it never shows a Non-UPF Verified seal, logo or Dragon Fruit.
2. **Birch, not white.** The email body sits on Birch `#FFFDEB`, the same as every other surface. The area outside the 600px column can be Birch or Frost.
3. **Text is text.** Headlines, dates, prices and calls to action are live text, never part of an image. Images can be blocked, and an email that only works with images on does not work.
4. **One main action per section.** Each story ends in at most one primary button. The same action keeps the same label through the whole email.
5. **Seals are claims.** A certification seal appears only next to the product it verifies. It is never decoration on a photo (`04-logos-and-marks.md`).

## Email types

| Type | Examples | Layout | Rules |
|---|---|---|---|
| Service | Documents needed, status change, confirmation | Header, one message block, one button, minimal footer | No hero image, no support band, no social row. Subject says the thing (`11-ux.md`) |
| Newsletter | Industry News, Better With the Butterfly, New GMO Alert, The Fullist | Header, masthead, lead story, more stories, support band, full footer | A recurring name (masthead) set in Lora. Two to five stories |
| Campaign | Webinar invitation, appeal, launch | Header, hero, one story, one button (repeated once at the end), full footer | One goal. The button label is the same both times |
| Member and community | Collective member updates | Header, letter-style body, image grid, full footer | Warmer tone (Quicksand + Avenir pairing), still one brand |

## Anatomy

Top to bottom. Skip any part a type above does not list.

| Part | Holds | Rules |
|---|---|---|
| Preheader | One line of preview text, hidden in the body | Adds to the subject, never repeats it. 40 to 90 characters |
| Header | Brand logo, issue date or "View in browser" | Horizontal logo, PNG at 2x, 120px wide minimum, linked to the brand site, alt text = brand name. On Birch, or on the brand dark with a reversed logo |
| Masthead | Newsletter name and a one-line description | Name in Lora (`h1` size), description in Avenir `body-sm` or `eyebrow`. Brand dark text on Birch. One masthead per email |
| Hero | One photograph | Full column width. Calm subject, no text burned in, no seals or logos dropped on top. Meaningful alt text, or `alt=""` if purely mood |
| Story block | Eyebrow (optional), headline, body, button | Headline in Lora `h2` or `h3`, body in Avenir `body`, left-aligned. Image beside the text on wide screens, stacked above it on phones |
| Divider | A hairline between stories | 1px in the brand's support color, or `border` from the tokens. Never the signature color |
| Support band | One appeal: donate, sign up, share | Full-width panel on the brand's support tint with brand-dark text, or the brand dark with Birch text. One per email, after the last story |
| Social row | Links to the brand's social accounts | Icons in the brand dark on Birch (or Birch on the brand dark), each with the platform name as alt text. `TODO(design): official social icon set. Lucide has no platform logos` |
| Footer | Logo or mark, legal name, mailing address, website, preferences, unsubscribe | Plain text on Birch, Avenir `body-sm`. The endorsement line "A program of the Food Integrity Project" for program emails |

## Color in email

Email clients do not reliably support CSS variables, so templates use the hex values behind the semantic tokens, inlined. Take them from the brand's color roles, never from an older template or by eye. `TODO(dev): generate an email token file (hex per role, per brand) from scripts/palette.config.json so templates never hand-copy values.`

| Brand | Body ground | Text and links | Header and dark bands | Support panels | Primary button |
|---|---|---|---|---|---|
| Food Integrity Project | Birch `#FFFDEB` | Cacao `#241A15` | Cacao, with the reversed logo `TODO(design): reversed FIP logo file` | Loam `#6B5644` with Birch text | Milkweed Leaf `#5F7A52`, Birch text |
| Non-GMO Project | Birch `#FFFDEB` | Forest `#053220` | Forest, with `nongmo-logo-horizontal-reversed.png` | Seafoam `#DDEED6` with Forest text | Monarch `#F18A00`, Forest text |
| Non-UPF Verified | Birch `#FFFDEB` | Dark Matter `#0A2041` | Dark Matter, with the reversed logo `TODO(design): reversed Non-UPF Verified logo file` | Almond `#F5DFCE` with Dark Matter text | Dragon Fruit `#CE1B6A`, Birch text |
| Food Integrity Collective | Birch `#FFFDEB` | Forest `#053220` | Forest, with `collective-logo-horizontal-mono-light.png` | Corn Flower `#9EB6DE` with Forest text | Romanesco `#D3D95E`, Forest text |

- Links are the brand dark and underlined. Never the signature color for running text: Monarch fails contrast on Birch.
- The signature color appears in buttons and at most one accent rule per email, the same ratio as the brand profile.
- Status in service email (verified, lapsed, pending) uses the shared status colors with an icon and a text label, as everywhere else.
- **Dark mode.** Apple Mail, Outlook and Gmail apps may invert colors. Use logos with transparent backgrounds and enough padding to survive on a dark ground, never put dark text on a transparent image, and test in dark mode before sending. `TODO(dev): add color-scheme meta tags and a dark-mode test pass to the send checklist.`

## Type in email

Web fonts load in Apple Mail and some phone apps; Gmail and Outlook fall back. Every stack ends in a font that every client has, chosen to keep the same shape.

| Role | Stack for email | Falls back to |
|---|---|---|
| Serif (masthead, headlines) | `Lora, Georgia, "Times New Roman", serif` | Georgia |
| Sans (body, footer) | `"Nunito Sans", "Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif` | Avenir on Apple devices, Segoe UI on Windows, Arial elsewhere |
| Accent (eyebrows, button labels) | `Quicksand, "Nunito Sans", "Avenir Next", Avenir, Helvetica, Arial, sans-serif` | Same as sans |

- Sizes come from the web scale in `03-typography.md`. Body is 16px and never smaller, except the footer at 14px (`body-sm`).
- Headlines are left-aligned, sentence case, and no larger than `h1` (40px). Use `display` sizes only for a masthead name.
- Body paragraphs are left-aligned. Center only short lines: the masthead, a single button, a date line.
- `TODO(design): confirm Lora is loaded by link tag in email templates, or whether templates should go straight to Georgia.`

## Layout and images

- One column, 600px wide, with 24px of padding inside. On phones the column fills the screen with 16px gutters, the same as `12-responsive.md`.
- Two-column story blocks (image beside text) stack to one column below 600px, image first.
- Build layout with tables and inline styles; `<div>` layouts break in Outlook. Mark layout tables `role="presentation"`.
- Images are JPG for photographs and PNG for logos and illustrations, exported at 2x and sized with `width` attributes. Keep the whole email under 1MB and each image under 200KB.
- Every image has alt text that says what matters, or `alt=""` if decorative. Logos use the brand name.
- Photography follows each brand profile's imagery rules. No stock photography with text, no screenshots of video players as heroes.

## Logos and seals

- **Header:** the brand's horizontal logo (`04-logos-and-marks.md`, "Email header"). Collective emails use the full lockup on a Forest band until a Forest-colored lockup exists.
- **Footer:** the logo or mark again at a smaller size, plus the endorsement line in program emails. Use the text line ("A program of the Food Integrity Project") until endorsement lockup files exist.
- **Seals:** only in a story about a verified product, next to that product, at or above its screen minimum in `04-logos-and-marks.md` (72px wide; 80px for the Non-UPF Verified primary seal). Never on a hero photo, never as a section ornament, never from another program.
- Badges and campaign artwork (for example the Collective's "Food should nourish life" badge) belong to their brand and can sit in the footer or support band of that brand's email.

## Buttons and links

- Buttons are built in HTML (a padded table cell or "bulletproof" button with a VML fallback for Outlook), never an image of a button.
- At least 44px tall and the label in Quicksand or Avenir 16px, weight 600. Corner radius 4px (`rounded-sm`).
- Button labels start with a verb and say where the click goes: "Register for the webinar", "Read the Standard", "Donate". Not "Click here", "Learn more" alone or two different labels for the same link.
- Link text says where it goes: "Read Standard version 17", not "here" (`10-writing.md`, Accessible copy).
- One primary button per story. A second action in the same story is a text link.

## Footer content

Required in every email:

| Item | Detail |
|---|---|
| Sender name | The brand's full name. Never "FIP" |
| Mailing address | The organization's postal address |
| Website | The brand's own domain, as a link |
| Why you are getting this | One line: "You're receiving this because you signed up for Industry News" |
| Manage preferences | Link to choose topics or frequency |
| Unsubscribe | One click for marketing and newsletters. Service email can omit it only where the law allows |

Optional: social row, the endorsement line, a forward or share link, a "Did someone forward this? Subscribe" line. `TODO(brand): confirm the mailing address and legal name to use for Food Integrity Project and Non-UPF Verified emails.`

## Accessibility

- Set `lang="en"` and a `<title>` that matches the subject.
- Real headings (`<h1>` for the masthead or main headline, `<h2>` for stories) so screen readers can jump between stories.
- Contrast follows `08-accessibility.md`: 4.5:1 for body text, 3:1 for large text and button boundaries.
- The email still makes sense with images off: every headline, date and action is text.
- No information in color alone, no animated GIFs that flash more than three times a second. Motion in email follows `07-motion.md`. `TODO(design): decide whether animated GIFs are allowed in campaigns (see issue #5).`

## What to change from recent sends

From the recent sends reviewed for issue #7. Use this when updating existing templates.

| Seen in recent sends | Change to |
|---|---|
| White body backgrounds | Birch `#FFFDEB` |
| Retired colors: the old Non-GMO Project orange on links and bands, brown and teal header bands | The brand's dark for bands and links, support tint for panels (Color in email, above) |
| Black buttons in a Non-UPF Verified email | Dragon Fruit with Birch text |
| Dark green buttons in Non-GMO Project emails | Monarch with Forest text |
| Certification seals dropped onto hero photos | Seals only beside a verified product; heroes carry no marks |
| A Non-UPF Verified seal in a Non-GMO Project newsletter | Name the program in text and link to it; no other program's marks or colors |
| Logos placed over photography | The logo lives in the header, not on the hero |
| "Register Here" and "Register Now" for the same link | One label, used both times: "Register for the webinar" |
| Links that say "here" | Link text that says where it goes |
| Long paragraphs centered | Body text left-aligned; center only short lines |
| Georgia and Arial as the only fonts | The email stacks above, which fall back to Georgia and Arial only when Lora and Nunito Sans cannot load |
| Emoji as icons in the footer | Text, or an icon from the system's set with alt text |

## Before sending

- One brand, one set of colors, one logo
- Birch ground, brand-dark text, signature color only on buttons and one accent
- Preheader written; subject says the thing
- Every image has alt text; the email reads correctly with images off
- Buttons are HTML, at least 44px tall, labels start with a verb, one label per action
- No seal outside a verified-product story
- Footer has address, preferences and unsubscribe
- Checked at 320px wide, in dark mode, and in Gmail, Outlook and Apple Mail

## Rules for Claude Code

- Build email templates from the tables above. Inline the hex values from "Color in email"; never pick colors by eye or copy them from an older template.
- Use only official logo files. If the needed version (for example a reversed logo) does not exist, use the closest allowed variant from `04-logos-and-marks.md` and leave a `TODO(design)`.
- Write all email copy with `10-writing.md`. Service email timing and content follow `11-ux.md`, "Notifications and email".
