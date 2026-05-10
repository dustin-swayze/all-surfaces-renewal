import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ReviewCard } from '../components/ReviewCard';
import { CTASection } from '../components/CTASection';
import { useReviews } from '../hooks/useReviews';
import { usePageMeta } from '../hooks/usePageMeta';

export function Reviews() {
  usePageMeta({
    title: 'Reviews | All Surfaces Renewal and Repair',
    description:
      'Customer testimonials and reviews for All Surfaces Renewal and Repair — bathtub, tile, and countertop refinishing in the Tri-Cities.',
  });

  const { reviews, loading } = useReviews();
  const hasReviews = reviews.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="What customers are saying"
        description={
          hasReviews
            ? 'Honest feedback from customers whose surfaces we’ve restored.'
            : 'We’re collecting new testimonials from our customers.'
        }
      >
        <Link to="/leave-review" className="btn-accent">
          Leave a review
        </Link>
      </PageHeader>

      <section className="section">
        <div className="container-page">
          {loading && !hasReviews ? (
            <div className="card mx-auto max-w-2xl p-10 text-center text-sm text-slate-500">
              Loading reviews…
            </div>
          ) : hasReviews ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <ReviewsComingSoon />
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ReviewsComingSoon() {
  return (
    <div className="card mx-auto max-w-2xl p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h6m-6 8l3-3h7a3 3 0 003-3V7a3 3 0 00-3-3H7a3 3 0 00-3 3v10a3 3 0 003 3h0z"
          />
        </svg>
      </div>
      <h2 className="mt-5 text-2xl font-bold">Testimonials coming soon</h2>
      <p className="mt-3 text-slate-600">
        We’re gathering a fresh set of customer stories to share here. In the meantime,
        the quality of our work speaks for itself in the before-and-after gallery.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/leave-review" className="btn-primary">
          Leave the first review
        </Link>
        <Link to="/gallery" className="btn-secondary">
          See our work
        </Link>
      </div>
    </div>
  );
}
