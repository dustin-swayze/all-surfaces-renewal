# Feature: Dynamic Gallery (Supabase-backed)

The gallery is now driven by a live Supabase database table instead of a static TypeScript array.

## What was built

- `src/lib/supabase.ts` — null-safe Supabase browser client; returns `null` if env vars are missing so the site still works in local dev without credentials
- `src/hooks/useGalleryItems.ts` — fetches `gallery_items` rows for `site = 'allsurfacefix.com'`, ordered by `display_order`; initializes with the static fallback array for instant render, then replaces with live data on mount
- `src/pages/Gallery.tsx` — updated to use `useGalleryItems`; shows skeleton placeholders while loading
- `src/pages/Home.tsx` — updated to use `useGalleryItems` for the homepage gallery preview section
- `package.json` — added `@supabase/supabase-js ^2.49.4`

## How it works

```
Supabase gallery_items table
        |
useGalleryItems hook (fetches on mount)
        |
Gallery.tsx / Home.tsx (renders items)
```

On first render the hook returns the static `galleryItems.ts` array (zero loading delay). Once the Supabase query resolves, the state is replaced with live DB rows. If the query fails for any reason, the static array stays in place as a fallback.

## gallery_items table schema

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `site` | text | e.g. `allsurfacefix.com` |
| `title` | text | Gallery card title |
| `category` | text | bathtub, countertop, sink, bathroom, repair, other |
| `description` | text | Optional caption |
| `before_image_url` | text | Optional — full Supabase Storage public URL |
| `after_image_url` | text | Required — full Supabase Storage public URL |
| `display_order` | int | Lower = appears first; auto-incremented by 10 on approval |
| `created_at` | timestamptz | Auto-set by Supabase |

## Supabase RLS policies

| Table | Policy | Role | Command |
|---|---|---|---|
| `gallery_items` | Public can read gallery items | anon | SELECT |
| `gallery_items` | Authenticated can manage gallery items | authenticated | ALL |

## How gallery items are added

Items are created through the portfolio dashboard — not directly in Supabase. The full workflow is documented in the portfolio README at `C:\Websites2026\portfolio\README.md` under **Gallery Approval Workflow**.

Short version: upload photos via the portfolio upload link → rename in dashboard → approve with title/category → images are compressed and published automatically.

## Environment variables required

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

Both must be set in Vercel → allsurfacefix.com project → Settings → Environment Variables → Production, and a clean redeploy (build cache off) must be triggered after adding them.

## Key implementation notes

- `getPublicUrl()` on Supabase Storage returns a URL without verifying the file exists — storage uploads must succeed before inserting the DB row
- The anon key format changed in mid-2025 from a JWT (`eyJ...`) to a publishable key (`sb_publishable_...`). Both formats are accepted by `@supabase/supabase-js` v2.49+
- Images are stored under `{category}/{timestamp}-{after|before}-{filename}.jpg` in the `asr-gallery` bucket
