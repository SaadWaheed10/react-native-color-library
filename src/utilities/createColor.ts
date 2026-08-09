import type { ColorValue } from "../types";
import { parseColor, rgbToHex } from "./colorConversion";

/**
 * Normalizes any supported color input (hex, `rgb()`, `rgba()`) into a
 * value that's directly usable inside `StyleSheet.create()`. Colors
 * with an alpha channel are returned as `rgba(...)`; fully opaque
 * colors are returned as `#rrggbb`.
 */
export function createColor(input: ColorValue): ColorValue {
  const { r, g, b, a } = parseColor(input);
  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return rgbToHex({ r, g, b });
}
