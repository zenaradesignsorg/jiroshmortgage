import { useEffect } from 'react';
import { isSearchConsoleEnabled } from '@/lib/env';

/**
 * Google Search Console Verification Component
 * Injects verification meta tag into document head
 */
const GoogleVerification = () => {
  useEffect(() => {
    if (!isSearchConsoleEnabled()) {
      return;
    }

    const verificationCode = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    
    // Check if meta tag already exists
    const existingMeta = document.querySelector('meta[name="google-site-verification"]');
    if (existingMeta) {
      return;
    }

    // Create and inject meta tag
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = verificationCode;
    document.head.appendChild(meta);

    // Cleanup function
    return () => {
      const metaTag = document.querySelector('meta[name="google-site-verification"]');
      if (metaTag) {
        metaTag.remove();
      }
    };
  }, []);

  return null;
};

export default GoogleVerification;
