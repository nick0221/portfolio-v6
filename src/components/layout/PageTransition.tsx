import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_EXPO } from "@/components/animations/Reveal";

/** Consistent enter/exit motion for every route. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
