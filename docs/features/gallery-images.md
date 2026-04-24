# Feature: Gallery Image Workflow

How before/after photos flow from Drive → repo → site.

## What was built

- A dedicated folder at `public/images/gallery/` for all gallery photos
- A naming convention that keeps before/after pairs matched up
- A README inside the folder (`public/images/gallery/README.md`) so the instructions are right next to the files
- Expected local image paths documented in `src/data/galleryItems.ts` (see the comments in that file)

## How it works

Vite serves any file under `public/` from the site root. So a file at:

```
public/images/gallery/bathtub-01-before.jpg
```

is accessible in the browser at:

```
/images/gallery/bathtub-01-before.jpg
```

No import, no bundling — just static asset serving. This is the right pattern for content-like images (gallery photos) that will change over time independently of the code.

## Naming convention

```
{category}-{number}-before.{ext}
{category}-{number}-after.{ext}
```

Categories match the `GalleryCategory` TypeScript union (`bathtub`, `countertop`, `sink`, `bathroom`, `repair`, `other`). Numbers are zero-padded (`01`, `02`, `10`) so they sort correctly.

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

## Adding a new project

1. Put the before/after photos in `public/images/gallery/` following the convention above.
2. Add an entry to `galleryItems` in `src/data/galleryItems.ts`:
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
3. The dev server hot-reloads and the project shows up on `/gallery`.

## Key concepts

- **`public/` vs `src/assets/` in Vite.** Files under `public/` are served as-is at the site root and do not get bundled. Files imported from `src/assets/` are processed by Vite (hashed filenames, tree-shaken, etc.). We use `public/` for gallery photos because they're content, not code, and referencing them by path is simpler.
- **Static paths don't need imports.** In JSX, writing `<img src="/images/gallery/foo.jpg" />` just works. No `import foo from '...'` required.
- **TypeScript sees these as plain strings.** The `beforeImage` and `afterImage` fields in `GalleryItem` are typed `string`. TypeScript won't validate that the file actually exists — only the browser will catch a missing file, as a 404. Keep filenames and data entries in sync.

## Future improvements

- **Responsive image sizes.** For very high-traffic sites we'd generate multiple sizes per image and use `<picture>` / `srcset`. For a small-business site, one well-sized image per photo is plenty.
- **Lightbox.** Click any card to view the full-size image in an overlay. Planned as a Milestone 4 polish item.
- **Before/after slider.** An interactive drag-to-reveal slider instead of side-by-side. Also Milestone 4.
- **Admin upload dashboard.** Listed in the project brief's Future Features — requires a backend.
