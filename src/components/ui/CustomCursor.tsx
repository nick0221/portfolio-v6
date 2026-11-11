import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EASE_EXPO } from "@/components/animations/Reveal";

/**
 * Palette values mirrored from the design tokens in `globals.css`. Framer
 * animates concrete colour values (CSS custom properties do not interpolate),
 * so the accent and ink are repeated here — keep in sync.
 */
const ACCENT = "#C8FF00";
const INK = "#F5F5F5";

/**
 * Desktop-only custom pointer. It carries no text label: the arrow shape is the
 * cursor, and its state is the affordance — ink at rest, lime with a slight
 * lift over anything interactive. Never rendered on touch, below `lg`, or for
 * reduced-motion visitors, and it never traps the native pointer.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const largeViewport = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useReducedMotion();
  // Suppressing the native cursor is only safe while the replacement renders,
  // so the viewport breakpoint gates both together.
  const enabled = finePointer && largeViewport && !reducedMotion;

  const [overInteractive, setOverInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Tight spring so the arrow tracks the pointer without feeling detached.
  const arrowX = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 });
  const arrowY = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    document.body.dataset.cursor = "custom";

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
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

  return (
    <div
      data-cursor-root=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95]"
    >
      <motion.div className="absolute left-0 top-0" style={{ x: arrowX, y: arrowY }}>
        <motion.div
          className="-translate-x-[4px] -translate-y-[4px]"
          animate={{ opacity: visible ? 1 : 0, scale: overInteractive ? 1.18 : 1 }}
          transition={{ duration: 0.18, ease: EASE_EXPO }}
        >
          {/* Dark hairline outline keeps the arrow legible over light artwork. */}
          <MousePointer2
            className="h-[19px] w-[19px]"
            style={{ color: overInteractive ? ACCENT : INK }}
            fill="currentColor"
            stroke="#090909"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
