# Project Structure

This document explains the folder layout of the project and the reasoning behind it. Keep it updated as the structure evolves.

## Top-level layout

```
All Surfaces Renewal and Repair/
├── public/                  Static assets served as-is (favicon, robots.txt, etc.)
├── src/                     Application source code
│   ├── components/          Reusable UI building blocks
│   ├── data/                Typed static data (services, gallery, reviews, site config)
│   ├── layouts/             Shared layouts used by the router (Navbar + Footer shell)
│   ├── pages/               One file per route — these are the page-level components
│   ├── types/               Shared TypeScript type definitions
│   ├── App.tsx              Router definition
│   ├── main.tsx             Entry point that mounts React into the DOM
│   ├── index.css            Tailwind directives + shared component classes
│   └── vite-env.d.ts        TypeScript declarations for Vite env vars
├── docs/                    Ongoing project documentation (you are here)
├── .env.example             Template for environment variables
├── .gitignore               Files Git should ignore (node_modules, dist, .env, etc.)
├── index.html               Vite HTML entry — React mounts into the #root div here
├── package.json             Dependencies and npm scripts
├── postcss.config.js        PostCSS pipeline (Tailwind + Autoprefixer)
├── tailwind.config.js       Tailwind theme customisation (colors, fonts, shadows)
├── tsconfig.json            TypeScript project references
├── tsconfig.app.json        TS config for the app code
├── tsconfig.node.json       TS config for build tooling (vite.config.ts)
└── vite.config.ts           Vite build / dev-server configuration
```

## Why this layout?

**Pages vs. components.** A `pages/` file maps one-to-one to a route and is responsible for composing the page. `components/` contains the building blocks that pages use. This keeps routes easy to find and keeps components independent of routing.

**Data as code.** For the MVP, services/gallery/reviews live in `src/data/` as typed TypeScript arrays. This keeps the site fully static, makes edits easy, and avoids a backend until we genuinely need one. When we add an admin dashboard later, we'll swap these imports for async fetches.

**Types in one place.** Shared model types (`Service`, `GalleryItem`, `Review`, `QuoteRequest`) live in `src/types/index.ts`. Having a single import location reduces drift when types change.

**Layouts separate from pages.** The `Layout` component in `src/layouts/` renders the Navbar, the routed page content (via `<Outlet />`), and the Footer. Keeping it separate from any page means we can add new layouts later (e.g. a full-width marketing layout) without refactoring.

**Site config via environment.** `src/data/site.ts` reads `import.meta.env.VITE_*` values so the site name, phone, email, and Formspree endpoint can be swapped per environment without code changes.

## Adding new things

- **New page** → add a file to `src/pages/` and register it as a route in `src/App.tsx`.
- **New reusable component** → add it to `src/components/` and import where needed.
- **New data type** → add its interface to `src/types/index.ts` and create a typed file in `src/data/`.
- **New documentation** → add a markdown file under `docs/` in the relevant subfolder.
