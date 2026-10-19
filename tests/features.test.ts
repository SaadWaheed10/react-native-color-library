import { describe, it, expect } from "vitest";
import {
  createHarmony,
  createBrandThemes,
  ensureContrast,
  findAccessibleShade,
  meetsContrastGuidelines,
  getLuminance,
  isLight,
  isDark,
  hexToOklch,
  oklchToHex,
  lightenOklch,
  darkenOklch,
  createPaletteOklch,
  simulateColorBlindness,
  nearestColor,
  deltaE,
  rotateHue,
  setHue,
  warmer,
  cooler,
  randomColor,
  randomPalette,
  charts,
  tokens,
  createTokens,
  overlays,
  blue,
  hexToHsl,
  hexToRgb,
  createPalette,
} from "../src/index";

describe("createHarmony", () => {
  it("returns complementary pair", () => {
    const result = createHarmony("#7C3AED", "complementary");
    expect(result).toHaveLength(2);
    expect(result[0]).toBe("#7c3aed");
    const baseHue = hexToHsl(result[0]!).h;
    const compHue = hexToHsl(result[1]!).h;
    const hueDiff = ((compHue - baseHue) % 360 + 360) % 360;
    expect(Math.abs(hueDiff - 180)).toBeLessThan(1);
  });

  it("returns triadic trio", () => {
    expect(createHarmony("#3b82f6", "triadic")).toHaveLength(3);
  });

  it("returns analogous trio and tetradic quartet", () => {
    expect(createHarmony("#3b82f6", "analogous")).toHaveLength(3);
    expect(createHarmony("#3b82f6", "tetradic")).toHaveLength(4);
    expect(createHarmony("#3b82f6", "split-complementary")).toHaveLength(3);
  });
});

describe("createBrandThemes", () => {
  it("builds light and dark palettes from a brand color", () => {
    const themes = createBrandThemes("#7C3AED");
    expect(themes.light.background).toBe("#ffffff");
    expect(themes.dark.background).toMatch(/^#[0-9a-f]{6}$/);
    expect(themes.light.primary).toMatch(/^#[0-9a-f]{6}$/);
    expect(themes.dark.primary).toMatch(/^#[0-9a-f]{6}$/);
    expect(themes.light.primary).not.toBe(themes.dark.primary);
  });

  it("accepts light/dark overrides", () => {
    const themes = createBrandThemes("#7C3AED", {
      light: { primary: "#111111" },
    });
    expect(themes.light.primary).toBe("#111111");
  });
});

describe("contrast auto-fix", () => {
  it("returns foreground unchanged when contrast already passes", () => {
    expect(ensureContrast("#ffffff", "#000000")).toBe("#000000");
  });

  it("adjusts a low-contrast foreground until AA passes", () => {
    const fixed = ensureContrast("#ffffff", "#cccccc");
    expect(meetsContrastGuidelines("#ffffff", fixed)).toBe(true);
  });

  it("finds an accessible shade in a palette", () => {
    const shade = findAccessibleShade(blue, "#ffffff");
    expect(meetsContrastGuidelines("#ffffff", shade)).toBe(true);
  });
});

describe("luminance helpers", () => {
  it("reports luminance and light/dark", () => {
    expect(getLuminance("#ffffff")).toBeCloseTo(1, 2);
    expect(getLuminance("#000000")).toBeCloseTo(0, 2);
    expect(isLight("#ffffff")).toBe(true);
    expect(isDark("#000000")).toBe(true);
  });
});

describe("OKLCH", () => {
  it("round-trips hex through OKLCH", () => {
    const oklch = hexToOklch("#3b82f6");
    const back = oklchToHex(oklch);
    const a = hexToRgb("#3b82f6");
    const b = hexToRgb(back);
    expect(Math.abs(a.r - b.r)).toBeLessThanOrEqual(2);
    expect(Math.abs(a.g - b.g)).toBeLessThanOrEqual(2);
    expect(Math.abs(a.b - b.b)).toBeLessThanOrEqual(2);
  });

  it("lightens and darkens in OKLCH space", () => {
    const base = "#3b82f6";
    expect(getLuminance(lightenOklch(base, 0.15))).toBeGreaterThan(getLuminance(base));
    expect(getLuminance(darkenOklch(base, 0.15))).toBeLessThan(getLuminance(base));
  });

  it("creates a full OKLCH palette with input as 500", () => {
    const palette = createPaletteOklch("#7C3AED");
    expect(palette[500]).toBe("#7c3aed");
    expect(getLuminance(palette[50])).toBeGreaterThan(getLuminance(palette[500]));
    expect(getLuminance(palette[950])).toBeLessThan(getLuminance(palette[500]));
  });
});

describe("colorblind simulation", () => {
  it("returns a different hex for deuteranopia on a green", () => {
    const sim = simulateColorBlindness("#16A34A", "deuteranopia");
    expect(sim).toMatch(/^#[0-9a-f]{6}$/);
    expect(sim).not.toBe("#16a34a");
  });

  it("supports protanopia and tritanopia", () => {
    expect(simulateColorBlindness("#ff0000", "protanopia")).toMatch(/^#[0-9a-f]{6}$/);
    expect(simulateColorBlindness("#0000ff", "tritanopia")).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe("nearestColor / deltaE", () => {
  it("computes zero distance for identical colors", () => {
    expect(deltaE("#ff0000", "#ff0000")).toBeCloseTo(0, 5);
  });

  it("finds a nearby library color", () => {
    const match = nearestColor(blue[500]);
    expect(match.value).toBe(blue[500]);
    expect(match.distance).toBeCloseTo(0, 5);
    expect(match.name).toBe("blue");
    expect(match.shade).toBe(500);
  });

  it("searches within a custom palette", () => {
    const palette = createPalette("#7C3AED");
    const match = nearestColor("#7c3aed", palette);
    expect(match.shade).toBe(500);
    expect(match.value).toBe("#7c3aed");
  });
});

describe("extra manipulation helpers", () => {
  it("rotates and sets hue", () => {
    const rotated = rotateHue("#3b82f6", 180);
    expect(rotated).not.toBe("#3b82f6");
    const set = setHue("#3b82f6", 0);
    expect(hexToHsl(set).h).toBeCloseTo(0, 0);
  });

  it("shifts warmer and cooler", () => {
    expect(warmer("#3b82f6")).not.toBe("#3b82f6");
    expect(cooler("#ef4444")).not.toBe("#ef4444");
  });

  it("generates random colors and palettes", () => {
    const color = randomColor({ hue: 200, saturation: 70, lightness: 50 });
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
    expect(hexToHsl(color).h).toBeCloseTo(200, 0);

    const palette = randomPalette({ hue: 120 });
    expect(palette[500]).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette[50]).toBeDefined();
    expect(palette[950]).toBeDefined();
  });
});

describe("charts and tokens", () => {
  it("exposes sequential, diverging, and categorical chart palettes", () => {
    expect(charts.sequential.length).toBeGreaterThanOrEqual(5);
    expect(charts.diverging.length).toBeGreaterThanOrEqual(5);
    expect(charts.categorical[5]).toHaveLength(5);
    expect(charts.categorical[10]).toHaveLength(10);
  });

  it("exposes UI tokens and overlays", () => {
    expect(tokens.scrim).toContain("rgba");
    expect(tokens.focusRing).toMatch(/^#[0-9a-f]{6}$/);
    expect(createTokens({ scrim: "rgba(0,0,0,0.8)" }).scrim).toBe("rgba(0,0,0,0.8)");
    expect(overlays.darkHeavy).toContain("rgba");
  });
});
