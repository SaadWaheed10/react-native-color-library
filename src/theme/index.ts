import type {
  BrandThemes,
  ColorValue,
  SemanticColors,
  SemanticColorOverrides,
  ThemePalette,
} from "../types";
import { blue, gray, green, amber, red, sky } from "../colors/basic";
import { white } from "../colors/neutrals";
import { createPalette } from "../utilities/palette";
import { createHarmony } from "../utilities/harmony";
import { hexToHsl, hslToHex } from "../utilities/colorConversion";
import { ensureContrast } from "../utilities/contrast";

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

function withLightness(color: ColorValue, lightness: number): ColorValue {
  const hsl = hexToHsl(color);
  return hslToHex({ ...hsl, l: Math.min(100, Math.max(0, lightness)) });
}

/**
 * Builds paired light + dark theme palettes from a single brand color.
 * Primary/secondary/success/warning/error/info are derived from the brand
 * and classic harmonies; surfaces/text follow standard light/dark defaults.
 *
 * @example
 * const themes = createBrandThemes("#7C3AED");
 * themes.light.primary
 * themes.dark.background
 */
export function createBrandThemes(
  brandColor: ColorValue,
  overrides: { light?: Partial<ThemePalette>; dark?: Partial<ThemePalette> } = {}
): BrandThemes {
  const palette = createPalette(brandColor);
  const complementary = createHarmony(brandColor, "complementary");
  const secondary = complementary[1] ?? sky[500];
  const analogous = createHarmony(brandColor, "analogous");
  const infoBase = analogous[2] ?? sky[500];

  const lightTheme: ThemePalette = {
    background: white,
    surface: gray[50],
    text: ensureContrast(white, gray[900]),
    textMuted: gray[500],
    border: gray[200],
    primary: palette[600],
    secondary,
    success: green[600],
    warning: amber[500],
    error: red[600],
    info: infoBase,
    ...overrides.light,
  };

  const darkTheme: ThemePalette = {
    background: gray[950],
    surface: gray[900],
    text: ensureContrast(gray[950], gray[50]),
    textMuted: gray[400],
    border: gray[800],
    primary: palette[400],
    secondary: withLightness(secondary, 65),
    success: green[400],
    warning: amber[400],
    error: red[400],
    info: withLightness(infoBase, 65),
    ...overrides.dark,
  };

  return { light: lightTheme, dark: darkTheme };
}
