# Feature: Project Scaffold (Milestone 1)

The initial scaffold of the All Surfaces Renewal and Repair website.

## What was built

- A fully working Vite + React + TypeScript project with Tailwind CSS
- React Router set up with a shared Layout (Navbar + Footer)
- Six page stubs: Home, Services, Gallery, Reviews, Quote, Contact, plus a 404
- Reusable components: Navbar, Footer, HeroSection, ServiceCard, BeforeAfterCard, GalleryGrid, ReviewCard, ContactInfo, CTASection, PageHeader, QuoteForm
- Typed data files for services, gallery items, and reviews (all placeholder content)
- A working quote form that posts to Formspree and falls back to console logging if no endpoint is configured
- `/docs` folder with project-brief.md (original brief), architecture notes, and setup guides

## How it works

**Routing.** `src/App.tsx` defines a `createBrowserRouter` with the `Layout` component as the root. Every page is registered as a child route. See `docs/architecture/routing.md`.

**Styling.** Tailwind CSS v3 with a custom brand palette (deep blue + amber accent). Shared component styles are defined in `src/index.css` under `@layer components` — `.btn`, `.btn-primary`, `.btn-accent`, `.card`, `.section`, `.container-page`, `.input`, `.eyebrow`.

**Data.** Services, gallery items, and reviews are typed TypeScript arrays in `src/data/`. Swap these for real content as it becomes available.

**Quote form.** `QuoteForm.tsx` is a controlled form that:

1. Validates required fields in the browser.
2. Uses a hidden honeypot field — any non-empty value silently succeeds (bot mitigation).
3. POSTs to the endpoint in `VITE_FORMSPREE_ENDPOINT`.
4. If no endpoint is set, logs the submission to the console so the UX still works in local dev.

**Site config.** `src/data/site.ts` reads `VITE_*` env vars at build time. No code changes needed when the owner updates phone/email/etc.

## Files created

```
package.json, vite.config.ts, index.html, tailwind.config.js, postcss.config.js
tsconfig.json, tsconfig.app.json, tsconfig.node.json
.gitignore, .env.example
public/favicon.svg
src/main.tsx, src/App.tsx, src/index.css, src/vite-env.d.ts
src/types/index.ts
src/data/services.ts, galleryItems.ts, reviews.ts, site.ts
src/layouts/Layout.tsx
src/components/Navbar.tsx, Footer.tsx, HeroSection.tsx, PageHeader.tsx,
  ServiceCard.tsx, BeforeAfterCard.tsx, GalleryGrid.tsx, ReviewCard.tsx,
  ContactInfo.tsx, CTASection.tsx, QuoteForm.tsx
src/pages/Home.tsx, Services.tsx, Gallery.tsx, Reviews.tsx,
  Quote.tsx, Contact.tsx, NotFound.tsx
docs/README.md, docs/project-brief.md
docs/architecture/project-structure.md, routing.md
docs/setup/local-development.md, deployment.md
docs/features/scaffold.md (this file)
```

## Key concepts used

- **Vite** — fast dev server and build tool. Handles TSX, CSS, env vars, and module bundling.
- **React Router v6** — declarative routing with `createBrowserRouter`, `<Outlet />` for layout composition, and `<ScrollRestoration />` for page-transition UX.
- **Tailwind CSS** — utility-first styling. Shared patterns are extracted into `@layer components` classes so we don't repeat long utility chains.
- **Controlled forms** — each form field has a `value` and `onChange` bound to React state (`useState`). The state object (`form`) mirrors the `QuoteRequest` type exactly.
- **TypeScript interfaces** — shared models live in `src/types/index.ts` and are imported everywhere they're needed.
- **Env-driven config** — `VITE_*` vars are read at build time via `import.meta.env`. Keep all config in one place (`src/data/site.ts`) so changes are easy.

## How to test

```bash
npm install
npm run dev
```

Then check:

- [ ] Every nav link routes to the right page
- [ ] Layout (navbar + footer) renders on every page
- [ ] Mobile navbar toggle works (resize browser to <768px)
- [ ] Quote form shows validation for empty required fields
- [ ] Submitting the quote form logs to console (or hits Formspree when configured)
- [ ] Gallery filters swap the visible items
- [ ] 404 page shows for an invalid URL like `/does-not-exist`

```bash
npm run build
```

Should complete without TypeScript errors.

## Future improvements

- Replace placeholder images with real before/after photos from Facebook
- Replace placeholder service copy with the owner's own wording
- Replace placeholder reviews with real, approved testimonials
- Add per-page meta tags (title + description) for SEO — consider `react-helmet-async`
- Add an image lightbox to the gallery
- Add a before/after slider component
- Add Google Business Profile reviews via the Google Places API
- Add an admin dashboard for gallery/review management (requires backend)
