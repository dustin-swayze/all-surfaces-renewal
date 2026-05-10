import { useState } from 'react';

interface StarRatingInputProps {
  value: number;                        // 0 = unselected, 1-5 = selected
  onChange: (rating: number) => void;
  /** Optional id for the visually-hidden radiogroup label. */
  id?: string;
}

/**
 * Accessible 1-5 star rating input.
 *
 * Renders as a row of buttons (one per star). Hovering temporarily fills
 * stars up to the hovered position; clicking commits that value.
 *
 * Keyboard: Tab to focus a star, Enter/Space to select. Each star is a
 * real <button> so screen readers announce the rating.
 */
export function StarRatingInput({ value, onChange, id }: StarRatingInputProps) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label="Star rating"
      className="inline-flex items-center gap-1"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} ${n === 1 ? 'star' : 'stars'}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            className="rounded p-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
          >
            <svg
              viewBox="0 0 20 20"
              className={`h-7 w-7 transition ${
                filled ? 'fill-accent text-accent' : 'fill-transparent text-slate-300'
              }`}
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path
                strokeLinejoin="round"
                d="M10 2.5l2.472 5.013 5.528.803-4 3.9.944 5.508L10 15.09l-4.944 2.634.944-5.508-4-3.9 5.528-.803L10 2.5z"
              />
            </svg>
          </button>
        );
      })}
      {value > 0 && (
        <span className="ml-2 text-sm text-slate-600">
          {value} of 5
        </span>
      )}
    </div>
  );
}
