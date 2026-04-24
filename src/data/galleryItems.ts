import type { GalleryItem } from '../types';

/**
 * Gallery items rendered on the /gallery page (and the homepage preview).
 *
 * ─── How to add real photos ──────────────────────────────────────────────
 * 1. Drop before/after images into `public/images/gallery/` using the
 *    naming convention: `{category}-{NN}-before.jpg` / `...-after.jpg`.
 *    See `public/images/gallery/README.md` for the full convention.
 *
 * 2. Add an entry below with paths that start with `/images/gallery/`.
 *    (Vite serves anything under `public/` from the site root, so no
 *    leading `public` is needed.)
 *
 * 3. For solo showcase photos (no paired before shot), just omit
 *    `beforeImage` — the card auto-switches to a single-image "Finished"
 *    layout.
 *
 * 4. Save. The dev server hot-reloads and the new card appears immediately.
 */
export const galleryItems: GalleryItem[] = [
  // ─── Bathtubs ──────────────────────────────────────────────────────────
  {
    id: 'bathtub-01',
    title: 'Green tub and surround refinished to white',
    category: 'bathtub',
    beforeImage: '/images/gallery/bathtub-01-before.jpg',
    afterImage: '/images/gallery/bathtub-01-after.jpg',
    description: 'Dated green tub and tile surround brought into the 21st century with a clean, bright white finish.',
  },

  // ─── Bathrooms / tub surrounds ─────────────────────────────────────────
  {
    id: 'bathroom-01',
    title: 'Ceramic tile surround refresh',
    category: 'bathroom',
    beforeImage: '/images/gallery/bathroom-01-before.jpg',
    afterImage: '/images/gallery/bathroom-01-after.jpg',
    description: 'Aging ceramic tile surround refinished to a clean, modern look.',
  },
  {
    id: 'bathroom-02',
    title: 'Shower surround restoration',
    category: 'bathroom',
    beforeImage: '/images/gallery/bathroom-02-before.jpg',
    afterImage: '/images/gallery/bathroom-02-after.jpg',
    description: 'Shower surround stripped of years of wear and restored to a fresh, easy-to-clean finish.',
  },
  {
    id: 'bathroom-03',
    title: 'Full tub and tile surround refinish',
    category: 'bathroom',
    beforeImage: '/images/gallery/bathroom-03-before.jpg',
    afterImage: '/images/gallery/bathroom-03-after.jpg',
    description: 'Whole-bathroom refresh — tub and surround refinished together for a cohesive update.',
  },

  // ─── Countertops ───────────────────────────────────────────────────────
  {
    id: 'countertop-01',
    title: 'Kitchen countertop resurface',
    category: 'countertop',
    beforeImage: '/images/gallery/countertop-01-before.jpg',
    afterImage: '/images/gallery/countertop-01-after.jpg',
    description: 'Dated kitchen countertops resurfaced with a clean, modern finish.',
  },
  {
    id: 'countertop-02',
    title: 'Kitchen countertop resurface',
    category: 'countertop',
    beforeImage: '/images/gallery/countertop-02-before.jpg',
    afterImage: '/images/gallery/countertop-02-after.jpg',
    description: 'Worn laminate counters brought back to life at a fraction of the cost of replacement.',
  },

  // ─── Sinks ─────────────────────────────────────────────────────────────
  {
    id: 'sink-01',
    title: 'Porcelain sink refinish',
    category: 'sink',
    beforeImage: '/images/gallery/sink-01-before.jpg',
    afterImage: '/images/gallery/sink-01-after.jpg',
    description: 'Stained and worn porcelain sink refinished to a bright, seamless white.',
  },
  {
    id: 'sink-02',
    title: 'Sink repair and refinish',
    category: 'sink',
    beforeImage: '/images/gallery/sink-02-before.jpg',
    afterImage: '/images/gallery/sink-02-after.jpg',
    description: 'Chips filled and surface refinished — no replacement required.',
  },

  // ─── Showcase / finished projects (no before shot) ─────────────────────
  {
    id: 'showcase-clawfoot-feet',
    title: 'Clawfoot tub — custom-finished feet',
    category: 'bathtub',
    afterImage: '/images/gallery/showcase-01-clawfoot-feet.jpg',
    description: 'Custom color options on clawfoot tub feet — fully tailored to the customer.',
  },
  {
    id: 'showcase-clawfoot-stone',
    title: 'Clawfoot tub — stone finish with custom feet',
    category: 'bathtub',
    afterImage: '/images/gallery/showcase-02-clawfoot-stone.jpg',
    description: 'A full custom refinish: stone-look body with color-matched feet.',
  },
  {
    id: 'showcase-clawfoot-red',
    title: 'Clawfoot tub — white changed to red',
    category: 'bathtub',
    afterImage: '/images/gallery/showcase-03-clawfoot-red.jpg',
    description: 'Plain white clawfoot transformed with a bold red exterior and custom feet.',
  },
  {
    id: 'showcase-gray-sink',
    title: 'Gray finished sink',
    category: 'sink',
    afterImage: '/images/gallery/showcase-04-gray-sink.jpg',
    description: 'Sink refinished in a modern gray — beyond just the usual white.',
  },
];
