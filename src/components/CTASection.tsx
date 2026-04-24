import { Link } from 'react-router-dom';

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = 'Ready to bring your surfaces back to life?',
  description = 'Tell us about your project and we\u2019ll get back to you with a free, no-obligation quote.',
}: CTASectionProps) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="overflow-hidden rounded-2xl bg-brand px-6 py-12 text-white sm:px-10 sm:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
              <p className="mt-2 max-w-xl text-white/85">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/quote" className="btn-accent">
                Get a Free Quote
              </Link>
              <Link
                to="/contact"
                className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
