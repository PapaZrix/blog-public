import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import ScrollToTop from './ScrollToTop';

const PATHS = [
  '/login',
  '/admin/dashboard',
  '/admin/new',
  '/register',
  '/edit',
];

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Header />
      <ScrollToTop />
      <main>{children}</main>
      {PATHS.find(
        (path) => router.pathname === path || router.pathname.includes('edit')
      ) ? null : (
        <Footer />
      )}
    </>
  );
}
