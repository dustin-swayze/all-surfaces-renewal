# Styling System

How visual styling works across the site — Tailwind theme customisation, shared component classes, and when to extend the system vs. inline a one-off.

## Overview

The site uses **Tailwind CSS v3** with a small custom theme layer. Most styling is done inline with utility classes (e.g. `className="flex items-center gap-2 rounded-xl"`). Patterns that repeat across components are extracted into reusable classes in `src/index.css` under Tailwind's `@layer components` directive.

The philosophy: **use utilities by default, extract to a class only when the same pattern shows up in 3+ places.** This keeps most styling local to the component (easy to find, easy to change) while avoiding repetition for common patterns like buttons and cards.

## Tailwind theme — `tailwind.config.js`

The theme adds brand-specific colors, typography, and shadows on top of Tailwind's defaults. Everything else (spacing, breakpoints, etc.) uses Tailwind's standard values.

### Colors

```js
colors: {
  brand: {
    DEFAULT: '#1e3a5f',   // deep blue — primary
    dark:    '#152a47',   // hover/active states
    light:   '#2f5785',   // focus rings, secondary emphasis
  },
  accent: {
    DEFAULT: '#d97706',   // amber — CTA buttons, key highlights
    dark:    '#b45309',   // hover
    light:   '#f59e0b',   // lighter amber for subtler use
  },
  surface: {
    DEFAULT: '#ffffff',   // background
    muted:   '#f7f8fa',   // section backgrounds, cards-on-cards
    border:  '#e5e7eb',   // standard border color
  },
},
```

In JSX these work like any Tailwind color:

- `bg-brand`, `text-brand`, `border-brand`
- `bg-brand-dark`, `text-brand-light`
- `bg-accent`, `text-accent`
- `bg-surface-muted`, `border-surface-border`

### Typography

```js
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', ...],
},
```

No custom font is loaded — we use the system font stack with Inter as the preferred option. This is intentional: it's fast (zero external requests), works offline, and looks native on every device.

If you want to load Inter from Google Fonts later, add a `<link>` in `index.html` and the existing stack picks it up automatically.

### Shadows

```js
boxShadow: {
  card:  '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
  hover: '0 10px 30px rgba(15, 23, 42, 0.12)',
},
```

Used in JSX as `shadow-card` (default resting state for cards) and `shadow-hover` (elevated hover state). Derived from slate/900 at low alpha to match the brand palette's cool tone instead of black.

### Border radius

```js
borderRadius: {
  xl:   '0.875rem',
  '2xl': '1.125rem',
},
```

Slightly more rounded than Tailwind's defaults. Used for cards (`rounded-2xl`) and buttons (`rounded-xl`).

## Shared component classes — `src/index.css`

Defined under `@layer components { ... }`. Tailwind treats these as regular utility classes — you use them in `className` just like `flex` or `rounded-lg`, and Tailwind's purging still works correctly.

### Buttons

```css
.btn {
  @apply inline-flex items-center justify-center rounded-xl px-5 py-3
         text-sm font-semibold transition
         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
         focus-visible:ring-brand-light;
}
.btn-primary   { @apply btn bg-brand text-white hover:bg-brand-dark shadow-card hover:shadow-hover; }
.btn-accent    { @apply btn bg-accent text-white hover:bg-accent-dark shadow-card hover:shadow-hover; }
.btn-secondary { @apply btn border border-brand/20 bg-white text-brand hover:bg-surface-muted; }
```

Three button styles:

| Class | When to use |
| --- | --- |
| `btn-accent` | The single most important call-to-action on a section (e.g. "Get a Free Quote"). Amber — draws the eye. |
| `btn-primary` | Secondary actions that are still strong CTAs (e.g. "See our work"). Deep blue — matches brand. |
| `btn-secondary` | Lower-priority links that need to look clickable but not compete with the primary (e.g. "View full gallery"). Outlined. |

### Cards

```css
.card { @apply rounded-2xl border border-surface-border bg-white shadow-card; }
```

Every card-like container on the site — service cards, gallery cards, review cards, contact info cards, the quote form — uses this class. Add padding (`p-5`, `p-6`, etc.) per instance; the `.card` class covers only the visual shell.

### Form inputs

