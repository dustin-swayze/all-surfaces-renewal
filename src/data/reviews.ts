import type { Review } from '../types';

/**
 * Customer testimonials.
 *
 * This array is intentionally empty until we have fresh, owner-approved
 * reviews to display. The Reviews page and the Home page both detect an
 * empty array and show appropriate "coming soon" / fallback content.
 *
 * To add a review later, just push an object like:
 *
 *   {
 *     id: 'r1',
 *     customerName: 'Jane D.',
 *     rating: 5,
 *     text: 'They saved us thousands...',
 *     source: 'Google',
 *   }
 *
 * See src/types/index.ts for the Review type.
 */
export const reviews: Review[] = [];
