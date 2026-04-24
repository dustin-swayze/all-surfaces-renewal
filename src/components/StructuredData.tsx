import { useEffect } from 'react';
import { siteConfig } from '../data/site';

const SITE_URL = 'https://allsurfacefix.com';
const SCRIPT_ID = 'ld-localbusiness';

/**
 * Injects a schema.org LocalBusiness JSON-LD block into the <head>.
 *
 * This is the kind of structured data Google uses to populate its
 * Knowledge Graph and "local pack" results (the map + three listings at
 * the top of local search). Values come from siteConfig so they stay in
 * sync with what's shown on the page.
 *
 * Rendered as a client-side effect rather than in index.html so the
 * content can use the live siteConfig values (which are populated from
 * .env at build time).
 *
 * Mount this once, on the homepage only. Google only needs one copy.
 */
export function StructuredData() {
  useEffect(() => {
    // Only the phone is strictly required for a LocalBusiness entry.
    // If we don't even have a phone number, skip injection entirely —
    // an incomplete entry can hurt more than help.
    if (!siteConfig.phone) return;

    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: siteConfig.name,
      description: siteConfig.tagline,
      url: SITE_URL,
      telephone: siteConfig.phone,
      image: `${SITE_URL}/images/logo.png`,
      priceRange: '$$',
    };

    if (siteConfig.email) data.email = siteConfig.email;
    if (siteConfig.serviceArea) data.areaServed = siteConfig.serviceArea;
    if (siteConfig.facebookUrl) data.sameAs = [siteConfig.facebookUrl];
    if (siteConfig.hours) {
      // Schema.org wants a structured openingHoursSpecification. Since our
      // `hours` field is free text, we provide both: the raw string as
      // openingHours (human-readable) and structured days for the common
      // Mon–Fri 8–5 case. If the format is different, the string still
      // shows up in the raw JSON-LD.
      data.openingHours = siteConfig.hours;
    }

    // Remove any existing entry so this effect is idempotent (e.g. during
    // React StrictMode double-mount in dev).
    document.getElementById(SCRIPT_ID)?.remove();

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, []);

  return null;
}
