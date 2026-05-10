import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { reviews as staticReviews } from '../data/reviews';
import type { Review } from '../types';

interface DbReview {
  id: string;
  customer_name: string;
  rating: number;
  text: string;
  source: string | null;
  featured: boolean | null;
  display_order: number | null;
}

/** Map a Supabase row to the Review shape the UI expects. */
function mapRow(row: DbReview): Review {
  return {
    id:           row.id,
    customerName: row.customer_name,
    rating:       row.rating,
    text:         row.text,
    source:       (row.source as Review['source']) ?? undefined,
  };
}

interface UseReviewsResult {
  reviews:  Review[];
  loading:  boolean;
  error:    string | null;
}

/**
 * Fetches approved reviews for allsurfacefix.com from Supabase, ordered by
 * `display_order`. Falls back to the static `reviews` array if:
 *   - Supabase env vars are not configured, or
 *   - The fetch fails for any reason.
 *
 * Reviews submitted via /leave-review land in Supabase with `approved=false`
 * and only appear here once approved through the dswayze.dev dashboard.
 */
export function useReviews(): UseReviewsResult {
  const [reviews, setReviews] = useState<Review[]>(staticReviews);
  const [loading, setLoading] = useState(!!supabase);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return; // no client — keep static fallback

    let cancelled = false;

    supabase
      .from('reviews')
      .select('id, customer_name, rating, text, source, featured, display_order')
      .eq('site', 'allsurfacefix.com')
      .eq('approved', true)
      .order('display_order', { ascending: true })
      .order('created_at',    { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) {
          console.error('[reviews] Supabase fetch error:', fetchError.message);
          setError(fetchError.message);
          // keep static fallback already in state
        } else if (data && data.length > 0) {
          setReviews((data as DbReview[]).map(mapRow));
        }
        // If data is empty we keep the static items — nothing approved yet.
        // (The static array is empty by default, so the empty state renders.)
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { reviews, loading, error };
}
