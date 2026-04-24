import type { GalleryItem } from '../types';

interface BeforeAfterCardProps {
  item: GalleryItem;
}

export function BeforeAfterCard({ item }: BeforeAfterCardProps) {
  return (
    <article className="card overflow-hidden transition hover:shadow-hover">
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
