import { useState, useEffect } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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
  Crown,
  DollarSign,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = ({ onLogin }: { onLogin: (password: string) => boolean }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError("Invalid password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 glow-gold">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display text-gold-gradient">Admin Login</CardTitle>
          <CardDescription>Enter your password to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className="bg-secondary border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">
              <Lock className="w-4 h-4 mr-2" />
              Login
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Default password: admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const Admin = () => {
  const { settings, updateSettings, resetSettings, isAdminAuthenticated, loginAdmin, logoutAdmin } = useSiteSettings();
  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  if (!isAdminAuthenticated) {
    return <AdminLogin onLogin={loginAdmin} />;
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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
            <Button variant="outline" size="sm" onClick={logoutAdmin} className="border-destructive/50 text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Tabs defaultValue="branding" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 grid grid-cols-2 md:grid-cols-5 gap-1 h-auto">
            <TabsTrigger value="branding" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Branding</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
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
                <CardDescription>Customize your site name and logo</CardDescription>
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
                      <p className="text-xs text-muted-foreground">Upload a PNG or JPG image. Recommended: 200x200px</p>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-semibold text-foreground">Security</h3>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Admin Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      value={formData.adminPassword}
                      onChange={(e) => handleInputChange("adminPassword", e.target.value)}
                      placeholder="Enter new password"
                      className="bg-secondary border-border"
                    />
                    <p className="text-xs text-muted-foreground">Change the admin login password</p>
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
                <CardDescription>Customize main headings and text</CardDescription>
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

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <Card className="border-primary/20 glow-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-gradient font-display">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Pricing Settings
                </CardTitle>
                <CardDescription>Configure pricing and discount options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border">
                  <div className="space-y-1">
                    <Label htmlFor="showDiscount" className="text-base font-medium">Show Discount</Label>
                    <p className="text-sm text-muted-foreground">Display crossed original price and discount badge</p>
                  </div>
                  <Switch
                    id="showDiscount"
                    checked={formData.showDiscount}
                    onCheckedChange={(checked) => handleInputChange("showDiscount", checked)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      placeholder="₹9,999"
                      className="bg-secondary border-border"
                    />
                    <p className="text-xs text-muted-foreground">Will be crossed out if discount is enabled</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountedPrice">Sale Price</Label>
                    <Input
                      id="discountedPrice"
                      value={formData.discountedPrice}
                      onChange={(e) => handleInputChange("discountedPrice", e.target.value)}
                      placeholder="₹4,999"
                      className="bg-secondary border-border"
                    />
                    <p className="text-xs text-muted-foreground">The actual price customers pay</p>
                  </div>
                </div>

                {formData.showDiscount && (
                  <div className="space-y-2">
                    <Label htmlFor="discountLabel">Discount Badge Text</Label>
                    <Input
                      id="discountLabel"
                      value={formData.discountLabel}
                      onChange={(e) => handleInputChange("discountLabel", e.target.value)}
                      placeholder="50% OFF"
                      className="bg-secondary border-border"
                    />
                    <p className="text-xs text-muted-foreground">Text shown on the discount badge (e.g., "50% OFF", "Limited Offer")</p>
                  </div>
                )}

                {/* Preview */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <p className="text-sm text-muted-foreground mb-3">Preview:</p>
                  <div className="flex items-baseline gap-3">
                    {formData.showDiscount && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">{formData.originalPrice}</span>
                        <span className="px-2 py-1 text-xs font-bold bg-destructive text-destructive-foreground rounded">
                          {formData.discountLabel}
                        </span>
                      </>
                    )}
                    <span className="text-3xl font-display font-bold text-gold-gradient">
                      {formData.discountedPrice}
                    </span>
                  </div>
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
                <CardDescription>Configure QR code and payment details</CardDescription>
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
                      <p className="text-xs text-muted-foreground">Upload your payment QR code image</p>
                    </div>
                  </div>
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
                <CardDescription>Update your contact details and social links</CardDescription>
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