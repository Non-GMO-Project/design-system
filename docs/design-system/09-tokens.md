# Tokens (implementation)

This is the single source the code reads. Everything in files 02 to 07 lands here as CSS custom properties, wired into Tailwind CSS v4 and shadcn/ui.

The showcase build (`npm run build`) extracts the CSS blocks on this page into `styles/tokens.css` and uses them to render `index.html`. Change a value here and the showcase changes with it.

Put the CSS in `app/globals.css`, or import the generated `styles/tokens.css`. The palette block is generated from `scripts/palette.config.json` by `npm run colors`. Do not edit it by hand.

## How brand switching works

```html
<!-- House level (default) -->
<html data-brand="fip">

<!-- A section or whole app scoped to one program -->
<div data-brand="nongmo"> ... </div>

<!-- Dark mode, independent of brand -->
<html class="dark" data-brand="nonupf">
```

Brand contexts nest. A Non-GMO Project card inside a house-level page sets `data-brand="nongmo"` on the card wrapper, and every component inside picks up the right colors. In Next.js, set the attribute in the route group layout for each brand (for example `app/(nongmo)/layout.tsx`), not on individual components.

`data-brand="fip"` is an internal code name. External copy never abbreviates the parent to "FIP" (see `01-brand-architecture.md`).

## Palette (layer 1)

Generated. Official values from the Food Integrity Project Style Guide are kept exact at their closest step; everything else is derived.

