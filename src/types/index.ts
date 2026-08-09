/**
 * A hex, rgb(), or rgba() color string — anything React Native's
 * StyleSheet accepts as a `color` / `backgroundColor` value.
 */
export type ColorValue = string;

/** The standard shade scale used across every palette (Tailwind-style). */
export interface ColorShades {
  50: ColorValue;
  100: ColorValue;
  200: ColorValue;
  300: ColorValue;
  400: ColorValue;
  500: ColorValue;
  600: ColorValue;
  700: ColorValue;
  800: ColorValue;
  900: ColorValue;
  950: ColorValue;
}

export type ShadeKey = keyof ColorShades;

/** A single point used for gradient direction, in the 0–1 unit square. */
export interface GradientPoint {
  x: number;
  y: number;
}

/**
 * A gradient configuration compatible with `react-native-linear-gradient`
 * and similar libraries (spread directly as props via `{...gradient}`).
 */
export interface GradientConfig {
  colors: ColorValue[];
  start?: GradientPoint;
  end?: GradientPoint;
  locations?: number[];
}

export interface CreateGradientOptions {
  colors: ColorValue[];
  start?: GradientPoint;
  end?: GradientPoint;
  locations?: number[];
}

export interface SemanticColors {
  primary: ColorValue;
  secondary: ColorValue;
  success: ColorValue;
  warning: ColorValue;
  error: ColorValue;
  info: ColorValue;
  background: ColorValue;
  surface: ColorValue;
  text: ColorValue;
  muted: ColorValue;
  border: ColorValue;
}

export type SemanticColorOverrides = Partial<SemanticColors>;

export interface ThemePalette {
  background: ColorValue;
  surface: ColorValue;
  text: ColorValue;
  textMuted: ColorValue;
  border: ColorValue;
  primary: ColorValue;
  secondary: ColorValue;
  success: ColorValue;
  warning: ColorValue;
  error: ColorValue;
  info: ColorValue;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}
