import { createContext, useContext } from "react";
import type { ThemeContextValue } from "../types";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Access the active theme, mode, and toggle helpers.
 * Must be used under a `ThemeProvider`.
 *
 * @example
 * const { colors, fonts, isDark, toggle } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "[react-native-color-library] useTheme() must be used within a <ThemeProvider>."
    );
  }
  return ctx;
}
