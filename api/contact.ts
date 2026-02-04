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
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and phone are required',
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(String(name)),
      email: sanitizeInput(String(email)),
      phone: sanitizeInput(String(phone)),
      message: message ? sanitizeInput(String(message)) : undefined,
    };

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
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
          ${sanitizedData.message ? `<p><strong>Message:</strong><br>${sanitizedData.message.replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><small>Sent from jbloans.ca contact form</small></p>
        `,
        text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}
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
