import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import RequirementsSection from "@/components/landing/RequirementsSection";
import PaymentSection from "@/components/landing/PaymentSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import DisclaimerSection from "@/components/landing/DisclaimerSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <RequirementsSection />
      <PaymentSection />
      <TestimonialsSection />
      <FAQSection />
      <DisclaimerSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
