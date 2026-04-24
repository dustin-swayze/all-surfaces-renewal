import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface-border bg-white">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              {siteConfig.logoUrl ? (
                <img src={siteConfig.logoUrl} alt={siteConfig.name} className="h-9 w-auto" />
              ) : (
                <>
                  <span className="inline-block h-8 w-8 rounded-lg bg-brand" aria-hidden />
                  <span className="text-base font-bold text-brand">{siteConfig.name}</span>
                </>
              )}
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Professional bathtub, countertop, sink, and surface renewal — repair instead of replace.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/services" className="text-slate-700 hover:text-brand">Services</Link></li>
              <li><Link to="/gallery" className="text-slate-700 hover:text-brand">Before & After</Link></li>
              <li><Link to="/reviews" className="text-slate-700 hover:text-brand">Reviews</Link></li>
              <li><Link to="/quote" className="text-slate-700 hover:text-brand">Get a Quote</Link></li>
              <li><Link to="/contact" className="text-slate-700 hover:text-brand">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {siteConfig.phone && (
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-brand">
                    {siteConfig.phone}
                  </a>
                </li>
              )}
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-brand">
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {siteConfig.serviceArea && <li>{siteConfig.serviceArea}</li>}
              {siteConfig.hours && <li className="text-slate-500">{siteConfig.hours}</li>}
              {siteConfig.facebookUrl && (
                <li>
                  <a
                    href={siteConfig.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-surface-border pt-6 text-center text-xs text-slate-500">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
