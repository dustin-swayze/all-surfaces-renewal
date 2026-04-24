import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../data/site';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Before & After' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" onClick={close} className="flex items-center gap-2">
          {siteConfig.logoUrl ? (
            <img
              src={siteConfig.logoUrl}
              alt={siteConfig.name}
              className="h-9 w-auto"
            />
          ) : (
            <>
              <span className="inline-block h-8 w-8 rounded-lg bg-brand" aria-hidden />
              <span className="text-sm font-bold leading-tight text-brand sm:text-base">
                {siteConfig.name}
              </span>
            </>
          )}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-surface-muted text-brand'
                    : 'text-slate-600 hover:bg-surface-muted hover:text-brand'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/quote" className="btn-accent ml-2">
            Get a Free Quote
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-surface-border bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={close}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-surface-muted text-brand'
                      : 'text-slate-700 hover:bg-surface-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/quote" onClick={close} className="btn-accent mt-2">
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
