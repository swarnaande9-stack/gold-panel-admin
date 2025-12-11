import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SiteSettings {
  // Branding
  siteName: string;
  logoUrl: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroBadgeText: string;
  
  // Payment Section
  qrCodeUrl: string;
  paymentAmount: string;
  paymentNote: string;
  upiId: string;
  
  // Contact Info
  telegramLink: string;
  whatsappNumber: string;
  email: string;
  
  // Social Links
  youtubeLink: string;
  instagramLink: string;
}

const defaultSettings: SiteSettings = {
  siteName: "Royal Gold Algo",
  logoUrl: "",
  heroTitle: "Royal Gold Algo",
  heroSubtitle: "Advanced algorithmic trading for XAUUSD with precision-engineered strategies",
  heroBadgeText: "Premium Trading System",
  qrCodeUrl: "",
  paymentAmount: "₹4,999",
  paymentNote: "Scan QR code or use UPI ID below",
  upiId: "example@upi",
  telegramLink: "https://t.me/royalgoldalgo",
  whatsappNumber: "+91 9876543210",
  email: "support@royalgoldalgo.com",
  youtubeLink: "",
  instagramLink: "",
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'site-settings';

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) };
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
