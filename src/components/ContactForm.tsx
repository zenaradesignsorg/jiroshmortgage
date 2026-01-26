import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "(416) 670-6209",
      href: "tel:4166706209",
    },
    {
      icon: Mail,
      label: "Email",
      value: "jirosh.balaganesan@calibermortgage.ca",
      href: "mailto:jirosh.balaganesan@calibermortgage.ca",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "Unit 8, 175 West Beaver Creek Rd, Richmond Hill, ON L4B 3M1",
      href: "https://www.google.com/maps/search/?api=1&query=Unit+8,+175+West+Beaver+Creek+Rd,+Richmond+Hill,+ON+L4B+3M1",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Book a Free Mortgage Call
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            Ready to start your home buying journey? Send me a message and I'll 
            get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <div className="bg-hero-gradient rounded-2xl p-5 sm:p-6 md:p-8 text-primary-foreground overflow-hidden">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Get in Touch</h3>
                <div className="space-y-4 sm:space-y-5">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "Office" ? "_blank" : undefined}
                      rel={item.label === "Office" ? "noopener noreferrer" : undefined}
                      className={`flex items-start group min-h-[44px] ${item.label === "Email" ? "gap-2 sm:gap-3" : "gap-3 sm:gap-4"}`}
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-primary-foreground/70 mb-0.5">{item.label}</p>
                        <p 
                          className={`font-medium ${item.label === "Email" ? "text-[10px] sm:text-xs leading-tight" : "text-xs sm:text-sm"} ${item.label === "Email" ? "" : "break-words"}`}
                          style={item.label === "Email" ? { 
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            lineHeight: "1.3"
                          } : {}}
                        >
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl shadow-medium border border-border p-4 sm:p-6 md:p-8"
              >
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground text-sm sm:text-base">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="mt-1.5 h-12 sm:h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground text-sm sm:text-base">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="mt-1.5 h-12 sm:h-11"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="phone" className="text-foreground text-sm sm:text-base">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(416) 123-4567"
                    className="mt-1.5 h-12 sm:h-11"
                  />
                </div>

                <div className="mb-5 sm:mb-6">
                  <Label htmlFor="message" className="text-foreground text-sm sm:text-base">
                    How can I help? (optional)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your situation or any questions you have..."
                    rows={4}
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
