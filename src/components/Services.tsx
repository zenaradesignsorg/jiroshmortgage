import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Services = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger staggered animations
            const items = section.querySelectorAll('[data-checklist-item]');
            items.forEach((item, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => new Set(prev).add(index));
              }, index * 100);
            });
          } else {
            // Reset when leaving viewport
            setVisibleItems(new Set());
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const expectations = [
    {
      title: "Fast Responses",
      description: "Quick replies to your questions and concerns",
    },
    {
      title: "Honest Advice",
      description: "Transparent guidance without hidden agendas",
    },
    {
      title: "Proper Pre-Qualification",
      description: "Know exactly what you can afford before house hunting",
    },
    {
      title: "Clear Next Steps",
      description: "Always know what's happening and what comes next",
    },
    {
      title: "Start to Closing Support",
      description: "With you from the first call to getting your keys",
    },
  ];

  const headingAnim = useScrollAnimation({ type: "fade-up", delay: 0 });
  const textAnim = useScrollAnimation({ type: "fade-up", delay: 100 });
  const ctaAnim = useScrollAnimation({ type: "fade-up", delay: 0 });
  const serviceAreasAnim = useScrollAnimation({ type: "fade-up", delay: 150 });

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 lg:items-center">
          <div ref={sectionRef}>
            <h2 ref={headingAnim.ref} className={`text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 ${headingAnim.className}`} style={headingAnim.style}>
              What Clients Can Expect
            </h2>
            <p ref={textAnim.ref} className={`text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 ${textAnim.className}`} style={textAnim.style}>
              I believe in making the mortgage process simple and stress-free. 
              Here's my commitment to every client I work with.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              {expectations.map((item, index) => {
                const isVisible = visibleItems.has(index);
                return (
                <div 
                  key={item.title}
                  data-checklist-item
                  className={`flex gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-lg shadow-soft border border-border transition-all duration-500 ease-out ${
                    isVisible 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-8"
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center min-w-[32px]">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 mt-8 lg:mt-0">
            {/* Ready to get started */}
            <div ref={ctaAnim.ref} className={`relative ${ctaAnim.className}`} style={ctaAnim.style}>
              <div className="bg-hero-gradient rounded-2xl p-6 sm:p-8 md:p-10 text-primary-foreground">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to get started?</h3>
                <p className="text-primary-foreground/85 mb-5 sm:mb-6 text-sm sm:text-base">
                  Book a free, no-obligation call to discuss your mortgage needs. 
                  I'll help you understand your options and create a plan that works for you.
                </p>
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors w-full sm:w-auto min-h-[44px]"
                >
                  Book Your Free Call
                </a>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-2 -right-2 sm:-top-4 sm:-right-4 w-full h-full bg-accent/20 rounded-2xl" />
            </div>

            {/* Service Areas */}
            <div ref={serviceAreasAnim.ref} className={`bg-card rounded-xl p-5 sm:p-6 border border-border shadow-soft ${serviceAreasAnim.className}`} style={serviceAreasAnim.style}>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">Service Areas</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Serving clients throughout the Greater Toronto Area
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  "Toronto", "Scarborough", "Markham", "Richmond Hill", "Vaughan",
                  "Mississauga", "Brampton", "North York", "Etobicoke", "Ajax"
                ].map((city) => (
                  <span
                    key={city}
                    className="px-2.5 py-1 text-xs bg-muted text-foreground rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
