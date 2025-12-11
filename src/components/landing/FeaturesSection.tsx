import { Zap, Shield, TrendingUp, Clock, Settings, Users } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "High Win Rate",
    description: "Our algorithm achieves 95%+ accuracy on XAUUSD trades",
  },
  {
    icon: Zap,
    title: "Fast Execution",
    description: "Lightning-fast trade execution with minimal slippage",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Built-in stop-loss and take-profit mechanisms",
  },
  {
    icon: Clock,
    title: "24/7 Trading",
    description: "Automated trading around the clock, never miss an opportunity",
  },
  {
    icon: Settings,
    title: "Easy Setup",
    description: "Simple installation with step-by-step guidance",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Active Telegram community with expert traders",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade trading algorithm designed for consistent profits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow-gold"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
