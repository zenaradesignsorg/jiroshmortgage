/**
 * Google Analytics 4 utilities
 * Implements privacy-first analytics with lazy loading
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Check if user has consented to analytics
 * For now, returns true by default. Can be enhanced with consent management.
 */
const hasConsent = (): boolean => {
  // Check for Do Not Track header
  if (navigator.doNotTrack === '1') {
    return false;
  }
  
  // Check localStorage for consent (can be enhanced with consent banner)
  const consent = localStorage.getItem('analytics-consent');
  if (consent === 'false') {
    return false;
  }
  
  // Default to true if not explicitly denied
  return true;
};

/**
 * Load Google Analytics script asynchronously
 */
const loadGAScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!GA_MEASUREMENT_ID) {
      reject(new Error('GA Measurement ID not configured'));
      return;
    }

    // Check if already loaded
    if (window.gtag) {
      resolve();
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    // Load script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load GA script'));
    document.head.appendChild(script);
  });
};

/**
 * Initialize Google Analytics (lazy load after page load)
 */
export const initAnalytics = async (): Promise<void> => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: Measurement ID not configured');
    return;
  }

  if (!hasConsent()) {
    console.info('Google Analytics: User has not consented');
    return;
  }

  // Load after page load to avoid blocking initial render
  if (document.readyState === 'complete') {
    await loadGAScript();
  } else {
    window.addEventListener('load', () => {
      // Use requestIdleCallback for non-critical loading
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadGAScript().catch(console.error));
      } else {
        setTimeout(() => loadGAScript().catch(console.error), 1000);
      }
    });
  }
};

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!window.gtag || !GA_MEASUREMENT_ID || !hasConsent()) {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Track custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!window.gtag || !GA_MEASUREMENT_ID || !hasConsent()) {
    return;
  }

  window.gtag('event', eventName, eventParams);
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string): void => {
  trackEvent('form_submit', {
    form_name: formName,
    event_category: 'engagement',
    event_label: formName,
  });
};

/**
 * Track external link click
 */
export const trackExternalLink = (url: string, linkText?: string): void => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: url,
    transport_type: 'beacon',
    link_text: linkText,
  });
};

/**
 * Set user consent
 */
export const setAnalyticsConsent = (consented: boolean): void => {
  localStorage.setItem('analytics-consent', String(consented));
  
  if (consented && !window.gtag) {
    initAnalytics().catch(console.error);
  }
};
