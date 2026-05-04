# All Surfaces Renewal and Repair

Marketing website for a small business that repairs and refinishes bathtubs, countertops, sinks, and bathroom surfaces.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Router**, and **Supabase**.

## Quick start

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Command            | What it does                           |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Start the local dev server             |
| `npm run build`    | Build the production bundle to `dist/` |
| `npm run preview`  | Preview the production build locally   |

## Project structure

See [`docs/architecture/project-structure.md`](docs/architecture/project-structure.md) for the full layout and rationale.

Quick version:

```
src/
  components/     Reusable UI
  data/           Services, gallery items, reviews, site config
  hooks/          useGalleryItems — fetches live gallery from Supabase
  layouts/        Shared Navbar + Footer shell
  lib/            supabase.ts — browser client (null-safe if env vars missing)
  pages/          One file per route
  types/          Shared TypeScript types
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `VITE_SITE_NAME` | Business name displayed in the UI |
| `VITE_CONTACT_PHONE` | Phone number |
| `VITE_CONTACT_EMAIL` | Contact email address |
| `VITE_FACEBOOK_URL` | Facebook page URL |
| `VITE_SERVICE_AREA` | Service area string shown on the site |
| `VITE_BUSINESS_HOURS` | Business hours string |
| `VITE_LOGO_URL` | Path to the logo image |
| `VITE_SUPABASE_URL` | Supabase project URL — Settings > API |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable key — Settings > API Keys |
| `FORMSPREE_ENDPOINT` | Formspree URL for quote form email notifications (server-side only) |
| `INGEST_API_KEY` | API key for the portfolio lead ingest webhook |

> `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are required for the dynamic gallery to load. If either is missing the site falls back to the static `galleryItems.ts` array gracefully.

## Dynamic gallery

Gallery items are stored in the `gallery_items` table in Supabase and managed via the portfolio dashboard at dswayze.dev.

**Workflow:**
1. Client uploads before/after photos at `dswayze.dev/upload/[token]`
2. Dashboard shows the uploads — rename them to identify pairs
3. Click **Approve** to set title, category, optional before-image, and publish
4. The portfolio API compresses the images with Sharp and writes them to the `asr-gallery` Supabase Storage bucket
5. This site fetches from `gallery_items` on load and displays the updated gallery instantly

The `useGalleryItems` hook (`src/hooks/useGalleryItems.ts`) handles fetching with a static fallback — the site always renders something even if Supabase is unreachable.

## Serverless API

`/api/submit-quote` is a Vercel serverless function that:
1. Receives the quote form POST
2. Sends an email via Formspree
3. Forwards the lead to the portfolio ingest endpoint at `dswayze.dev`

## Deployment

Deployed on **Vercel**. Auto-deploys on every push to `main`.

All `VITE_*` env vars must be set in Vercel → Project Settings → Environment Variables → Production.

Full deployment instructions: [`docs/setup/deployment.md`](docs/setup/deployment.md).

## Documentation

All project documentation lives in [`docs/`](docs/).

> If it is built, it is documented.

When you ship a feature, add or update a file under `docs/features/`. See [`docs/README.md`](docs/README.md) for the expected structure.

## Multi-device workflow

GitHub is the source of truth. Short version:

- `git pull` before starting work
- `git add .` / `git commit -m "..."` / `git push` before switching devices
- Never store the project inside OneDrive (file-locking issues)
