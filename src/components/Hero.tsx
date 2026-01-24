import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import jiroshPortrait from "@/assets/jirosh-portrait.jpg";

const Hero = () => {
  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)" , backgroundSize: "50px 50px" }} />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-20 lg:py-28">
          {/* Content */}
          <div className="text-primary-foreground order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-6 animate-fade-in">
              <MapPin className="w-4 h-4" />
              Serving Scarborough, Markham & the GTA
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Mortgage Help for
              <span className="block text-accent">Ontario Buyers</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Clear, honest, and reliable guidance from pre-approval to closing. 
              Available evenings and weekends when you need me.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                asChild
              >
                <a href="#contact">
                  Book a Free Call
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href="#calculator">Try the Calculator</a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-medium border-4 border-white/20">
                <img 
                  src={jiroshPortrait} 
                  alt="Jirosh Balaganesan - Mortgage Agent"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-medium animate-scale-in" style={{ animationDelay: "0.5s" }}>
                <p className="font-bold text-primary">Jirosh Balaganesan</p>
                <p className="text-sm text-muted-foreground">Licensed Mortgage Agent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
