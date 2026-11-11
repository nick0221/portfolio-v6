import { ArrowUp } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";

/** Returns the visitor to the top of the document with the active scroll engine. */
export function BackToTop() {
  const { scrollTo } = useLenis();

  return (
    <button
      type="button"
      onClick={() => scrollTo(0)}
      data-cursor="Top"
      className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors duration-300 hover:text-accent"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent">
        <ArrowUp
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5"
        />
      </span>
      Back to top
    </button>
  );
}
