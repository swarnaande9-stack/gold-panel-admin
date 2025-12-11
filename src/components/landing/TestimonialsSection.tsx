import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul S.",
    role: "Forex Trader",
    content: "This algo has completely changed my trading. Consistent profits every week!",
    rating: 5,
  },
  {
    name: "Amit K.",
    role: "Day Trader",
    content: "Best investment I've made. The support team is always helpful.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Part-time Trader",
    content: "Even as a beginner, I was able to set it up and start profiting within hours.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
            What Traders Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied traders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-card border border-border relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4">{testimonial.content}</p>
              <div>
                <div className="font-display font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
