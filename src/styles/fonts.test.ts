import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const fontsCssUrl = new URL("./fonts.css", import.meta.url);

/**
 * The only failure here worth a test: a declared face pointing at a file that is
 * renamed, missing or truncated. Browsers answer that with a silent fallback to a
 * system typeface, so nothing else would report it. Assertions about the CSS text
 * -- family names, `font-display`, absence of a Google origin -- would only
 * restate the file and would break harmless edits.
 */
describe("self-hosted fonts", () => {
  it("ships a real file for every declared face", () => {
    const css = readFileSync(fileURLToPath(fontsCssUrl), "utf8");
    const urls = [...css.matchAll(/url\("([^"]+)"\)/g)].map((match) => match[1]);

    expect(urls.length).toBeGreaterThan(0);

    for (const url of urls) {
      const file = fileURLToPath(new URL(url, fontsCssUrl));
      expect(existsSync(file), `missing font file: ${url}`).toBe(true);
      // Empty files and Git LFS pointer stubs pass an existence check but still
      // render as the fallback face.
      expect(statSync(file).size, `truncated font file: ${url}`).toBeGreaterThan(1024);
    }
  });
});
