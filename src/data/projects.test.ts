import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  PROJECTS,
  PROJECT_COUNT,
  getNextProject,
  getPreviousProject,
  getProjectBySlug,
} from "./projects";
import { SITE } from "./site";

const HEX_COLOUR = /^#[0-9a-f]{6}$/i;
const GRID_COLUMN = /^(\d+)\s*\/\s*span\s*(\d+)$/;

/**
 * The catalogue is the part of this project most likely to be edited by hand,
 * so these tests guard the invariants the UI depends on rather than any
 * particular copy.
 */
describe("project catalogue", () => {
  it("contains the eight portfolio projects", () => {
    expect(PROJECT_COUNT).toBe(8);
  });

  it("keeps ids and slugs unique", () => {
    expect(new Set(PROJECTS.map((project) => project.id)).size).toBe(PROJECT_COUNT);
    expect(new Set(PROJECTS.map((project) => project.slug)).size).toBe(PROJECT_COUNT);
  });

  it("numbers projects sequentially from 01", () => {
    PROJECTS.forEach((project, index) => {
      expect(project.index).toBe(String(index + 1).padStart(2, "0"));
    });
  });

  it("provides every field the interface renders", () => {
    PROJECTS.forEach((project) => {
      expect(project.name.trim().length).toBeGreaterThan(0);
      expect(project.category.trim().length).toBeGreaterThan(0);
      expect(project.summary.trim().length).toBeGreaterThan(20);
      expect(project.role.trim().length).toBeGreaterThan(0);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.overview.length).toBeGreaterThan(0);
      expect(project.visual.caption.trim().length).toBeGreaterThan(0);
    });
  });

  it("uses valid hex tints and keeps posters inside the 12-column grid", () => {
    PROJECTS.forEach((project) => {
      expect(project.visual.tint).toMatch(HEX_COLOUR);

      const match = GRID_COLUMN.exec(project.layout.col);
      if (!match) {
        throw new Error(`${project.name} has an unparseable grid column: ${project.layout.col}`);
      }
      const start = Number(match[1]);
      const span = Number(match[2]);
      expect(start).toBeGreaterThanOrEqual(1);
      expect(start + span - 1).toBeLessThanOrEqual(12);

      expect(project.layout.row).toBeGreaterThanOrEqual(1);
      expect(project.layout.aspect).toMatch(/^\d+\s*\/\s*\d+$/);
      // Parallax travel is deliberately kept small enough to stay inside the
      // scaled poster, so an out-of-range value is a layout bug.
      expect(Math.abs(project.layout.parallax)).toBeLessThanOrEqual(120);
    });
  });

  it("only publishes https links and keeps the one verified live URL", () => {
    PROJECTS.forEach((project) => {
      if (project.liveUrl) expect(project.liveUrl).toMatch(/^https:\/\//);
      if (project.repoUrl) expect(project.repoUrl).toMatch(/^https:\/\//);
    });
    expect(getProjectBySlug("streamnest")?.liveUrl).toBe("https://streamnest-lake.vercel.app/");
  });

  it("resolves slugs and wraps next/previous navigation", () => {
    expect(getProjectBySlug("urbankix")?.name).toBe("UrbanKix");
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();

    const first = PROJECTS[0];
    const last = PROJECTS[PROJECT_COUNT - 1];
    expect(getNextProject(last.slug)).toBe(first);
    expect(getPreviousProject(first.slug)).toBe(last);
  });

  it("lists every project in the sitemap under the canonical origin", () => {
    const sitemapPath = fileURLToPath(new URL("../../public/sitemap.xml", import.meta.url));
    const sitemap = readFileSync(sitemapPath, "utf8");

    PROJECTS.forEach((project) => {
      expect(sitemap).toContain(`${SITE.url}/work/${project.slug}`);
    });
    expect(sitemap).toContain(`${SITE.url}/`);
  });
});
