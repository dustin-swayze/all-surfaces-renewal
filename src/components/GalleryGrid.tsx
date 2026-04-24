import type { GalleryItem } from '../types';
import { BeforeAfterCard } from './BeforeAfterCard';

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-surface-border bg-surface-muted p-8 text-center text-sm text-slate-500">
        No projects to show yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <BeforeAfterCard key={item.id} item={item} />
      ))}
    </div>
  );
}
