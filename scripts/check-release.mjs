#!/usr/bin/env node
/**
 * Release guard.
 *
 * A portfolio that is late is recoverable; one that publishes an address going
 * nowhere is not. This refuses to produce a publishable bundle while placeholder
 * contact details or unlinked projects remain.
 *
 * The real data modules are loaded through Vite so TypeScript and the `@/` alias
 * resolve exactly as they do in the app — no pattern-matching against source
 * text, which would drift the moment the data is reformatted.
 *
 * `npm run build` deliberately skips this so development and previews keep
 * working with the reserved example.com address.
 */
import { createServer } from "vite";

const PLACEHOLDER_EMAIL = /@example\.(com|net|org)$/i;

const server = await createServer({
  appType: "custom",
  server: { middlewareMode: true },
  logLevel: "silent",
});

let SITE;
let SOCIALS;
let PROJECTS;

try {
  ({ SITE, SOCIALS } = await server.ssrLoadModule("/src/data/site.ts"));
  ({ PROJECTS } = await server.ssrLoadModule("/src/data/projects.ts"));
} finally {
  await server.close();
}

const problems = [];

if (!SITE.email) {
  problems.push("src/data/site.ts — SITE.email is missing");
} else if (PLACEHOLDER_EMAIL.test(SITE.email)) {
  problems.push(`src/data/site.ts — SITE.email is the reserved placeholder ${SITE.email}`);
}

if (!Array.isArray(SOCIALS) || SOCIALS.length === 0) {
  problems.push("src/data/site.ts — SOCIALS is empty; at least one verified profile is expected");
}

for (const project of PROJECTS) {
  if (!project.liveUrl && !project.repoUrl) {
    problems.push(
      `src/data/projects.ts — ${project.name} has neither a live URL nor a repository URL`,
    );
  }
}

if (problems.length > 0) {
  const count = `${problems.length} placeholder ${problems.length === 1 ? "item" : "items"}`;
  console.error(`\nRelease check failed — ${count} still in place:\n`);
  for (const problem of problems) console.error(`  • ${problem}`);
  console.error("\nResolve these, or use `npm run build` for a non-release build.\n");
  process.exit(1);
}

console.log("Release check passed — contact details and project links are real.\n");
