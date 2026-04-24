/**
 * Central site configuration. Values here are the defaults for local dev —
 * real values should come from .env (see .env.example) so they can differ
 * between environments without code changes.
 */
export const siteConfig = {
  name: import.meta.env.VITE_SITE_NAME ?? 'All Surfaces Renewal and Repair',
  tagline:
    'An affordable alternative to replacing your bathtub, tiles, or countertops — backed by 11 years of experience.',
  phone: import.meta.env.VITE_CONTACT_PHONE ?? '',
  email: import.meta.env.VITE_CONTACT_EMAIL ?? '',
  facebookUrl: import.meta.env.VITE_FACEBOOK_URL ?? '',
  serviceArea: import.meta.env.VITE_SERVICE_AREA ?? '',
  /**
   * Business hours as a single display string, e.g. "Mon–Fri, 8 AM – 5 PM".
   * Kept as free text so it can format naturally without a complex schema.
   */
  hours: import.meta.env.VITE_BUSINESS_HOURS ?? '',
  /**
   * Path to the logo file under /public. Leave blank to use the text-only
   * brand mark (blue square + business name) in the navbar and footer.
   * Example: '/images/logo.svg'
   */
  logoUrl: import.meta.env.VITE_LOGO_URL ?? '',
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
} as const;
