import { describe, expect, it } from "vitest";
import { withAlpha } from "./color";

describe("withAlpha", () => {
  it("expands six-digit hex to rgba", () => {
    expect(withAlpha("#C8FF00", 0.5)).toBe("rgba(200, 255, 0, 0.5)");
  });

  it("expands three-digit shorthand hex", () => {
    expect(withAlpha("#fff", 1)).toBe("rgba(255, 255, 255, 1)");
  });

  it("falls back to white rather than emitting an invalid colour", () => {
    expect(withAlpha("not-a-colour", 0.2)).toBe("rgba(255, 255, 255, 0.2)");
  });
});
