import type { ColorValue, ColorShades, OKLab, OKLCH, RGB } from "../types";
import { hexToRgb, rgbToHex } from "./colorConversion";
import { createColor } from "./createColor";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return clamp(Math.round(v * 255), 0, 255);
}

/** Converts sRGB (0–255) to OKLab. */
export function rgbToOklab({ r, g, b }: RGB): OKLab {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

/** Converts OKLab to sRGB (0–255). */
export function oklabToRgb({ L, a, b }: OKLab): RGB {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return {
    r: linearToSrgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  };
}

/** Converts OKLab to OKLCH. */
export function oklabToOklch({ L, a, b }: OKLab): OKLCH {
  const C = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { L, C, h: C < 1e-8 ? 0 : h };
}

/** Converts OKLCH to OKLab. */
export function oklchToOklab({ L, C, h }: OKLCH): OKLab {
  const hr = (h * Math.PI) / 180;
  return {
    L,
    a: C * Math.cos(hr),
    b: C * Math.sin(hr),
  };
}

/** Converts a hex/rgb color string to OKLCH. */
export function hexToOklch(color: ColorValue): OKLCH {
  return oklabToOklch(rgbToOklab(hexToRgb(color)));
}

/** Converts OKLCH to a `#rrggbb` hex string. */
export function oklchToHex(oklch: OKLCH): ColorValue {
  return rgbToHex(oklabToRgb(oklchToOklab(oklch)));
}

/** Converts a hex/rgb color string to OKLab. */
export function hexToOklab(color: ColorValue): OKLab {
  return rgbToOklab(hexToRgb(color));
}

/** Converts OKLab to a `#rrggbb` hex string. */
export function oklabToHex(oklab: OKLab): ColorValue {
  return rgbToHex(oklabToRgb(oklab));
}

/**
 * Lightens a color by adjusting OKLCH lightness.
 * `amount` is added to `L` on a 0–1 scale (e.g. `0.1` ≈ 10% lighter).
 */
export function lightenOklch(color: ColorValue, amount: number): ColorValue {
  const oklch = hexToOklch(color);
  return oklchToHex({ ...oklch, L: clamp(oklch.L + amount, 0, 1) });
}

/**
 * Darkens a color by adjusting OKLCH lightness.
 * `amount` is subtracted from `L` on a 0–1 scale (e.g. `0.1` ≈ 10% darker).
 */
export function darkenOklch(color: ColorValue, amount: number): ColorValue {
  const oklch = hexToOklch(color);
  return oklchToHex({ ...oklch, L: clamp(oklch.L - amount, 0, 1) });
}

/**
 * Target OKLCH lightness values for each Tailwind-style shade.
 * Shade 500 keeps the input color's chroma/hue; L is forced to ~0.62
 * only when building other stops — the input itself stays at shade 500.
 */
const SHADE_LIGHTNESS: Record<Exclude<keyof ColorShades, 500>, number> = {
  50: 0.97,
  100: 0.93,
  200: 0.87,
  300: 0.78,
  400: 0.7,
  600: 0.55,
  700: 0.47,
  800: 0.39,
  900: 0.31,
  950: 0.22,
};

/**
 * Generates a 50–950 palette in OKLCH space (perceptually even steps).
 * The input color becomes shade `500`; other shades keep hue/chroma
 * (scaled slightly for very light/dark stops) and vary lightness.
 */
export function createPaletteOklch(baseColor: ColorValue): ColorShades {
  const base = createColor(baseColor);
  const { C, h } = hexToOklch(base);
  const shades = {} as ColorShades;

  (Object.keys(SHADE_LIGHTNESS) as unknown as Array<keyof typeof SHADE_LIGHTNESS>).forEach(
    (key) => {
      const L = SHADE_LIGHTNESS[key];
      // Soften chroma toward extremes so light/dark stops stay natural.
      const chromaScale = L > 0.9 || L < 0.3 ? 0.55 : L > 0.8 || L < 0.4 ? 0.75 : 1;
      shades[key] = oklchToHex({ L, C: C * chromaScale, h });
    }
  );

  shades[500] = base;
  return shades;
}
