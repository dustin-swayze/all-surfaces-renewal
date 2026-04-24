import type { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {stars.map((filled, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className={`h-4 w-4 ${filled ? 'text-accent' : 'text-slate-300'}`}
          aria-hidden
        >
          <path
            strokeLinejoin="round"
            d="M10 2.5l2.472 5.013 5.528.803-4 3.9.944 5.508L10 15.09l-4.944 2.634.944-5.508-4-3.9 5.528-.803L10 2.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="card flex h-full flex-col p-6">
      <StarRating rating={review.rating} />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <footer className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-brand">{review.customerName}</span>
        {review.source && (
          <span className="text-xs uppercase tracking-wide text-slate-400">{review.source}</span>
        )}
      </footer>
    </article>
  );
}
