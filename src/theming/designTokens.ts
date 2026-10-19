import type {
  DeepPartialDesignTokens,
  DesignTokens,
  ElevationTokens,
  OpacityTokens,
  RadiusTokens,
  ShadowToken,
  SpacingTokens,
  ZIndexTokens,
  ColorValue,
} from "../types";

export const defaultSpacing: SpacingTokens = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
};

export const defaultRadius: RadiusTokens = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const defaultOpacity: OpacityTokens = {
  disabled: 0.4,
  muted: 0.6,
  overlay: 0.5,
  subtle: 0.08,
  solid: 1,
};

export const defaultZIndex: ZIndexTokens = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 100,
  toast: 200,
  tooltip: 300,
};

function shadow(
  color: ColorValue,
  offsetY: number,
  opacity: number,
  radius: number,
  elevation: number
): ShadowToken {
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
}

/** Light-mode elevation — soft dark shadows. */
export const lightElevation: ElevationTokens = {
  none: shadow("#000000", 0, 0, 0, 0),
  sm: shadow("#000000", 1, 0.08, 2, 1),
  md: shadow("#000000", 2, 0.12, 6, 3),
  lg: shadow("#000000", 4, 0.16, 12, 6),
  xl: shadow("#000000", 8, 0.2, 24, 12),
};

/** Dark-mode elevation — deeper shadows so cards still lift on dark surfaces. */
export const darkElevation: ElevationTokens = {
  none: shadow("#000000", 0, 0, 0, 0),
  sm: shadow("#000000", 1, 0.35, 3, 2),
  md: shadow("#000000", 3, 0.45, 8, 4),
  lg: shadow("#000000", 6, 0.55, 16, 8),
  xl: shadow("#000000", 10, 0.65, 28, 16),
};

export const defaultLightTokens: DesignTokens = {
  spacing: defaultSpacing,
  radius: defaultRadius,
  opacity: defaultOpacity,
  zIndex: defaultZIndex,
  elevation: lightElevation,
};

export const defaultDarkTokens: DesignTokens = {
  spacing: defaultSpacing,
  radius: defaultRadius,
  opacity: defaultOpacity,
  zIndex: defaultZIndex,
  elevation: darkElevation,
};

/** Deep-merges partial design-token overrides onto a base set. */
export function mergeDesignTokens(
  base: DesignTokens,
  overrides?: DeepPartialDesignTokens
): DesignTokens {
  if (!overrides) return base;
  return {
    spacing: { ...base.spacing, ...overrides.spacing },
    radius: { ...base.radius, ...overrides.radius },
    opacity: { ...base.opacity, ...overrides.opacity },
    zIndex: { ...base.zIndex, ...overrides.zIndex },
    elevation: { ...base.elevation, ...overrides.elevation },
  };
}
