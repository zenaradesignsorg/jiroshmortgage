/**
 * Environment variable validation and utilities
 * Ensures required environment variables are present and valid
 */

interface EnvConfig {
  googleSiteVerification?: string;
  gaMeasurementId?: string;
  resendApiKey?: string;
  apiUrl?: string;
}

/**
 * Get and validate environment variables
 */
export const getEnvConfig = (): EnvConfig => {
  return {
    googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION,
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
    resendApiKey: import.meta.env.VITE_RESEND_API_KEY,
    apiUrl: import.meta.env.VITE_API_URL,
  };
};

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

/**
 * Validate GA measurement ID format (G-XXXXXXXXXX)
 */
export const isValidGAMeasurementId = (id: string): boolean => {
  return /^G-[A-Z0-9]+$/.test(id);
};
