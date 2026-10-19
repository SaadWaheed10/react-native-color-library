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

/** OKLab color space — perceptually uniform (`L` 0–1, `a`/`b` roughly −0.4–0.4). */
export interface OKLab {
  L: number;
  a: number;
  b: number;
}

/** OKLCH color space (`L` 0–1, `C` chroma ≥ 0, `h` hue in degrees). */
export interface OKLCH {
  L: number;
  C: number;
  h: number;
}

/** Supported color-harmony schemes for `createHarmony`. */
export type HarmonyType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "split-complementary";

/** Color-vision-deficiency types for `simulateColorBlindness`. */
export type ColorBlindnessType = "deuteranopia" | "protanopia" | "tritanopia";

/** Result returned by `nearestColor`. */
export interface NearestColorMatch {
  name: string;
  shade?: ShadeKey;
  value: ColorValue;
  distance: number;
}

/** Paired light/dark theme palettes from `createBrandThemes`. */
export interface BrandThemes {
  light: ThemePalette;
  dark: ThemePalette;
}

/** Options for contrast auto-fix helpers. */
export interface ContrastFixOptions {
  level?: "AA" | "AAA";
  largeText?: boolean;
}

/** Named UI surface/overlay tokens. */
export interface UITokens {
  scrim: ColorValue;
  overlay: ColorValue;
  shadow: ColorValue;
  glass: ColorValue;
  highlight: ColorValue;
  focusRing: ColorValue;
}

/** Ready-made chart color sets. */
export interface ChartPalettes {
  sequential: ColorValue[];
  sequentialWarm: ColorValue[];
  sequentialCool: ColorValue[];
  diverging: ColorValue[];
  categorical: {
    3: ColorValue[];
    4: ColorValue[];
    5: ColorValue[];
    6: ColorValue[];
    8: ColorValue[];
    10: ColorValue[];
  };
}

/** Resolved color scheme used by the live theme. */
export type ThemeMode = "light" | "dark";

/**
 * Preference for which scheme to use.
 * `"system"` follows the device setting via React Native's `Appearance` API.
 */
export type ThemeModePreference = ThemeMode | "system";

/** Font family tokens — can differ between light and dark themes. */
export interface FontFamilyTokens {
  /** Primary UI font (body / labels). */
  sans: string;
  /** Optional serif for long-form or headings. */
  serif: string;
  /** Monospace for code / tabular data. */
  mono: string;
}

/** Numeric font-size scale (dp). */
export interface FontSizeTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
}

/** Font-weight tokens as strings accepted by React Native `Text`. */
export interface FontWeightTokens {
  regular: "400" | "500" | "normal";
  medium: "500" | "600";
  semibold: "600" | "700";
  bold: "700" | "bold";
}

/** Line-height multipliers (multiply by font size at use site if needed). */
export interface LineHeightTokens {
  tight: number;
  normal: number;
  relaxed: number;
}

/** Complete typography token set for one mode. */
export interface FontTokens {
  family: FontFamilyTokens;
  sizes: FontSizeTokens;
  weights: FontWeightTokens;
  lineHeights: LineHeightTokens;
}

/** Spacing scale (dp). */
export interface SpacingTokens {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
}

