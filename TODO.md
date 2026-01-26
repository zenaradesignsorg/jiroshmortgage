# Setup TODO - Google Services & Resend Integration

This document outlines the steps needed to complete the setup of Google Search Console, Google Analytics 4, and Resend email service.

## Prerequisites

- Access to Google account
- Access to Resend account (sign up at https://resend.com)
- Domain ownership verification (for production)

---

## 1. Google Search Console Setup

### Step 1: Create Google Search Console Account
1. Go to https://search.google.com/search-console
2. Sign in with your Google account
3. Click "Add Property" and select "URL prefix"
4. Enter your website URL (e.g., `https://jiroshmortgage.com`)

### Step 2: Verify Website Ownership
1. Choose "HTML tag" verification method
2. Copy the `content` value from the meta tag (e.g., `abc123def456...`)
3. Add this value to your `.env` file:
   ```
   VITE_GOOGLE_SITE_VERIFICATION=abc123def456...
   ```
4. Deploy your website with the updated environment variable
5. Click "Verify" in Google Search Console

### Step 3: Submit Sitemap (Optional but Recommended)
1. After verification, go to "Sitemaps" in the left menu
2. Submit your sitemap URL (e.g., `https://jiroshmortgage.com/sitemap.xml`)
3. Note: You may need to generate a sitemap first

### Verification Checklist
- [ ] Google Search Console account created
- [ ] Website property added
- [ ] Verification code added to `.env` file
- [ ] Website deployed with verification meta tag
- [ ] Ownership verified in Google Search Console
- [ ] Sitemap submitted (if applicable)

---

## 2. Google Analytics 4 Setup

### Step 1: Create GA4 Property
1. Go to https://analytics.google.com
2. Sign in with your Google account
3. Click "Admin" (gear icon) in the bottom left
4. In the "Property" column, click "Create Property"
5. Enter property name (e.g., "Jirosh Mortgage Website")
6. Select reporting time zone and currency
7. Click "Next" and complete the business information
8. Click "Create"

### Step 2: Get Measurement ID
1. In your new GA4 property, go to "Admin" > "Data Streams"
2. Click "Add stream" > "Web"
3. Enter your website URL and stream name
4. Click "Create stream"
5. Copy the "Measurement ID" (format: `G-XXXXXXXXXX`)

### Step 3: Configure Environment Variable
1. Add the measurement ID to your `.env` file:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Step 4: Configure Privacy Settings (Important)
1. In GA4, go to "Admin" > "Data Settings" > "Data Collection"
2. Enable "Anonymize IP addresses" (already configured in code)
3. Go to "Admin" > "Data Settings" > "Data Retention"
4. Set retention period as needed (default: 14 months)
5. Go to "Admin" > "Data Settings" > "Data Sharing Settings"
6. Disable data sharing with Google products (privacy best practice)

### Step 5: Test Analytics
1. Deploy your website with the measurement ID
2. Visit your website and interact with it
3. In GA4, go to "Reports" > "Realtime"
4. You should see your visit appear within a few seconds

### Verification Checklist
- [ ] GA4 property created
- [ ] Web data stream created
- [ ] Measurement ID copied
- [ ] Measurement ID added to `.env` file
- [ ] Privacy settings configured
- [ ] Analytics tested and working
- [ ] Real-time reports showing data

---

## 3. Resend Email Service Setup

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Generate API Key
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Give it a name (e.g., "Website Contact Form")
4. Select permissions (at minimum: "Send emails")
5. Copy the API key (starts with `re_`)

### Step 3: Verify Domain (Production)
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `jiroshmortgage.com`)
4. Add the DNS records provided by Resend to your domain
5. Wait for verification (can take up to 48 hours)

### Step 4: Configure Environment Variable
1. For development/testing, add to `.env`:
   ```
   VITE_RESEND_API_KEY=re_your_api_key_here
   ```
2. **Important**: For production, use a server-side API route instead of exposing the API key in client-side code

### Step 5: Update Email Configuration
1. Open `src/lib/resend.ts`
2. Update the `from` email address with your verified domain:
   ```typescript
   from: 'Contact Form <contact@yourdomain.com>',
   ```
3. Update the `to` email address with the recipient:
   ```typescript
   to: ['jirosh.balaganesan@calibermortgage.ca'],
   ```

