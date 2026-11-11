import { MotionConfig } from "framer-motion";
import { LenisProvider } from "@/hooks/useLenis";
import { IntroProvider } from "@/context/IntroContext";
import { MainLayout } from "@/layouts/MainLayout";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";

export default function App() {
  return (
    // "user" makes Framer drop transform/layout animation for reduced-motion
    // visitors everywhere, not only in components that check the hook.
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <LenisProvider>
          <IntroProvider>
            <MainLayout />
          </IntroProvider>
        </LenisProvider>
      </ErrorBoundary>
    </MotionConfig>
  );
}
