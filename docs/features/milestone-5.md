# Feature: Milestone 5 - Deployment

Taking the site from local dev to a live, production URL.

## What was built / shipped

- **Live at `https://allsurfacefix.com`** with automatic HTTPS via Let's Encrypt.
- **Auto-deploy pipeline** from GitHub -> Vercel. Every push to `main` kicks off a new build; PR branches get preview URLs.
- **Custom domain** connected from GoDaddy DNS to Vercel's anycast IP. Both the apex (`allsurfacefix.com`) and the `www` subdomain resolve; Vercel handles the redirect between them.
- **Production environment variables** set in the Vercel dashboard (mirroring local `.env`).
- **SEO surface area in place** - `public/robots.txt`, `public/sitemap.xml`, per-page meta, OG tags, and LocalBusiness JSON-LD. Sitemap submitted to Google Search Console.
- **End-to-end quote form delivery** verified in production: submission -> Formspree -> `allsurfacesrenewal@gmail.com` inbox.

## Architecture of the deploy pipeline

```
  Local terminal
     |
     |  git push
     v
  GitHub (Dustin-Swayze/all-surfaces-renewal)
     |
     |  webhook (installed by Vercel GitHub App)
     v
  Vercel build
     |  npm install
     |  npm run build   (tsc -b && vite build)
     |  publishes /dist to the CDN
     v
  allsurfacefix.com  <--  GoDaddy DNS  A @ -> 216.198.79.1
                                       CNAME www -> cname.vercel-dns.com
```

## How deploy works now

**To ship a change:**

```bash
git add .
git commit -m "Describe the change"
git push
```

Vercel's GitHub integration picks up the push within seconds, builds, and publishes. Total time from `git push` to live site is usually under 60 seconds.

**To preview a change before merging:**

```bash
git checkout -b feature/something
# make edits
git push -u origin feature/something
```

Vercel builds the branch and comments a preview URL on the PR.

**To roll back:**

Vercel keeps every prior deploy. In the dashboard: **Deployments -> pick a past one -> Promote to Production**. Instant rollback; no git operation required.

## Environment variables

All `VITE_*` variables from local `.env` must also be set in Vercel at **Settings -> Environment Variables**.

**Currently set in Vercel production:**

| Variable | Notes |
|---|---|
| `VITE_SITE_NAME` | Site display name |
| `VITE_CONTACT_PHONE` | Shown in footer and contact page |
| `VITE_CONTACT_EMAIL` | Shown in footer and contact page |
| `VITE_FACEBOOK_URL` | Facebook business page link |
| `VITE_SERVICE_AREA` | Shown in footer |
| `VITE_BUSINESS_HOURS` | Shown in footer |
| `VITE_LOGO_URL` | Path to logo image under /public |
| `VITE_SUPABASE_URL` | Supabase project URL (safe to expose) |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable key (safe to expose) |
| `FORMSPREE_ENDPOINT` | Quote form email delivery (server-side only) |
| `INGEST_API_KEY` | Lead ingest auth key (server-side only) |

To change a value: edit it in the Vercel dashboard, then trigger a redeploy (push any commit or use the **Redeploy** button on the latest deployment).

## GoDaddy DNS records

| Type  | Name | Value                   | Notes |
|-------|------|-------------------------|-------|
| A     | @    | `216.198.79.1`          | Vercel apex IP |
| CNAME | www  | `cname.vercel-dns.com.` | Routes www subdomain to Vercel |

**Note:** Vercel IPs can change. If the domain shows "Invalid Configuration," check the Vercel Domains page for the current value rather than trusting this doc.

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
- [x] Gallery loads from Supabase with static fallback

## Known quirks / gotchas

- **Case sensitivity on GitHub URLs.** GitHub normalizes repo names to lowercase. Always use the canonical lowercase URL for remotes.
- **Vercel IP can change.** The A record value (`216.198.79.1`) is current as of this writing. If DNS breaks, check the Vercel Domains page.
- **GoDaddy parking records.** New domains at GoDaddy ship with an A record pointing to their parking page. If it ever reverts, point `@` back to Vercel's IP.

## What's not done yet

- **Real customer reviews** - the `/reviews` page shows a "testimonials coming soon" empty state until approved reviews are added.
- **Accessibility pass** - formal audit not yet done.
- **Logo refinement** - a follow-up design pass would tighten the logo.
