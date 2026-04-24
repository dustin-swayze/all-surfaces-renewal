# Project Documentation

Ongoing docs for the **All Surfaces Renewal and Repair** website. Every meaningful feature, architectural decision, and operational workflow has a home here.

> If it is built, it is documented.

---

## Current status (April 2026)

**Site is live at [allsurfacefix.com](https://allsurfacefix.com).**

✅ Shipped
- Full React + TypeScript + Vite + Tailwind + React Router scaffold
- All six pages (Home, Services, Gallery, Reviews, Quote, Contact) + 404
- Quote form with Formspree delivery and double-layered spam protection
- Real business content wired via env vars (phone, email, service area, hours, logo)
- Real before/after gallery with 12 items (8 pairs + 4 solo showcase)
- Reviews "coming soon" empty state (ready to swap in approved testimonials)
- SEO metadata, sitemap, robots.txt, LocalBusiness JSON-LD
- Live deployment on Vercel with custom domain + automatic HTTPS
- Auto-deploy pipeline from GitHub push → Vercel build → live

🟡 Pending (unblocked work)
- Approved customer testimonials — see [`features/testimonials.md`](features/testimonials.md)
- Accessibility formal audit
- Image optimization pass (some gallery photos are 1-3 MB)
- Google Business Profile listing (separate from the website — see chat history)

⚫ Not on the critical path
- Before/after interactive slider component
- Gallery lightbox
- Admin dashboard for self-serve gallery / review management

---

## Docs structure

```
docs/
  README.md                               ← You are here
  project-brief.md                        ← Original project brief (do not edit)
  architecture/
    project-structure.md                  ← Folder layout and why
    routing.md                            ← How pages are wired
    styling.md                            ← Tailwind theme + shared classes
  features/
    scaffold.md                           ← Milestone 1 summary
    milestone-2.md                        ← Real business content + logo + hours
    milestone-5.md                        ← Deployment to Vercel
    gallery-images.md                     ← Gallery image workflow + naming convention
    quote-form.md                         ← Quote form + Formspree integration
    testimonials.md                       ← How to add approved customer reviews
  setup/
    local-development.md                  ← Run the site on your primary dev machine
    laptop-setup.md                       ← Set up a second machine (laptop)
    deployment.md                         ← Vercel + Netlify deployment
```

---

## Where to start

**New to the project?** Read in this order:
1. [`project-brief.md`](project-brief.md) — what we're building and why
2. [`features/scaffold.md`](features/scaffold.md) — initial structure
3. [`architecture/project-structure.md`](architecture/project-structure.md) — where everything lives
4. [`setup/local-development.md`](setup/local-development.md) — get it running

**Setting up a second machine?** → [`setup/laptop-setup.md`](setup/laptop-setup.md)

**Making a small content change?** → `src/data/` has services, gallery, reviews, and site config. Changes hot-reload on save, commit + push to deploy.

**Adding customer testimonials?** → [`features/testimonials.md`](features/testimonials.md) walks through the process including how to get approval first.

**Adding new gallery photos?** → [`features/gallery-images.md`](features/gallery-images.md) and the README inside `public/images/gallery/`.

**Something broken with the quote form?** → [`features/quote-form.md`](features/quote-form.md), troubleshooting section.

**Customising colors or visual style?** → [`architecture/styling.md`](architecture/styling.md)

**Deploying / domain / DNS?** → [`setup/deployment.md`](setup/deployment.md) and [`features/milestone-5.md`](features/milestone-5.md)

---

## Writing new docs

When you ship a feature, add a markdown file under `docs/features/`. Cover:

1. **What was built** — the feature in plain English
2. **How it works** — components, data flow, key logic
3. **Files and structure** — what was created / modified
4. **Key concepts** — React / TypeScript / Tailwind ideas worth knowing
5. **How to test** — exact steps to verify it works
6. **Future improvements** — known gaps

Keep it practical. The test: if you came back in six months, could you rebuild this feature from the doc alone?

## External services this project depends on

| Service | Purpose | Credentials |
| --- | --- | --- |
| GitHub | Source code + auto-deploy trigger | Your GitHub account |
| Vercel | Hosting + SSL + CDN | Sign in via GitHub |
| Formspree | Quote-form email delivery | `allsurfacesrenewal@gmail.com` |
| GoDaddy | Domain registration + DNS | GoDaddy account |
| Google Search Console | SEO indexing | Google account that verified the domain |

Each has a free tier sized appropriately for this project. No paid services are required for current functionality.
