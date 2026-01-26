import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "What to Expect" },
    { href: "#calculator", label: "Calculator" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">C</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-primary text-sm leading-tight">CALIBER</p>
            <p className="text-[10px] text-muted-foreground tracking-wider">MORTGAGE INC</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
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
            className="md:hidden p-2.5 text-foreground hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Menu */}
          <nav className="md:hidden bg-card border-t border-border z-50 relative animate-fade-in">
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
  );
};

export default Header;
