import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export function NotFoundPage() {
  useSEO({
    title: "Page not found | NickDevs",
    description: "This page does not exist. Return to the NickDevs portfolio home.",
    path: "/404",
  });

  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center py-28">
      <span className="label">Error 404</span>
      <h1 className="mt-6 text-[clamp(3rem,12vw,9rem)] uppercase leading-[0.86] tracking-[-0.05em]">
        Page not found
      </h1>
      <p className="body-lg mt-6 max-w-md">
        The page you were looking for has moved or never existed. The work is
        still here.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors duration-300 hover:text-accent"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Back to home
      </Link>
    </section>
  );
}
