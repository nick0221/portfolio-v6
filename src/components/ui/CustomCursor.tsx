import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EASE_EXPO } from "@/components/animations/Reveal";

/**
 * Desktop-only custom cursor. Expands into a lime label when hovering an
 * element marked with `data-cursor="..."`. Never rendered on touch or for
 * reduced-motion visitors, and it never traps the native pointer.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const [label, setLabel] = useState<string | null>(null);
  const [overInteractive, setOverInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 340, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 340, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset.cursor = "custom";

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setOverInteractive(
        Boolean(target?.closest("a, button, [role='button'], input, textarea, select")),
      );
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      delete document.body.dataset.cursor;
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const expanded = Boolean(label);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden lg:block">
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          animate={{
            width: expanded ? 92 : overInteractive ? 42 : 26,
            height: expanded ? 92 : overInteractive ? 42 : 26,
            opacity: visible ? 1 : 0,
            backgroundColor: expanded ? "rgba(200,255,0,1)" : "rgba(200,255,0,0)",
            borderColor: expanded
              ? "rgba(200,255,0,1)"
              : overInteractive
                ? "rgba(245,245,245,0.9)"
                : "rgba(245,245,245,0.45)",
          }}
          transition={{ duration: 0.32, ease: EASE_EXPO }}
        >
          <motion.span
            className="font-mono text-[9px] uppercase leading-none tracking-[0.12em] text-[#090909]"
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ x, y }}
        animate={{ opacity: visible && !expanded ? 1 : 0, scale: overInteractive ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