/** Border-radius scale (dp). */
export interface RadiusTokens {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

/** Opacity scale (0–1). */
export interface OpacityTokens {
  disabled: number;
  muted: number;
  overlay: number;
  subtle: number;
  solid: number;
}

/** Z-index scale for stacking. */
export interface ZIndexTokens {
  base: number;
  dropdown: number;
  sticky: number;
  modal: number;
  toast: number;
  tooltip: number;
}

/** Cross-platform shadow / elevation token. */
export interface ShadowToken {
  shadowColor: ColorValue;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

/** Elevation ladder (`none` → `xl`). */
export interface ElevationTokens {
  none: ShadowToken;
  sm: ShadowToken;
  md: ShadowToken;
  lg: ShadowToken;
  xl: ShadowToken;
}

/** Full non-color design-token set for one mode. */
export interface DesignTokens {
  spacing: SpacingTokens;
  radius: RadiusTokens;
  opacity: OpacityTokens;
  zIndex: ZIndexTokens;
  elevation: ElevationTokens;
}

/**
 * Active theme snapshot — colors, fonts, and design tokens for the current mode.
 * Extra color keys are allowed for app-specific tokens.
 */
export interface AppTheme {
  colors: ThemePalette & Record<string, ColorValue>;
  fonts: FontTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  opacity: OpacityTokens;
  zIndex: ZIndexTokens;
  elevation: ElevationTokens;
}

/** Paired light/dark app themes consumed by `ThemeProvider`. */
export interface AppThemeConfig {
  light: AppTheme;
  dark: AppTheme;
}

/** Partial design-token overrides. */
export type DeepPartialDesignTokens = {
  spacing?: Partial<SpacingTokens>;
  radius?: Partial<RadiusTokens>;
  opacity?: Partial<OpacityTokens>;
  zIndex?: Partial<ZIndexTokens>;
  elevation?: Partial<ElevationTokens>;
};

/** Overrides accepted by `createAppTheme`. */
export interface CreateAppThemeOptions {
  /** Optional brand color — seeds primary (and related) via `createBrandThemes`. */
  brand?: ColorValue;
  /** Apply night-shift (warmer) tones to the dark palette. */
  nightShift?: boolean | { amount?: number };
  /** Force high-contrast AA/AAA-friendly surfaces and text. */
  highContrast?: boolean;
  light?: {
    colors?: Partial<ThemePalette> & Record<string, ColorValue>;
    fonts?: DeepPartialFonts;
    tokens?: DeepPartialDesignTokens;
  };
  dark?: {
    colors?: Partial<ThemePalette> & Record<string, ColorValue>;
    fonts?: DeepPartialFonts;
    tokens?: DeepPartialDesignTokens;
  };
  /** Shared font overrides applied to both modes (mode-specific wins). */
  fonts?: DeepPartialFonts;
  /** Shared design-token overrides for both modes. */
  tokens?: DeepPartialDesignTokens;
}

/** Partial font overrides for `createAppTheme`. */
export type DeepPartialFonts = {
  family?: Partial<FontFamilyTokens>;
  sizes?: Partial<FontSizeTokens>;
  weights?: Partial<FontWeightTokens>;
  lineHeights?: Partial<LineHeightTokens>;
};

/** Named built-in theme preset ids. */
export type ThemePresetId =
  | "minimal"
  | "vibrant"
  | "oled"
  | "highContrast"
  | "soft"
  | "midnight";

/** Value returned by `useTheme()`. */
export interface ThemeContextValue {
  /** Resolved mode after applying `"system"` preference. */
  mode: ThemeMode;
  /** User/system preference (`"light"` | `"dark"` | `"system"`). */
  preference: ThemeModePreference;
  /** Active theme tokens for the resolved mode. */
  theme: AppTheme;
  /** Shortcut for `theme.colors`. */
  colors: AppTheme["colors"];
  /** Shortcut for `theme.fonts`. */
  fonts: FontTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  opacity: OpacityTokens;
  zIndex: ZIndexTokens;
  elevation: ElevationTokens;
  /** `true` when resolved mode is dark. */
  isDark: boolean;
  /** Flip between light and dark (exits `"system"` preference). */
  toggle: () => void;
  /** Set preference explicitly. */
  setMode: (mode: ThemeModePreference) => void;
}

/** HSV color model (`h` 0–360, `s`/`v` 0–100). */
export interface HSV {
  h: number;
  s: number;
  v: number;
}

/** Display-P3 color (channels 0–1). */
export interface P3Color {
  r: number;
  g: number;
  b: number;
}

/** Result of auditing a theme / color pair for WCAG issues. */
export interface ContrastIssue {
  pair: string;
  foreground: ColorValue;
  background: ColorValue;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  suggestion?: ColorValue;
}

export interface ThemeAuditReport {
  score: number;
  issues: ContrastIssue[];
  passed: number;
  failed: number;
}

/** Async storage adapter for `usePersistedTheme` (AsyncStorage, MMKV, etc.). */
export interface ThemeStorage {
  getItem: (key: string) => Promise<string | null> | string | null;
  setItem: (key: string, value: string) => Promise<void> | void;
}

/** Time-of-day theme segment. */
export type TimeOfDay = "morning" | "day" | "evening" | "night";

/** Material You–style dynamic color scheme from a seed. */
export interface DynamicColorScheme {
  seed: ColorValue;
  primary: ColorShades;
  secondary: ColorShades;
  tertiary: ColorShades;
  neutral: ColorShades;
  light: ThemePalette;
  dark: ThemePalette;
}

/** Style Dictionary–compatible token export shape. */
export interface ExportedTokens {
  color: Record<string, { value: ColorValue }>;
  font: Record<string, { value: string | number }>;
  spacing: Record<string, { value: number }>;
  radius: Record<string, { value: number }>;
  opacity: Record<string, { value: number }>;
  zIndex: Record<string, { value: number }>;
}

/** Skia-friendly gradient stop. */
export interface SkiaGradientStop {
  color: ColorValue;
  position: number;
}

/** Skia linear / radial / sweep gradient configs (data only — no Skia import). */
export interface SkiaLinearGradient {
  type: "linear";
  start: { x: number; y: number };
  end: { x: number; y: number };
  colors: ColorValue[];
  positions?: number[];
}

export interface SkiaRadialGradient {
  type: "radial";
  center: { x: number; y: number };
  radius: number;
  colors: ColorValue[];
  positions?: number[];
}

export interface SkiaSweepGradient {
  type: "sweep";
  center: { x: number; y: number };
  colors: ColorValue[];
  positions?: number[];
}

export type SkiaGradientConfig =
  | SkiaLinearGradient
  | SkiaRadialGradient
  | SkiaSweepGradient;
