import type { GalleryItem } from '../types';

interface BeforeAfterCardProps {
  item: GalleryItem;
}

/**
 * Renders a gallery project.
 *
 * - If the item has both a before AND after image, renders the classic
 *   side-by-side layout with "Before" and "After" labels.
 * - If the item has only an after image (a solo showcase shot), renders a
 *   single full-width image with a "Finished" label.
 */
export function BeforeAfterCard({ item }: BeforeAfterCardProps) {
  const hasPair = Boolean(item.beforeImage);

  return (
    <article className="card overflow-hidden transition hover:shadow-hover">
      {hasPair ? (
        <div className="grid grid-cols-2">
          <figure className="relative">
            <img
              src={item.beforeImage}
              alt={`Before: ${item.title}`}
              loading="lazy"
              className="h-48 w-full object-cover sm:h-56"
            />
            <figcaption className="absolute left-2 top-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
              Before
            </figcaption>
          </figure>
          <figure className="relative">
            <img
              src={item.afterImage}
              alt={`After: ${item.title}`}
              loading="lazy"
              className="h-48 w-full object-cover sm:h-56"
            />
            <figcaption className="absolute left-2 top-2 rounded-md bg-accent/90 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
              After
            </figcaption>
          </figure>
        </div>
      ) : (
        <figure className="relative">
          <img
            src={item.afterImage}
            alt={item.title}
            loading="lazy"
            className="h-56 w-full object-cover sm:h-72"
          />
          <figcaption className="absolute left-2 top-2 rounded-md bg-accent/90 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
            Finished
          </figcaption>
        </figure>
      )}

      <div className="p-5">
        <p className="eyebrow">{item.category}</p>
        <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
        {item.description && (
          <p className="mt-2 text-sm text-slate-600">{item.description}</p>
        )}
      </div>
    </article>
  );
}
