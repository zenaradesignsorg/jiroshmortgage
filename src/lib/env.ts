/**
 * Environment variable validation and utilities
 * Ensures required environment variables are present and valid
 */

/**
 * Check if Google Analytics is configured
 */
export const isAnalyticsEnabled = (): boolean => {
  return !!import.meta.env.VITE_GA_MEASUREMENT_ID;
};

/**
 * Check if Resend is configured
 */
export const isResendEnabled = (): boolean => {
  return !!import.meta.env.VITE_RESEND_API_KEY;
};

/**
 * Check if Google Search Console is configured
 */
export const isSearchConsoleEnabled = (): boolean => {
  return !!import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
};
