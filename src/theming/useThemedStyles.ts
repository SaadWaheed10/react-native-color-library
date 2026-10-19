import { useMemo } from "react";
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from "react-native";
import type { AppTheme } from "../types";
import { useTheme } from "./ThemeContext";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Build `StyleSheet` styles from the active theme.
 * Recomputes when light/dark mode (or theme tokens) change.
 *
 * @example
 * const styles = useThemedStyles((t) => ({
 *   screen: { flex: 1, backgroundColor: t.colors.background },
 *   title: {
 *     color: t.colors.text,
 *     fontFamily: t.fonts.family.sans,
 *     fontSize: t.fonts.sizes.xl,
 *     fontWeight: t.fonts.weights.bold,
 *   },
 * }));
 */
export function useThemedStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  factory: (theme: AppTheme) => T
): T {
  const { theme, mode } = useTheme();
  // `factory` is intentionally omitted from deps — callers pass an inline
  // function; recomputation is driven by theme / mode changes.
  return useMemo(() => StyleSheet.create(factory(theme)), [theme, mode]);
}
