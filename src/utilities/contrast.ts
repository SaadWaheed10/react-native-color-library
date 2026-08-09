import type { ColorValue } from "../types";
import { hexToRgb } from "./colorConversion";

/** Computes relative luminance per WCAG 2.x. */
function relativeLuminance(color: ColorValue): number {
  const { r, g, b } = hexToRgb(color);

  const channel = (value: number): number => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rl = channel(r);
  const gl = channel(g);
  const bl = channel(b);

  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

/**
 * Returns the WCAG contrast ratio between two colors, from 1
 * (no contrast) to 21 (max contrast, black on white).
 */
export function getContrastRatio(colorA: ColorValue, colorB: ColorValue): number {
  const lumA = relativeLuminance(colorA);
  const lumB = relativeLuminance(colorB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Picks whichever of black or white gives better contrast against
 * `backgroundColor` — useful for auto-selecting readable text color.
 */
export function getContrastText(backgroundColor: ColorValue): ColorValue {
  const whiteContrast = getContrastRatio(backgroundColor, "#ffffff");
  const blackContrast = getContrastRatio(backgroundColor, "#000000");
  return whiteContrast >= blackContrast ? "#ffffff" : "#000000";
}

/**
 * Checks whether two colors meet a WCAG contrast level.
 * `level` "AA" requires 4.5:1 (or 3:1 for `largeText`); "AAA" requires 7:1 (or 4.5:1).
 */
export function meetsContrastGuidelines(
  colorA: ColorValue,
  colorB: ColorValue,
  options: { level?: "AA" | "AAA"; largeText?: boolean } = {}
): boolean {
  const { level = "AA", largeText = false } = options;
  const ratio = getContrastRatio(colorA, colorB);

  if (level === "AAA") {
    return ratio >= (largeText ? 4.5 : 7);
  }
  return ratio >= (largeText ? 3 : 4.5);
}
