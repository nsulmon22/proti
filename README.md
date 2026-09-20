# Proti

Proti is a recipe app for people who want to eat a lot of protein without spending their evenings cooking. This repo is a Vite + React + TypeScript app styled with Tailwind CSS, built on the **Proti design system** imported from [Claude Design](https://claude.ai/design).

## Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) for app-level layout and utilities
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting, including design-system adherence rules

## Scripts

```bash
npm install
npm run dev      # start the dev server
npm run build     # type-check and build for production
npm run lint       # oxlint
npm run preview   # preview the production build
```

## Design system

The design system lives in [`src/design-system`](src/design-system):

- `tokens/` — CSS custom properties for color, type, spacing, radius, elevation and motion, entered through `styles.css`.
- `components/` — 19 components (`core`, `forms`, `navigation`, `feedback`, `recipes`), each a `.jsx` implementation with a hand-written `.d.ts` next to it.
- `index.js` / `index.d.ts` — the public barrel. Always import from here:

  ```tsx
  import { Button, RecipeCard, MacroBar } from './design-system'
  ```

Importing a component from its internal path (e.g. `./design-system/components/core/Button.jsx`) is flagged by the `no-restricted-imports` oxlint rule in [`.oxlintrc.json`](.oxlintrc.json) — that file also encodes each component's declared prop contract (allowed props, allowed variant/tone/size values) as `no-restricted-syntax` rules, and flags raw hex colors, raw px values and non-brand fonts in favor of design tokens.

Voice, color, type, spacing and component guidance for the brand lives in [`.claude/skills/proti-design`](.claude/skills/proti-design) — a Claude Code agent skill (`/proti-design`) for prototyping new screens or marketing pages in the Proti brand, in or outside this codebase. That folder also keeps the original Claude Design export artifacts (`_ds_manifest.json`, `_adherence.oxlintrc.json`, a standalone `_ds_bundle.js` for quick static-HTML prototypes) for reference.

## Project origin

Design system imported from the Claude Design project **Proti Design System** (formerly prototyped under the working name "Gram Kitchen").
