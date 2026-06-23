import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { CarRentalShowcase } from "@/components/home/CarRentalShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactBanner } from "@/components/home/ContactBanner";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <StatisticsSection />
      <CarRentalShowcase />
      <TestimonialsSection />
      <ContactBanner />
    </div>
  );
}
