# Proti Design System

Proti is a recipe product for people who want to eat a lot of protein without spending their evenings cooking. Every recipe is quick (under 30 minutes), high in protein (30g+ per serving as a rule), and shoppable from a normal supermarket. Two surfaces are covered here: a **mobile app** (browse, plan, cook, track) and a **marketing website** (home, recipe index, pricing).

## Sources

No codebase, Figma file, deck or asset pack was supplied. The system was built from a written brief:

> "Easy and quick to cook recipes focused on protein intake and healthy lifestyle. Clean design with off-white as a base colour, supported by no more than 3 muted accent colours (`#d6d1b1`, `#c7efcf`, `#eef5db`) for the primary and secondary actions. Rounded corners and a design that breathes through enough spacing. Modern typography."

Everything beyond those constraints — the tone of voice, the type pairing, the component inventory, the product surfaces — is a proposal to react to, not an existing brand. Substitutions and placeholders are listed under [Gaps and substitutions](#gaps-and-substitutions).

## Content fundamentals

**Voice.** Plain, competent, unfussy — a good cook talking to a friend, not a nutrition brand shouting. Short declarative sentences. Facts before adjectives.

**Person.** Address the reader as *you*; the product speaks as *we* only when it is doing something on their behalf ("We'll keep the protein within 3g"). Never "I".

**Casing.** Sentence case for everything: headlines, buttons, badges, nav, tabs. Uppercase is reserved for 12px micro-labels with 0.08em tracking ("TODAY", "PROTEIN"). No title case, no all-caps headlines.

**Numbers.** Always concrete and always in the mono face: "41g protein", "18 min", "520 kcal", "620 recipes". Grams are lowercase with no space ("41g"); minutes take a space ("18 min").

**Punctuation.** No exclamation marks. Em dashes sparingly. British spelling ("yoghurt", "flavour"), metric first with an imperial toggle.

**Emoji.** Never. Not in UI, not in marketing, not in notifications.

**Examples**

| Do | Don't |
| --- | --- |
| "Hit your protein without living in the kitchen." | "Crush your macros! 💪" |
| "Every recipe lists protein per serving, verified against the ingredient weights." | "Our AI-powered engine optimises your nutrition journey." |
| "Added to this week's plan" | "Success! Your recipe has been added." |
| "Start cooking" | "Let's Get Cooking!" |
| "Nothing matches \"tofu\" yet." | "Oops! No results found 😢" |

Button labels are verbs in 1–3 words: *Start cooking*, *Add to plan*, *Save*, *Browse recipes*. Empty states state the fact and offer one way out. Errors say what happened and what to do, never blame the user.

## Visual foundations

**Colour.** An off-white foundation (`--cream-1 #FAF8F1` page, `--cream-0 #FFFDF8` cards) with warm near-black ink (`--ink-0 #333A30`, a green-leaning black rather than a neutral grey). Three brand accents, each expanded to a five-step ramp:

- **Mint `#C7EFCF`** — primary actions, the protein colour, selected states.
- **Sand `#D6D1B1`** — secondary actions, metadata pills, image tint blocks.
- **Pale leaf `#EEF5DB`** — tertiary surfaces and quiet emphasis.
- **Paprika `#D9552F`** (bold accent) — the one saturated colour in the system. One emphatic moment per view: a hero eyebrow, a promo band, a live cooking timer, a "new" flag. Never as a general button colour, never for danger (that stays muted clay), and never two paprika elements in the same viewport. Cream text on paprika 400; paprika 500 for paprika-coloured text on cream.

Ink text sits on accent fills (never white on mint — contrast fails). Two derived support hues, clay and amber, exist **only** for warning and danger states. Backgrounds are flat colour; there are no gradients anywhere in the system.

**Typography.** Display: **Schibsted Grotesk** 600, tracking −0.03em at display sizes, −0.015em at heading sizes. Text: **Manrope** 400/500/600 at 1.5 line-height, 66ch measure. Numerals: **JetBrains Mono** — every nutrition figure, time and count is set in mono so figures align in columns and read as data. Weight 700 is display-only.

**Spacing.** 4px base. Card padding 24, stack gap 16, label-to-value gap 8, marketing section rhythm 96px. Mobile gutter 20, desktop 40, container 1200. When in doubt, go one step up the scale.

**Corner radii.** Generous and consistent. Cards 22px, dialogs 28px, images 22px, fields 16px, all buttons and pills fully rounded. The only tight radius in the system is the 6px checkbox.

**Cards.** White (`--surface-card`) on the cream page, 1px `--border-subtle` hairline, 22px radius, `--shadow-s` (`0 2px 8px rgba(28,32,25,.06)`). Tinted cards (accent/sand/leaf) drop the shadow and use a matching-hue border. Never combine a heavy shadow with an accent fill.

**Shadows.** Four steps, all warm-tinted (ink at 5–10% alpha) and all soft: `xs` hairline lift, `s` cards, `m` hover and toasts, `l` dialogs. No hard drop shadows, no inner shadows except the `--inset-hairline` helper.

**Backgrounds and imagery.** Flat cream. No repeating patterns, no textures, no illustration. Photography is the intended imagery: overhead or 45°, natural daylight, warm and slightly desaturated, food on plain ceramic against a cream or wood surface, no props clutter, no dark moody styling. **No photography was supplied**, so every image slot falls back to a flat brand tint block (sand / mint / leaf) with a 26px Lucide utensils glyph at 30% ink. Replace the tint blocks with real photography before shipping anything public.

**Motion.** One easing (`cubic-bezier(.2,.6,.25,1)`) and three durations: 120ms for hover and colour changes, 200ms for toggles and shadow, 340ms for entrances. Fades and short slides only — no bounce, no spring, no attention-seeking loops.

**Interaction states.** Hover moves the fill one step along its ramp (mint 300 → 400) and lifts interactive cards by 1px; ghost and outline controls fill with `--cream-2`. Press scales to 0.975 — never a colour flash. Focus is a 3px mint ring (`--shadow-focus`), always visible, never removed. Disabled is `--cream-2` on `--ink-4` with `not-allowed`.

**Borders.** Hairline 1px only, in cream steps 3–4. Dividers are borders, not shadows. No 2px+ outlines except the focus ring.

**Transparency and blur.** Three sanctioned uses: the sticky site header (cream at 86% + 10px blur), the dialog scrim (ink at 34% + blur), and `IconButton variant="overlay"` sitting on photography (cream at 86% + blur). Text is never faded to imply hierarchy — use an ink step instead.

**Layout rules.** Sticky translucent header on web; fixed bottom tab bar on mobile with 44px minimum hit targets. Content maxes at 1200px; prose maxes at 66ch. Recipe grids are 4-up desktop / 2-up mobile with a 260px minimum column.

## Iconography

**Lucide** (outline, 2px stroke), loaded from `unpkg.com/lucide-static@0.462.0` and rendered by the `Icon` component as a CSS mask so glyphs inherit `currentColor`. Sizes: 16 inline, 20 default, 24 navigation. No filled glyphs, no duotone, no mixing icon sets. **Substitution flag:** no icon set was supplied, so Lucide was chosen for its thin, rounded, food-friendly outlines — swap the slug list if you have your own set.

Common slugs: `timer`, `flame`, `leaf`, `beef`, `egg`, `fish`, `carrot`, `milk`, `soup`, `wheat`, `chef-hat`, `utensils`, `utensils-crossed`, `shopping-basket`, `bookmark`, `heart`, `search`, `calendar-days`.

Emoji are never used. Unicode characters are not used as icons — the only non-Lucide glyph in the system is the middot separator in metadata rows ("18 min · 520 kcal").

**Logo:** none supplied. Wherever a mark belongs, the name is set in Schibsted Grotesk 600 at −0.035em tracking. No logo has been drawn or invented.

## Components

Authored from scratch (no source library existed). In this repo the working implementation lives at `src/design-system/components/`, each with a `.jsx` implementation and a hand-written `.d.ts` declaration.

- `core/` — **Button**, **IconButton**, **Card**, **Badge**, **Tag**, **Icon**
- `forms/` — **Input**, **Select**, **Checkbox**, **Radio**, **Switch**
- `navigation/` — **Tabs**
- `feedback/` — **Dialog**, **Toast**, **Tooltip**
- `recipes/` — **RecipeCard**, **TimePill**, **DietaryChips**, **MacroBar**

**Intentional additions.** `Icon` (wrapper so the Lucide set is used one way everywhere), `RecipeCard` and `MacroBar` (the product's two signature patterns — without them every consumer would rebuild a recipe tile and a macro graphic by hand).

## Index (this skill folder)

| Path | What it is |
| --- | --- |
| `styles.css` | Entry point — imports every token file. Standalone prototypes link this. |
| `tokens/` | `fonts`, `colors`, `typography`, `spacing`, `radius`, `elevation`, `motion`, `base`. |
| `_ds_manifest.json` | Machine-readable inventory of components, tokens and starting points from the original Claude Design export. |
| `_adherence.oxlintrc.json` | The original oxlint adherence rules (component prop contracts, token-only styling). The active project lint config at the repo root (`.oxlintrc.json`) is derived from this. |
| `thumbnail.html` | Homepage tile. |

The full component/guideline/UI-kit source lives in the Proti Design System project in Claude Design and has been ported into `src/design-system/` in this repository for production use.

## Gaps and substitutions

1. **No logo.** Wordmark set in type; nothing drawn.
2. **Fonts substituted.** No binaries supplied — Schibsted Grotesk, Manrope and JetBrains Mono are loaded from Google Fonts. Send real font files and `tokens/fonts.css` becomes local `@font-face` rules.
3. **Icons substituted.** Lucide via CDN.
4. **No photography.** Tint blocks stand in everywhere.
5. **Semantic reds and ambers are derived**, not brand-given — clay `#B65B43` and amber `#A9791F`, muted to sit beside the accents.
