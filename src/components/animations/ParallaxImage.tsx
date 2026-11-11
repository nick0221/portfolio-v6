import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ParallaxImageProps {
  children: ReactNode;
  /** Positive travels up, negative travels down. */
  distance?: number;
  className?: string;
  innerClassName?: string;
}

/**
 * Scroll-linked vertical parallax. Uses transforms only and is disabled on
 * touch layouts and for reduced-motion visitors.
 */
export function ParallaxImage({
  children,
  distance = 60,
  className,
  innerClassName,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const active = isDesktop && !reducedMotion && distance !== 0;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={active ? { y } : undefined}
        className={innerClassName ?? "h-full w-full"}
      >
        {children}
      </motion.div>
    </div>
  );
}
