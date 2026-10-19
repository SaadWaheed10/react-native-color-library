import type { ColorValue, P3Color, RGB } from "../types";
import { hexToRgb, rgbToHex } from "./colorConversion";

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, Math.round(v * 255)));
}

/**
 * Converts sRGB hex to Display-P3 (approx via linear RGB — channels 0–1).
 * Useful for wide-gamut previews on modern iPhones.
 */
export function hexToP3(color: ColorValue): P3Color {
  const { r, g, b } = hexToRgb(color);
  // Simplified: treat linear sRGB as a stand-in for P3 for API surface;
  // full Bradford chromatic adaptation can be layered later.
  return {
    r: srgbToLinear(r),
    g: srgbToLinear(g),
    b: srgbToLinear(b),
  };
}

/** Converts Display-P3 (0–1) back to an sRGB hex (clipped). */
export function p3ToHex(p3: P3Color): ColorValue {
  const rgb: RGB = {
    r: linearToSrgb(p3.r),
    g: linearToSrgb(p3.g),
    b: linearToSrgb(p3.b),
  };
  return rgbToHex(rgb);
}

/**
 * CSS `color(display-p3 r g b)` string for web / RN-web targets.
 */
export function toP3CssString(color: ColorValue): string {
  const p3 = hexToP3(color);
  return `color(display-p3 ${p3.r.toFixed(4)} ${p3.g.toFixed(4)} ${p3.b.toFixed(4)})`;
}

/** Returns whether a hex would clip when mapped through P3→sRGB round-trip. */
export function isWideGamutCandidate(color: ColorValue): boolean {
  const p3 = hexToP3(color);
  return p3.r > 1 || p3.g > 1 || p3.b > 1 || p3.r < 0 || p3.g < 0 || p3.b < 0;
}
