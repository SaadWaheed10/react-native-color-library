import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Appearance, type ColorSchemeName } from "react-native";
import type {
  AppThemeConfig,
  ThemeContextValue,
  ThemeMode,
  ThemeModePreference,
} from "../types";
import { ThemeContext } from "./ThemeContext";
import { defaultAppTheme } from "./createAppTheme";

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: AppThemeConfig;
  defaultMode?: ThemeModePreference;
  mode?: ThemeModePreference;
  onModeChange?: (mode: ThemeModePreference) => void;
}

export function resolveThemeMode(
  preference: ThemeModePreference,
  system: ColorSchemeName
): ThemeMode {
  if (preference === "system") {
    return system === "dark" ? "dark" : "light";
  }
  return preference;
}

/**
 * Wraps your app to enable one-toggle light/dark theming with
 * mode-aware colors, fonts, and design tokens.
 */
export function ThemeProvider({
  children,
  theme = defaultAppTheme,
  defaultMode = "system",
  mode: controlledMode,
  onModeChange,
}: ThemeProviderProps) {
  const isControlled = controlledMode !== undefined;
  const [uncontrolledPreference, setUncontrolledPreference] =
    useState<ThemeModePreference>(defaultMode);
  const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
    () => Appearance.getColorScheme()
  );

  const preference = isControlled ? controlledMode : uncontrolledPreference;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const setMode = useCallback(
    (next: ThemeModePreference) => {
      if (!isControlled) {
        setUncontrolledPreference(next);
      }
      onModeChange?.(next);
    },
    [isControlled, onModeChange]
  );

  const toggle = useCallback(() => {
    const resolved = resolveThemeMode(preference, systemScheme);
    setMode(resolved === "dark" ? "light" : "dark");
  }, [preference, systemScheme, setMode]);

  const value = useMemo<ThemeContextValue>(() => {
    const mode = resolveThemeMode(preference, systemScheme);
    const active = mode === "dark" ? theme.dark : theme.light;
    return {
      mode,
      preference,
      theme: active,
      colors: active.colors,
      fonts: active.fonts,
      spacing: active.spacing,
      radius: active.radius,
      opacity: active.opacity,
      zIndex: active.zIndex,
      elevation: active.elevation,
      isDark: mode === "dark",
      toggle,
      setMode,
    };
  }, [preference, systemScheme, theme, toggle, setMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
