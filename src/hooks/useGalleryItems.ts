import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { galleryItems as staticItems } from '../data/galleryItems';
import type { GalleryItem, GalleryCategory } from '../types';

interface DbGalleryItem {
  id: string;
  title: string;
  category: string;
  description: string | null;
  before_image_url: string | null;
  after_image_url: string;
  display_order: number;
}

/** Map a Supabase row to the GalleryItem shape the UI expects. */
function mapRow(row: DbGalleryItem): GalleryItem {
  return {
    id:           row.id,
    title:        row.title,
    category:     row.category as GalleryCategory,
    description:  row.description ?? undefined,
    beforeImage:  row.before_image_url ?? undefined,
    afterImage:   row.after_image_url,
  };
}

interface UseGalleryItemsResult {
  items:   GalleryItem[];
  loading: boolean;
  error:   string | null;
}

/**
 * Fetches gallery items for allsurfacefix.com from Supabase, ordered by
 * `display_order`.  Falls back to the static `galleryItems` array if:
 *   - Supabase env vars are not configured, or
 *   - The fetch fails for any reason.
 *
 * This means the site always renders something, even in local dev without
 * the env vars set.
 */
export function useGalleryItems(): UseGalleryItemsResult {
  const [items,   setItems]   = useState<GalleryItem[]>(staticItems);
  const [loading, setLoading] = useState(!!supabase);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return; // no client — keep static fallback

    let cancelled = false;

    supabase
      .from('gallery_items')
      .select('id, title, category, description, before_image_url, after_image_url, display_order')
      .eq('site', 'allsurfacefix.com')
      .order('display_order', { ascending: true })
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) {
          console.error('[gallery] Supabase fetch error:', fetchError.message);
          setError(fetchError.message);
          // keep static fallback already in state
        } else if (data && data.length > 0) {
          setItems((data as DbGalleryItem[]).map(mapRow));
        }
        // If data is empty we keep the static items — nothing approved yet
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { items, loading, error };
}
