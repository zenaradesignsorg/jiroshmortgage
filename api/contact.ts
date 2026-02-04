import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Simple in-memory rate limiting
 * In production, consider using Vercel's Edge Config or Redis for distributed rate limiting
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

/**
 * Check rate limit for an IP address
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Sanitize input to prevent XSS and injection attacks
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
    .substring(0, 10000); // Limit length
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Map reason value to human-readable label
 */
function getReasonLabel(value: string): string {
  const reasonMap: Record<string, string> = {
    'buying-home': 'Buying a Home / First-Time Buyer',
    'refinancing': 'Refinancing / Lower Payments',
    'renewal': 'Mortgage Renewal',
    'home-equity': 'Home Equity / Debt Consolidation',
    'investment-property': 'Investment / Rental Property',
    'special-circumstances': 'Self-Employed / Credit Challenges',
    'commercial-purchase': 'Commercial Property Purchase',
    'commercial-refinance': 'Commercial Refinance',
    'multi-unit': 'Multi-Unit / Apartment Building',
    'mixed-use': 'Mixed-Use Property',
    'construction-financing': 'Construction / Development Financing',
    'commercial-renewal': 'Commercial Renewal or Switch',
    'general-question': 'General Question',
  };
  return reasonMap[value] || value;
}

/**
 * Get client IP address from request
 */
function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (typeof forwarded === 'object' && forwarded) {
    return forwarded[0]?.split(',')[0].trim() || 'unknown';
  }
  return req.headers['x-real-ip'] as string || 'unknown';
}

/**
 * Set CORS headers
 */
function setCORSHeaders(res: VercelResponse, origin?: string): void {
  // In production, only allow requests from the actual domain
  const allowedOrigins = [
    'https://jbloans.ca',
    'https://www.jbloans.ca',
  ];

  // In development, allow localhost
  if (process.env.NODE_ENV === 'development' || !origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCORSHeaders(res, req.headers.origin);
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    setCORSHeaders(res, req.headers.origin);
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  // Set CORS headers
  setCORSHeaders(res, req.headers.origin);

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  }

  // Check for API key
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error',
    });
  }

  try {
    // Validate request body
    const { name, email, phone, reason, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and phone are required',
      });
    }

    // Sanitize inputs
    const sanitizedReason = reason && String(reason).trim() ? sanitizeInput(String(reason).trim()) : undefined;
    const sanitizedMessage = message && String(message).trim() ? sanitizeInput(String(message).trim()) : undefined;
    
    const sanitizedData = {
      name: sanitizeInput(String(name)),
      email: sanitizeInput(String(email)),
      phone: sanitizeInput(String(phone)),
      reason: sanitizedReason,
      message: sanitizedMessage,
    };

    // Debug: Log reason field (remove in production if needed)
    if (process.env.NODE_ENV === 'development') {
      console.log('Reason field received:', reason, 'Sanitized:', sanitizedReason);
    }

    // Validate email format
    if (!isValidEmail(sanitizedData.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    // Validate required fields are not empty after sanitization
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.phone) {
      return res.status(400).json({
        success: false,
        error: 'Required fields cannot be empty',
      });
    }

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <contact@jbloans.ca>',
        to: ['jirosh.balaganesan@calibermortgage.ca'],
        replyTo: sanitizedData.email,
        subject: `New Contact Form Submission${sanitizedData.reason && sanitizedData.reason.trim() ? ` - ${getReasonLabel(sanitizedData.reason)}` : ''} from ${sanitizedData.name}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa; color: #1e3a5f;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 30px -6px rgba(30, 58, 95, 0.18); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2a4d6f 50%, #3a5d7f 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf0;">
                          <strong style="color: #1e3a5f; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Name</strong>
                          <span style="color: #2a4d6f; font-size: 16px;">${sanitizedData.name}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf0;">
                          <strong style="color: #1e3a5f; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Email</strong>
                          <a href="mailto:${sanitizedData.email}" style="color: #0073e6; font-size: 16px; text-decoration: none;">${sanitizedData.email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf0;">
                          <strong style="color: #1e3a5f; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Phone</strong>
                          <a href="tel:${sanitizedData.phone.replace(/[^0-9+]/g, '')}" style="color: #2a4d6f; font-size: 16px; text-decoration: none;">${sanitizedData.phone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                ${sanitizedData.reason ? `
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf0;">
                          <strong style="color: #1e3a5f; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Reason for Contacting</strong>
                          <span style="color: #2a4d6f; font-size: 16px;">${getReasonLabel(sanitizedData.reason)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                
                ${sanitizedData.message ? `
                <tr>
                  <td style="padding-top: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 16px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #0073e6;">
                          <strong style="color: #1e3a5f; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">Message</strong>
                          <p style="margin: 0; color: #2a4d6f; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message.replace(/\n/g, '\n')}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e8ecf0; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5;">
                Sent from <a href="https://jbloans.ca" style="color: #0073e6; text-decoration: none; font-weight: 500;">jbloans.ca</a> contact form
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
        text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}
${sanitizedData.reason && sanitizedData.reason.trim() ? `Reason for Contacting: ${getReasonLabel(sanitizedData.reason)}` : ''}
${sanitizedData.message ? `Message:\n${sanitizedData.message}` : ''}

---
Sent from jbloans.ca contact form
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      
      // Don't expose internal error details to client
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.',
      });
    }

    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      id: data.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal error details to client
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    });
  }
}
