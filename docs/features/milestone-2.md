# Feature: Milestone 2 — Real Content

Replacing scaffold placeholders with the real business identity.

## What was built

- **Reviews "coming soon" empty state.** The Reviews page detects an empty `reviews` array and shows a friendly placeholder with CTAs to the gallery and the quote form. The homepage reviews preview is hidden entirely when there are no reviews, so the page never shows an empty section header.
- **Gallery image workflow.** A dedicated `public/images/gallery/` folder with an in-folder README and a companion [`docs/features/gallery-images.md`](./gallery-images.md) covering the naming convention and how new images get wired in.
- **Logo support.** `siteConfig.logoUrl` can point to an image under `/public` (e.g. `/images/logo.svg`). When set, the Navbar and Footer render the image; when blank, they fall back to the text-only brand mark (blue square + business name) introduced in Milestone 1.
- **Hours display.** `siteConfig.hours` is a free-text field shown in the Footer and as a card in the `ContactInfo` component. Leave blank to hide.
- **Facebook URL baked into `.env.example`** as the real default, so new checkouts start with the right link pre-filled.

## Files touched

- `src/data/site.ts` — added `hours` and `logoUrl` fields
- `src/vite-env.d.ts` — added matching `VITE_BUSINESS_HOURS` and `VITE_LOGO_URL` env types
- `.env.example` — added the new vars and set the real Facebook URL as the default
- `src/data/reviews.ts` — cleared placeholder reviews so the empty state renders
- `src/data/galleryItems.ts` — restructured with IDs matching the new naming convention and inline comments explaining how to swap in real photos
- `src/pages/Reviews.tsx` — added `ReviewsComingSoon` empty state
- `src/pages/Home.tsx` — conditionally hides the reviews preview when there are none
- `src/components/Navbar.tsx` — conditional logo image vs. text brand
- `src/components/Footer.tsx` — conditional logo image vs. text brand, plus hours display
- `src/components/ContactInfo.tsx` — added hours card
- `public/images/gallery/README.md` — naming convention doc right next to the files

## How to drop in a logo

1. Put the logo file at `public/images/logo.svg` (SVG preferred — scales cleanly). PNG works fine too.
2. In your `.env`, set:
   ```
   VITE_LOGO_URL="/images/logo.svg"
   ```
3. Restart the dev server. The Navbar and Footer will display the logo.

To go back to the text brand, blank out `VITE_LOGO_URL`.

## How to add real reviews later

In `src/data/reviews.ts`, push objects onto the exported `reviews` array:

```ts
export const reviews: Review[] = [
  {
    id: 'r1',
    customerName: 'Jane D.',
    rating: 5,
    text: 'They saved us thousands...',
    source: 'Google',
  },
];
```

The empty state disappears automatically once any review is present.

## Still pending

- **Real contact values** — `VITE_CONTACT_PHONE`, `VITE_CONTACT_EMAIL`, `VITE_SERVICE_AREA`, `VITE_BUSINESS_HOURS` need to be filled in `.env`.
- **Real gallery images** — drop photos into `public/images/gallery/` and swap paths in `galleryItems.ts`.
- **Service copy review** — the placeholder service descriptions in `src/data/services.ts` are generic. They should be rewritten in the business owner's own wording.
- **About/business description** — a short paragraph for the homepage hero sub-text (currently generic). Drop it in `siteConfig.tagline` once available.
- **Favicon / logo** — the placeholder favicon in `public/favicon.svg` should be swapped for the real logo once provided.

## Future improvements

- A `siteConfig.about` long-form description for a dedicated About section on the homepage or a new About page.
- Multi-line structured hours (e.g. a day-by-day table) instead of the single free-text string, if the business has irregular hours.
- A dark logo variant for light backgrounds and a light variant for dark backgrounds, with the Navbar/Footer picking the right one.
