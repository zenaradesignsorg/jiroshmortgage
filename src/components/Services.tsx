import { Check } from "lucide-react";

const Services = () => {
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

  return (
    <section id="services" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Clients Can Expect
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I believe in making the mortgage process simple and stress-free. 
              Here's my commitment to every client I work with.
            </p>
            
            <div className="space-y-4">
              {expectations.map((item, index) => (
                <div 
                  key={item.title}
                  className="flex gap-4 p-4 bg-card rounded-lg shadow-soft border border-border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-hero-gradient rounded-2xl p-8 md:p-10 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-primary-foreground/85 mb-6">
                Book a free, no-obligation call to discuss your mortgage needs. 
                I'll help you understand your options and create a plan that works for you.
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                Book Your Free Call
              </a>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-accent/20 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
