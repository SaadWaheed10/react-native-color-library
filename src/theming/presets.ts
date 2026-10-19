import type { AppThemeConfig, ThemePresetId } from "../types";
import { createAppTheme } from "./createAppTheme";

/**
 * Built-in theme packs — ready to pass into `ThemeProvider`.
 *
 * @example
 * <ThemeProvider theme={themePresets.oled}>
 */
export const themePresets: Record<ThemePresetId, AppThemeConfig> = {
  minimal: createAppTheme({
    brand: "#18181b",
    light: {
      colors: {
        background: "#ffffff",
        surface: "#fafafa",
        primary: "#18181b",
        secondary: "#71717a",
      },
    },
    dark: {
      colors: {
        background: "#09090b",
        surface: "#18181b",
        primary: "#fafafa",
        secondary: "#a1a1aa",
      },
    },
  }),

  vibrant: createAppTheme({
    brand: "#7C3AED",
    light: {
      colors: { primary: "#7c3aed", secondary: "#ec4899" },
    },
    dark: {
      colors: { primary: "#a78bfa", secondary: "#f472b6", background: "#0f0720" },
    },
  }),

  oled: createAppTheme({
    brand: "#3b82f6",
    dark: {
      colors: {
        background: "#000000",
        surface: "#0a0a0a",
        border: "#1a1a1a",
        primary: "#60a5fa",
      },
    },
  }),

  highContrast: createAppTheme({
    brand: "#0000ee",
    highContrast: true,
  }),

  soft: createAppTheme({
    brand: "#0d9488",
    light: {
      colors: {
        background: "#f0fdfa",
        surface: "#ccfbf1",
        primary: "#0f766e",
        text: "#134e4a",
      },
      tokens: { radius: { md: 14, lg: 20 } },
    },
    dark: {
      colors: {
        background: "#042f2e",
        surface: "#0f3d3b",
        primary: "#5eead4",
      },
    },
  }),

  midnight: createAppTheme({
    brand: "#6366f1",
    nightShift: true,
    dark: {
      colors: {
        background: "#0b1026",
        surface: "#151b36",
        primary: "#818cf8",
      },
    },
  }),
};

/** Returns a preset by id (throws on unknown id). */
export function getThemePreset(id: ThemePresetId): AppThemeConfig {
  const preset = themePresets[id];
  if (!preset) {
    throw new Error(`[react-native-color-library] Unknown theme preset: "${id}"`);
  }
  return preset;
}
