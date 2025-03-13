import {useEffect } from 'react';
import ReactGA from 'react-ga4';

const useGA4 = () => {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;

    if (measurementId) {
      ReactGA.initialize(measurementId);
    }
  }, []); // Run only once on mount

  const sendEvent = (category, action, label, value) => {
    if (import.meta.env.VITE_GA4_MEASUREMENT_ID) {
      ReactGA.event({
        category,
        action,
        label,
        value,
      });
    }
  }

  const sendPageView = (pagePath) => {
    if (import.meta.env.VITE_GA4_MEASUREMENT_ID) {
      ReactGA.send({ hitType: "pageview", page: pagePath });
    }
  }

  return { sendEvent, sendPageView };
};

export default useGA4;