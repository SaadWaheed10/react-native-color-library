import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  hexToRgba,
  rgbaToHex,
  lighten,
  darken,
  alpha,
  mix,
  invert,
  grayscale,
  createColor,
  createPalette,
  getContrastRatio,
  getContrastText,
  meetsContrastGuidelines,
} from "../src/index";

describe("color conversion", () => {
  it("converts hex to rgb and back", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
  });

  it("converts hex to rgba string", () => {
    expect(hexToRgba("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
  });

  it("converts rgba string back to hex", () => {
    expect(rgbaToHex("rgba(255, 0, 0, 0.5)")).toBe("#ff0000");
  });

  it("handles 3-digit shorthand hex", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("throws on invalid color input", () => {
    expect(() => hexToRgb("not-a-color")).toThrow();
  });
});

describe("color manipulation", () => {
  it("lightens and darkens a color", () => {
    const base = "#3b82f6";
    expect(lighten(base, 20)).not.toBe(base);
    expect(darken(base, 20)).not.toBe(base);
  });

  it("applies alpha", () => {
    expect(alpha("#3b82f6", 0.4)).toBe("rgba(59, 130, 246, 0.4)");
  });

  it("mixes two colors at 50%", () => {
    expect(mix("#000000", "#ffffff", 0.5)).toBe("#808080");
  });

  it("inverts a color", () => {
    expect(invert("#000000")).toBe("#ffffff");
    expect(invert("#ffffff")).toBe("#000000");
  });

  it("grayscales a color", () => {
    const result = grayscale("#ff0000");
    const rgb = hexToRgb(result);
    expect(rgb.r).toBe(rgb.g);
    expect(rgb.g).toBe(rgb.b);
  });
});

describe("createColor", () => {
  it("normalizes hex input", () => {
    expect(createColor("#7C3AED")).toBe("#7c3aed");
  });

  it("normalizes rgb input to hex", () => {
    expect(createColor("rgb(124, 58, 237)")).toBe("#7c3aed");
  });

  it("keeps alpha as rgba", () => {
    expect(createColor("rgba(124, 58, 237, 0.5)")).toBe("rgba(124, 58, 237, 0.5)");
  });
});

describe("createPalette", () => {
  it("generates a full 50-950 scale with the input as 500", () => {
    const brand = createPalette("#7C3AED");
    expect(brand[500]).toBe("#7c3aed");
    expect(brand[50]).toMatch(/^#[0-9a-f]{6}$/);
    expect(brand[950]).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("produces lighter shades toward 50 and darker toward 950", () => {
    const brand = createPalette("#7C3AED");
    const luminance = (hex: string) => {
      const rgb = hexToRgb(hex);
      return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    };
    expect(luminance(brand[50])).toBeGreaterThan(luminance(brand[500]));
    expect(luminance(brand[950])).toBeLessThan(luminance(brand[500]));
  });
});

describe("contrast utilities", () => {
  it("computes max contrast ratio for black/white", () => {
    expect(getContrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });

  it("computes min contrast ratio for identical colors", () => {
    expect(getContrastRatio("#3b82f6", "#3b82f6")).toBeCloseTo(1, 5);
  });

  it("picks white text on a dark background", () => {
    expect(getContrastText("#000000")).toBe("#ffffff");
  });

  it("picks black text on a light background", () => {
    expect(getContrastText("#ffffff")).toBe("#000000");
  });

  it("checks WCAG AA compliance", () => {
    expect(meetsContrastGuidelines("#000000", "#ffffff")).toBe(true);
    expect(meetsContrastGuidelines("#777777", "#888888")).toBe(false);
  });
});
