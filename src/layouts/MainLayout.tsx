import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import { AppRoutes } from "@/routes/AppRoutes";
import { useLenis } from "@/hooks/useLenis";
import { EASE_EXPO } from "@/components/animations/Reveal";
import { getProjectBySlug } from "@/data/projects";

export function MainLayout() {
  const location = useLocation();
  const { scrollTo } = useLenis();
  const reducedMotion = useReducedMotion();

  const previousPath = useRef(location.pathname);
  const [wipeKey, setWipeKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  // Readable name for the destination; the live region reads this out, since a
  // client-side navigation otherwise changes the page silently.
  const routeLabel = useMemo(() => {
    if (location.pathname === "/") return "Home";
    const match = /^\/work\/([^/]+)\/?$/.exec(location.pathname);
    const project = match ? getProjectBySlug(decodeURIComponent(match[1])) : undefined;
    return project ? `${project.name} case study` : "Page not found";
  }, [location.pathname]);

  // Reset scroll, replay the route wipe and move focus into the new page —
  // only on genuine navigation, not on first paint.
  useEffect(() => {
    if (previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;
    setWipeKey((key) => key + 1);
    // Cleared first so a repeat visit to the same page still announces.
    setAnnouncement("");
    scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // Without this, focus is lost to <body> when the clicked link unmounts,
    // stranding keyboard and screen-reader users. The same timer waits for the
    // outgoing route to leave before naming the destination.
    const focusTimer = window.setTimeout(() => {
      document.getElementById("main")?.focus({ preventScroll: true });
      setAnnouncement(`${routeLabel} loaded`);
    }, 420);

    return () => window.clearTimeout(focusTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.14em] focus:text-[#090909]"
      >
        Skip to content
      </a>

      <Navbar />

      {/* Announces client-side navigation to assistive tech, which otherwise
          receives no signal that the content changed. */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/* tabIndex lets both the skip link and route changes move focus here. */}
      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <AppRoutes key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />

      <div aria-hidden="true" className="noise-layer" />

      {wipeKey > 0 && !reducedMotion ? (
        <motion.div
          key={`wipe-${wipeKey}`}
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
          className="pointer-events-none fixed inset-0 z-[78] origin-top bg-[#0c0c0c]"
        />
      ) : null}
    </>
  );
}
