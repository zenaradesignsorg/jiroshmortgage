import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import caliberLogo from "@/assets/transparent-caliber-mortgage-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "What to Expect" },
    { href: "#calculator", label: "Calculator" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2" aria-label="Caliber Mortgage Inc - Home">
          <img 
            src={caliberLogo} 
            alt="Caliber Mortgage Inc" 
            className="h-8 sm:h-10 md:h-12 w-auto"
            loading="eager"
            fetchPriority="high"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phone - Icon only on mobile, full on larger screens */}
          <a 
            href="tel:4166706209" 
            className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            aria-label="Call (416) 670-6209"
          >
            <Phone className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">(416) 670-6209</span>
          </a>
          <Button asChild className="hidden md:inline-flex">
            <a href="#contact">Book a Call</a>
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2.5 text-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 xl:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Menu */}
          <nav className="xl:hidden bg-card border-t border-border z-50 relative animate-fade-in">
            <div className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-2 text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 w-full">
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>Book a Call</a>
              </Button>
            </div>
          </nav>
        </>
      )}
      </header>
    </>
  );
};

export default Header;
