# Deployment

The site is a static Vite build hosted on Vercel at `https://allsurfacefix.com`.

## Deploy pipeline

```
  Local terminal
     |
     |  git push
     v
  GitHub (Dustin-Swayze/all-surfaces-renewal)
     |
     |  webhook (Vercel GitHub App)
     v
  Vercel build
     |  npm install
     |  npm run build   (tsc -b && vite build)
     |  publishes /dist to the CDN
     v
  allsurfacefix.com  <--  GoDaddy DNS  A @ -> 216.198.79.1
                                       CNAME www -> cname.vercel-dns.com
```

## Shipping a change

```bash
git add .
git commit -m "Describe the change"
git push
```

Vercel picks up the push within seconds and deploys. Total time from `git push` to live site is usually under 60 seconds.

## Rolling back

Vercel keeps every prior deploy. In the dashboard: **Deployments -> pick a past one -> Promote to Production**. Instant rollback, no git operation required.

## Environment variables

All `VITE_*` variables must also be set in Vercel at **Settings -> Environment Variables**. If a variable is missing in Vercel, the build succeeds but the value is empty on the live site.

**Currently set in Vercel production:**

| Variable | Notes |
|---|---|
| `VITE_SITE_NAME` | "All Surfaces Renewal and Repair" |
| `VITE_CONTACT_PHONE` | (423) 863-7041 |
| `VITE_CONTACT_EMAIL` | allsurfacesrenewal@gmail.com |
| `VITE_FACEBOOK_URL` | https://www.facebook.com/allsurfacefix |
| `VITE_SERVICE_AREA` | "Serving the Tri-Cities and the surrounding areas" |
| `VITE_BUSINESS_HOURS` | "Mon-Fri, 8 AM - 5 PM (or by appointment)" |
| `VITE_LOGO_URL` | /images/logo.png |
| `VITE_SUPABASE_URL` | https://ellpmojstpafhqrkivkx.supabase.co |
| `VITE_SUPABASE_ANON_KEY` | Publishable (anon) key - safe to expose to browser |
| `FORMSPREE_ENDPOINT` | https://formspree.io/f/mwvaybwq (server-side only) |
| `INGEST_API_KEY` | Shared secret for portfolio lead ingest (server-side only) |

**Note on Supabase keys:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are prefixed
with `VITE_` so Vite bakes them into the browser bundle. The anon key is safe to expose -
it only has the permissions defined by your Supabase RLS policies (public read on `gallery_items`).
Never add the service role key to a `VITE_` variable.

To change a value: edit it in the Vercel dashboard, then redeploy (push any commit or use the **Redeploy** button).

## Custom domain / DNS

| Type | Name | Value | Notes |
|---|---|---|---|
| A | @ | `216.198.79.1` | Vercel apex IP |
| CNAME | www | `cname.vercel-dns.com.` | Routes www to Vercel |

**Note:** The Vercel IP can change. If the domain shows "Invalid Configuration," check the Vercel Domains page for the current value.

## Vercel tips

- **Never commit `.env`.** It is gitignored. Add secrets through the Vercel UI.
- **Preview deployments.** Every branch gets a preview URL. Useful for showing changes to the business owner before merging to main.
- **GoDaddy parking records.** New domains at GoDaddy ship with an A record pointing to their parking page. If the domain ever goes "Invalid" and DNS reverted, point `@` back to Vercel's IP.
