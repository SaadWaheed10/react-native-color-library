import { useMemo, type ReactNode } from "react";
import type { AppTheme, ThemeContextValue } from "../types";
import { ThemeContext, useTheme } from "./ThemeContext";
import { mergeFonts } from "./fonts";
import { mergeDesignTokens } from "./designTokens";

export interface ThemeScopeProps {
  children: ReactNode;
  /**
   * Partial override merged onto the parent active theme.
   * Useful for branded sections (checkout, onboarding) without remounting the app.
   */
  theme?: Partial<AppTheme> & {
    colors?: Partial<AppTheme["colors"]>;
    fonts?: Parameters<typeof mergeFonts>[1];
    spacing?: Partial<AppTheme["spacing"]>;
    radius?: Partial<AppTheme["radius"]>;
    opacity?: Partial<AppTheme["opacity"]>;
    zIndex?: Partial<AppTheme["zIndex"]>;
    elevation?: Partial<AppTheme["elevation"]>;
  };
}

/**
 * Nested theme scope — overrides colors/fonts/tokens for a subtree.
 *
 * @example
 * <ThemeScope theme={{ colors: { primary: "#16a34a" } }}>
 *   <CheckoutScreen />
 * </ThemeScope>
 */
export function ThemeScope({ children, theme: overrides = {} }: ThemeScopeProps) {
  const parent = useTheme();

  const value = useMemo<ThemeContextValue>(() => {
    const merged: AppTheme = {
      colors: { ...parent.theme.colors, ...overrides.colors },
      fonts: mergeFonts(parent.theme.fonts, overrides.fonts),
      spacing: { ...parent.theme.spacing, ...overrides.spacing },
      radius: { ...parent.theme.radius, ...overrides.radius },
      opacity: { ...parent.theme.opacity, ...overrides.opacity },
      zIndex: { ...parent.theme.zIndex, ...overrides.zIndex },
      elevation: { ...parent.theme.elevation, ...overrides.elevation },
    };

    // Re-merge design tokens if partial token groups were passed via spacing etc.
    const tokens = mergeDesignTokens(
      {
        spacing: parent.theme.spacing,
        radius: parent.theme.radius,
        opacity: parent.theme.opacity,
        zIndex: parent.theme.zIndex,
        elevation: parent.theme.elevation,
      },
      {
        spacing: overrides.spacing,
        radius: overrides.radius,
        opacity: overrides.opacity,
        zIndex: overrides.zIndex,
        elevation: overrides.elevation,
      }
    );

    const active: AppTheme = {
      ...merged,
      spacing: tokens.spacing,
      radius: tokens.radius,
      opacity: tokens.opacity,
      zIndex: tokens.zIndex,
      elevation: tokens.elevation,
    };

    return {
      ...parent,
      theme: active,
      colors: active.colors,
      fonts: active.fonts,
      spacing: active.spacing,
      radius: active.radius,
      opacity: active.opacity,
      zIndex: active.zIndex,
      elevation: active.elevation,
    };
  }, [parent, overrides]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
