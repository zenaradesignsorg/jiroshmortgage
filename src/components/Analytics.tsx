import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '@/lib/analytics';
import { isAnalyticsEnabled } from '@/lib/env';

/**
 * Analytics component
 * Handles initialization and page view tracking
 * Loads asynchronously to avoid blocking initial render
 */
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only initialize if GA is configured
    if (!isAnalyticsEnabled()) {
      return;
    }

    // Initialize analytics (lazy loaded)
    initAnalytics().catch((error) => {
      console.warn('Failed to initialize analytics:', error);
    });
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (isAnalyticsEnabled()) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  // This component doesn't render anything
  return null;
};

export default Analytics;
