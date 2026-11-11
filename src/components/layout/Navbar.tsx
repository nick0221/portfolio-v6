import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV_LINKS, SITE } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLenis } from "@/hooks/useLenis";
import { EASE_EXPO } from "@/components/animations/Reveal";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { scrollTo, stop, start } = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const active = useActiveSection(SECTION_IDS);
  const onHome = location.pathname === "/";

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 28);
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menu = menuRef.current;
    const focusables: HTMLElement[] = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>("button, a[href]"))
      : [];
    focusables[0]?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;

      // Keep keyboard focus inside the open menu.
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const outside = !menu?.contains(active);

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      start();
      if (toggleRef.current?.isConnected) toggleRef.current.focus();
    };
  }, [menuOpen, stop, start]);

  const goToSection = (id: string) => {
    setMenuOpen(false);
    if (!onHome) {
      navigate("/", { state: { target: id } });
      return;
    }
    scrollTo(`#${id}`);
    // Keep the section address shareable without triggering a router navigation.
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -22 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }}
        className={[
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          scrolled
            ? "border-line/80 bg-bg/72 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav aria-label="Primary" className="shell flex h-[68px] items-center justify-between md:h-[78px]">
          <Link
            to="/"
            aria-label="NickDevs — home"
            className="group flex items-baseline gap-1.5"
            onClick={() => scrollTo(0)}
          >
            <span className="font-display text-[15px] font-medium tracking-[-0.02em]">
              NICKDEVS
            </span>
            <span className="h-1 w-1 translate-y-[-1px] rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = onHome && active === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "group relative flex flex-col items-center gap-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300",
                      isActive ? "text-ink" : "text-faint hover:text-ink",
                    ].join(" ")}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={[
                        "h-[3px] w-[3px] rounded-full bg-accent transition-all duration-300",
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      ].join(" ")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => goToSection("contact")}
              className="group hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:text-accent sm:inline-flex"
            >
              Let&rsquo;s talk
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>

            <button
              type="button"
              ref={toggleRef}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative grid h-10 w-10 place-items-center border border-line md:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-ink"
                  animate={menuOpen ? { top: "50%", rotate: 45 } : { top: 2, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-px w-full bg-ink"
                  animate={menuOpen ? { bottom: "50%", rotate: -45 } : { bottom: 2, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-5 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.06 + index * 0.06,
                      ease: EASE_EXPO,
                    }}
                    className="border-b border-line"
                  >
                    <button
                      type="button"
                      onClick={() => goToSection(link.id)}
                      className="flex w-full items-baseline justify-between py-5 text-left"
                    >
                      <span className="display text-[clamp(2rem,9vw,3rem)]">{link.label}</span>
                      <span className="mono-meta text-faint">
                        0{index + 1}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <p className="label">Say hello</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline font-display text-lg text-ink"
                >
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="label">{SITE.location}</span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Available
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
