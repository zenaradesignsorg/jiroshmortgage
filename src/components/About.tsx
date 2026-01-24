import { Award, Clock, MapPin, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Licensed Agent",
      description: "Mortgage Agent Level 1, Licence #M25000070",
    },
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "Serving Scarborough, Markham, and the GTA",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Available evenings and weekends",
    },
    {
      icon: Shield,
      title: "Clear Process",
      description: "Focus on proper pre-approvals and smooth closings",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground">
            I'm a licensed mortgage agent in Ontario dedicated to making your home buying journey 
            as smooth as possible. Whether you're a first-time buyer or looking to refinance, 
            I provide personalized guidance every step of the way.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