```css
/* palette:start */
:root {
  --birch: #FFFDEB;
  --frost: #F3F4F2;
  /* stone */
  --stone-50: #F3F4F2;
  --stone-100: #E8EFEB;
  --stone-200: #D3DDD8;
  --stone-300: #BAC7C0;
  --stone-400: #9AACA2;
  --stone-500: #7A9185;
  --stone-600: #6B746F;
  --stone-700: #555D59;
  --stone-800: #404844;
  --stone-900: #2D3330;
  --stone-950: #1B211E;
  /* cacao */
  --cacao-50: #FCF5F2;
  --cacao-100: #F3EBE7;
  --cacao-200: #E2D8D3;
  --cacao-300: #CDC0BA;
  --cacao-400: #B3A39A;
  --cacao-500: #9A867C;
  --cacao-600: #826C60;
  --cacao-700: #6D5447;
  --cacao-800: #583D2F;
  --cacao-900: #432718;
  --cacao-950: #241A15;
  /* loam */
  --loam-50: #FCF5F0;
  --loam-100: #F3EBE4;
  --loam-200: #E3D8CF;
  --loam-300: #CFC0B4;
  --loam-400: #B7A392;
  --loam-500: #9E8671;
  --loam-600: #886B53;
  --loam-700: #6B5644;
  --loam-800: #544131;
  --loam-900: #3D2E20;
  --loam-950: #291C10;
  /* milkweed leaf */
  --milkweed-50: #F3F9F1;
  --milkweed-100: #E8EFE5;
  --milkweed-200: #D4DED0;
  --milkweed-300: #BBC8B5;
  --milkweed-400: #9BAD92;
  --milkweed-500: #7C9271;
  --milkweed-600: #5F7A52;
  --milkweed-700: #4B633F;
  --milkweed-800: #374D2C;
  --milkweed-900: #24371B;
  --milkweed-950: #14240B;
  /* forest */
  --forest-50: #F1F9F5;
  --forest-100: #E6EFEA;
  --forest-200: #D1DDD6;
  --forest-300: #B7C6BE;
  --forest-400: #96A99F;
  --forest-500: #768E81;
  --forest-600: #597466;
  --forest-700: #3E5D4D;
  --forest-800: #244736;
  --forest-900: #053220;
  --forest-950: #032618;
  /* seafoam */
  --seafoam-50: #EFFBEB;
  --seafoam-100: #DDEED6;
  --seafoam-200: #CCDCC5;
  --seafoam-300: #B6C6B0;
  --seafoam-400: #9BAA95;
  --seafoam-500: #818E7B;
  --seafoam-600: #697664;
  --seafoam-700: #535F4E;
  --seafoam-800: #3F493A;
  --seafoam-900: #2B3527;
  --seafoam-950: #192216;
  /* monarch */
  --monarch-50: #FFF5EC;
  --monarch-100: #FFE8D6;
  --monarch-200: #FFD0AA;
  --monarch-300: #FAB273;
  --monarch-400: #F18A00;
  --monarch-500: #CA7300;
  --monarch-600: #A75E00;
  --monarch-700: #874B00;
  --monarch-800: #683900;
  --monarch-900: #4B2700;
  --monarch-950: #321800;
  /* dark matter */
  --dark-matter-50: #F2F7FE;
  --dark-matter-100: #E8EDF6;
  --dark-matter-200: #D4DCE6;
  --dark-matter-300: #BCC5D3;
  --dark-matter-400: #9EA9BB;
  --dark-matter-500: #808EA3;
  --dark-matter-600: #65758E;
  --dark-matter-700: #4D5E7A;
  --dark-matter-800: #354866;
  --dark-matter-900: #1E3353;
  --dark-matter-950: #0A2041;
  /* almond */
  --almond-50: #FFF5ED;
  --almond-100: #FFECDD;
  --almond-200: #F5DFCE;
  --almond-300: #DCC7B7;
  --almond-400: #BDAA9B;
  --almond-500: #9F8D7F;
  --almond-600: #847366;
  --almond-700: #6B5C50;
  --almond-800: #53453A;
  --almond-900: #3C3026;
  --almond-950: #281D14;
  /* dragon fruit */
  --dragonfruit-50: #FFF3F6;
  --dragonfruit-100: #FFE5EB;
  --dragonfruit-200: #FFCBD8;
  --dragonfruit-300: #FAAABF;
  --dragonfruit-400: #ED81A1;
  --dragonfruit-500: #DF5584;
  --dragonfruit-600: #CE1B6A;
  --dragonfruit-700: #AB0054;
  --dragonfruit-800: #840040;
  --dragonfruit-900: #60002D;
  --dragonfruit-950: #40001B;
  /* corn flower */
  --cornflower-50: #F2F7FF;
  --cornflower-100: #E7EFFD;
  --cornflower-200: #D3E0F6;
  --cornflower-300: #BACEEF;
  --cornflower-400: #9EB6DE;
  --cornflower-500: #8298BC;
  --cornflower-600: #687C9D;
  --cornflower-700: #506281;
  --cornflower-800: #3A4A66;
  --cornflower-900: #25334C;
  --cornflower-950: #121F35;
  /* romanesco */
  --romanesco-50: #F7FADC;
  --romanesco-100: #EAEEBD;
  --romanesco-200: #D3D95E;
  --romanesco-300: #BEC34C;
  --romanesco-400: #A3A833;
  --romanesco-500: #898D17;
  --romanesco-600: #717400;
  --romanesco-700: #5B5E00;
  --romanesco-800: #464800;
  --romanesco-900: #323400;
  --romanesco-950: #202100;
  /* success */
  --success-50: #EEFBF1;
  --success-100: #E1F1E4;
  --success-200: #C9E0CE;
  --success-300: #ABCAB2;
  --success-400: #84AF8E;
  --success-500: #5C956C;
  --success-600: #2F7D4A;
  --success-700: #1D6638;
  --success-800: #085128;
  --success-900: #003B1A;
  --success-950: #00270F;
  /* warning */
  --warning-50: #FFF5EA;
  --warning-100: #FAE9D7;
  --warning-200: #EDD5BA;
  --warning-300: #DEBB94;
  --warning-400: #CA9B62;
  --warning-500: #B7791F;
  --warning-600: #9A6200;
  --warning-700: #7D4E00;
  --warning-800: #613C00;
  --warning-900: #462A00;
  --warning-950: #2F1A00;
  /* danger */
  --danger-50: #FFF4F2;
  --danger-100: #FFE5E1;
  --danger-200: #F8CDC6;
  --danger-300: #EAAFA7;
  --danger-400: #D88A80;
  --danger-500: #C46459;
  --danger-600: #B4372F;
  --danger-700: #98251F;
  --danger-800: #7C110F;
  --danger-900: #600003;
  --danger-950: #430001;
  /* info */
  --info-50: #F0F8FF;
  --info-100: #E0EEFB;
  --info-200: #C8DBEE;
  --info-300: #A9C3DD;
  --info-400: #82A5C8;
  --info-500: #5B88B3;
  --info-600: #2F6DA3;
  --info-700: #1E5889;
  --info-800: #0D4470;
  --info-900: #003156;
  --info-950: #00213C;
}
/* palette:end */
```

