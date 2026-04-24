/**
 * Central site configuration. Values here are the defaults for local dev —
 * real values should be provided via .env (see .env.example) so they can
 * differ between environments without code changes.
 */
export const siteConfig = {
  name: import.meta.env.VITE_SITE_NAME ?? 'All Surfaces Renewal and Repair',
  tagline:
    'Professional bathtub, countertop, sink, and surface renewal — without the cost of full replacement.',
  phone: import.meta.env.VITE_CONTACT_PHONE ?? '',
  email: import.meta.env.VITE_CONTACT_EMAIL ?? '',
  facebookUrl: import.meta.env.VITE_FACEBOOK_URL ?? '',
  serviceArea: import.meta.env.VITE_SERVICE_AREA ?? '',
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
} as const;
