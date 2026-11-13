export interface SeoInput {
  /** Canonical origin, e.g. https://nickdevs.dev — passed in so this module has no imports and can run under plain Node during preprocessing. */
  origin: string;
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  robots?: string;
  jsonLd?: Record<string, unknown>;
}

export interface SeoMetaTag {
  attributes: "name" | "property";
  key: string;
  content: string;
}

export interface ResolvedSeo {
  title: string;
  canonical: string;
  meta: SeoMetaTag[];
  jsonLd: string | null;
}

/**
 * Route metadata as data, not side effects. `useSEO` applies the result to the
 * live document; `scripts/prerender.mjs` renders the same result into static
 * HTML. Keeping both on one function is what stops the prerendered head and the
 * client-updated head from disagreeing.
 *
 * Deliberately import-free: the prerenderer loads this file through Node's type
 * stripping, where a `@/` alias would not resolve.
 */
export function resolveSeo({
  origin,
  title,
  description,
  path = "/",
  type = "website",
  robots = "index, follow",
  jsonLd,
}: SeoInput): ResolvedSeo {
  const canonical = new URL(path, origin).toString();
  const shareImage = new URL("/og.svg", origin).toString();

  return {
    title,
    canonical,
    meta: [
      { attributes: "name", key: "description", content: description },
      { attributes: "property", key: "og:title", content: title },
      { attributes: "property", key: "og:description", content: description },
      { attributes: "property", key: "og:type", content: type },
      { attributes: "property", key: "og:url", content: canonical },
      { attributes: "property", key: "og:image", content: shareImage },
      { attributes: "property", key: "og:image:alt", content: title },
      { attributes: "property", key: "og:image:width", content: "1200" },
      { attributes: "property", key: "og:image:height", content: "630" },
      { attributes: "name", key: "twitter:card", content: "summary_large_image" },
      { attributes: "name", key: "twitter:title", content: title },
      { attributes: "name", key: "twitter:description", content: description },
      { attributes: "name", key: "twitter:image", content: shareImage },
      { attributes: "name", key: "twitter:image:alt", content: title },
      { attributes: "name", key: "robots", content: robots },
    ],
    jsonLd: jsonLd ? JSON.stringify(jsonLd) : null,
  };
}
