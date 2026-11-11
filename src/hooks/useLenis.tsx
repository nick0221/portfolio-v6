import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
}

interface LenisContextValue {
  scrollTo: (target: string | number, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
  isSmooth: boolean;
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => undefined,
  stop: () => undefined,
  start: () => undefined,
  isSmooth: false,
});

export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [isSmooth, setIsSmooth] = useState(false);

  useEffect(() => {
    // Native scrolling is better than emulated scrolling for reduced-motion
    // visitors and for devices without a fine pointer.
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    setIsSmooth(true);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      setIsSmooth(false);
    };
  }, [reducedMotion]);

  const scrollTo = useCallback<LenisContextValue["scrollTo"]>(
    (target, options) => {
      const offset = options?.offset ?? 0;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset,
          immediate: options?.immediate ?? false,
          duration: options?.immediate ? 0 : 1.2,
        });
        return;
      }

      const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior });
        return;
      }
      const element = document.querySelector(target);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
      }
    },
    [reducedMotion],
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo(
    () => ({ scrollTo, stop, start, isSmooth }),
    [scrollTo, stop, start, isSmooth],
  );

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
