import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE_EXPO } from "./Reveal";

interface SplitTextProps {
  /** Use \n to force a line break. */
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Force playback. When omitted the text reveals when scrolled into view. */
  play?: boolean;
}

/**
 * Word-by-word masked reveal. Renders only spans so it is valid inside any
 * heading, and exposes the full string to assistive technology.
 */
export function SplitText({ text, className, delay = 0, stagger = 0.045, play }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reducedMotion = useReducedMotion();
  const shouldPlay = reducedMotion ? true : (play ?? inView);
  const lines = text.split("\n");

  let order = 0;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => {
          const words = line.split(" ").filter(Boolean);
          return (
            <span
              key={lineIndex}
              className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
            >
              {words.map((word, wordIndex) => {
                const current = order++;
                return (
                  <motion.span
                    key={`${lineIndex}-${wordIndex}`}
                    className="inline-block will-change-transform"
                    initial={reducedMotion ? false : { y: "112%", opacity: 0 }}
                    animate={
                      shouldPlay ? { y: "0%", opacity: 1 } : { y: "112%", opacity: 0 }
                    }
                    transition={{
                      duration: 1,
                      delay: delay + current * stagger,
                      ease: EASE_EXPO,
                    }}
                  >
                    {word}
                    {wordIndex < words.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
