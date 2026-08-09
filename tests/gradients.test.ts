import { describe, it, expect } from "vitest";
import { gradients, createGradient } from "../src/index";

describe("gradient presets", () => {
  it("provides preset gradients with colors and direction", () => {
    expect(gradients.sunset.colors.length).toBeGreaterThanOrEqual(2);
    expect(gradients.sunset.start).toBeDefined();
    expect(gradients.sunset.end).toBeDefined();
  });

  it("covers the requested categories", () => {
    const expectedSamples = [
      "sunset", "sunrise", "ocean", "sky", "fire", "purpleHaze", "pinkGlow",
      "blueSteel", "freshGreen", "goldRush", "neonNights", "darkMatter",
      "pastelDream", "minimalGray", "luxury", "modernSlate", "instagramGlow",
      "abstractWave",
    ];
    for (const key of expectedSamples) {
      expect(gradients[key]).toBeDefined();
    }
  });
});

describe("createGradient", () => {
  it("builds a gradient config with defaults", () => {
    const g = createGradient({ colors: ["#FF0000", "#0000FF"] });
    expect(g.colors).toEqual(["#FF0000", "#0000FF"]);
    expect(g.start).toEqual({ x: 0, y: 0 });
    expect(g.end).toEqual({ x: 1, y: 1 });
  });

  it("respects custom start/end points", () => {
    const g = createGradient({
      colors: ["#FF0000", "#0000FF"],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    });
    expect(g.end).toEqual({ x: 0, y: 1 });
  });

  it("throws with fewer than 2 colors", () => {
    expect(() => createGradient({ colors: ["#FF0000"] })).toThrow();
  });

  it("throws when locations length mismatches colors length", () => {
    expect(() =>
      createGradient({ colors: ["#FF0000", "#0000FF"], locations: [0, 0.5, 1] })
    ).toThrow();
  });
});
