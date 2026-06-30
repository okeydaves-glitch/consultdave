import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CarRentalShowcase } from "@/components/home/CarRentalShowcase";
import { SafetySection } from "@/components/home/SafetySection";
import { ContactBanner } from "@/components/home/ContactBanner";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <CarRentalShowcase />
      <SafetySection />
      <ContactBanner />
    </div>
  );
}
