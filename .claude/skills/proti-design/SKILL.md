---
name: proti-design
description: Use this skill to generate well-branded interfaces and assets for Proti, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

The production implementation of this design system lives in `src/design-system/` at the repository root (Vite + React + TypeScript components, imported from `src/design-system` — see its `index.js`). This skill folder carries the original design-system export (tokens, manifest, adherence rules, brand guidance) for reference and for quick standalone prototyping outside the app build.
