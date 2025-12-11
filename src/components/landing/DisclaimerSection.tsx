import { AlertTriangle } from "lucide-react";

const DisclaimerSection = () => {
  return (
    <section className="py-16 bg-destructive/5 border-y border-destructive/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Risk Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trading forex and CFDs involves significant risk and may not be suitable for all investors. 
                Past performance is not indicative of future results. You should carefully consider your 
                investment objectives, level of experience, and risk appetite before trading. Never invest 
                more than you can afford to lose. This algo is a tool to assist in trading decisions and 
                does not guarantee profits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;
