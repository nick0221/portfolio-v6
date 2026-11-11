import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  distance?: number;
  duration?: number;
  once?: boolean;
}

/** Shared expo-out easing, typed as a mutable cubic-bezier tuple. */
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Viewport-triggered fade + slide. Falls back to a plain element when reduced. */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  duration = 0.85,
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
