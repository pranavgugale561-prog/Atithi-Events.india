import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Instant snap to top on route change before paint
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
