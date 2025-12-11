import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SiteSettings {
  // Branding
  siteName: string;
  logoUrl: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroBadgeText: string;
  
  // Pricing
  originalPrice: string;
  discountedPrice: string;
  showDiscount: boolean;
  discountLabel: string;
  
  // Payment Section
  qrCodeUrl: string;
  paymentNote: string;
  upiId: string;
  
  // Contact Info
  telegramLink: string;
  whatsappNumber: string;
  email: string;
  
  // Social Links
  youtubeLink: string;
  instagramLink: string;
  
  // Admin Auth
  adminPassword: string;
}

const defaultSettings: SiteSettings = {
  siteName: "Royal Gold Algo",
  logoUrl: "",
  heroTitle: "Royal Gold Algo",
  heroSubtitle: "Advanced algorithmic trading for XAUUSD with precision-engineered strategies",
  heroBadgeText: "Premium Trading System",
  originalPrice: "₹9,999",
  discountedPrice: "₹4,999",
  showDiscount: true,
  discountLabel: "50% OFF",
  qrCodeUrl: "",
  paymentNote: "Scan QR code or use UPI ID below",
  upiId: "example@upi",
  telegramLink: "https://t.me/royalgoldalgo",
  whatsappNumber: "+91 9876543210",
  email: "support@royalgoldalgo.com",
  youtubeLink: "",
  instagramLink: "",
  adminPassword: "admin123", // Default password - user should change this
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'site-settings';
const AUTH_KEY = 'admin-auth';

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

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_KEY) === 'true';
    }
    return false;
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

  const loginAdmin = (password: string): boolean => {
    if (password === settings.adminPassword) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <SiteSettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      resetSettings,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin
    }}>
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
