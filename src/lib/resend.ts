/**
 * Resend API client
 * Handles email sending via Resend API
 * 
 * Security Note: In production, this should be moved to a server-side API route
 * to avoid exposing the API key in client-side code.
 */

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export interface EmailData {
  name: string;
  email: string;
  phone: string;
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
 * Send email via Resend API
 * 
 * @param emailData - Form data to send
 * @returns Promise with response
 */
export const sendEmail = async (emailData: EmailData): Promise<EmailResponse> => {
  // Sanitize all inputs
  const sanitizedData: EmailData = {
    name: sanitizeInput(emailData.name),
    email: sanitizeInput(emailData.email),
    phone: sanitizeInput(emailData.phone),
    message: emailData.message ? sanitizeInput(emailData.message) : undefined,
  };

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitizedData.email)) {
    return {
      success: false,
      error: 'Invalid email address',
    };
  }

  // If using server-side API route
  if (API_URL) {
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        messageId: data.id,
      };
    } catch (error) {
      console.error('Failed to send email via API:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  // Client-side Resend API call (for development/testing only)
  if (!RESEND_API_KEY) {
    // Mock response for development when API key is not configured
    console.warn('Resend API key not configured. Using mock response.');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          messageId: 'mock-message-id',
        });
      }, 1000);
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>', // Update with your verified domain
        to: ['jirosh.balaganesan@calibermortgage.ca'], // Update with recipient email
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
          ${sanitizedData.message ? `<p><strong>Message:</strong><br>${sanitizedData.message.replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><small>Sent from jiroshmortgage.com contact form</small></p>
        `,
        text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}
${sanitizedData.message ? `Message:\n${sanitizedData.message}` : ''}

---
Sent from jiroshmortgage.com contact form
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Resend API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.id,
    };
  } catch (error) {
    console.error('Failed to send email via Resend:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
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
