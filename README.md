# All Surfaces Renewal and Repair

Marketing website for a small business that repairs and refinishes bathtubs, countertops, sinks, and bathroom surfaces.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **React Router**.

## Quick start

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Command            | What it does                        |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start the local dev server          |
| `npm run build`    | Build the production bundle to `dist/` |
| `npm run preview`  | Preview the production build locally |

## Project structure

See [`docs/architecture/project-structure.md`](docs/architecture/project-structure.md) for the full layout and rationale.

Quick version:

```
src/
  components/     Reusable UI
  data/           Services, gallery items, reviews, site config
  layouts/        Shared Navbar + Footer shell
  pages/          One file per route
  types/          Shared TypeScript types
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `VITE_SITE_NAME`, `VITE_CONTACT_PHONE`, `VITE_CONTACT_EMAIL`, `VITE_FACEBOOK_URL`, `VITE_SERVICE_AREA`
- `VITE_FORMSPREE_ENDPOINT` — Formspree URL for the quote form

See [`docs/setup/local-development.md`](docs/setup/local-development.md#setting-up-formspree) for Formspree setup.

## Deployment

Designed for **Vercel** or **Netlify** — both auto-detect Vite and handle client-side routing out of the box. Full instructions in [`docs/setup/deployment.md`](docs/setup/deployment.md).

## Documentation

All project documentation lives in [`docs/`](docs/). The original project brief is at [`docs/project-brief.md`](docs/project-brief.md).

> If it is built, it is documented.

When you ship a feature, add or update a file under `docs/features/`. See [`docs/README.md`](docs/README.md) for the expected structure.

## Multi-device workflow

GitHub is the source of truth. See the **Multi-Device Development Workflow** section of the project brief for the full routine. Short version:

- `git pull` before starting work
- `git add .` / `git commit -m "..."` / `git push` before switching devices
- Never store the project inside OneDrive (file-locking issues)
