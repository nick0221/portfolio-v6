import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline reading progress indicator pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.35 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-accent/80"
    />
  );
}
