import { useEffect } from 'react';

interface PageMetaOptions {
  /** Page title. Shown in the browser tab and in Google search results. */
  title: string;
  /** Meta description. Shown in Google search result snippets. Keep under 160 chars. */
  description?: string;
}

const DEFAULT_TITLE =
  'All Surfaces Renewal and Repair — Bathtub, Countertop & Sink Refinishing | Tri-Cities';

/**
 * Updates `document.title` and `meta[name="description"]` on route change.
 *
 * Social-share previews (Facebook, iMessage, etc.) read tags from the initial
 * HTML and do NOT run JavaScript, so the defaults baked into `index.html`
 * cover those cases. This hook handles browser tabs, bookmarks, and Google
 * — all of which respect client-side updates.
 */
export function usePageMeta({ title, description }: PageMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let previousDescription: string | null = null;
    let meta: HTMLMetaElement | null = null;
    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (meta) {
        previousDescription = meta.getAttribute('content');
        meta.setAttribute('content', description);
      }
    }

    return () => {
      // Restore to the HTML defaults when the component unmounts. Prevents
      // stale tags lingering on route changes or if the component re-mounts.
      document.title = previousTitle || DEFAULT_TITLE;
      if (meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
