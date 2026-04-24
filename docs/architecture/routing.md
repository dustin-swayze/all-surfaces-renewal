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

Because we use client-side routing, the host (Vercel, Netlify, etc.) needs to serve `index.html` for every path. Vercel and Netlify do this automatically for Vite projects with no extra config. If you ever self-host or use a different platform, add a rewrite rule that sends all non-asset requests to `/index.html`.
