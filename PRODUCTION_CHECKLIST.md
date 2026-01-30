# Production Deployment Checklist

This checklist ensures the website is ready for production deployment.

## Pre-Deployment

### Environment Variables
- [ ] Set `VITE_SITE_URL` to production domain (e.g., `https://jiroshmortgage.com`)
- [ ] Set `VITE_GOOGLE_SITE_VERIFICATION` (when ready to set up Google Search Console)
- [ ] Set `VITE_GA_MEASUREMENT_ID` (when ready to set up Google Analytics)
- [ ] Set `VITE_RESEND_API_KEY` (when ready to set up Resend)
- [ ] Verify all environment variables are set in hosting platform

### Build Verification
- [ ] Run `npm run build` successfully
- [ ] Verify no build errors or warnings
- [ ] Check bundle sizes are reasonable
- [ ] Verify all assets are included in `dist/` folder
- [ ] Test production build locally: `npm run preview`

### SEO Verification
- [ ] Verify `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Verify `robots.txt` references sitemap correctly
- [ ] Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test Open Graph tags with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify canonical URLs are correct
- [ ] Check all meta tags are present in production build

### Performance
- [ ] Run Lighthouse audit (target: 90+ for all categories)
- [ ] Verify code splitting is working (check Network tab)
- [ ] Verify images are optimized (check file sizes)
- [ ] Test on slow 3G connection
- [ ] Verify lazy loading is working

### Functionality Testing
- [ ] Test contact form submission
- [ ] Test mortgage calculator
- [ ] Test all navigation links
- [ ] Test mobile menu
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test error boundary (intentionally trigger an error)

### Accessibility
- [ ] Test skip-to-content link (Tab key on page load)
- [ ] Verify all images have alt text
- [ ] Test keyboard navigation
- [ ] Run accessibility audit (Lighthouse)
- [ ] Test with screen reader (basic check)

### Security
- [ ] Verify HTTPS is enabled
- [ ] Check security headers are present:
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] X-XSS-Protection: 1; mode=block
  - [ ] Referrer-Policy: strict-origin-when-cross-origin
  - [ ] Content-Security-Policy (verify it's not blocking legitimate resources)
- [ ] Verify no sensitive data in client-side code
- [ ] Check API keys are not exposed (use environment variables)

## Deployment

### Hosting Platform Setup
- [ ] Configure custom domain
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure redirects (HTTP → HTTPS, www → non-www or vice versa)
- [ ] Set environment variables in hosting platform
- [ ] Configure build command: `npm run build`
- [ ] Configure output directory: `dist`
- [ ] Set up custom 404 page (if hosting platform supports)

### Server Configuration
- [ ] Enable gzip/brotli compression
- [ ] Configure cache headers:
  - Static assets: long cache (1 year)
  - HTML: short cache or no cache
- [ ] Set up CDN (if applicable)
- [ ] Configure security headers (if not using meta tags)

### Post-Deployment

### Verification
- [ ] Visit production URL and verify site loads
- [ ] Check all pages load correctly
- [ ] Verify no console errors
- [ ] Test contact form in production
- [ ] Verify analytics tracking (if configured)
- [ ] Check sitemap.xml is accessible
- [ ] Verify robots.txt is accessible

### Search Engine Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify site in Google Search Console
- [ ] Request indexing for homepage

### Monitoring Setup
- [ ] Set up uptime monitoring
- [ ] Configure error tracking (e.g., Sentry - future)
- [ ] Set up performance monitoring
- [ ] Configure Google Analytics (if ready)
- [ ] Set up email alerts for critical errors

### Documentation
- [ ] Document deployment process
- [ ] Document rollback procedure
- [ ] Document environment variables
- [ ] Update README with production URL

## Performance Targets

- **Lighthouse SEO Score**: 95+
- **Lighthouse Performance Score**: 90+
- **Lighthouse Accessibility Score**: 95+
- **Lighthouse Best Practices Score**: 95+
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1

## Common Issues & Solutions

### Issue: Sitemap not accessible
**Solution**: Ensure `sitemap.xml` is in `public/` folder and hosting platform serves it correctly

### Issue: Open Graph image not showing
**Solution**: 
- Verify image URL is absolute (starts with https://)
- Check image dimensions (recommended: 1200x630px)
- Verify image is accessible publicly

### Issue: Structured data not validating
**Solution**: 
- Use Google Rich Results Test to identify issues
- Verify JSON-LD is valid JSON
- Check that required fields are present

### Issue: Build fails
**Solution**: 
- Check for TypeScript errors: `npm run build`
- Verify all imports are correct
- Check for missing dependencies

### Issue: Environment variables not working
**Solution**: 
- Ensure variables are prefixed with `VITE_`
- Verify variables are set in hosting platform
- Rebuild after setting variables

## Notes

- **OG Image**: Currently using hero image. Consider creating a dedicated 1200x630px image for better social sharing.
- **Canonical URLs**: Update `VITE_SITE_URL` environment variable with actual production domain.
- **Error Tracking**: Error boundary is in place. Consider integrating Sentry or similar service for production error tracking.
- **Analytics**: Google Analytics integration is ready but requires `VITE_GA_MEASUREMENT_ID` to be set.
- **Resend**: Email integration is ready but requires `VITE_RESEND_API_KEY` to be set (or server-side API route).

## Support Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
