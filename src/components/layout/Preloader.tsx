import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE } from "@/data/site";
import { useIntro } from "@/context/IntroContext";
import { EASE_EXPO } from "@/components/animations/Reveal";

const WORD = "NICKDEVS".split("");

/**
 * Brief cinematic intro. The counter is tied to real milestones (fonts +
 * window load), capped so it never blocks access to the page for long.
 */
export function Preloader() {
  const { playing, finish } = useIntro();
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;

    let cancelled = false;
    const startedAt = performance.now();
    let value = 0;

    const interval = window.setInterval(() => {
      if (cancelled) return;
      value = Math.min(90, value + (90 - value) * 0.08 + 0.8);
      setProgress(value);
    }, 70);

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const windowLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    void Promise.all([fontsReady, windowLoaded]).then(() => {
      if (cancelled) return;
      const elapsed = performance.now() - startedAt;
      const hold = Math.max(0, 780 - elapsed);

      window.setTimeout(() => {
        if (cancelled) return;
        value = 100;
        setProgress(100);
        window.setTimeout(() => {
          if (!cancelled) finish();
        }, 380);
      }, hold);
    });

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [playing, finish]);

  const shown = Math.round(progress);

  return (
    <AnimatePresence>
      {playing ? (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${shown} percent`}
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-5 pb-8 pt-7 md:px-[4vw]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_EXPO }}
        >
          <div className="flex items-center justify-between">
            <span className="label">NickDevs</span>
            <span className="label">Portfolio / {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex overflow-hidden">
              {WORD.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="display text-[clamp(2.4rem,9vw,7rem)] leading-none"
                  initial={reducedMotion ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1,
                    delay: 0.05 + index * 0.045,
                    ease: EASE_EXPO,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="label mt-5 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {SITE.role} — {SITE.location}
            </motion.p>
          </div>

          <div className="flex items-end justify-between gap-6">
            <span className="label max-w-[16rem] leading-relaxed">
              Preparing interface
            </span>
            <span className="mono-meta text-3xl text-ink tabular-nums md:text-4xl">
              {String(shown).padStart(3, "0")}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-line">
            <div
              className="h-full bg-accent transition-[width] duration-300 ease-out"
              style={{ width: `${shown}%` }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
