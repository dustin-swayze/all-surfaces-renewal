# Deployment

The site is a static Vite build and can deploy to any static host. Vercel and Netlify are the recommended MVP targets — both are free for projects this size and handle client-side routing automatically.

## Vercel (recommended)

1. Push the project to GitHub.
2. Go to https://vercel.com and sign in with GitHub.
3. Click **Add New → Project** and pick the repo.
4. Vercel auto-detects Vite. Defaults are correct:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Under **Environment Variables**, add each variable from `.env.example`:
   - `VITE_SITE_NAME`
   - `VITE_CONTACT_PHONE`
   - `VITE_CONTACT_EMAIL`
   - `VITE_FACEBOOK_URL`
   - `VITE_SERVICE_AREA`
   - `VITE_FORMSPREE_ENDPOINT`
6. Click **Deploy**.

Every push to `main` now auto-deploys. Pull requests get preview URLs.

## Netlify

1. Push the project to GitHub.
2. Go to https://app.netlify.com and click **Add new site → Import from Git**.
3. Pick the repo. Netlify auto-detects Vite.
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add the same environment variables as above under **Site settings → Environment variables**.
6. Click **Deploy site**.

Netlify creates a `_redirects` fallback for SPA routing automatically when it detects Vite. If client-side routes ever 404, add a file at `public/_redirects` with:

```
/*  /index.html  200
```

## Custom domain

Both Vercel and Netlify let you add a custom domain under the site's settings. Both will provision a free SSL certificate via Let's Encrypt — no extra work required.

## Environment tips

- **Never commit `.env`.** It's gitignored for a reason. Add secrets through the hosting UI.
- **Previews.** Vercel and Netlify both build preview URLs for pull requests. Useful for showing work-in-progress to the business owner before merging.
- **Rolling back.** Both platforms keep every deploy. If something breaks, revert to a previous deploy in the dashboard — faster than a git revert.
