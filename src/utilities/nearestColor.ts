import type { ColorValue, ColorShades, NearestColorMatch, ShadeKey } from "../types";
import * as basic from "../colors/basic";
import { named } from "../colors/named";
import { hexToRgb } from "./colorConversion";

interface Lab {
  L: number;
  a: number;
  b: number;
}

interface CatalogEntry {
  name: string;
  shade?: ShadeKey;
  value: ColorValue;
}

/** sRGB → CIE Lab (D65), for Delta-E distance. */
function rgbToLab(color: ColorValue): Lab {
  const { r, g, b } = hexToRgb(color);

  const toLinear = (c: number) => {
    const v = c / 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  };

  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);

  // sRGB D65 → XYZ
  let x = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  let y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  let z = R * 0.0193339 + G * 0.119192 + B * 0.9503041;

  // D65 reference white
  x /= 0.95047;
  y /= 1;
  z /= 1.08883;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

/** CIE76 Delta-E — perceptually meaningful distance between two colors. */
export function deltaE(colorA: ColorValue, colorB: ColorValue): number {
  const a = rgbToLab(colorA);
  const b = rgbToLab(colorB);
  const dL = a.L - b.L;
  const da = a.a - b.a;
  const db = a.b - b.b;
  return Math.sqrt(dL * dL + da * da + db * db);
}

const SHADE_KEYS: ShadeKey[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function buildDefaultCatalog(): CatalogEntry[] {
  const entries: CatalogEntry[] = [];

  for (const [familyName, shades] of Object.entries(basic) as Array<[string, ColorShades]>) {
    for (const shade of SHADE_KEYS) {
      entries.push({ name: familyName, shade, value: shades[shade] });
    }
  }

  for (const [name, value] of Object.entries(named)) {
    entries.push({ name, value });
  }

  return entries;
}

let cachedCatalog: CatalogEntry[] | null = null;

function getCatalog(custom?: Record<string, ColorValue> | ColorShades): CatalogEntry[] {
  if (custom) {
    // ColorShades has numeric keys; treat as a shade scale if 500 exists.
    if ("500" in custom || 500 in custom) {
      const shades = custom as ColorShades;
      return SHADE_KEYS.filter((k) => shades[k] !== undefined).map((shade) => ({
        name: "palette",
        shade,
        value: shades[shade],
      }));
    }
    return Object.entries(custom as Record<string, ColorValue>).map(([name, value]) => ({
      name,
      value,
    }));
  }

  if (!cachedCatalog) {
    cachedCatalog = buildDefaultCatalog();
  }
  return cachedCatalog;
}

/**
 * Finds the closest color in the library (shaded families + named colors),
 * or within an optional custom map / shade scale, using CIE76 Delta-E.
 *
 * @example
 * nearestColor("#7B3FE4")
 * // → { name: "violet", shade: 500, value: "#8b5cf6", distance: 4.2 }
 */
export function nearestColor(
  color: ColorValue,
  catalog?: Record<string, ColorValue> | ColorShades
): NearestColorMatch {
  const entries = getCatalog(catalog);
  if (entries.length === 0) {
    throw new Error("[react-native-color-library] nearestColor: empty catalog");
  }

  let best = entries[0] as CatalogEntry;
  let bestDistance = Infinity;

  for (const entry of entries) {
    const distance = deltaE(color, entry.value);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = entry;
    }
  }

  return {
    name: best.name,
    shade: best.shade,
    value: best.value,
    distance: bestDistance,
  };
}
