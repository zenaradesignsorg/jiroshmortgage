import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    // Update document title for 404 page
    document.title = '404 - Page Not Found | Jirosh Balaganesan - Mortgage Agent';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Page not found. Return to the homepage to learn about mortgage services in Scarborough, Markham, and the GTA.');
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const siteUrl = import.meta.env.VITE_SITE_URL || 'https://jiroshmortgage.com';
      canonical.setAttribute('href', `${siteUrl}/404`);
    }

    // Update robots meta tag for 404
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute('content', 'noindex, follow');
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <main className="text-center px-4">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-6 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <nav aria-label="404 navigation">
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            aria-label="Return to homepage"
          >
            Return to Home
          </a>
        </nav>
        <div className="mt-8 text-sm text-muted-foreground">
          <p className="mb-2">Or visit:</p>
          <ul className="space-y-1">
            <li><a href="/#about" className="text-primary hover:underline">About</a></li>
            <li><a href="/#services" className="text-primary hover:underline">What to Expect</a></li>
            <li><a href="/#calculator" className="text-primary hover:underline">Calculator</a></li>
            <li><a href="/#contact" className="text-primary hover:underline">Contact</a></li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
