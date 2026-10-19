import type { ColorValue, UITokens } from "../types";
import { blue } from "../colors/basic";
import { white } from "../colors/neutrals";
import { alpha } from "../utilities/colorManipulation";

/**
 * Common UI surface / overlay tokens for modals, glass effects, and focus rings.
 * All values are StyleSheet-compatible `rgba(...)` or hex strings.
 *
 * @example
 * tokens.scrim   // modal backdrop
 * tokens.glass   // frosted surface tint
 * tokens.focusRing
 */
export const tokens: UITokens = {
  scrim: "rgba(0, 0, 0, 0.5)",
  overlay: "rgba(0, 0, 0, 0.4)",
  shadow: "rgba(0, 0, 0, 0.25)",
  glass: "rgba(255, 255, 255, 0.15)",
  highlight: alpha(white, 0.12),
  focusRing: blue[500],
};

/**
 * Builds a custom token set by overriding any subset of the defaults.
 */
export function createTokens(overrides: Partial<UITokens> = {}): UITokens {
  return { ...tokens, ...overrides };
}

/** Convenience aliases for the most common overlay opacities. */
export const overlays = {
  light: alpha(white, 0.08) as ColorValue,
  medium: alpha(white, 0.16) as ColorValue,
  heavy: alpha(white, 0.24) as ColorValue,
  darkLight: "rgba(0, 0, 0, 0.08)" as ColorValue,
  darkMedium: "rgba(0, 0, 0, 0.16)" as ColorValue,
  darkHeavy: "rgba(0, 0, 0, 0.32)" as ColorValue,
};
