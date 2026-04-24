# Gallery Images

Drop before/after photos here for the **Before & After** gallery page.

## Naming convention

Use this exact pattern so images are easy to match up and sort:

```
{category}-{number}-before.{ext}
{category}-{number}-after.{ext}
```

**Categories** (must match the `category` field in `src/data/galleryItems.ts`):

- `bathtub`
- `countertop`
- `sink`
- `bathroom`
- `repair`
- `other`

**Examples:**

```
bathtub-01-before.jpg
bathtub-01-after.jpg
countertop-01-before.jpg
countertop-01-after.jpg
sink-02-before.jpg
sink-02-after.jpg
```

Pad numbers with a leading zero (`01`, `02`, `10`) so they sort correctly in file explorers.

## Supported formats

`.jpg`, `.jpeg`, `.png`, or `.webp`. `.webp` produces the smallest files and loads fastest, but any of these work.

## Size and optimization

- **Target size:** under 500 KB per file
- **Dimensions:** ~1600×1200 is plenty — anything larger wastes bandwidth
- **Orientation:** rotate to upright *before* dropping them in (EXIF rotation is unreliable on the web)

If you're not sure how to resize, it's fine to drop in originals — I'll compress them during a later optimization pass.

## How to wire new images into the site

1. Drop the files in this folder with the naming convention above.
2. Open `src/data/galleryItems.ts`.
3. Add an entry to the `galleryItems` array:

   ```ts
   {
     id: 'bathtub-01',
     title: 'Yellowed porcelain tub refinish',
     category: 'bathtub',
     beforeImage: '/images/gallery/bathtub-01-before.jpg',
     afterImage: '/images/gallery/bathtub-01-after.jpg',
     description: 'Stained 1970s porcelain tub brought back to bright white.',
   },
   ```

   Note: paths start with `/images/gallery/` (no leading `public`) — Vite serves anything in `public/` from the site root.

4. Save — the dev server hot-reloads and the new card appears on `/gallery`.

## Tips

- Keep the **before** and **after** shots at the same angle and zoom level so the comparison is fair.
- If you have a great photo that isn't a before/after pair, we can add a single-image gallery variant later.
