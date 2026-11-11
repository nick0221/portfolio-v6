import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { HomePage } from "@/pages/HomePage";

const ProjectPage = lazy(() =>
  import("@/pages/ProjectPage").then((module) => ({ default: module.ProjectPage })),
);

const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);

function RouteFallback() {
  return (
    <div className="shell flex min-h-[70svh] items-center py-28">
      <span className="label">Loading</span>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        }
      />
      <Route
        path="/work/:slug"
        element={
          <PageTransition>
            <Suspense fallback={<RouteFallback />}>
              <ProjectPage />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="*"
        element={
          <PageTransition>
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          </PageTransition>
        }
      />
    </Routes>
  );
}
