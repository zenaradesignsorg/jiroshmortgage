import { useScrollAnimation } from "@/hooks/use-scroll-animation";

// Feature Icons - Custom professional SVG icons
const LicensedIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 11v4M10 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LocalIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const FlexibleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ProcessIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12h16M4 6h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="2" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="2" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="2" cy="18" r="1.5" fill="currentColor"/>
  </svg>
);

// Social Media Icons
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const About = () => {
  const headingAnim = useScrollAnimation({ type: "fade-up", delay: 0 });
  const textAnim = useScrollAnimation({ type: "fade-up", delay: 100 });
  const socialAnim = useScrollAnimation({ type: "fade-in", delay: 200 });

  const features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }> = [
    {
      icon: LicensedIcon,
      title: "Licensed Agent",
      description: "Mortgage Agent Level 1, Licence #M25000070",
    },
    {
      icon: LocalIcon,
      title: "Local Expertise",
      description: "Serving Scarborough, Markham, and the GTA",
    },
    {
      icon: FlexibleIcon,
      title: "Flexible Hours",
      description: "Available evenings and weekends",
    },
    {
      icon: ProcessIcon,
      title: "Clear Process",
      description: "Focus on proper pre-approvals and smooth closings",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <h2 ref={headingAnim.ref} className={`text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${headingAnim.className}`} style={headingAnim.style}>
            About Me
          </h2>
          <p ref={textAnim.ref} className={`text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-4 sm:px-0 ${textAnim.className}`} style={textAnim.style}>
            I'm a licensed mortgage agent in Ontario dedicated to making your home buying journey 
            as smooth as possible. Whether you're a first-time buyer or looking to refinance, 
            I provide personalized guidance every step of the way.
          </p>
          {/* Social Media Links */}
          <div ref={socialAnim.ref} className={`flex items-center justify-center gap-3 sm:gap-4 ${socialAnim.className}`} style={socialAnim.style}>
            <a 
              href="https://www.instagram.com/jb.loans?igsh=MXd2d3AwNjNwYWFjNQ%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              aria-label="Follow on Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.tiktok.com/@jbloans" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              aria-label="Follow on TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://share.google/qkSXUnB0jXQyhR5EU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              aria-label="View Google Business Profile"
            >
              <GoogleIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            // Create animation hook outside of map
            return <FeatureCard key={feature.title} feature={feature} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  feature, 
  index 
}: { 
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }; 
  index: number;
}) => {
  const cardAnim = useScrollAnimation({ type: "fade-up", delay: index * 150 });
  
  return (
    <div
      ref={cardAnim.ref}
      className={`group relative bg-card rounded-xl p-5 sm:p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/30 overflow-hidden ${cardAnim.className}`}
      style={cardAnim.style}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 rounded-xl pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth="2" />
        </div>
        <h3 className="font-semibold text-foreground mb-2 text-base sm:text-lg group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2 translate-x-1/2" />
    </div>
  );
};

export default About;
