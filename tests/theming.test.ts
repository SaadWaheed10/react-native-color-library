import { describe, it, expect } from "vitest";
import {
  createAppTheme,
  defaultAppTheme,
  defaultFonts,
  mergeFonts,
  light,
  dark,
} from "../src/index";

describe("createAppTheme", () => {
  it("returns light and dark themes with colors and fonts", () => {
    const theme = createAppTheme();
    expect(theme.light.colors.background).toBe(light.background);
    expect(theme.dark.colors.background).toBe(dark.background);
    expect(theme.light.fonts.family.sans).toBe(defaultFonts.family.sans);
    expect(theme.dark.fonts.sizes.md).toBe(16);
  });

  it("seeds primaries from a brand color", () => {
    const theme = createAppTheme({ brand: "#7C3AED" });
    expect(theme.light.colors.primary).toMatch(/^#[0-9a-f]{6}$/);
    expect(theme.dark.colors.primary).toMatch(/^#[0-9a-f]{6}$/);
    expect(theme.light.colors.primary).not.toBe(theme.dark.colors.primary);
  });

  it("applies shared and per-mode font overrides", () => {
    const theme = createAppTheme({
      fonts: { family: { sans: "Inter" } },
      dark: {
        fonts: { family: { sans: "Inter-Bold" }, sizes: { lg: 22 } },
      },
    });
    expect(theme.light.fonts.family.sans).toBe("Inter");
    expect(theme.dark.fonts.family.sans).toBe("Inter-Bold");
    expect(theme.dark.fonts.sizes.lg).toBe(22);
    expect(theme.light.fonts.sizes.lg).toBe(defaultFonts.sizes.lg);
  });

  it("applies per-mode color overrides including custom keys", () => {
    const theme = createAppTheme({
      light: { colors: { primary: "#111111", card: "#fafafa" } },
      dark: { colors: { background: "#010101", card: "#1a1a1a" } },
    });
    expect(theme.light.colors.primary).toBe("#111111");
    expect(theme.light.colors.card).toBe("#fafafa");
    expect(theme.dark.colors.background).toBe("#010101");
    expect(theme.dark.colors.card).toBe("#1a1a1a");
  });
});

describe("defaultAppTheme", () => {
  it("is a ready-to-use AppThemeConfig", () => {
    expect(defaultAppTheme.light.colors.text).toBeDefined();
    expect(defaultAppTheme.dark.fonts.weights.bold).toBe("700");
  });
});

describe("mergeFonts", () => {
  it("merges partial overrides onto defaults", () => {
    const merged = mergeFonts(defaultFonts, {
      family: { sans: "Poppins" },
      sizes: { md: 17 },
    });
    expect(merged.family.sans).toBe("Poppins");
    expect(merged.family.mono).toBe(defaultFonts.family.mono);
    expect(merged.sizes.md).toBe(17);
    expect(merged.sizes.sm).toBe(14);
  });
});
