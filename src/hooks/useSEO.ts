import { useEffect } from "react";
import { SITE } from "@/data/site";

interface SEOOptions {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  /** Structured data for this route. Removed when a route does not provide it. */
  jsonLd?: Record<string, unknown>;
  /** Indexing policy for this route. Self-canonicalising pages stay indexable. */
  robots?: string;
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

function upsertStructuredData(json: string | null) {
  const existing = document.head.querySelector<HTMLScriptElement>(
    'script[data-page-jsonld="true"]',
  );

  if (!json) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement("script");
  script.type = "application/ld+json";
  script.id = "page-jsonld";
  script.dataset.pageJsonld = "true";
  script.textContent = json;
  if (!existing) document.head.appendChild(script);
}

/** Per-route document metadata without pulling in a helmet dependency. */
export function useSEO({
  title,
  description,
  path = "/",
  type = "website",
  robots = "index, follow",
  jsonLd,
}: SEOOptions) {
  // Serialise so an inline object literal does not re-run this effect every render.
  const structuredData = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const canonical = new URL(path, SITE.url).toString();
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(canonical);
    upsertMeta("name", "robots", robots);
    upsertStructuredData(structuredData);
  }, [title, description, path, type, robots, structuredData]);
}
