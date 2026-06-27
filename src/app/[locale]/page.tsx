import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero";
import { PhilosophySection } from "@/components/sections/philosophy";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PricingSection } from "@/components/sections/pricing";
import { ContactSection } from "@/components/sections/contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <ContactSection />
    </>
  );
}
