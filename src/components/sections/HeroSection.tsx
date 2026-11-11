import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { SITE } from "@/data/site";
import { useIntro } from "@/context/IntroContext";
import { useLenis } from "@/hooks/useLenis";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { SplitText } from "@/components/animations/SplitText";
import { EASE_EXPO } from "@/components/animations/Reveal";

const WORDMARK = "NICKDEVS".split("");
const YEAR = new Date().getFullYear();

export function HeroSection() {
  const { ready } = useIntro();
  const { scrollTo } = useLenis();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const canParallax = !reducedMotion;

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-[104px] md:pt-[120px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 rule-grid opacity-60" />
        <motion.div
          style={canParallax ? { y: decorY } : undefined}
          className="absolute -right-[16vw] top-[16vh] h-[54vw] w-[54vw] rounded-full border border-line/70"
        />
        <motion.div
          style={canParallax ? { y: decorY } : undefined}
          className="absolute -right-[16vw] top-[16vh] h-[54vw] w-[54vw]"
        >
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>

      <div className="shell relative flex flex-1 flex-col justify-between gap-12">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <div className="space-y-1.5">
            <p className="label">{SITE.role}</p>
            <p className="label text-dim">PHP / Laravel / React</p>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
              {SITE.availability}
            </span>
          </div>
        </div>

        <div>
          <h1 id="hero-heading" className="sr-only">
            NickDevs — Full Stack Web Developer
          </h1>
          <motion.div
            aria-hidden="true"
            style={canParallax ? { y: wordmarkY, opacity: fade } : undefined}
            className="flex w-full items-baseline justify-between gap-[0.4vw]"
          >
            {WORDMARK.map((letter, index) => (
              <span key={`${letter}-${index}`} className="overflow-hidden pb-[0.05em]">
                <motion.span
                  className="display block text-[clamp(2.9rem,11.2vw,10.4rem)] leading-[0.78] tracking-[-0.055em]"
                  initial={reducedMotion ? false : { y: "112%" }}
                  animate={ready || reducedMotion ? { y: "0%" } : { y: "112%" }}
                  transition={{
                    duration: 1.2,
                    delay: 0.08 + index * 0.055,
                    ease: EASE_EXPO,
                  }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
            <span className="mb-[0.9rem] hidden h-2 w-2 shrink-0 rounded-full bg-accent md:block" />
          </motion.div>

          <div className="mt-8 grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
            <p className="display text-[clamp(1.45rem,3.3vw,2.85rem)] uppercase leading-[1] tracking-[-0.03em] lg:col-span-7">
              <SplitText
                text={"Crafting digital experiences\nthrough code & creativity."}
                play={ready}
                delay={0.45}
                stagger={0.03}
              />
            </p>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="body-lg max-w-md">{SITE.intro}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <MagneticButton variant="accent" onClick={() => scrollTo("#works")}>
                  View works
                </MagneticButton>
                <MagneticButton onClick={() => scrollTo("#contact")}>
                  Let&rsquo;s talk
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => scrollTo("#works")}
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line transition-colors duration-300 group-hover:border-accent">
              <motion.span
                animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-dim transition-colors duration-300 group-hover:text-accent"
                />
              </motion.span>
            </span>
            <span className="label">Scroll to explore</span>
          </button>

          <div className="hidden items-center gap-5 md:flex">
            {SITE.stackLine.map((tech, index) => (
              <span key={tech} className="flex items-center gap-5">
                {index > 0 ? (
                  <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-line" />
                ) : null}
                <span className="mono-meta text-faint">{tech}</span>
              </span>
            ))}
          </div>

          <span className="label hidden lg:block">Portfolio / {YEAR}</span>
        </div>
      </div>
    </section>
  );
}
