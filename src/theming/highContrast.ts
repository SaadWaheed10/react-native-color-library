import type { AppTheme, ColorValue, FontTokens, ThemePalette } from "../types";
import { ensureContrast } from "../utilities/contrast";
import { black, white } from "../colors/neutrals";
import { gray } from "../colors/basic";

/**
 * Forces a high-contrast AA-friendly palette.
 * Light: near-white surfaces + near-black text.
 * Dark: pure black surfaces + near-white text.
 */
export function highContrastPalette(mode: "light" | "dark"): ThemePalette {
  if (mode === "light") {
    return {
      background: white,
      surface: white,
      text: black,
      textMuted: gray[800],
      border: black,
      primary: "#0000ee",
      secondary: "#551a8b",
      success: "#006400",
      warning: "#7a5200",
      error: "#8b0000",
      info: "#003366",
    };
  }
  return {
    background: black,
    surface: "#0a0a0a",
    text: white,
    textMuted: gray[200],
    border: white,
    primary: "#66b3ff",
    secondary: "#d4a5ff",
    success: "#66ff66",
    warning: "#ffd966",
    error: "#ff6b6b",
    info: "#7ec8ff",
  };
}

/** Bumps type scale ~12% for accessibility. */
export function highContrastFonts(base: FontTokens): FontTokens {
  const scale = (n: number) => Math.round(n * 1.12);
  return {
    ...base,
    sizes: {
      xs: scale(base.sizes.xs),
      sm: scale(base.sizes.sm),
      md: scale(base.sizes.md),
      lg: scale(base.sizes.lg),
      xl: scale(base.sizes.xl),
      "2xl": scale(base.sizes["2xl"]),
      "3xl": scale(base.sizes["3xl"]),
    },
    weights: {
      ...base.weights,
      regular: "500",
      medium: "600",
      semibold: "700",
      bold: "700",
    },
  };
}

/** Ensures key text/surface pairs on an AppTheme meet AA. */
export function enforceHighContrastColors(
  colors: ThemePalette & Record<string, ColorValue>
): ThemePalette & Record<string, ColorValue> {
  return {
    ...colors,
    text: ensureContrast(colors.background, colors.text, { level: "AAA" }),
    textMuted: ensureContrast(colors.background, colors.textMuted, {
      level: "AA",
    }),
    primary: ensureContrast(colors.background, colors.primary, { level: "AA" }),
    border: ensureContrast(colors.background, colors.border, {
      level: "AA",
      largeText: true,
    }),
  };
}

/** Applies high-contrast transforms to a full AppTheme. */
export function applyHighContrast(theme: AppTheme, mode: "light" | "dark"): AppTheme {
  const palette = highContrastPalette(mode);
  return {
    ...theme,
    colors: enforceHighContrastColors({ ...theme.colors, ...palette }),
    fonts: highContrastFonts(theme.fonts),
  };
}
