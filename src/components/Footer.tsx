import { Phone, Mail, MapPin } from "lucide-react";

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

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 sm:py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-lg">C</span>
              </div>
              <div>
                <p className="font-bold text-sm">CALIBER</p>
                <p className="text-xs text-primary-foreground/70">MORTGAGE INC</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-primary-foreground/80 max-w-xs mb-3 sm:mb-4">
              More than just a mortgage. Helping Ontario buyers navigate their 
              home buying journey with clarity and confidence.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a 
                href="https://www.instagram.com/jb.loans?igsh=MXd2d3AwNjNwYWFjNQ%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@jbloans" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://share.google/qkSXUnB0jXQyhR5EU" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Google Business"
              >
                <GoogleIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <a href="tel:4166706209" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors min-h-[44px]">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">(416) 670-6209</span>
              </a>
              <a href="mailto:jirosh.balaganesan@calibermortgage.ca" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors min-h-[44px]">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">jirosh.balaganesan@calibermortgage.ca</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Unit+8,+175+West+Beaver+Creek+Rd,+Richmond+Hill,+ON+L4B+3M1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors min-h-[44px]"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Unit 8, 175 West Beaver Creek Rd<br />Richmond Hill, ON L4B 3M1</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <a href="#about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 min-h-[32px] flex items-center">About</a>
              <a href="#services" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 min-h-[32px] flex items-center">What to Expect</a>
              <a href="#calculator" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 min-h-[32px] flex items-center">Calculator</a>
              <a href="#contact" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 min-h-[32px] flex items-center">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-3 sm:gap-4 text-xs sm:text-sm text-primary-foreground/70 text-center md:text-left">
            <div className="space-y-1">
              <p>Jirosh Balaganesan | Mortgage Agent Level 1</p>
              <p>Licence #M25000070</p>
            </div>
            <div className="space-y-1 md:text-right">
              <p>Caliber Mortgage Inc, Brokerage</p>
              <p>Independently Owned & Operated under FSRA#13368</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-6">
            <p className="text-center text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Jirosh Balaganesan. All rights reserved.
            </p>
            <p className="text-center text-xs text-primary-foreground/50">
              Designed by{" "}
              <a 
                href="https://zenaradesigns.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors underline"
              >
                Zenara Designs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
