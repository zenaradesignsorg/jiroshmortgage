/**
 * Resend API client
 * Handles email sending via Resend API
 * 
 * Security: All email sending is handled server-side via /api/contact
 * to avoid exposing API keys in client-side code.
 */

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  reason?: string;
  message?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sanitize input to prevent XSS
 */
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 10000); // Limit length
};

/**
 * Send email via server-side API route
 * 
 * @param emailData - Form data to send
 * @returns Promise with response
 */
export const sendEmail = async (emailData: EmailData): Promise<EmailResponse> => {
  // Sanitize all inputs on client side for better UX (server also validates)
  const sanitizedData: EmailData = {
    name: sanitizeInput(emailData.name),
    email: sanitizeInput(emailData.email),
    phone: sanitizeInput(emailData.phone),
    message: emailData.message ? sanitizeInput(emailData.message) : undefined,
  };

  // Validate email format on client side
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitizedData.email)) {
    return {
      success: false,
      error: 'Invalid email address',
    };
  }

  // Send to server-side API route
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `Server error: ${response.status}`,
      };
    }

    return {
      success: true,
      messageId: data.id,
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to send email via API:', error);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email. Please check your connection and try again.',
    };
  }
};

/**
 * Retry email sending with exponential backoff
 */
export const sendEmailWithRetry = async (
  emailData: EmailData,
  maxRetries = 3
): Promise<EmailResponse> => {
  let lastError: EmailResponse | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await sendEmail(emailData);
    
    if (result.success) {
      return result;
    }

    lastError = result;

    // Exponential backoff: wait 1s, 2s, 4s
    if (attempt < maxRetries - 1) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return lastError || { success: false, error: 'Max retries exceeded' };
};
