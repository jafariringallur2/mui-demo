import 'src/global.css';
import { useEffect } from 'react';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import useGA4 from 'src/hooks/useGA4';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  const { sendPageView } = useGA4();
  useEffect(() => {
    try {
      sendPageView(window.location.pathname + window.location.search);
    } catch (error) {
      console.error('Failed to send page view to GA4:', error);
    }
  }, [sendPageView]);

  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}