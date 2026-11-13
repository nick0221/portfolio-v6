/**
 * Prerenders a static document per case-study route, plus dist/404.html.
 *
 * The link unfurls are the point: Slack, LinkedIn, X, WhatsApp and iMessage do
 * not execute JavaScript, so a shared case study previously arrived with the home
 * page's title, description and card. Each route now ships its own head —
 * title, description, canonical, Open Graph, Twitter card and CreativeWork
 * JSON-LD — before a single byte of script runs.
 *
 * The body stays client-rendered because the experience is animation-driven;
 * a <noscript> summary stands in for readers and crawlers without JavaScript.
 *
 * Metadata comes from src/lib/seoMeta.ts, the same function `useSEO` applies on
 * the client, so the two cannot drift.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveSeo } from "../src/lib/seoMeta.ts";
import { SITE } from "../src/data/site.ts";
import { PROJECTS } from "../src/data/projects.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");

const START = "<!-- route-meta:start";
const END = "<!-- route-meta:end -->";

if (!template.includes(START) || !template.includes(END)) {
  throw new Error("index.html is missing the route-meta markers the prerenderer replaces");
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderMeta({ title, canonical, meta, jsonLd }) {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    ...meta.map(
      (tag) => `<meta ${tag.attributes}="${tag.key}" content="${escapeHtml(tag.content)}" />`,
    ),
  ];

  // "<" would let a value close the script element early.
  if (jsonLd) tags.push(`<script type="application/ld+json">${jsonLd.replace(/</g, "\\u003c")}</script>`);

  return tags.join("\n    ");
}

function renderDocument({ seo, fallback }) {
  const region = new RegExp(`${START}[\\s\\S]*?${END}`);

  // Every replacement is a function, never a string: generated markup can carry
  // `$&`, `$1`, `` $` ``, `$'` or `$$`, and a string replacement would expand
  // those as patterns and corrupt the document.
  const withMeta = template.replace(region, () => renderMeta(seo));

  const withBody = fallback
    ? withMeta.replace(
        '<div id="root"></div>',
        () => `<div id="root"><noscript>${fallback}</noscript></div>`,
      )
    : withMeta;

  // The markers are an authoring contract, not something to ship.
  return withBody.replace(START, () => "").replace(END, () => "");
}

const textStyle =
  'style="max-width:640px;margin:16vh auto;padding:0 24px;background:#090909;color:#f5f5f5;font-family:system-ui,sans-serif"';
const labelStyle =
  'style="margin:0;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#c8ff00"';
const titleStyle =
  'style="margin:16px 0 0;font-size:34px;line-height:1.1;letter-spacing:-.03em;font-weight:500"';
const bodyStyle = 'style="margin:14px 0 0;color:#a0a0a0;line-height:1.7"';

let written = 0;

for (const project of PROJECTS) {
  const seo = resolveSeo({
    origin: SITE.url,
    title: `${project.name} — ${project.category} | NickDevs`,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.summary,
      url: new URL(`/work/${project.slug}`, SITE.url).toString(),
      genre: project.category,
      keywords: project.stack.join(", "),
      creator: { "@type": "Person", name: "NickDevs", url: SITE.url },
    },
  });

  const fallback = [
    `<div ${textStyle}>`,
    `<p ${labelStyle}>${escapeHtml(project.index)} · Case study</p>`,
    `<h1 ${titleStyle}>${escapeHtml(project.name)}</h1>`,
    `<p ${bodyStyle}>${escapeHtml(project.summary)}</p>`,
    `<p ${bodyStyle}>Role: ${escapeHtml(project.role)} · ${escapeHtml(project.stack.join(" · "))}</p>`,
    project.liveUrl
      ? `<p ${bodyStyle}><a href="${escapeHtml(project.liveUrl)}" style="color:#f5f5f5">Visit live site</a></p>`
      : "",
    `<p ${bodyStyle}><a href="/" style="color:#c8ff00">Back to the portfolio</a></p>`,
    "</div>",
  ].join("");

  const file = join(dist, "work", project.slug, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderDocument({ seo, fallback }));
  written += 1;
}

const notFound = resolveSeo({
  origin: SITE.url,
  title: "Page not found | NickDevs",
  description: "This page does not exist. Return to the NickDevs portfolio home.",
  path: "/404",
  robots: "noindex, follow",
});

writeFileSync(
  join(dist, "404.html"),
  renderDocument({
    seo: notFound,
    fallback: [
      `<div ${textStyle}>`,
      `<p ${labelStyle}>Error 404</p>`,
      `<h1 ${titleStyle}>Page not found</h1>`,
      `<p ${bodyStyle}>The page you were looking for has moved or never existed.</p>`,
      `<p ${bodyStyle}><a href="/" style="color:#c8ff00">Back to the portfolio</a></p>`,
      "</div>",
    ].join(""),
  }),
);

// Strip the authoring markers from the home document too.
writeFileSync(
  join(dist, "index.html"),
  template.replace(START, () => "").replace(END, () => ""),
);

console.log(`Prerendered ${written} case studies and 404.html.`);