```css
.input {
  @apply block w-full rounded-lg border border-surface-border bg-white
         px-3 py-2.5 text-sm text-slate-800 shadow-sm transition
         placeholder:text-slate-400
         focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20;
}
```

Applied to every `<input>`, `<select>`, and `<textarea>` in the quote form. Gives consistent styling and focus treatment across all input types.

### Layout helpers

```css
.container-page { @apply mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8; }
.section        { @apply py-16 sm:py-20; }
.section-muted  { @apply bg-surface-muted; }
.eyebrow        { @apply text-xs font-semibold uppercase tracking-widest text-accent; }
```

| Class | Purpose |
| --- | --- |
| `container-page` | Centered max-width wrapper. Use on every page's top-level content so margins stay consistent. |
| `section` | Vertical padding for major page sections (hero, services, gallery preview, etc.). |
| `section-muted` | Light gray background variant — alternate between this and the default for visual rhythm on long pages. |
| `eyebrow` | Small uppercase label above a section heading (e.g. "What we do", "Our work"). Amber accent color ties sections together. |

## When to extract vs. inline

### Inline utility classes when

- The pattern appears once or twice in the codebase
- The styling is specific to a single component's layout
- You want to experiment quickly without committing to a name

### Extract to a component class when

- The same utility chain appears in 3+ places
- The pattern has semantic meaning you'd want to rename (e.g. "button", "card")
- Consistency matters more than flexibility (e.g. all buttons should look identical)

When you extract, put the new class in `src/index.css` inside `@layer components { ... }` using `@apply` to compose from utilities. Document the new class here in this file.

## How to make common changes

### Change the brand color

Edit `tailwind.config.js`:

```js
brand: {
  DEFAULT: '#your-new-color',
  dark:    '#darker-variant',
  light:   '#lighter-variant',
},
```

Restart the dev server. Everything using `bg-brand`, `text-brand`, `border-brand`, etc. updates site-wide.

### Change button style

Edit `.btn`, `.btn-primary`, `.btn-accent`, or `.btn-secondary` in `src/index.css`. Every button on the site using that class picks up the change on hot-reload.

### Add a new section background

Add a new modifier in `src/index.css`:

```css
.section-dark {
  @apply bg-brand text-white;
}
```

Use `<section className="section section-dark">` — the `.section` padding plus your new background/text combo.

### Change the page max width

Edit `.container-page` in `src/index.css` — specifically the `max-w-6xl` token. Options: `max-w-5xl` (narrower), `max-w-7xl` (wider), or a custom value via Tailwind's arbitrary value syntax: `max-w-[1100px]`.

### Adjust card corners / shadows

Cards: edit `.card`. Buttons: edit `.btn` (the rounded-xl token). Or redefine `card`/`hover` in `tailwind.config.js` under `boxShadow`.

## Responsive patterns

Tailwind's breakpoints used throughout:

| Prefix | Width |
| --- | --- |
| (none) | Mobile first — base styles apply from 0px up |
| `sm:` | 640px and up |
| `md:` | 768px and up |
| `lg:` | 1024px and up |

Typical patterns in the codebase:

- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — 1 column on phones, 2 on tablets, 4 on desktop
- `text-3xl sm:text-4xl lg:text-5xl` — progressive headline scaling
- `hidden md:flex` — hide on mobile, show on desktop (used for nav links)
- `md:hidden` — show on mobile, hide on desktop (used for hamburger button)

Mobile-first means always author the smallest-screen style first, then use `sm:`/`md:`/`lg:` to layer on larger-screen tweaks.

## Dark mode

Not implemented. If we wanted it, we'd enable Tailwind's `darkMode: 'class'` in `tailwind.config.js`, add dark-mode variants to every component class, and write a toggle. A small-business marketing site rarely needs dark mode — most traffic is first-time visitors searching for a service, and they don't have your site open long enough to appreciate theme choice.

## Accessibility notes

- All color contrast ratios between text and background meet WCAG AA at minimum.
- Focus states use `focus-visible:ring-*` so keyboard users see clear focus rings while mouse users don't see one after clicking.
- Buttons have `aria-` attributes where needed (e.g. the mobile nav toggle uses `aria-expanded`).
- Form inputs always have a visible `<label>` tied to them via wrapping (not just placeholder text).

A formal accessibility audit has not been done yet — listed as a future polish pass.
