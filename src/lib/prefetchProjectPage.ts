/**
 * The case-study route is lazily split, so a cold click on a poster would show
 * the route fallback while the chunk downloads. Warming it on intent — hovering
 * or focusing a card — keeps the first paint small while making the navigation
 * feel instant.
 *
 * The import is memoised: Vite de-duplicates the module graph, and repeated
 * hovers must not queue further requests.
 */
let pending: Promise<unknown> | null = null;

export function prefetchProjectPage(): void {
  pending ??= import("@/pages/ProjectPage");
}
