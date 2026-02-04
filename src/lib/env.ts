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
 * Note: Resend is now handled server-side via /api/contact
 * This function is kept for backwards compatibility but always returns true
 * as the API route will handle errors gracefully
 */
export const isResendEnabled = (): boolean => {
  // Resend is handled server-side, so we assume it's available
  // The API route will return appropriate errors if not configured
  return true;
};

/**
 * Check if Google Search Console is configured
 */
export const isSearchConsoleEnabled = (): boolean => {
  return !!import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
};