## Semantic tokens (layers 2 and 3)

```css
/* ---------- Shared, light ---------- */
:root {
  --background: var(--birch);
  --card: var(--birch);
  --popover: var(--birch);
  --muted: var(--frost);
  --accent: var(--frost);
  --field: var(--frost);
  --destructive: var(--danger-600);
  --destructive-foreground: var(--birch);

  --status-success-bg: var(--success-50);
  --status-success-fg: var(--success-800);
  --status-success-border: var(--success-300);
  --status-success-icon: var(--success-600);
  --status-warning-bg: var(--warning-50);
  --status-warning-fg: var(--warning-800);
  --status-warning-border: var(--warning-300);
  --status-warning-icon: var(--warning-600);
  --status-danger-bg: var(--danger-50);
  --status-danger-fg: var(--danger-800);
  --status-danger-border: var(--danger-300);
  --status-danger-icon: var(--danger-600);
  --status-info-bg: var(--info-50);
  --status-info-fg: var(--info-800);
  --status-info-border: var(--info-300);
  --status-info-icon: var(--info-600);
  --status-neutral-bg: var(--frost);
  --status-neutral-fg: var(--stone-800);
  --status-neutral-border: var(--stone-300);
  --status-neutral-icon: var(--stone-600);

  --chart-2: #E69F00;
  --chart-3: #56B4E9;
  --chart-4: #009E73;
  --chart-5: #0072B2;
  --chart-6: #D55E00;
  --chart-7: #CC79A7;
  --chart-8: var(--stone-500);

  /* shadcn base radius. Named radii, fonts and easing live in @theme (see Tailwind wiring) */
  --radius: 0.5rem;

  /* elevation, tinted with Cacao so shadows sit warm on Birch */
  --elevation-1: 0 1px 2px rgb(36 26 21 / 0.08);
  --elevation-2: 0 2px 6px rgb(36 26 21 / 0.10), 0 1px 2px rgb(36 26 21 / 0.06);
  --elevation-3: 0 8px 24px rgb(36 26 21 / 0.14), 0 2px 6px rgb(36 26 21 / 0.08);
  --elevation-4: 0 16px 48px rgb(36 26 21 / 0.20);

  /* motion durations (see 07-motion.md) */
  --duration-instant: 0ms;
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-moderate: 280ms;
  --duration-slow: 400ms;
  --duration-deliberate: 640ms;
}

/* ---------- Shared, dark ---------- */
.dark {
  --destructive: var(--danger-400);
  --destructive-foreground: var(--stone-950);

  --status-success-bg: var(--success-950);
  --status-success-fg: var(--success-200);
  --status-success-border: var(--success-800);
  --status-success-icon: var(--success-400);
  --status-warning-bg: var(--warning-950);
  --status-warning-fg: var(--warning-200);
  --status-warning-border: var(--warning-800);
  --status-warning-icon: var(--warning-400);
  --status-danger-bg: var(--danger-950);
  --status-danger-fg: var(--danger-200);
  --status-danger-border: var(--danger-800);
  --status-danger-icon: var(--danger-400);
  --status-info-bg: var(--info-950);
  --status-info-fg: var(--info-200);
  --status-info-border: var(--info-800);
  --status-info-icon: var(--info-400);
  --status-neutral-bg: var(--stone-900);
  --status-neutral-fg: var(--stone-200);
  --status-neutral-border: var(--stone-700);
  --status-neutral-icon: var(--stone-400);
  --elevation-1: 0 1px 2px rgb(0 0 0 / 0.4);
  --elevation-2: 0 2px 6px rgb(0 0 0 / 0.45);
  --elevation-3: 0 8px 24px rgb(0 0 0 / 0.5);
  --elevation-4: 0 16px 48px rgb(0 0 0 / 0.6);
}

/* ---------- Food Integrity Project ---------- */
:root, [data-brand="fip"] {
  --foreground: var(--cacao-950);
  --card-foreground: var(--cacao-950);
  --popover-foreground: var(--cacao-950);
  --accent-foreground: var(--cacao-950);
  --muted-foreground: var(--loam-700);
  --border: var(--loam-200);
  --input: var(--loam-600);
  --primary: var(--milkweed-600);
  --primary-foreground: var(--birch);
  --primary-hover: var(--milkweed-700);
  --secondary: var(--loam-100);
  --secondary-foreground: var(--cacao-950);
  --brand-dark: var(--cacao-950);
  --brand-text: var(--cacao-950);
  --brand-tint: var(--loam-50);
  --brand-subtle: var(--loam-100);
  --brand-border: var(--loam-300);
  --brand-support: var(--loam-700);
  --brand-support-foreground: var(--birch);
  --brand-signature: var(--milkweed-600);
  --brand-signature-foreground: var(--birch);
  --ring: var(--cacao-950);
  --chart-1: var(--milkweed-600);
  --gradient-hero: linear-gradient(135deg, var(--cacao-950), var(--loam-800));
  --gradient-ground: linear-gradient(120deg, var(--loam-700), var(--milkweed-600) 60%, var(--milkweed-400));
}
.dark, .dark [data-brand="fip"], [data-brand="fip"].dark {
  --foreground: var(--birch);
  --card-foreground: var(--birch);
  --popover-foreground: var(--birch);
  --accent-foreground: var(--birch);
  --brand-text: var(--birch);
  --ring: var(--birch);
  --background: var(--cacao-950);
  --card: var(--cacao-900);
  --popover: var(--cacao-900);
  --muted: var(--cacao-900);
  --muted-foreground: var(--cacao-200);
  --accent: var(--cacao-800);
  --field: var(--cacao-900);
  --border: var(--cacao-800);
  --input: var(--cacao-500);
  --secondary: var(--cacao-800);
  --secondary-foreground: var(--birch);
  --brand-tint: var(--cacao-900);
  --brand-subtle: var(--cacao-800);
  --brand-border: var(--cacao-700);
}

/* ---------- Non-GMO Project ---------- */
[data-brand="nongmo"] {
  --foreground: var(--forest-900);
  --card-foreground: var(--forest-900);
  --popover-foreground: var(--forest-900);
  --accent-foreground: var(--forest-900);
  --muted-foreground: var(--forest-700);
  --border: var(--forest-200);
  --input: var(--forest-600);
  --primary: var(--monarch-400);
  --primary-foreground: var(--forest-900);
  --primary-hover: var(--monarch-300);
  --secondary: var(--seafoam-100);
  --secondary-foreground: var(--forest-900);
  --brand-dark: var(--forest-900);
  --brand-text: var(--forest-900);
  --brand-tint: var(--seafoam-50);
  --brand-subtle: var(--seafoam-100);
  --brand-border: var(--seafoam-300);
  --brand-support: var(--seafoam-100);
  --brand-support-foreground: var(--forest-900);
  --brand-signature: var(--monarch-400);
  --brand-signature-foreground: var(--forest-900);
  --ring: var(--forest-900);
  --chart-1: var(--monarch-500);
  --gradient-hero: linear-gradient(135deg, var(--forest-900), var(--forest-800));
  --gradient-flight: linear-gradient(120deg, var(--forest-900), var(--forest-700) 55%, var(--monarch-400));
}
.dark [data-brand="nongmo"], [data-brand="nongmo"].dark {
  --foreground: var(--birch);
  --card-foreground: var(--birch);
  --popover-foreground: var(--birch);
  --accent-foreground: var(--birch);
  --brand-text: var(--birch);
  --ring: var(--birch);
  --background: var(--forest-900);
  --card: var(--forest-800);
  --popover: var(--forest-800);
  --muted: var(--forest-800);
  --muted-foreground: var(--forest-200);
  --accent: var(--forest-700);
  --field: var(--forest-800);
  --border: var(--forest-700);
  --input: var(--forest-400);
  --secondary: var(--forest-700);
  --secondary-foreground: var(--birch);
  --brand-tint: var(--forest-800);
  --brand-subtle: var(--forest-700);
  --brand-border: var(--forest-600);
}

/* ---------- Non-UPF Verified ---------- */
[data-brand="nonupf"] {
  --foreground: var(--dark-matter-950);
  --card-foreground: var(--dark-matter-950);
  --popover-foreground: var(--dark-matter-950);
  --accent-foreground: var(--dark-matter-950);
  --muted-foreground: var(--dark-matter-700);
  --border: var(--dark-matter-200);
  --input: var(--dark-matter-600);
  --primary: var(--dragonfruit-600);
  --primary-foreground: var(--birch);
  --primary-hover: var(--dragonfruit-700);
  --secondary: var(--almond-200);
  --secondary-foreground: var(--dark-matter-950);
  --brand-dark: var(--dark-matter-950);
  --brand-text: var(--dark-matter-950);
  --brand-tint: var(--almond-50);
  --brand-subtle: var(--almond-200);
  --brand-border: var(--almond-400);
  --brand-support: var(--almond-200);
  --brand-support-foreground: var(--dark-matter-950);
  --brand-signature: var(--dragonfruit-600);
  --brand-signature-foreground: var(--birch);
  --ring: var(--dark-matter-950);
  --chart-1: var(--dragonfruit-600);
  --gradient-hero: linear-gradient(135deg, var(--dark-matter-950), var(--dark-matter-900));
  --gradient-harvest: linear-gradient(120deg, var(--dark-matter-950), var(--dragonfruit-700) 60%, var(--dragonfruit-500));
}
.dark [data-brand="nonupf"], [data-brand="nonupf"].dark {
  --foreground: var(--birch);
  --card-foreground: var(--birch);
  --popover-foreground: var(--birch);
  --accent-foreground: var(--birch);
  --brand-text: var(--birch);
  --ring: var(--birch);
  --background: var(--dark-matter-950);
  --card: var(--dark-matter-900);
  --popover: var(--dark-matter-900);
  --muted: var(--dark-matter-900);
  --muted-foreground: var(--dark-matter-200);
  --accent: var(--dark-matter-800);
  --field: var(--dark-matter-900);
  --border: var(--dark-matter-800);
  --input: var(--dark-matter-500);
  --secondary: var(--dark-matter-800);
  --secondary-foreground: var(--birch);
  --brand-tint: var(--dark-matter-900);
  --brand-subtle: var(--dark-matter-800);
  --brand-border: var(--dark-matter-700);
}

/* ---------- Food Integrity Collective ---------- */
[data-brand="collective"] {
  --foreground: var(--forest-900);
  --card-foreground: var(--forest-900);
  --popover-foreground: var(--forest-900);
  --accent-foreground: var(--forest-900);
  --muted-foreground: var(--forest-700);
  --border: var(--forest-200);
  --input: var(--forest-600);
  --primary: var(--romanesco-200);
  --primary-foreground: var(--forest-900);
  --primary-hover: var(--romanesco-300);
  --secondary: var(--cornflower-200);
  --secondary-foreground: var(--forest-900);
  --brand-dark: var(--forest-900);
  --brand-text: var(--forest-900);
  --brand-tint: var(--cornflower-50);
  --brand-subtle: var(--cornflower-200);
  --brand-border: var(--cornflower-300);
  --brand-support: var(--cornflower-400);
  --brand-support-foreground: var(--forest-900);
  --brand-signature: var(--romanesco-200);
  --brand-signature-foreground: var(--forest-900);
  --ring: var(--forest-900);
  --chart-1: var(--cornflower-600);
  --gradient-hero: linear-gradient(135deg, var(--forest-900), var(--forest-800));
  --gradient-gather: linear-gradient(120deg, var(--cornflower-400), var(--cornflower-200) 50%, var(--romanesco-200));
}
.dark [data-brand="collective"], [data-brand="collective"].dark {
  --foreground: var(--birch);
  --card-foreground: var(--birch);
  --popover-foreground: var(--birch);
  --accent-foreground: var(--birch);
  --brand-text: var(--birch);
  --ring: var(--birch);
  --background: var(--forest-900);
  --card: var(--forest-800);
  --popover: var(--forest-800);
  --muted: var(--forest-800);
  --muted-foreground: var(--forest-200);
  --accent: var(--forest-700);
  --field: var(--forest-800);
  --border: var(--forest-700);
  --input: var(--forest-400);
  --secondary: var(--forest-700);
  --secondary-foreground: var(--birch);
  --brand-tint: var(--forest-800);
  --brand-subtle: var(--forest-700);
  --brand-border: var(--forest-600);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
    --duration-moderate: 0ms;
    --duration-slow: 0ms;
    --duration-deliberate: 0ms;
  }
}
```

