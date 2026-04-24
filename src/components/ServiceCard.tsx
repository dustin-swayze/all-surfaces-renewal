import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card flex h-full flex-col p-6 transition hover:shadow-hover">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{service.description}</p>
    </article>
  );
}
