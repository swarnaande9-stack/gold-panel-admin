import { useState } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Settings, 
  Image, 
  Type, 
  QrCode, 
  MessageCircle, 
  Save, 
  RotateCcw,
  ExternalLink,
  Crown
} from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const { settings, updateSettings, resetSettings } = useSiteSettings();
  const [formData, setFormData] = useState(settings);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSettings(formData);
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    resetSettings();
    setFormData(settings);
    toast.info("Settings reset to defaults");
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(field, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-gold-gradient">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Manage your website settings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Tabs defaultValue="branding" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 grid grid-cols-2 md:grid-cols-4 gap-1 h-auto">
            <TabsTrigger value="branding" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Image className="h-4 w-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Type className="h-4 w-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <QrCode className="h-4 w-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <MessageCircle className="h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <Card className="border-primary/20 glow-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-gradient font-display">
                  <Image className="h-5 w-5 text-primary" />
                  Branding Settings
                </CardTitle>
                <CardDescription>
                  Customize your site name and logo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => handleInputChange("siteName", e.target.value)}
                    placeholder="Royal Gold Algo"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo Image</Label>
                  <div className="flex items-start gap-4">
                    {formData.logoUrl && (
                      <div className="w-20 h-20 rounded-lg border border-primary/30 overflow-hidden bg-secondary flex items-center justify-center">
                        <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload("logoUrl", file);
                        }}
                        className="bg-secondary border-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload a PNG or JPG image. Recommended: 200x200px
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Tab */}
          <TabsContent value="hero">
            <Card className="border-primary/20 glow-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-gradient font-display">
                  <Type className="h-5 w-5 text-primary" />
                  Hero Section
                </CardTitle>
                <CardDescription>
                  Customize main headings and text
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="heroBadgeText">Badge Text</Label>
                  <Input
                    id="heroBadgeText"
                    value={formData.heroBadgeText}
                    onChange={(e) => handleInputChange("heroBadgeText", e.target.value)}
                    placeholder="Premium Trading System"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Main Title</Label>
                  <Input
                    id="heroTitle"
                    value={formData.heroTitle}
                    onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                    placeholder="Royal Gold Algo"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={formData.heroSubtitle}
                    onChange={(e) => handleInputChange("heroSubtitle", e.target.value)}
                    placeholder="Advanced algorithmic trading..."
                    rows={3}
                    className="bg-secondary border-border resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card className="border-primary/20 glow-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-gradient font-display">
                  <QrCode className="h-5 w-5 text-primary" />
                  Payment Settings
                </CardTitle>
                <CardDescription>
                  Configure QR code and payment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="qrCode">QR Code Image</Label>
                  <div className="flex items-start gap-4">
                    {formData.qrCodeUrl ? (
                      <div className="w-32 h-32 rounded-lg border border-primary/30 overflow-hidden bg-foreground">
                        <img src={formData.qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border border-primary/30 bg-secondary flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload("qrCodeUrl", file);
                        }}
                        className="bg-secondary border-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload your payment QR code image
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentAmount">Payment Amount</Label>
                    <Input
                      id="paymentAmount"
                      value={formData.paymentAmount}
                      onChange={(e) => handleInputChange("paymentAmount", e.target.value)}
                      placeholder="₹4,999"
                      className="bg-secondary border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      value={formData.upiId}
                      onChange={(e) => handleInputChange("upiId", e.target.value)}
                      placeholder="example@upi"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentNote">Payment Note</Label>
                  <Input
                    id="paymentNote"
                    value={formData.paymentNote}
                    onChange={(e) => handleInputChange("paymentNote", e.target.value)}
                    placeholder="Scan QR code or use UPI ID"
                    className="bg-secondary border-border"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="border-primary/20 glow-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-gradient font-display">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Update your contact details and social links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                    <Input
                      id="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                      placeholder="+91 9876543210"
                      className="bg-secondary border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="support@example.com"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telegramLink">Telegram Link</Label>
                  <Input
                    id="telegramLink"
                    value={formData.telegramLink}
                    onChange={(e) => handleInputChange("telegramLink", e.target.value)}
                    placeholder="https://t.me/yourgroup"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtubeLink">YouTube Channel</Label>
                    <Input
                      id="youtubeLink"
                      value={formData.youtubeLink}
                      onChange={(e) => handleInputChange("youtubeLink", e.target.value)}
                      placeholder="https://youtube.com/@channel"
                      className="bg-secondary border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagramLink">Instagram</Label>
                    <Input
                      id="instagramLink"
                      value={formData.instagramLink}
                      onChange={(e) => handleInputChange("instagramLink", e.target.value)}
                      placeholder="https://instagram.com/handle"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-border">
          <Button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-display">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleReset} className="border-destructive/50 text-destructive hover:bg-destructive/10">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Admin;
