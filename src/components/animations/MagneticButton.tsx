import { motion, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  variant?: "outline" | "accent" | "quiet";
  icon?: boolean;
  download?: boolean;
}

const variants = {
  outline:
    "border-line text-ink hover:border-accent hover:text-accent focus-visible:border-accent",
  accent: "border-accent bg-accent text-[#090909] hover:bg-ink hover:border-ink",
  quiet: "border-transparent text-dim hover:text-ink",
} as const;

/**
 * Cursor-attracted button/link. Magnetism is a progressive enhancement:
 * disabled for touch pointers and reduced-motion visitors.
 */
export function MagneticButton({
  children,
  href,
  to,
  onClick,
  className = "",
  strength = 0.22,
  variant = "outline",
  icon = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reducedMotion;

  const x = useSpring(0, { stiffness: 190, damping: 16, mass: 0.35 });
  const y = useSpring(0, { stiffness: 190, damping: 16, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = [
    "group inline-flex items-center gap-3 rounded-full border px-6 py-3.5",
    "font-mono text-[11px] uppercase tracking-[0.16em]",
    "transition-colors duration-300",
    variants[variant],
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
          {inner}
        </a>
      ) : to ? (
        <Link to={to} className={classes}>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
