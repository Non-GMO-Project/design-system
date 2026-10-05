# Food Integrity Project design system

The design framework for the Food Integrity Project and its programs (Non-GMO Project, Non-UPF Verified and Food Integrity Collective), written for people and for Claude Code.

- **Read the system:** [docs/design-system/README.md](docs/design-system/README.md)
- **See the system:** open [index.html](index.html) in a browser. It shows logos, color, type, icons, components, motion, accessibility and each brand, with switches for brand and dark mode.

`index.html` is generated from the Markdown in `docs/design-system/` and rebuilds itself when the docs change.

```sh
npm install      # fonts and icons for the build; also turns on the git pre-commit hook
npm run dev      # rebuild on every change and serve at http://localhost:4321 with live reload
```

| Path | What it is |
|---|---|
| `docs/design-system/` | The system: README, topic files 01 to 09, brand profiles |
| `public/brand/` | Official logos, seals and illustrations |
| `public/fonts/` | Self-hosted Lora, Nunito Sans and Quicksand (copied by the build) |
| `styles/tokens.css` | Generated CSS custom properties |
| `index.html` | Generated showcase |
| `scripts/` | Color scale generator, showcase build, Claude Code hook |
