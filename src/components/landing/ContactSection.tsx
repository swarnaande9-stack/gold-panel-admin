import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const ContactSection = () => {
  const { settings } = useSiteSettings();

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          {settings.telegramLink && (
            <Button
              asChild
              size="lg"
              className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-foreground font-medium"
            >
              <a href={settings.telegramLink} target="_blank" rel="noopener noreferrer">
                <Send className="w-5 h-5 mr-2" />
                Telegram
              </a>
            </Button>
          )}
          {settings.whatsappNumber && (
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-foreground font-medium"
            >
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          )}
          {settings.email && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
            >
              <a href={`mailto:${settings.email}`}>
                <Mail className="w-5 h-5 mr-2" />
                Email
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
