import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { ServiceCard } from '../components/ServiceCard';
import { BeforeAfterCard } from '../components/BeforeAfterCard';
import { ReviewCard } from '../components/ReviewCard';
import { CTASection } from '../components/CTASection';
import { StructuredData } from '../components/StructuredData';
import { services } from '../data/services';
import { reviews } from '../data/reviews';
import { useGalleryItems } from '../hooks/useGalleryItems';
import { usePageMeta } from '../hooks/usePageMeta';

export function Home() {
  usePageMeta({
    title: 'All Surfaces Renewal and Repair - Bathtub, Countertop & Sink Refinishing | Tri-Cities',
    description:
      'Professional bathtub, tile, and countertop refinishing serving the Tri-Cities and surrounding areas. An affordable alternative to full replacement, backed by 11 years of experience.',
  });

  const featuredServices = services.slice(0, 4);
  const featuredReviews  = reviews.slice(0, 3);
  const hasReviews       = featuredReviews.length > 0;

  const { items: galleryItems, loading: galleryLoading } = useGalleryItems();
  const featuredGallery = galleryItems.slice(0, 4);

  return (
    <>
      <StructuredData />
      <HeroSection />

      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Expert surface repair and refinishing
            </h2>
            <p className="mt-3 text-slate-600">
              We repair, refinish, and restore the surfaces you already own - from single chips to
              full bathroom refreshes.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/services" className="btn-secondary">
              See all services
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Our work</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Before &amp; after</h2>
            </div>
            <Link to="/gallery" className="btn-secondary">
              View full gallery
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {galleryLoading
              ? [1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-64 animate-pulse rounded-xl bg-slate-200" />
                ))
              : featuredGallery.map((item) => (
                  <BeforeAfterCard key={item.id} item={item} />
                ))}
          </div>
        </div>
      </section>

      {hasReviews && (
        <section className="section">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">What customers say</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Trusted by homeowners and pros</h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/reviews" className="btn-secondary">
                Read more reviews
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
