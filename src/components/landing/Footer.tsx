import { Crown, Mail, MessageCircle, Youtube, Instagram } from "lucide-react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.siteName} className="w-10 h-10 rounded-lg" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-primary" />
                </div>
              )}
              <span className="font-display font-bold text-xl text-gold-gradient">
                {settings.siteName}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional algorithmic trading for XAUUSD markets.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  {settings.email}
                </a>
              )}
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {settings.telegramLink && (
                <a
                  href={settings.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                </a>
              )}
              {settings.youtubeLink && (
                <a
                  href={settings.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-muted-foreground" />
                </a>
              )}
              {settings.instagramLink && (
                <a
                  href={settings.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-muted-foreground" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <Link 
            to="/admin" 
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
