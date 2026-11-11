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
    const timer = window.setTimeout(() => {
      scrollTo(`#${target}`);
      window.history.replaceState(null, "", `#${target}`);
    }, 260);
    return () => window.clearTimeout(timer);
  }, [location.state, scrollTo]);

  // Shareable deep links (/#contact) jump straight there rather than animating
  // from the top of the page.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(
      () => scrollTo(`#${hash}`, { immediate: true }),
      420,
    );
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
