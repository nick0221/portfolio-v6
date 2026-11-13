import { useEffect } from "react";
import { SITE } from "@/data/site";
import { resolveSeo, type SeoInput } from "@/lib/seoMeta";

type SEOOptions = Omit<SeoInput, "origin">;

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
export function useSEO({ title, description, path, type, robots, jsonLd }: SEOOptions) {
  // Serialise so an inline object literal does not re-run this effect every render.
  const structuredData = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const resolved = resolveSeo({
      origin: SITE.url,
      title,
      description,
      path,
      type,
      robots,
      jsonLd,
    });

    document.title = resolved.title;
    for (const tag of resolved.meta) upsertMeta(tag.attributes, tag.key, tag.content);
    upsertCanonical(resolved.canonical);
    upsertStructuredData(resolved.jsonLd);
    // structuredData stands in for jsonLd, whose identity changes every render.
  }, [title, description, path, type, robots, structuredData]);
}
