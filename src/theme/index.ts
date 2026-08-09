import type { SemanticColors, SemanticColorOverrides, ThemePalette } from "../types";
import { blue, gray, green, amber, red, sky } from "../colors/basic";
import { white } from "../colors/neutrals";

/** Default semantic color tokens, independent of light/dark mode. */
export const defaultSemanticColors: SemanticColors = {
  primary: blue[600],
  secondary: sky[500],
  success: green[600],
  warning: amber[500],
  error: red[600],
  info: sky[600],
  background: white,
  surface: gray[50],
  text: gray[900],
  muted: gray[500],
  border: gray[200],
};

export const semantic: SemanticColors = { ...defaultSemanticColors };

/**
 * Creates a semantic color set by overriding any subset of the defaults.
 *
 * @example
 * const mySemantics = createTheme({
 *   primary: "#7C3AED",
 *   success: "#16A34A",
 *   error: "#DC2626",
 * });
 */
export function createTheme(overrides: SemanticColorOverrides = {}): SemanticColors {
  return { ...defaultSemanticColors, ...overrides };
}

/** Light theme palette — sensible defaults for a light-mode UI. */
export const light: ThemePalette = {
  background: white,
  surface: gray[50],
  text: gray[900],
  textMuted: gray[500],
  border: gray[200],
  primary: blue[600],
  secondary: sky[500],
  success: green[600],
  warning: amber[500],
  error: red[600],
  info: sky[600],
};

/** Dark theme palette — sensible defaults for a dark-mode UI. */
export const dark: ThemePalette = {
  background: gray[950],
  surface: gray[900],
  text: gray[50],
  textMuted: gray[400],
  border: gray[800],
  primary: blue[400],
  secondary: sky[400],
  success: green[400],
  warning: amber[400],
  error: red[400],
  info: sky[400],
};

/**
 * Creates a custom theme palette by overriding any subset of a base
 * (light or dark) palette.
 *
 * @example
 * const myDarkTheme = createThemePalette(dark, { primary: "#7C3AED" });
 */
export function createThemePalette(
  base: ThemePalette,
  overrides: Partial<ThemePalette> = {}
): ThemePalette {
  return { ...base, ...overrides };
}
