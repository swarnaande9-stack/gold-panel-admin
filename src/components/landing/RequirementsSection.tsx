import { Monitor, Smartphone, Wifi, DollarSign } from "lucide-react";

const requirements = [
  {
    icon: Monitor,
    title: "MT4/MT5 Platform",
    description: "MetaTrader 4 or MetaTrader 5 trading platform",
  },
  {
    icon: Wifi,
    title: "VPS Recommended",
    description: "Virtual Private Server for 24/7 operation",
  },
  {
    icon: DollarSign,
    title: "Minimum Capital",
    description: "$100+ recommended for optimal performance",
  },
  {
    icon: Smartphone,
    title: "Any Broker",
    description: "Works with any MT4/MT5 compatible broker",
  },
];

const RequirementsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
            Requirements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {requirements.map((req) => (
            <div
              key={req.title}
              className="text-center p-6 rounded-2xl bg-card border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <req.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {req.title}
              </h3>
              <p className="text-sm text-muted-foreground">{req.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
