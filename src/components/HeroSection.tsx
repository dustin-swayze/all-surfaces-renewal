import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand via-brand to-brand-dark" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_50%)]" />

      <div className="container-page py-20 text-white sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-light">
          Repair instead of replace
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Professional bathtub, countertop, sink, and surface renewal.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85">
          {siteConfig.tagline} Restore the surfaces you already have — with less mess, less cost,
          and less disruption than a full replacement.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/quote" className="btn-accent">
            Get a Free Quote
          </Link>
          <Link
            to="/gallery"
            className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            View Before &amp; After
          </Link>
        </div>
      </div>
    </section>
  );
}
