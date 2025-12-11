import { Button } from "@/components/ui/button";
import { QrCode, CheckCircle2, Copy, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { toast } from "sonner";

const PaymentSection = () => {
  const { settings } = useSiteSettings();

  const copyUpiId = () => {
    navigator.clipboard.writeText(settings.upiId);
    toast.success("UPI ID copied to clipboard!");
  };

  const features = [
    "Lifetime access to the algo",
    "Free updates & improvements",
    "24/7 Telegram support",
    "Setup assistance included",
  ];

  return (
    <section id="payment" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
            Get {settings.siteName}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instant access after payment confirmation
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <div className="bg-card rounded-2xl border border-primary/30 p-8 glow-gold">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <QrCode className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Scan to Pay</span>
                </div>

                {/* QR Code */}
                <div className="w-64 h-64 mx-auto mb-6 rounded-xl bg-foreground flex items-center justify-center overflow-hidden">
                  {settings.qrCodeUrl ? (
                    <img src={settings.qrCodeUrl} alt="Payment QR Code" className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="text-center p-4">
                      <QrCode className="w-32 h-32 text-background mx-auto mb-2" />
                      <p className="text-xs text-background/70">QR Code Here</p>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {settings.paymentNote}
                </p>

                {/* UPI ID */}
                <div className="flex items-center justify-center gap-2 p-3 bg-secondary rounded-lg border border-border">
                  <span className="text-sm font-mono text-foreground">{settings.upiId}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyUpiId}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-card rounded-2xl border border-primary/30 p-8 flex flex-col">
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">One-time payment</div>
                <div className="text-4xl font-display font-bold text-gold-gradient">
                  {settings.paymentAmount}
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {settings.whatsappNumber && (
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 text-foreground font-medium"
                  >
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact on WhatsApp
                    </a>
                  </Button>
                )}
                {settings.telegramLink && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary/50 hover:bg-primary/10"
                  >
                    <a href={settings.telegramLink} target="_blank" rel="noopener noreferrer">
                      Join Telegram Group
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
