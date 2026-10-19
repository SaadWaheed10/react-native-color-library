import type { ColorValue, ThemePalette } from "../types";
import { warmer, desaturate } from "../utilities/colorManipulation";

/**
 * Warms a color toward amber/orange (blue-light reduction / "night shift").
 * `amount` is hue-shift strength (default 18).
 */
export function applyNightShift(color: ColorValue, amount = 18): ColorValue {
  return desaturate(warmer(color, amount), amount * 0.15);
}

/**
 * Applies night-shift to a full theme palette (keeps text/background readable).
 */
export function nightShiftPalette(
  palette: ThemePalette,
  amount = 18
): ThemePalette {
  return {
    ...palette,
    background: applyNightShift(palette.background, amount * 0.35),
    surface: applyNightShift(palette.surface, amount * 0.45),
    primary: applyNightShift(palette.primary, amount),
    secondary: applyNightShift(palette.secondary, amount),
    success: applyNightShift(palette.success, amount * 0.6),
    warning: applyNightShift(palette.warning, amount * 0.4),
    error: applyNightShift(palette.error, amount * 0.5),
    info: applyNightShift(palette.info, amount),
    border: applyNightShift(palette.border, amount * 0.4),
    // Keep text mostly neutral for readability
    text: palette.text,
    textMuted: palette.textMuted,
  };
}
