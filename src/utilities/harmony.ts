import type { ColorValue, HarmonyType } from "../types";
import { hexToHsl, hslToHex } from "./colorConversion";
import { createColor } from "./createColor";

function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function withHue(color: ColorValue, hueOffset: number): ColorValue {
  const hsl = hexToHsl(color);
  return hslToHex({ ...hsl, h: normalizeHue(hsl.h + hueOffset) });
}

/**
 * Generates a color-harmony set from a single base color.
 * The first entry is always the (normalized) base color.
 *
 * @example
 * createHarmony("#7C3AED", "triadic")
 * // → [base, +120°, +240°]
 */
export function createHarmony(baseColor: ColorValue, type: HarmonyType): ColorValue[] {
  const base = createColor(baseColor);

  switch (type) {
    case "complementary":
      return [base, withHue(base, 180)];
    case "analogous":
      return [withHue(base, -30), base, withHue(base, 30)];
    case "triadic":
      return [base, withHue(base, 120), withHue(base, 240)];
    case "tetradic":
      return [base, withHue(base, 90), withHue(base, 180), withHue(base, 270)];
    case "split-complementary":
      return [base, withHue(base, 150), withHue(base, 210)];
    default: {
      const _exhaustive: never = type;
      throw new Error(`[react-native-color-library] Unknown harmony type: "${_exhaustive}"`);
    }
  }
}
