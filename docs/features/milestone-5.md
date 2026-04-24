# Feature: Milestone 5 — Deployment

Taking the site from local dev to a live, production URL.

## What was built / shipped

- **Live at `https://allsurfacefix.com`** with automatic HTTPS via Let's Encrypt.
- **Auto-deploy pipeline** from GitHub → Vercel. Every push to `main` kicks off a new build; PR branches get preview URLs.
- **Custom domain** connected from GoDaddy's DNS to Vercel's anycast IP. Both the apex (`allsurfacefix.com`) and the `www` subdomain resolve; Vercel handles the redirect between them.
- **Production environment variables** set in the Vercel dashboard (mirroring local `.env`): site name, contact phone, email, Facebook URL, service area, hours, logo path, and the Formspree endpoint.
- **SEO surface area in place** — `public/robots.txt`, `public/sitemap.xml`, per-page meta, OG tags, and LocalBusiness JSON-LD. Sitemap submitted to Google Search Console.
- **End-to-end quote form delivery** verified in production: submission → Formspree → `allsurfacesrenewal@gmail.com` inbox.

## Architecture of the deploy pipeline

```
  Local terminal
     │
     │  git push
     ▼
  GitHub (Dustin-Swayze/all-surfaces-renewal)
     │
     │  webhook (installed by Vercel GitHub App)
     ▼
  Vercel build
     │  npm install
     │  npm run build   (tsc -b && vite build)
     │  publishes /dist to the CDN
     ▼
  allsurfacefix.com  ←—  GoDaddy DNS  A @ → 216.198.79.1
                                      CNAME www → cname.vercel-dns.com
```

## Files added for deployment

- `public/robots.txt` — allows all crawlers, points at the sitemap
- `public/sitemap.xml` — lists all six routes with change frequency + priority hints
- (No code changes to Vite config or package.json — Vercel auto-detects Vite)

## How deploy works now

**To ship a change:**

```bash
git add .
git commit -m "Describe the change"
git push
```

Vercel's GitHub integration picks up the push within seconds, builds, and publishes. Total time from `git push` to live site is usually under 60 seconds.

**To preview a change before merging:**

Work on a branch:

```bash
git checkout -b feature/something
# make edits
git push -u origin feature/something
```

Vercel builds the branch and comments a preview URL on the PR. Anyone with the URL (including the business owner) can review the change before it hits `main`.

**To roll back:**

Vercel keeps every prior deploy. In the dashboard: **Deployments → pick a past one → Promote to Production**. Instant rollback; no git operation required.

## Environment variables

All `VITE_*` variables from local `.env` must also be set in Vercel at **Settings → Environment Variables**. If a variable is missing in Vercel, the build still succeeds but the value renders as empty on the live site (e.g. the footer would show no phone number).

**Currently set in Vercel production:**

- `VITE_SITE_NAME`
- `VITE_CONTACT_PHONE`
- `VITE_CONTACT_EMAIL`
- `VITE_FACEBOOK_URL`
- `VITE_SERVICE_AREA`
- `VITE_BUSINESS_HOURS`
- `VITE_LOGO_URL`
- `VITE_FORMSPREE_ENDPOINT`

To change a value: edit it in the Vercel dashboard, then trigger a redeploy (either push any commit or use the **Redeploy** button on the latest deployment).

## GoDaddy DNS records we own

The records added to `allsurfacefix.com` DNS for this site:

| Type  | Name | Value                     | Notes                                  |
| ----- | ---- | ------------------------- | -------------------------------------- |
| A     | @    | `216.198.79.1`            | Vercel's current apex IP               |
| CNAME | www  | `cname.vercel-dns.com.`   | Routes www subdomain to Vercel         |

All other records (NS, SOA, `_domainconnect`, `_dmarc`, `pay`) are GoDaddy infrastructure / email config and were left untouched.

## Verification checklist (all green)

- [x] Site loads at `https://allsurfacefix.com`
- [x] Apex and www both resolve
- [x] HTTPS works with valid cert
- [x] Quote form delivers email in production
- [x] Mobile rendering looks right
- [x] SEO tags present in rendered HTML
- [x] Facebook link preview shows correct card
- [x] Google Rich Results validates LocalBusiness JSON-LD
- [x] Sitemap submitted to Google Search Console

## Known quirks / gotchas

- **Case sensitivity on GitHub URLs for private repos.** GitHub normalizes repo names to lowercase. If git's remote is set to a mixed-case version (`Dustin-Swayze/...`), unauthenticated requests get "Repository not found" instead of a redirect. Always use the canonical lowercase URL for remotes.
- **Vercel IP can change.** The A record value in these docs (`216.198.79.1`) is current as of this milestone. Vercel has shifted IPs before. If DNS resolution stops working and the domain shows "Invalid Configuration," check the Vercel Domains page for updated values rather than trusting this doc.
- **GoDaddy parking records.** New domains at GoDaddy ship with an A record pointing to their parking page. We replaced that with Vercel's. If the domain ever goes "Invalid" and that record reverted, the parking page may be back — same fix: point `@` back to Vercel's current IP.

## What's not done yet

- **Real gallery photos** — the `/gallery` page still shows placeholder images. Drop real before/after photos into `public/images/gallery/` and update `src/data/galleryItems.ts`.
- **Real customer reviews** — the `/reviews` page shows a "testimonials coming soon" empty state until approved reviews are added.
- **Doc catch-up** — a dedicated Quote form doc and styling system doc are parked (see task tracker).
- **Accessibility pass** — formal audit not yet done.
- **Logo refinement** — the current logo is small and doesn't fully match the site's color palette; a follow-up design pass would tighten that.
