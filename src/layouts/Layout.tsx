import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/**
 * Shared page layout: Navbar on top, page content in the middle,
 * Footer at the bottom. React Router renders the matched page via <Outlet />.
 */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
