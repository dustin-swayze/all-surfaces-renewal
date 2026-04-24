import { useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { GalleryGrid } from '../components/GalleryGrid';
import { CTASection } from '../components/CTASection';
import { galleryItems } from '../data/galleryItems';
import type { GalleryCategory } from '../types';

type FilterValue = 'all' | GalleryCategory;

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bathtub', label: 'Bathtubs' },
  { value: 'countertop', label: 'Countertops' },
  { value: 'sink', label: 'Sinks' },
  { value: 'bathroom', label: 'Bathrooms' },
  { value: 'repair', label: 'Repairs' },
];

export function Gallery() {
  const [active, setActive] = useState<FilterValue>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === active);
  }, [active]);

  return (
    <>
      <PageHeader
        eyebrow="Before & After"
        title="The work speaks for itself"
        description="A selection of recent refinishing and repair projects. Use the filters to see examples by surface type."
      />

      <section className="section">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter.value === active;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActive(filter.value)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand text-white shadow-card'
                      : 'bg-white text-slate-700 border border-surface-border hover:bg-surface-muted'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <GalleryGrid items={filtered} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
