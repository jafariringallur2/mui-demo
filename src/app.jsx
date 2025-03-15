import 'src/global.css';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
  const {
    VITE_APP_TITLE,
    VITE_APP_DESCRIPTION,
    VITE_APP_KEYWORDS,
    VITE_APP_AUTHOR,
    VITE_APP_OG_IMAGE,
  } = import.meta.env;

  return (
    <>
     <Helmet>
        <title>{VITE_APP_TITLE}</title>
        <meta name="description" content={VITE_APP_DESCRIPTION} />
        <meta name="keywords" content={VITE_APP_KEYWORDS} />
        <meta name="author" content={VITE_APP_AUTHOR} />
        <meta property="og:title" content={VITE_APP_TITLE} />
        <meta property="og:description" content={VITE_APP_DESCRIPTION} />
        <meta property="og:image" content={VITE_APP_OG_IMAGE} />
      </Helmet>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
    </>
  );
}