## Tailwind CSS v4 wiring

Tailwind v4 reads tokens from CSS with `@theme`. `inline` makes the utilities reference the live variable, so brand switching works at runtime.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-field: var(--field);
  --color-ring: var(--ring);

  --color-brand-dark: var(--brand-dark);
  --color-brand-text: var(--brand-text);
  --color-brand-tint: var(--brand-tint);
  --color-brand-subtle: var(--brand-subtle);
  --color-brand-border: var(--brand-border);
  --color-brand-support: var(--brand-support);
  --color-brand-support-foreground: var(--brand-support-foreground);
  --color-brand-signature: var(--brand-signature);
  --color-brand-signature-foreground: var(--brand-signature-foreground);
  --color-birch: var(--birch);
  --color-frost: var(--frost);

  --color-status-success-bg: var(--status-success-bg);
  --color-status-success-fg: var(--status-success-fg);
  --color-status-success-border: var(--status-success-border);
  --color-status-success-icon: var(--status-success-icon);
  --color-status-warning-bg: var(--status-warning-bg);
  --color-status-warning-fg: var(--status-warning-fg);
  --color-status-warning-border: var(--status-warning-border);
  --color-status-warning-icon: var(--status-warning-icon);
  --color-status-danger-bg: var(--status-danger-bg);
  --color-status-danger-fg: var(--status-danger-fg);
  --color-status-danger-border: var(--status-danger-border);
  --color-status-danger-icon: var(--status-danger-icon);
  --color-status-info-bg: var(--status-info-bg);
  --color-status-info-fg: var(--status-info-fg);
  --color-status-info-border: var(--status-info-border);
  --color-status-info-icon: var(--status-info-icon);
  --color-status-neutral-bg: var(--status-neutral-bg);
  --color-status-neutral-fg: var(--status-neutral-fg);
  --color-status-neutral-border: var(--status-neutral-border);
  --color-status-neutral-icon: var(--status-neutral-icon);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-chart-6: var(--chart-6);
  --color-chart-7: var(--chart-7);
  --color-chart-8: var(--chart-8);

  --shadow-1: var(--elevation-1);
  --shadow-2: var(--elevation-2);
  --shadow-3: var(--elevation-3);
  --shadow-4: var(--elevation-4);
}