### Step 6: Test Email Sending
1. Deploy your website with the API key
2. Submit the contact form
3. Check the recipient email inbox
4. Check Resend dashboard for delivery status

### Production Security Note
**⚠️ IMPORTANT**: The current implementation uses the Resend API key in client-side code, which exposes it in the browser. For production:

1. Create a server-side API route (e.g., `/api/contact`)
2. Move the Resend API call to the server
3. Use `VITE_API_URL` environment variable to point to your API
4. Never expose the Resend API key in client-side code

### Verification Checklist
- [ ] Resend account created
- [ ] API key generated
- [ ] API key added to `.env` file (development only)
- [ ] Domain verified (for production)
- [ ] Email addresses updated in code
- [ ] Test email sent successfully
- [ ] Server-side API route created (for production)

---

## 4. Environment Variables Configuration

### Development Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in all the values:
   ```env
   VITE_GOOGLE_SITE_VERIFICATION=your_verification_code
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_RESEND_API_KEY=re_your_api_key_here
   ```

### Production Setup
1. Add environment variables to your hosting platform:
   - **Vercel**: Project Settings > Environment Variables
   - **Netlify**: Site Settings > Environment Variables
   - **Other platforms**: Check their documentation

2. For production, consider:
   - Using server-side API for Resend (recommended)
   - Setting `VITE_API_URL` if using server-side Resend
   - Not exposing `VITE_RESEND_API_KEY` in production build

### Verification Checklist
- [ ] `.env` file created from `.env.example`
- [ ] All environment variables filled in
- [ ] Production environment variables configured
- [ ] `.env` file added to `.gitignore` (already done)
- [ ] Environment variables tested in development
- [ ] Environment variables tested in production

---

## 5. Testing & Verification

### Test Google Search Console
- [ ] Verification meta tag appears in page source
- [ ] Website verified in Google Search Console
- [ ] Sitemap submitted and processed

### Test Google Analytics
- [ ] Analytics script loads (check Network tab)
- [ ] Page views tracked (check GA4 Realtime reports)
- [ ] Form submissions tracked (check Events in GA4)
- [ ] No console errors related to analytics

### Test Resend Integration
- [ ] Form submission works
- [ ] Email received at recipient address
- [ ] Email formatting looks correct
- [ ] Error handling works (test with invalid API key)
- [ ] Retry logic works (test with network failure)

### Performance Testing
- [ ] Analytics doesn't block initial page load
- [ ] Analytics loads after page is interactive
- [ ] Form submission is debounced (no duplicate submissions)
- [ ] No performance regressions

### Security Testing
- [ ] API keys not exposed in client-side code (production)
- [ ] CSP headers allow necessary domains
- [ ] Form inputs are sanitized
- [ ] No XSS vulnerabilities

---

## 6. Production Deployment Checklist

Before going live:

- [ ] All environment variables configured in production
- [ ] Google Search Console verified
- [ ] Google Analytics tracking working
- [ ] Resend domain verified (if using custom domain)
- [ ] Server-side API route created for Resend (recommended)
- [ ] CSP headers configured on server (if using server headers)
- [ ] All services tested in production environment
- [ ] Error monitoring set up
- [ ] Analytics consent banner implemented (if required by law)
- [ ] Privacy policy updated with analytics information

---

## Troubleshooting

### Google Search Console
- **Verification fails**: Check that meta tag is in `<head>` and matches exactly
- **No data**: Wait 24-48 hours after verification for data to appear

### Google Analytics
- **No data in reports**: Check browser console for errors, verify measurement ID
- **Script not loading**: Check CSP headers allow `googletagmanager.com`
- **Events not tracking**: Verify `trackEvent` calls are being made

### Resend
- **API key invalid**: Regenerate API key in Resend dashboard
- **Emails not sending**: Check Resend dashboard for error messages
- **Domain not verified**: Complete DNS verification in Resend dashboard
- **Rate limit errors**: Implement rate limiting or upgrade Resend plan

---

## Additional Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Resend Documentation](https://resend.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## Notes

- All environment variables must be prefixed with `VITE_` to be accessible in client-side code
- For production, consider implementing a consent banner for analytics (GDPR/CCPA compliance)
- Resend free tier includes 3,000 emails/month - upgrade if needed
- Google Analytics data may take 24-48 hours to appear in standard reports (Realtime works immediately)
