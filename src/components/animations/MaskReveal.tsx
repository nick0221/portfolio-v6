import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_EXPO } from "./Reveal";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Image-masking reveal used for posters and gallery frames. */
export function MaskReveal({ children, className, delay = 0 }: MaskRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 1.05, delay, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