/* Static values that never change by brand or mode */
@theme {
  --radius-sm: 0.25rem;   /* inputs, badges, checkboxes, chips */
  --radius-md: 0.5rem;    /* buttons, cards, menus, popovers */
  --radius-lg: 0.75rem;   /* dialogs, sheets, large panels */

  --font-serif: "Lora", Charter, "Bitstream Charter", Cambria, Georgia, serif;
  --font-sans: "Nunito Sans", "Avenir Next", Avenir, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --font-accent: "Quicksand", "Nunito Sans", system-ui, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-emphasized: cubic-bezier(0.3, 0, 0, 1.15);
}
```

Tailwind emits the `@theme` values as CSS variables too, so `--font-serif` and `--ease-standard` are available in plain CSS and in Motion code, under the names used in `03-typography.md` and `07-motion.md`.

In Next.js, load Lora, Nunito Sans and Quicksand with `next/font/google` (self-hosted at build time) and put the `next/font` variable first in each stack, for example `--font-serif: var(--font-lora), "Lora", Charter, ...`. The showcase self-hosts the same three families from `public/fonts/`.

This produces utilities such as `bg-primary`, `text-brand-text`, `bg-brand-support`, `bg-status-warning-bg`, `border-status-danger-border`, `shadow-2`, `rounded-lg`, `font-serif`, `font-accent`, `ease-standard`.

## Palette access in Tailwind

The raw palette is deliberately **not** exposed as Tailwind utilities (no `bg-monarch-400`). That keeps components on semantic tokens. If a one-off illustration or marketing page genuinely needs a raw step, use `bg-[var(--monarch-400)]` and leave a comment explaining why. Birch and Frost are the exception: they are shared by every brand and exposed as `bg-birch` and `bg-frost`.

## Token naming rules

- Palette: `--{name}-{step}`. Lowercase, the official color name, steps 50 to 950 (`--dark-matter-950`, `--milkweed-600`).
- Semantic: `--{role}` or `--{role}-{part}`. Named for the job, never the hue (`--brand-signature`, not `--orange`).
- New tokens get added here first, then documented in the file that owns the topic.

## Exporting for design tools

`TODO(design): if the team uses Figma variables, export this file to the W3C Design Tokens format (tokens.json) so Figma and code stay in sync. Tokens Studio or Style Dictionary can do the round trip.`
