import { siteConfig } from '../data/site';

export function ContactInfo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {siteConfig.phone && (
        <a
          href={`tel:${siteConfig.phone}`}
          className="card flex items-center gap-3 p-5 transition hover:shadow-hover"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2l2 5-2 1a12 12 0 006 6l1-2 5 2v2a2 2 0 01-2 2A16 16 0 013 5z" />
            </svg>
          </span>
          <span>
            <span className="block text-xs uppercase tracking-wide text-slate-500">Call</span>
            <span className="block text-sm font-semibold text-brand">{siteConfig.phone}</span>
          </span>
        </a>
      )}

      {siteConfig.email && (
        <a
          href={`mailto:${siteConfig.email}`}
          className="card flex items-center gap-3 p-5 transition hover:shadow-hover"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l8 7 8-7" />
            </svg>
          </span>
          <span>
            <span className="block text-xs uppercase tracking-wide text-slate-500">Email</span>
            <span className="block text-sm font-semibold text-brand">{siteConfig.email}</span>
          </span>
        </a>
      )}

      {siteConfig.serviceArea && (
        <div className="card flex items-center gap-3 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-7.5-7-12a7 7 0 0114 0c0 4.5-7 12-7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </span>
          <span>
            <span className="block text-xs uppercase tracking-wide text-slate-500">Service Area</span>
            <span className="block text-sm font-semibold text-brand">{siteConfig.serviceArea}</span>
          </span>
        </div>
      )}

      {siteConfig.facebookUrl && (
        <a
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="card flex items-center gap-3 p-5 transition hover:shadow-hover"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-1.8 1.9-1.8H17V2.2C16.7 2.1 15.5 2 14.1 2 11.4 2 9.5 3.7 9.5 6.7V10H6.5v4h3v8h3.5z" />
            </svg>
          </span>
          <span>
            <span className="block text-xs uppercase tracking-wide text-slate-500">Social</span>
            <span className="block text-sm font-semibold text-brand">Facebook</span>
          </span>
        </a>
      )}
    </div>
  );
}
