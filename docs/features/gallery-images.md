# Feature: Gallery Image Workflow

How before/after photos flow from the field into the live gallery.

---

## Two workflows - pick the one that fits

### Workflow A: Dashboard approval (recommended for new photos)

This is the standard workflow going forward. No code changes, no file commits.

1. Customer or contractor uploads photos via the portfolio upload link
   (`https://dswayze.dev/upload/[token]`)
2. Photos appear in the portfolio dashboard at `/dashboard/uploads`
3. Click **Approve** on an image to open the approval modal
4. Fill in: Title, Category, optional Description
5. Optionally pair it with another upload as a "Before" photo
6. Click **Publish to Gallery**

The dashboard API compresses the image (auto-orient, resize to max 1600px, JPEG 82, strip EXIF)
and writes it to the shared `gallery_items` Supabase table. The site fetches from that
table on every page load, so the photo appears live immediately - no deploy required.

### Workflow B: Static file commit (for bulk imports or legacy photos)

Use this for one-time bulk adds of existing photos where the dashboard flow would be tedious.

1. Compress photos (see compression section below)
2. Drop them in `public/images/gallery/` following the naming convention
3. Add entries to `src/data/galleryItems.ts`
4. Commit and push - Vercel deploys in ~60 seconds

**Note:** The site fetches from Supabase first on load. If Supabase returns items for
`allsurfacefix.com`, those are shown and the static `galleryItems.ts` array is ignored.
If Supabase returns empty or errors, it falls back to the static array. This means the
12 original photos are always available as a fallback even as new Supabase-backed photos accumulate.

---

## How the dynamic gallery works

The gallery is powered by two files:

**`src/lib/supabase.ts`**
Creates a Supabase browser client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
Returns `null` if either env var is missing (safe fallback to static data).

**`src/hooks/useGalleryItems.ts`**
React hook used by both `Gallery.tsx` and `Home.tsx`. On mount it:
1. Immediately sets state to the static `galleryItems` array (instant render, no flash)
2. Fetches from `gallery_items` where `site = 'allsurfacefix.com'`, ordered by `display_order`
3. If Supabase returns records, replaces the static items with the live data
4. If Supabase errors or returns empty, keeps the static items silently

This means:
- The site renders immediately with static data (no loading flash on first paint)
- If Supabase is configured and has approved items, live data takes over
- If Supabase is down or misconfigured, the site still works with static photos

**`gallery_items` table schema (Supabase)**
```
id               uuid
site             text  -- 'allsurfacefix.com'
title            text
category         text  -- bathtub | countertop | sink | bathroom | repair | other
description      text (nullable)
before_image_url text (nullable)
after_image_url  text
display_order    integer  -- lower = appears first; new items get MAX + 10
created_at       timestamptz
```

---

## Static naming convention (Workflow B)

```
{category}-{number}-before.{ext}
{category}-{number}-after.{ext}
```

Categories match the `GalleryCategory` TypeScript union (`bathtub`, `countertop`, `sink`, `bathroom`, `repair`, `other`).
Numbers are zero-padded (`01`, `02`, `10`) so they sort correctly.

**Good:**
```
bathtub-01-before.jpg
bathtub-01-after.jpg
```

**Avoid:**
```
IMG_4782.jpg                    (unsearchable)
bathroom pic final v3.jpg       (spaces, unstructured)
before1.jpg / after1.jpg        (no category, ambiguous)
```

---

## Image compression

Phone photos are typically 2-4 MB. The pipeline shrinks them to web-ready size
with no visible quality loss.

**What the pipeline does:**
- Auto-rotate based on EXIF (so portrait phone photos display correctly)
- Resize to max 1600px on the longest side (preserves detail without bloat)
- Re-encode as JPEG at quality 82
- Strip all EXIF metadata (smaller files + privacy)

**Result:** 30 MB total -> ~4 MB total. 84% reduction.

### Dashboard approval (automatic)

The `/api/gallery` route runs Sharp with these exact settings before uploading to
the `ASRgallery` Supabase bucket:

```typescript
sharp(buffer)
  .rotate()                                          // auto-orient
  .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 82 })                             // strips EXIF implicitly
  .toBuffer()
```

No manual compression needed when using the dashboard workflow.

### Manual batch compression (for static file workflow)

When committing photos directly to `public/images/gallery/`, compress them first.

**Option 1 - squoosh.app** (occasional adds):
1. Go to https://squoosh.app
2. Drag the photo in
3. Pick **MozJPEG**, quality 82
4. Click **Resize**, set width to 1600
5. Download and drop in `public/images/gallery/`

**Option 2 - ImageMagick batch** (many photos at once):
```bash
cd public/images/gallery
for img in *.jpg *.jpeg; do
  convert "$img" -auto-orient -resize '1600x1600>' -quality 82 -strip "$img.tmp" && mv "$img.tmp" "$img"
done
```

Running this multiple times is safe - images already smaller than 1600px are left alone.

---

## Key concepts

- **`public/` in Vite.** Files under `public/` are served as-is from the site root.
  `/images/gallery/bathtub-01-before.jpg` in the browser = `public/images/gallery/bathtub-01-before.jpg` on disk.
- **Static paths don't need imports.** `<img src="/images/gallery/foo.jpg" />` just works in JSX.
- **Supabase Storage URLs are full HTTPS URLs.** Items added via the dashboard approval
  workflow have `after_image_url` values like `https://ellpmojstpafhqrkivkx.supabase.co/storage/v1/object/public/ASRgallery/bathtub/...`.
  Both path formats (local `/images/...` and full Supabase URLs) work in the `<img>` tag.

---

## Future improvements

- **Responsive image sizes.** Generate multiple sizes per image and use `srcset`.
  For a small-business site, one well-sized image per photo is plenty for now.
- **WebP / AVIF format.** ~30% smaller than JPEG. Fine for new builds.
- **Lightbox.** Click any card to view the full-size image in an overlay.
- **Before/after slider.** Interactive drag-to-reveal slider instead of side-by-side.
- **Display order editor.** A drag-to-reorder UI in the dashboard for managing `display_order`.
