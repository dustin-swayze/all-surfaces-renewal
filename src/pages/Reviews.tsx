import { PageHeader } from '../components/PageHeader';
import { ReviewCard } from '../components/ReviewCard';
import { CTASection } from '../components/CTASection';
import { reviews } from '../data/reviews';

export function Reviews() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="What customers are saying"
        description="Reviews collected from our Facebook page and direct customer feedback."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
