import { Button } from "@/components/ui/button";
import { ChevronDown, Crown } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const HeroSection = () => {
  const { settings } = useSiteSettings();

  const scrollToPayment = () => {
    document.getElementById("payment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />

      {/* Gold accent lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 py-20 text-center">
        {/* Logo */}
        {settings.logoUrl && (
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-2xl border-2 border-primary/30 overflow-hidden glow-gold">
              <img src={settings.logoUrl} alt={settings.siteName} className="w-full h-full object-contain" />
            </div>
          </div>
        )}

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-gold" />
          <span className="text-sm font-medium text-primary">{settings.heroBadgeText}</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
          <span className="text-gold-gradient">{settings.heroTitle}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {settings.heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            onClick={scrollToPayment}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display text-lg px-8 py-6 glow-gold"
          >
            <Crown className="w-5 h-5 mr-2" />
            Get Access Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/50 text-foreground hover:bg-primary/10 font-display text-lg px-8 py-6"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "95%+", label: "Win Rate" },
            { value: "24/7", label: "Trading" },
            { value: "100+", label: "Users" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-gold-gradient">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
