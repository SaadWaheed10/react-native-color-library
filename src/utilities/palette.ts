import type { ColorShades, ColorValue } from "../types";
import { mix } from "./colorManipulation";
import { createColor } from "./createColor";

const WHITE = "#ffffff";
const BLACK = "#000000";

// How much white/black to mix into the base color for each shade.
// Shades lighter than 500 mix toward white; shades darker mix toward black.
// 500 is always the (normalized) input color itself.
const LIGHTEN_WEIGHTS: Record<50 | 100 | 200 | 300 | 400, number> = {
  50: 0.95,
  100: 0.89,
  200: 0.74,
  300: 0.58,
  400: 0.32,
};

const DARKEN_WEIGHTS: Record<600 | 700 | 800 | 900 | 950, number> = {
  600: 0.16,
  700: 0.32,
  800: 0.46,
  900: 0.6,
  950: 0.76,
};

/**
 * Generates a complete 50–950 shade scale from a single brand color.
 * The input color becomes shade `500`; lighter/darker shades are
 * derived by mixing toward white/black respectively.
 *
 * @example
 * const brand = createPalette("#7C3AED");
 * brand[500] // "#7c3aed" (the input, normalized)
 * brand[50]  // a near-white tint of the same hue
 * brand[900] // a near-black shade of the same hue
 */
export function createPalette(baseColor: ColorValue): ColorShades {
  const base = createColor(baseColor);

  const shades = {} as ColorShades;

  (Object.keys(LIGHTEN_WEIGHTS) as unknown as Array<keyof typeof LIGHTEN_WEIGHTS>).forEach(
    (key) => {
      shades[key] = mix(base, WHITE, LIGHTEN_WEIGHTS[key]);
    }
  );

  shades[500] = base;

  (Object.keys(DARKEN_WEIGHTS) as unknown as Array<keyof typeof DARKEN_WEIGHTS>).forEach(
    (key) => {
      shades[key] = mix(base, BLACK, DARKEN_WEIGHTS[key]);
    }
  );

  return shades;
}
