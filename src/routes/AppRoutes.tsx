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

/**
 * Shown while the lazily split case-study chunk downloads. It mirrors the real
 * header shape (label, title, meta row, poster) so the page does not jump when
 * the content arrives, and it is inert to assistive tech apart from the status
 * text because none of the placeholder blocks carry meaning.
 */
function RouteFallback() {
  return (
    <div className="shell py-28" aria-busy="true">
      <span className="sr-only">Loading project</span>
      <div aria-hidden="true" className="space-y-6">
        <div className="h-3 w-24 animate-pulse rounded-sm bg-elevated motion-reduce:animate-none" />
        <div className="h-[clamp(2.6rem,8vw,6rem)] w-4/5 animate-pulse rounded-sm bg-elevated motion-reduce:animate-none" />
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((key) => (
            <div
              key={key}
              className="h-16 animate-pulse rounded-sm bg-surface motion-reduce:animate-none"
            />
          ))}
        </div>
        <div className="aspect-[16/10] w-full animate-pulse rounded-sm bg-surface motion-reduce:animate-none" />
      </div>
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
