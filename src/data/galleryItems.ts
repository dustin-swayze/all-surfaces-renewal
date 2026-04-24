import type { GalleryItem } from '../types';

/**
 * Placeholder gallery data. Replace with real before/after images and copy
 * once approved by the business owner.
 *
 * Image paths use https://placehold.co/... for the MVP so every card has a
 * visible image even before real photography is provided.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'tub-1',
    title: 'Yellowed Porcelain Tub Refinish',
    category: 'bathtub',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description:
      'Stained 1970s porcelain tub brought back to a bright, clean white finish.',
  },
  {
    id: 'counter-1',
    title: 'Laminate Kitchen Counter Resurface',
    category: 'countertop',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description: 'Dated laminate counters resurfaced with a modern stone-look finish.',
  },
  {
    id: 'sink-1',
    title: 'Chipped Cast-Iron Sink Repair',
    category: 'sink',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description: 'Deep chips filled and refinished to a seamless, glossy white.',
  },
  {
    id: 'bath-1',
    title: 'Full Bathroom Surface Refresh',
    category: 'bathroom',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description: 'Tub, tile surround, and vanity refinished together for a cohesive update.',
  },
  {
    id: 'repair-1',
    title: 'Fiberglass Shower Pan Crack Repair',
    category: 'repair',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description: 'Stress crack in a fiberglass shower pan permanently repaired.',
  },
  {
    id: 'tub-2',
    title: 'Clawfoot Tub Restoration',
    category: 'bathtub',
    beforeImage: 'https://placehold.co/800x600/cbd5e1/334155?text=Before',
    afterImage: 'https://placehold.co/800x600/e2e8f0/1e3a5f?text=After',
    description: 'Vintage clawfoot tub restored inside and out.',
  },
];
