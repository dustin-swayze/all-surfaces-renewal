import type { GalleryItem } from '../types';

/**
 * Gallery items rendered on the /gallery page (and the homepage preview).
 *
 * ─── How to add real photos ──────────────────────────────────────────────
 * 1. Drop before/after images into `public/images/gallery/` using the
 *    naming convention: `{category}-{NN}-before.jpg` / `...-after.jpg`.
 *    See `public/images/gallery/README.md` for the full convention.
 *
 * 2. Add (or replace) an entry below, pointing at the real file paths:
 *
 *      {
 *        id: 'bathtub-01',
 *        title: 'Yellowed porcelain tub refinish',
 *        category: 'bathtub',
 *        beforeImage: '/images/gallery/bathtub-01-before.jpg',
 *        afterImage: '/images/gallery/bathtub-01-after.jpg',
 *        description: 'Stained 1970s porcelain tub brought back to bright white.',
 *      }
 *
 *    Paths start with `/images/gallery/` — no leading `public/` — because
 *    Vite serves anything under `public/` from the site root.
 *
 * 3. Save. The dev server hot-reloads and the new card appears immediately.
 *
 * ─── Placeholder images ─────────────────────────────────────────────────
 * Until real photos are in place, these entries use placehold.co so every
 * card still renders. Replace them one-for-one as real photos arrive.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'bathtub-01',
    title: 'Bathtub refinishing — example',
    category: 'bathtub',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description:
      'Replace with a real project caption. Drop images named bathtub-01-before.jpg / bathtub-01-after.jpg into public/images/gallery/ and swap the paths above.',
  },
  {
    id: 'countertop-01',
    title: 'Countertop resurfacing — example',
    category: 'countertop',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description:
      'Replace with a real project caption. Expected file paths: countertop-01-before.jpg / countertop-01-after.jpg.',
  },
  {
    id: 'sink-01',
    title: 'Sink repair — example',
    category: 'sink',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description:
      'Replace with a real project caption. Expected file paths: sink-01-before.jpg / sink-01-after.jpg.',
  },
  {
    id: 'bathroom-01',
    title: 'Full bathroom refresh — example',
    category: 'bathroom',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description:
      'Replace with a real project caption. Expected file paths: bathroom-01-before.jpg / bathroom-01-after.jpg.',
  },
  {
    id: 'repair-01',
    title: 'Chip / crack repair — example',
    category: 'repair',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description:
      'Replace with a real project caption. Expected file paths: repair-01-before.jpg / repair-01-after.jpg.',
  },
];
