import { PageHeader } from '../components/PageHeader';
import { CTASection } from '../components/CTASection';
import { services } from '../data/services';
import { usePageMeta } from '../hooks/usePageMeta';

export function Services() {
  usePageMeta({
    title: 'Our Services | All Surfaces Renewal and Repair',
    description:
      'Bathtub refinishing, countertop resurfacing, sink repair, and bathroom surface restoration. Affordable surface renewal that saves the cost and disruption of full replacement.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we can restore for you"
        description="Everything we do is focused on repairing and renewing existing surfaces — at a fraction of the cost of replacement, and with much less disruption."
      />

      <section className="section">
        <div className="container-page space-y-12">
          {services.map((service, i) => (
            <article
              key={service.id}
              className={`grid items-start gap-8 md:grid-cols-2 ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="card overflow-hidden">
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-brand/10 to-accent/10" />
              </div>
              <div>
                <p className="eyebrow">{service.title.split(' ').slice(-1)[0]}</p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{service.title}</h2>
                <p className="mt-3 text-slate-600">
                  {service.longDescription ?? service.description}
                </p>
                {service.benefits && service.benefits.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-slate-700">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
