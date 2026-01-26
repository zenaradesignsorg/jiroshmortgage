const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Markham, ON",
      rating: 5,
      text: "Jirosh made our first home purchase so smooth. He was always available to answer our questions and explained everything clearly. We couldn't have asked for a better mortgage agent!",
    },
    {
      name: "Michael Rodriguez",
      location: "Scarborough, ON",
      rating: 5,
      text: "Professional, responsive, and genuinely cares about his clients. Jirosh helped us secure a great rate and walked us through every step. Highly recommend!",
    },
    {
      name: "Priya Patel",
      location: "Richmond Hill, ON",
      rating: 5,
      text: "From pre-approval to closing, Jirosh was with us every step of the way. His attention to detail and availability on evenings and weekends made all the difference.",
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            What Clients Say
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            Don't just take our word for it. Here's what clients have to say about their experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-5 sm:p-6 shadow-soft border border-border hover:shadow-medium transition-all duration-300 hover:border-primary/20"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-5 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
