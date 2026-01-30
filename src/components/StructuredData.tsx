import { useEffect } from 'react';

/**
 * Structured Data Component
 * Injects JSON-LD structured data for SEO
 * Implements Person, LocalBusiness, and WebSite schemas
 */
const StructuredData = () => {
  useEffect(() => {
    // Use environment variable for production URL, fallback to default
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://jiroshmortgage.com';
    
    // Person Schema - Jirosh Balaganesan
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jirosh Balaganesan',
      jobTitle: 'Mortgage Agent Level 1',
      description: 'Licensed mortgage agent in Ontario dedicated to making your home buying journey as smooth as possible.',
      email: 'jirosh.balaganesan@calibermortgage.ca',
      telephone: '+1-416-670-6209',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Unit 8, 175 West Beaver Creek Rd',
        addressLocality: 'Richmond Hill',
        addressRegion: 'ON',
        postalCode: 'L4B 3M1',
        addressCountry: 'CA',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Caliber Mortgage Inc',
        url: siteUrl,
      },
      sameAs: [
        'https://www.instagram.com/jb.loans',
        'https://www.tiktok.com/@jbloans',
        'https://share.google/qkSXUnB0jXQyhR5EU',
      ],
      url: siteUrl,
    };

    // LocalBusiness Schema - Caliber Mortgage Inc
    const businessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Caliber Mortgage Inc',
      description: 'More than just a mortgage. Helping Ontario buyers navigate their home buying journey with clarity and confidence.',
      url: siteUrl,
      telephone: '+1-416-670-6209',
      email: 'jirosh.balaganesan@calibermortgage.ca',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Unit 8, 175 West Beaver Creek Rd',
        addressLocality: 'Richmond Hill',
        addressRegion: 'ON',
        postalCode: 'L4B 3M1',
        addressCountry: 'CA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '43.8828',
        longitude: '-79.4403',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Toronto',
        },
        {
          '@type': 'City',
          name: 'Scarborough',
        },
        {
          '@type': 'City',
          name: 'Markham',
        },
        {
          '@type': 'City',
          name: 'Richmond Hill',
        },
        {
          '@type': 'City',
          name: 'Vaughan',
        },
        {
          '@type': 'City',
          name: 'Mississauga',
        },
        {
          '@type': 'City',
          name: 'Brampton',
        },
        {
          '@type': 'City',
          name: 'North York',
        },
        {
          '@type': 'City',
          name: 'Etobicoke',
        },
        {
          '@type': 'City',
          name: 'Ajax',
        },
      ],
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    };

    // WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Jirosh Balaganesan - Mortgage Agent',
      url: siteUrl,
      description: 'Licensed mortgage agent serving Scarborough, Markham, and the GTA. Get personalized mortgage guidance from pre-approval to closing.',
      publisher: {
        '@type': 'Organization',
        name: 'Caliber Mortgage Inc',
      },
    };

    // Inject all schemas into document head
    const schemas = [personSchema, businessSchema, websiteSchema];
    
    schemas.forEach((schema, index) => {
      // Check if script already exists
      const existingScript = document.querySelector(`script[data-structured-data="${index}"]`);
      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-structured-data', index.toString());
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      schemas.forEach((_, index) => {
        const script = document.querySelector(`script[data-structured-data="${index}"]`);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
};

export default StructuredData;
