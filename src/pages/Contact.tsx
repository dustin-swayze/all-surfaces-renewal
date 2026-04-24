import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { ContactInfo } from '../components/ContactInfo';
import { usePageMeta } from '../hooks/usePageMeta';

export function Contact() {
  usePageMeta({
    title: 'Contact Us | All Surfaces Renewal and Repair',
    description:
      'Contact All Surfaces Renewal and Repair. Call, email, or request a quote online. Serving the Tri-Cities and surrounding areas.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Reach out by phone, email, or the quote form — whichever is easiest for you."
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-xl font-semibold text-brand">How to reach us</h2>
            <p className="mt-3 text-slate-600">
              We respond to most inquiries within one business day. If your project is urgent, a
              phone call is the fastest way to get in touch.
            </p>
            <div className="mt-6">
              <ContactInfo />
            </div>
          </div>
          <aside className="card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Ready to request a quote?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Fill out a quick form and we&rsquo;ll email you back with a free estimate.
            </p>
            <Link to="/quote" className="btn-accent mt-5 w-full sm:w-auto">
              Get a Free Quote
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
