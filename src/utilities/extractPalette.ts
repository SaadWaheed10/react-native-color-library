import type { ColorValue } from "../types";
import { rgbToHex } from "./colorConversion";
import { rgbToHsv } from "./hsv";

export interface ExtractPaletteOptions {
  /** Max colors to return (default 5). */
  count?: number;
  /** Skip near-white / near-black samples (default true). */
  ignoreNeutrals?: boolean;
  /** Pixel step — higher = faster, less precise (default 4). */
  quality?: number;
}

interface Bucket {
  r: number;
  g: number;
  b: number;
  count: number;
}

/**
 * Extracts a dominant color palette from raw RGBA pixel data
 * (e.g. from `expo-image-manipulator`, `react-native-canvas`, or a decoded bitmap).
 *
 * @example
 * const palette = extractPaletteFromPixels(pixels, width, height, { count: 5 });
 */
export function extractPaletteFromPixels(
  data: ArrayLike<number>,
  _width: number,
  _height: number,
  options: ExtractPaletteOptions = {}
): ColorValue[] {
  const { count = 5, ignoreNeutrals = true, quality = 4 } = options;
  const step = Math.max(1, Math.floor(quality)) * 4;
  const buckets = new Map<string, Bucket>();

  for (let i = 0; i + 2 < data.length; i += step) {
    const r = data[i] as number;
    const g = data[i + 1] as number;
    const b = data[i + 2] as number;
    const a = data[i + 3] ?? 255;
    if (a < 128) continue;

    if (ignoreNeutrals) {
      const hsv = rgbToHsv({ r, g, b });
      if (hsv.v > 95 && hsv.s < 10) continue;
      if (hsv.v < 8) continue;
    }

    // Quantize to reduce unique keys
    const qr = r >> 4;
    const qg = g >> 4;
    const qb = b >> 4;
    const key = `${qr},${qg},${qb}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.r += r;
      existing.g += g;
      existing.b += b;
      existing.count += 1;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }

  const sorted = [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, count)
    .map((bucket) =>
      rgbToHex({
        r: Math.round(bucket.r / bucket.count),
        g: Math.round(bucket.g / bucket.count),
        b: Math.round(bucket.b / bucket.count),
      })
    );

  return sorted;
}
