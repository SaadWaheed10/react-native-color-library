import type { ColorValue } from "../types";
import { hexToHsl, hslToHex, hexToRgb, rgbToHex, parseColor } from "./colorConversion";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Lightens a color by `amount` percentage points (0–100) in HSL space. */
export function lighten(color: ColorValue, amount: number): ColorValue {
  const hsl = hexToHsl(color);
  return hslToHex({ ...hsl, l: clamp(hsl.l + amount, 0, 100) });
}

/** Darkens a color by `amount` percentage points (0–100) in HSL space. */
export function darken(color: ColorValue, amount: number): ColorValue {
  const hsl = hexToHsl(color);
  return hslToHex({ ...hsl, l: clamp(hsl.l - amount, 0, 100) });
}

/** Returns the color as an `rgba(...)` string at the given opacity (0–1). */
export function alpha(color: ColorValue, opacityValue: number): ColorValue {
  const { r, g, b } = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${clamp(opacityValue, 0, 1)})`;
}

/**
 * Linearly interpolates between two colors in RGB space.
 * `weight` is the proportion of `colorB` in the result (0–1, default 0.5).
 */
export function mix(colorA: ColorValue, colorB: ColorValue, weight = 0.5): ColorValue {
  const w = clamp(weight, 0, 1);
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);

  return rgbToHex({
    r: Math.round(a.r + (b.r - a.r) * w),
    g: Math.round(a.g + (b.g - a.g) * w),
    b: Math.round(a.b + (b.b - a.b) * w),
  });
}

/** Returns the RGB-inverted (negative) version of a color. */
export function invert(color: ColorValue): ColorValue {
  const { r, g, b } = hexToRgb(color);
  return rgbToHex({ r: 255 - r, g: 255 - g, b: 255 - b });
}

/** Returns the desaturated (grayscale) version of a color, luminance-preserved. */
export function grayscale(color: ColorValue): ColorValue {
  const { r, g, b } = hexToRgb(color);
  // Rec. 601 luma weights.
  const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  return rgbToHex({ r: gray, g: gray, b: gray });
}

/** Increases saturation by `amount` percentage points (0–100). */
export function saturate(color: ColorValue, amount: number): ColorValue {
  const hsl = hexToHsl(color);
  return hslToHex({ ...hsl, s: clamp(hsl.s + amount, 0, 100) });
}

/** Decreases saturation by `amount` percentage points (0–100). */
export function desaturate(color: ColorValue, amount: number): ColorValue {
  const hsl = hexToHsl(color);
  return hslToHex({ ...hsl, s: clamp(hsl.s - amount, 0, 100) });
}
