import { describe, it, expect } from "vitest";
import {
  createAppTheme,
  themePresets,
  getThemePreset,
  applyNightShift,
  nightShiftPalette,
  highContrastPalette,
  auditTheme,
  createDynamicColorScheme,
  extractPaletteFromPixels,
  hexToHsv,
  hsvToHex,
  hsvFromPickerCoords,
  hexToP3,
  p3ToHex,
  toP3CssString,
  exportStyleDictionaryTokens,
  exportCssVariables,
  createSkiaLinearGradient,
  createSkiaRadialGradient,
  createSkiaMeshStops,
  resolveTimeOfDay,
  light,
} from "../src/index";

describe("design tokens on createAppTheme", () => {
  it("includes spacing, radius, elevation", () => {
    const theme = createAppTheme({ tokens: { spacing: { md: 20 } } });
    expect(theme.light.spacing.md).toBe(20);
    expect(theme.light.radius.md).toBeGreaterThan(0);
    expect(theme.light.elevation.md.elevation).toBeGreaterThan(0);
    expect(theme.dark.elevation.md.shadowOpacity).toBeGreaterThan(
      theme.light.elevation.md.shadowOpacity
    );
  });

  it("applies nightShift to dark palette", () => {
    const plain = createAppTheme({ brand: "#3b82f6" });
    const shifted = createAppTheme({ brand: "#3b82f6", nightShift: true });
    expect(shifted.dark.colors.primary).not.toBe(plain.dark.colors.primary);
  });

  it("applies highContrast", () => {
    const theme = createAppTheme({ highContrast: true });
    expect(theme.light.colors.background).toBe("#ffffff");
    expect(theme.dark.colors.background).toBe("#000000");
    expect(theme.light.fonts.sizes.md).toBeGreaterThan(16);
  });
});

describe("theme presets", () => {
  it("exposes named packs", () => {
    expect(themePresets.oled.dark.colors.background).toBe("#000000");
    expect(getThemePreset("vibrant").light.colors.primary).toMatch(/^#/);
  });
});

describe("night shift & high contrast helpers", () => {
  it("warms colors", () => {
    expect(applyNightShift("#3b82f6")).not.toBe("#3b82f6");
    expect(nightShiftPalette(light).primary).toBeDefined();
  });

  it("builds high-contrast palettes", () => {
    expect(highContrastPalette("light").text).toBe("#000000");
    expect(highContrastPalette("dark").text).toBe("#ffffff");
  });
});

describe("auditTheme", () => {
  it("scores a theme and reports issues", () => {
    const theme = createAppTheme();
    const report = auditTheme(theme.light);
    expect(report.score).toBeGreaterThanOrEqual(0);
    expect(report.score).toBeLessThanOrEqual(100);
    expect(report.passed + report.failed).toBeGreaterThan(0);
  });
});

describe("createDynamicColorScheme", () => {
  it("builds tonal palettes from a seed", () => {
    const scheme = createDynamicColorScheme("#7C3AED");
    expect(scheme.primary[500]).toBe("#7c3aed");
    expect(scheme.light.primary).toMatch(/^#/);
    expect(scheme.dark.primary).toMatch(/^#/);
    expect(scheme.secondary[500]).toMatch(/^#/);
  });
});

describe("extractPaletteFromPixels", () => {
  it("returns dominant colors from RGBA buffer", () => {
    const pixels: number[] = [];
    for (let i = 0; i < 100; i++) {
      pixels.push(124, 58, 237, 255); // purple
    }
    for (let i = 0; i < 40; i++) {
      pixels.push(239, 68, 68, 255); // red
    }
    const palette = extractPaletteFromPixels(pixels, 10, 14, { count: 2, quality: 1 });
    expect(palette.length).toBeGreaterThanOrEqual(1);
    expect(palette[0]).toMatch(/^#/);
  });
});

describe("HSV & P3", () => {
  it("round-trips HSV", () => {
    const hsv = hexToHsv("#3b82f6");
    expect(hsvToHex(hsv)).toMatch(/^#/);
    const fromPicker = hsvFromPickerCoords(200, 0.8, 0.2);
    expect(fromPicker.s).toBeCloseTo(80, 0);
  });

  it("converts to P3 css", () => {
    const p3 = hexToP3("#ff0000");
    expect(p3.r).toBeGreaterThan(0);
    expect(p3ToHex(p3)).toMatch(/^#/);
    expect(toP3CssString("#00ff00")).toContain("display-p3");
  });
});

describe("token export & Skia", () => {
  it("exports Style Dictionary + CSS variables", () => {
    const theme = createAppTheme({ brand: "#7C3AED" });
    const sd = exportStyleDictionaryTokens(theme.light);
    expect(sd.color.primary.value).toMatch(/^#/);
    expect(sd.spacing.md.value).toBe(16);
    const css = exportCssVariables(theme.light);
    expect(css).toContain("--rn-color-primary");
  });

  it("builds Skia gradient configs", () => {
    const linear = createSkiaLinearGradient({ colors: ["#f00", "#00f"] });
    expect(linear.type).toBe("linear");
    expect(createSkiaRadialGradient({ colors: ["#f00", "#00f"] }).type).toBe("radial");
    expect(createSkiaMeshStops(["#f00", "#0f0", "#00f"]).colors).toHaveLength(3);
  });
});

describe("time of day", () => {
  it("resolves segments", () => {
    expect(resolveTimeOfDay(new Date("2020-01-01T08:00:00"))).toBe("morning");
    expect(resolveTimeOfDay(new Date("2020-01-01T13:00:00"))).toBe("day");
    expect(resolveTimeOfDay(new Date("2020-01-01T19:00:00"))).toBe("evening");
    expect(resolveTimeOfDay(new Date("2020-01-01T23:00:00"))).toBe("night");
  });
});
