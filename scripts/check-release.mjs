/**
 * Release guard.
 *
 * Fails the publishable build while the contact address is a placeholder: an
 * address that goes nowhere is the one thing a portfolio cannot ship.
 *
 * Anything else that looks unfinished is a warning, not a blocker. A private
 * client build legitimately has no public link — the case study says so in its
 * own words — and an empty SOCIALS list is a valid choice rather than a lie.
 *
 * The data modules are imported directly; Node strips the type annotations, so
 * this reads the real typed values instead of pattern-matching source text.
 * `npm run build` skips this check entirely.
 */

const PLACEHOLDER_EMAIL = /@example\.(com|net|org)$/i;

let SITE;
let SOCIALS;
let PROJECTS;

try {
  ({ SITE, SOCIALS } = await import("../src/data/site.ts"));
  ({ PROJECTS } = await import("../src/data/projects.ts"));
} catch (error) {
  console.error("\nRelease check could not load the data modules.");
  console.error("This needs Node 22.18+ or 23.6+, which strip TypeScript types at import.");
  console.error(error);
  process.exit(1);
}

const blockers = [];
const warnings = [];

if (!SITE.email) {
  blockers.push("src/data/site.ts — SITE.email is missing");
} else if (PLACEHOLDER_EMAIL.test(SITE.email)) {
  blockers.push(`src/data/site.ts — SITE.email is the reserved placeholder ${SITE.email}`);
}

if (SOCIALS.length === 0) {
  warnings.push("src/data/site.ts — SOCIALS is empty, so the contact section renders no profiles");
}

for (const project of PROJECTS) {
  if (!project.liveUrl && !project.repoUrl) {
    warnings.push(`src/data/projects.ts — ${project.name} has no live or repository link`);
  }
}

for (const warning of warnings) console.warn(`  · warning: ${warning}`);

if (blockers.length > 0) {
  console.error("\nRelease blocked:\n");
  for (const blocker of blockers) console.error(`  • ${blocker}`);
  console.error("\nResolve these, or use `npm run build` for a non-release build.\n");
  process.exit(1);
}

console.log("\nRelease check passed.\n");
