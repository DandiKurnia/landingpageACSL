import HeroSection from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TeamSection } from "@/components/sections/team";
import { MapsSection } from "@/components/sections/maps";
import { FooterSection } from "@/components/sections/footer";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <MapsSection />
      <FooterSection />
    </main>
  );
}
