import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useSEO } from "@/hooks/useSEO";
import { useLenis } from "@/hooks/useLenis";

export function HomePage() {
  const location = useLocation();
  const { scrollTo } = useLenis();

  useSEO({
    title: "NickDevs — Full Stack Web Developer",
    description:
      "NickDevs is a full stack web developer in the Philippines crafting functional, thoughtful and engaging digital experiences with PHP, Laravel and React.",
    path: "/",
  });

  // Returning from a project page with a section intent (e.g. "works").
  useEffect(() => {
    const target = (location.state as { target?: string } | null)?.target;
    if (!target) return;
    const timer = window.setTimeout(() => scrollTo(`#${target}`), 260);
    return () => window.clearTimeout(timer);
  }, [location.state, scrollTo]);

  return (
    <>
      <HeroSection />
      <WorksSection />
      <AboutSection />
      <ExpertiseSection />
      <ContactSection />
    </>
  );
}
