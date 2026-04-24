import type { Review } from '../types';

/**
 * Placeholder review data. Replace with real, approved testimonials sourced
 * from the business's Facebook page. Confirm with the owner before using
 * customer names in production.
 */
export const reviews: Review[] = [
  {
    id: 'r1',
    customerName: 'Sample Customer',
    rating: 5,
    text: 'They saved us from replacing our entire tub. Looks brand new and the whole job took less than a day.',
    source: 'Facebook',
  },
  {
    id: 'r2',
    customerName: 'Sample Customer',
    rating: 5,
    text: 'Professional, on time, and reasonably priced. Our kitchen counters look incredible.',
    source: 'Facebook',
  },
  {
    id: 'r3',
    customerName: 'Sample Customer',
    rating: 5,
    text: 'We had a chipped cast-iron sink that looked awful. You honestly cannot tell where the chip was.',
    source: 'Facebook',
  },
  {
    id: 'r4',
    customerName: 'Sample Customer',
    rating: 5,
    text: 'Great work on our rental property between tenants. Saved us thousands.',
    source: 'Facebook',
  },
];
