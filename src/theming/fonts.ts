import { Platform } from "react-native";
import type { DeepPartialFonts, FontTokens } from "../types";

/**
 * Platform-aware default fonts.
 * Light and dark share these by default; override per-mode via `createAppTheme`.
 */
export const defaultFonts: FontTokens = {
  family: {
    sans: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }) as string,
    serif: Platform.select({
      ios: "Georgia",
      android: "serif",
      default: "Georgia",
    }) as string,
    mono: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }) as string,
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: 1.15,
    normal: 1.4,
    relaxed: 1.65,
  },
};

/** Deep-merges partial font overrides onto a base font token set. */
export function mergeFonts(base: FontTokens, overrides?: DeepPartialFonts): FontTokens {
  if (!overrides) return base;
  return {
    family: { ...base.family, ...overrides.family },
    sizes: { ...base.sizes, ...overrides.sizes },
    weights: { ...base.weights, ...overrides.weights },
    lineHeights: { ...base.lineHeights, ...overrides.lineHeights },
  };
}
