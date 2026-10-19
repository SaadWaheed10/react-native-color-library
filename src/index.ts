// Colors
export {
  colors,
  slate, gray, zinc, neutral, stone,
  red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky,
  blue, indigo, violet, purple, fuchsia, pink, rose,
  named,
  material,
  white, black, transparent, current,
} from "./colors";

// Gradients (+ Skia helpers)
export {
  gradients,
  createGradient,
  createSkiaLinearGradient,
  createSkiaRadialGradient,
  createSkiaSweepGradient,
  createSkiaMeshStops,
  toSkiaLinear,
} from "./gradients";

// Charts & UI tokens
export { charts } from "./charts";
export { tokens, createTokens, overlays } from "./tokens";

// Utilities: creation
export { createColor, createPalette, randomPalette } from "./utilities";

// Utilities: conversion
export {
  hexToRgb,
  rgbToHex,
  hexToRgba,
  rgbaToHex,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  parseColor,
} from "./utilities";

// Utilities: OKLCH / OKLab
export {
  rgbToOklab,
  oklabToRgb,
  oklabToOklch,
  oklchToOklab,
  hexToOklch,
  oklchToHex,
  hexToOklab,
  oklabToHex,
  lightenOklch,
  darkenOklch,
  createPaletteOklch,
} from "./utilities";

// Utilities: manipulation
export {
  lighten,
  darken,
  alpha,
  mix,
  invert,
  grayscale,
  saturate,
  desaturate,
  rotateHue,
  setHue,
  warmer,
  cooler,
  randomColor,
} from "./utilities";

// Utilities: contrast / accessibility
export {
  getLuminance,
  isLight,
  isDark,
  getContrastRatio,
  getContrastText,
  meetsContrastGuidelines,
  ensureContrast,
  findAccessibleShade,
} from "./utilities";

// Utilities: harmony, colorblind, nearest
export { createHarmony } from "./utilities";
export { simulateColorBlindness } from "./utilities";
export { deltaE, nearestColor } from "./utilities";

// Utilities: HSV, P3, palette extract, audit, dynamic color, export
export {
  rgbToHsv,
  hsvToRgb,
  hexToHsv,
  hsvToHex,
  hsvFromPickerCoords,
  hueFromWheelAngle,
  hexToP3,
  p3ToHex,
  toP3CssString,
  isWideGamutCandidate,
  extractPaletteFromPixels,
  auditTheme,
  auditColorPairs,
  createDynamicColorScheme,
  exportStyleDictionaryTokens,
  exportThemeConfigTokens,
  exportCssVariables,
} from "./utilities";

// Theme (static palettes)
export {
  semantic,
  createTheme,
  light,
  dark,
  createThemePalette,
  createBrandThemes,
  defaultSemanticColors,
} from "./theme";

// Live theming
export {
  createAppTheme,
  defaultAppTheme,
  defaultFonts,
  mergeFonts,
  defaultSpacing,
  defaultRadius,
  defaultOpacity,
  defaultZIndex,
  lightElevation,
  darkElevation,
  mergeDesignTokens,
  themePresets,
  getThemePreset,
  applyNightShift,
  nightShiftPalette,
  highContrastPalette,
  applyHighContrast,
  ThemeProvider,
  resolveThemeMode,
  useTheme,
  useThemedStyles,
  ThemeToggle,
  ThemeContext,
  ThemeScope,
  ThemedView,
  ThemedText,
  ThemedStatusBar,
  usePersistedTheme,
  AnimatedThemeView,
  getThemeTransitionColors,
  useTimeBasedTheme,
  resolveTimeOfDay,
  ContrastPreview,
  previewContrastRatio,
} from "./theming";
export type {
  ThemeProviderProps,
  ThemeToggleProps,
  ThemeScopeProps,
  ThemedViewProps,
  ThemedTextProps,
  UsePersistedThemeOptions,
  AnimatedThemeViewProps,
  TimeBasedThemeOptions,
  ContrastPreviewProps,
} from "./theming";

// Types
export type {
  ColorValue,
  ColorShades,
  ShadeKey,
  GradientPoint,
  GradientConfig,
  CreateGradientOptions,
  SemanticColors,
  SemanticColorOverrides,
  ThemePalette,
  RGB,
  RGBA,
  HSL,
  OKLab,
  OKLCH,
  HarmonyType,
  ColorBlindnessType,
  NearestColorMatch,
  BrandThemes,
  ContrastFixOptions,
  UITokens,
  ChartPalettes,
  ThemeMode,
  ThemeModePreference,
  FontFamilyTokens,
  FontSizeTokens,
  FontWeightTokens,
  LineHeightTokens,
  FontTokens,
  SpacingTokens,
  RadiusTokens,
  OpacityTokens,
  ZIndexTokens,
  ShadowToken,
  ElevationTokens,
  DesignTokens,
  AppTheme,
  AppThemeConfig,
  CreateAppThemeOptions,
  DeepPartialFonts,
  DeepPartialDesignTokens,
  ThemePresetId,
  ThemeContextValue,
  HSV,
  P3Color,
  ContrastIssue,
  ThemeAuditReport,
  ThemeStorage,
  TimeOfDay,
  DynamicColorScheme,
  ExportedTokens,
  SkiaGradientStop,
  SkiaLinearGradient,
  SkiaRadialGradient,
  SkiaSweepGradient,
  SkiaGradientConfig,
} from "./types";
