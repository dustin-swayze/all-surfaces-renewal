# Routing

The site uses **React Router v6** with a single shared layout.

## Route table

| Path         | Component         | Purpose                                           |
| ------------ | ----------------- | ------------------------------------------------- |
| `/`          | `pages/Home`      | Hero, service preview, gallery preview, reviews   |
| `/services`  | `pages/Services`  | Detailed service descriptions and benefits        |
| `/gallery`   | `pages/Gallery`   | Before/after projects with category filters       |
| `/reviews`   | `pages/Reviews`   | All customer testimonials                         |
| `/quote`     | `pages/Quote`     | Quote request form (the key conversion page)      |
| `/contact`   | `pages/Contact`   | Contact methods and service area                  |
| `*`          | `pages/NotFound`  | 404 fallback                                      |

## How it works

`src/App.tsx` defines the router using `createBrowserRouter`. The root route uses the `Layout` component, and every page is declared as a child:

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      // ...more pages
      { path: '*', element: <NotFound /> },
    ],
  },
]);
```

Inside `Layout`, the `<Outlet />` element is the slot where the matched child page is rendered. The Navbar and Footer wrap that slot, so they appear on every route without being re-declared per page.

`<ScrollRestoration />` (also inside `Layout`) resets scroll position on route change, which makes navigation feel like a proper website instead of a single-page app.

## Adding a new route

1. Create `src/pages/NewPage.tsx`.
2. Import it in `src/App.tsx` and add a child entry:
   ```tsx
   { path: 'new-page', element: <NewPage /> },
   ```
3. Add a link in `src/components/Navbar.tsx` and/or `src/components/Footer.tsx` if users need to reach it from the nav.

## Deployment note

Because we use client-side routing, the host (Vercel, Netlify, etc.) needs to serve `index.html` for every page path so the React Router can take over. With the addition of the `/api/submit-quote` Vercel serverless function, this project is a **hybrid** (static + functions), which means Vercel no longer applies its default SPA fallback automatically. We have to declare it explicitly via `vercel.json` at the project root:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

The negative-lookahead `(?!api/)` excludes any path under `/api/` so serverless functions still receive their requests directly. Static assets (`/images/...`, `/assets/...`, `/favicon.svg`) are served by Vercel before rewrites are evaluated, so they continue to load normally.

**Symptom if this is missing:** in-app navigation works (clicking links via React Router updates the URL without a real reload), but refreshing on a non-root URL or sharing a deep link returns a 404 because the server doesn't know about routes other than `/`.

If you ever migrate to a different host (Netlify, Cloudflare Pages, etc.), the same SPA fallback concept applies — just expressed in that host's config format. Netlify uses a `_redirects` file with `/* /index.html 200`. Cloudflare Pages auto-detects Vite. Self-hosted nginx needs a `try_files $uri /index.html;` rule.
