import { LenisProvider } from "@/hooks/useLenis";
import { IntroProvider } from "@/context/IntroContext";
import { MainLayout } from "@/layouts/MainLayout";

export default function App() {
  return (
    <LenisProvider>
      <IntroProvider>
        <MainLayout />
      </IntroProvider>
    </LenisProvider>
  );
}
