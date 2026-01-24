import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="font-bold text-lg">C</span>
              </div>
              <div>
                <p className="font-bold text-sm">CALIBER</p>
                <p className="text-xs text-primary-foreground/70">MORTGAGE INC</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              More than just a mortgage. Helping Ontario buyers navigate their 
              home buying journey with clarity and confidence.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:4166706209" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                (416) 670-6209
              </a>
              <a href="mailto:jirosh.balaganesan@calibermortgage.ca" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" />
                jirosh.balaganesan@calibermortgage.ca
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Unit 8, 175 West Beaver Creek Rd<br />Richmond Hill, ON L4B 3M1</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">About</a>
              <a href="#services" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">What to Expect</a>
              <a href="#calculator" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">Calculator</a>
              <a href="#contact" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <div>
              <p>Jirosh Balaganesan | Mortgage Agent Level 1</p>
              <p>Licence #M25000070</p>
            </div>
            <div className="text-center md:text-right">
              <p>Caliber Mortgage Inc, Brokerage</p>
              <p>Independently Owned & Operated under FSRA#13368</p>
            </div>
          </div>
          <p className="text-center text-xs text-primary-foreground/50 mt-6">
            © {new Date().getFullYear()} Jirosh Balaganesan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
