import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface IntroContextValue {
  /** True once the intro is finished (or skipped) and content may animate in. */
  ready: boolean;
  /** True while the preloader should be on screen. */
  playing: boolean;
  finish: () => void;
}

const IntroContext = createContext<IntroContextValue>({
  ready: true,
  playing: false,
  finish: () => undefined,
});

const SESSION_KEY = "nickdevs:intro-played";

/**
 * The intro only runs once per session, never blocks for more than a moment,
 * and is skipped entirely for reduced-motion visitors.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [shouldPlay, setShouldPlay] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";
    const play = !alreadyPlayed && !reducedMotion;
    setShouldPlay(play);
    if (!play) setReady(true);
  }, [reducedMotion]);

  const finish = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setReady(true);
    setShouldPlay(false);
  }, []);

  const value = useMemo(
    () => ({ ready, playing: shouldPlay && !ready, finish }),
    [ready, shouldPlay, finish],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  return useContext(IntroContext);
}
