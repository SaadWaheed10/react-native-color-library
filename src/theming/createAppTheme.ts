import type {
  AppTheme,
  AppThemeConfig,
  CreateAppThemeOptions,
  ThemePalette,
} from "../types";
import { light, dark, createBrandThemes } from "../theme";
import { defaultFonts, mergeFonts } from "./fonts";
import {
  defaultDarkTokens,
  defaultLightTokens,
  mergeDesignTokens,
} from "./designTokens";
import { nightShiftPalette } from "./nightShift";
import { applyHighContrast } from "./highContrast";

function mergeColors(
  base: ThemePalette,
  overrides?: Partial<ThemePalette> & Record<string, string>
): ThemePalette & Record<string, string> {
  return { ...base, ...overrides };
}

/**
 * Builds a fully customizable light + dark app theme
 * (colors + fonts + spacing/radius/opacity/zIndex/elevation).
 *
 * @example
 * const theme = createAppTheme({
 *   brand: "#7C3AED",
 *   nightShift: true,
 *   fonts: { family: { sans: "Inter" } },
 *   tokens: { spacing: { md: 20 }, radius: { lg: 16 } },
 * });
 */
export function createAppTheme(options: CreateAppThemeOptions = {}): AppThemeConfig {
  const {
    brand,
    light: lightOverrides,
    dark: darkOverrides,
    fonts: sharedFonts,
    tokens: sharedTokens,
    nightShift,
    highContrast,
  } = options;

  let brandPalettes = brand ? createBrandThemes(brand) : { light, dark };

  if (nightShift) {
    const amount = typeof nightShift === "object" ? nightShift.amount ?? 18 : 18;
    brandPalettes = {
      light: brandPalettes.light,
      dark: nightShiftPalette(brandPalettes.dark, amount),
    };
  }

  const lightFonts = mergeFonts(mergeFonts(defaultFonts, sharedFonts), lightOverrides?.fonts);
  const darkFonts = mergeFonts(mergeFonts(defaultFonts, sharedFonts), darkOverrides?.fonts);

  const lightTokens = mergeDesignTokens(
    mergeDesignTokens(defaultLightTokens, sharedTokens),
    lightOverrides?.tokens
  );
  const darkTokens = mergeDesignTokens(
    mergeDesignTokens(defaultDarkTokens, sharedTokens),
    darkOverrides?.tokens
  );

  let lightTheme: AppTheme = {
    colors: mergeColors(brandPalettes.light, lightOverrides?.colors),
    fonts: lightFonts,
    spacing: lightTokens.spacing,
    radius: lightTokens.radius,
    opacity: lightTokens.opacity,
    zIndex: lightTokens.zIndex,
    elevation: lightTokens.elevation,
  };

  let darkTheme: AppTheme = {
    colors: mergeColors(brandPalettes.dark, darkOverrides?.colors),
    fonts: darkFonts,
    spacing: darkTokens.spacing,
    radius: darkTokens.radius,
    opacity: darkTokens.opacity,
    zIndex: darkTokens.zIndex,
    elevation: darkTokens.elevation,
  };

  if (highContrast) {
    lightTheme = applyHighContrast(lightTheme, "light");
    darkTheme = applyHighContrast(darkTheme, "dark");
  }

  return { light: lightTheme, dark: darkTheme };
}

/** Default app theme used when `ThemeProvider` is given no `theme` prop. */
export const defaultAppTheme: AppThemeConfig = createAppTheme();
