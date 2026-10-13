# Food Integrity Project design system

The design framework for the Food Integrity Project and its programs (Non-GMO Project, Non-UPF Verified and Food Integrity Collective), written for people and for Claude Code.

- **Read the system:** [docs/design-system/README.md](docs/design-system/README.md)
- **See the system:** [non-gmo-project.github.io/design-system](https://non-gmo-project.github.io/design-system/). It shows logos, color, type, icons, components, motion, accessibility, writing, email, trademark usage and each brand, with switches for brand and dark mode.
- **Trademark pages for participants:** [Non-GMO Project Verified](https://non-gmo-project.github.io/design-system/trademark/non-gmo-project.html) and [Non-UPF Verified](https://non-gmo-project.github.io/design-system/trademark/non-upf-verified.html).

The site is `index.html` in this repository, generated from the Markdown in `docs/design-system/`. It rebuilds itself when the docs change, and you can also open it locally in a browser.

```sh
npm install      # fonts and icons for the build; also turns on the git pre-commit hook
npm run dev      # rebuild on every change and serve at http://localhost:4321 with live reload
```

| Path | What it is |
|---|---|
| `docs/design-system/` | The system: README, topic files 01 to 13, trademark guides, brand profiles |
| `public/brand/` | Official logos, seals and illustrations |
| `public/fonts/` | Self-hosted Lora, Nunito Sans and Quicksand (copied by the build) |
| `styles/` | Generated CSS for apps to import: `tokens.css`, `tailwind.css`, `fonts.css` |
| `index.html` | Generated showcase, published at the link above |
| `trademark/*.html` | Generated standalone trademark pages for participants |
| `scripts/` | Color scale generator, showcase build, Claude Code hook |
