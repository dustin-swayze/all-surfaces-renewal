import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="section">
      <div className="container-page text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
        <Link to="/" className="btn-primary mt-6">
          Back to home
        </Link>
      </div>
    </section>
  );
}
