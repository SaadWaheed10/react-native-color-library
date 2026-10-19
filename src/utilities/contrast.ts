import type { ColorValue, ColorShades, ContrastFixOptions, ShadeKey } from "../types";
import { hexToRgb } from "./colorConversion";
import { darken, lighten } from "./colorManipulation";

/** Computes relative luminance per WCAG 2.x (0 = black, 1 = white). */
export function getLuminance(color: ColorValue): number {
  const { r, g, b } = hexToRgb(color);

  const channel = (value: number): number => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Returns `true` when the color's relative luminance is ≥ 0.5. */
export function isLight(color: ColorValue): boolean {
  return getLuminance(color) >= 0.5;
}

/** Returns `true` when the color's relative luminance is < 0.5. */
export function isDark(color: ColorValue): boolean {
  return getLuminance(color) < 0.5;
}

function requiredRatio(options: ContrastFixOptions = {}): number {
  const { level = "AA", largeText = false } = options;
  if (level === "AAA") {
    return largeText ? 4.5 : 7;
  }
  return largeText ? 3 : 4.5;
}

/**
 * Returns the WCAG contrast ratio between two colors, from 1
 * (no contrast) to 21 (max contrast, black on white).
 */
export function getContrastRatio(colorA: ColorValue, colorB: ColorValue): number {
  const lumA = getLuminance(colorA);
  const lumB = getLuminance(colorB);
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
  options: ContrastFixOptions = {}
): boolean {
  return getContrastRatio(colorA, colorB) >= requiredRatio(options);
}

/**
 * Ensures `foreground` meets WCAG contrast against `background`.
 * If it already passes, it is returned unchanged; otherwise the color
 * is lightened/darkened until it passes (or black/white is used as fallback).
 *
 * @example
 * ensureContrast("#e5e7eb", "#9ca3af") // nudges gray until AA
 */
export function ensureContrast(
  background: ColorValue,
  foreground: ColorValue,
  options: ContrastFixOptions = {}
): ColorValue {
  if (meetsContrastGuidelines(background, foreground, options)) {
    return foreground;
  }

  const target = requiredRatio(options);
  const bgLum = getLuminance(background);
  // Decide whether to push foreground lighter or darker relative to the bg.
  const shouldLighten = bgLum < 0.5;

  let candidate = foreground;
  for (let step = 2; step <= 100; step += 2) {
    candidate = shouldLighten ? lighten(foreground, step) : darken(foreground, step);
    if (getContrastRatio(background, candidate) >= target) {
      return candidate;
    }
  }

  // Last resort: pure black or white.
  return getContrastText(background);
}

const SHADE_ORDER: ShadeKey[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * Finds the first shade in a palette that meets WCAG contrast against
 * `background`. Prefers shades near 500, then walks outward.
 *
 * @example
 * findAccessibleShade(blue, colors.white)
 */
export function findAccessibleShade(
  palette: ColorShades,
  background: ColorValue,
  options: ContrastFixOptions = {}
): ColorValue {
  // Prefer mid tones first, then walk toward extremes.
  const preference: ShadeKey[] = [500, 600, 400, 700, 300, 800, 200, 900, 100, 950, 50];
  for (const key of preference) {
    if (meetsContrastGuidelines(background, palette[key], options)) {
      return palette[key];
    }
  }

  // Nothing in the palette passes — return the shade with the best ratio.
  let best = palette[500];
  let bestRatio = 0;
  for (const key of SHADE_ORDER) {
    const ratio = getContrastRatio(background, palette[key]);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = palette[key];
    }
  }
  return best;
}
