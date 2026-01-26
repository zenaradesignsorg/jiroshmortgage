import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import jiroshPortrait from "@/assets/jirosh-portrait.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Hero = () => {
  const badgeAnim = useScrollAnimation({ type: "fade-up", delay: 0 });
  const headingAnim = useScrollAnimation({ type: "fade-up", delay: 100 });
  const textAnim = useScrollAnimation({ type: "fade-up", delay: 200 });
  const buttonsAnim = useScrollAnimation({ type: "fade-up", delay: 300 });
  const imageAnim = useScrollAnimation({ type: "fade-right", delay: 0 });
  const cardAnim = useScrollAnimation({ type: "fade-in", delay: 500 });

  return (
    <section className="relative pt-16 sm:pt-20 md:pt-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)" , backgroundSize: "50px 50px" }} />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center py-8 sm:py-12 md:py-20 lg:py-28">
          {/* Content */}
          <div className="text-primary-foreground order-2 lg:order-1 text-center lg:text-left">
            <div ref={badgeAnim.ref} className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm text-xs sm:text-sm mb-4 sm:mb-6 ${badgeAnim.className}`} style={badgeAnim.style}>
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Serving Scarborough, Markham & the GTA</span>
            </div>
            
            <h1 ref={headingAnim.ref} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 ${headingAnim.className}`} style={headingAnim.style}>
              Mortgage Help for
              <span className="block text-accent">Ontario Buyers</span>
            </h1>
            
            <p ref={textAnim.ref} className={`text-base sm:text-lg md:text-xl text-primary-foreground/85 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 ${textAnim.className}`} style={textAnim.style}>
              Clear, honest, and reliable guidance from pre-approval to closing. 
              Available evenings and weekends when you need me.
            </p>
            
            <div ref={buttonsAnim.ref} className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start ${buttonsAnim.className}`} style={buttonsAnim.style}>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold w-full sm:w-auto"
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
                className="border-white/30 text-white hover:bg-white/10 bg-transparent w-full sm:w-auto"
                asChild
              >
                <a href="#calculator">Try the Calculator</a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageAnim.ref} className={`order-1 lg:order-2 flex justify-center lg:justify-end ${imageAnim.className}`} style={imageAnim.style}>
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-4 bg-white/10 rounded-3xl blur-2xl" />
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-medium border-4 border-white/20">
                <img 
                  src={jiroshPortrait} 
                  alt="Jirosh Balaganesan - Mortgage Agent"
                  className="w-full h-full object-cover"
                  loading="eager"
                  width={384}
                  height={384}
                  fetchPriority="high"
                />
              </div>
              <div ref={cardAnim.ref} className={`absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-card rounded-xl p-3 sm:p-4 shadow-medium ${cardAnim.className}`} style={cardAnim.style}>
                <p className="font-bold text-primary text-sm sm:text-base">Jirosh Balaganesan</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Licensed Mortgage Agent</p>
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
