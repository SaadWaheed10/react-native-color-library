import type { ReactNode } from "react";
import {
  View,
  Text,
  StatusBar,
  type ViewProps,
  type TextProps,
  type StatusBarProps,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { useTheme } from "./ThemeContext";

export interface ThemedViewProps extends ViewProps {
  /** Use `surface` instead of `background`. */
  surface?: boolean;
  /** Apply an elevation shadow token. */
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
}

/** `View` that picks background (or surface) + optional elevation from the theme. */
export function ThemedView({
  style,
  surface,
  elevation,
  ...rest
}: ThemedViewProps) {
  const { colors, elevation: elev } = useTheme();
  const shadow = elevation ? elev[elevation] : undefined;
  return (
    <View
      style={[
        {
          backgroundColor: surface ? colors.surface : colors.background,
          ...(shadow ?? {}),
        } as ViewStyle,
        style,
      ]}
      {...rest}
    />
  );
}

export interface ThemedTextProps extends TextProps {
  /** Semantic color role. Default `"text"`. */
  tone?: "text" | "muted" | "primary" | "secondary" | "success" | "warning" | "error" | "info";
  /** Font size token. Default `"md"`. */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  /** Font weight token. Default `"regular"`. */
  weight?: "regular" | "medium" | "semibold" | "bold";
  /** Font family token. Default `"sans"`. */
  family?: "sans" | "serif" | "mono";
  children?: ReactNode;
}

/** `Text` wired to theme colors + typography tokens. */
export function ThemedText({
  style,
  tone = "text",
  size = "md",
  weight = "regular",
  family = "sans",
  ...rest
}: ThemedTextProps) {
  const { colors, fonts } = useTheme();
  const colorMap = {
    text: colors.text,
    muted: colors.textMuted,
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  };

  return (
    <Text
      style={[
        {
          color: colorMap[tone],
          fontSize: fonts.sizes[size],
          fontWeight: fonts.weights[weight],
          fontFamily: fonts.family[family],
        } as TextStyle,
        style,
      ]}
      {...rest}
    />
  );
}

export type ThemedStatusBarProps = StatusBarProps;

/** StatusBar that follows light/dark mode automatically. */
export function ThemedStatusBar(props: ThemedStatusBarProps) {
  const { isDark, colors } = useTheme();
  return (
    <StatusBar
      barStyle={isDark ? "light-content" : "dark-content"}
      backgroundColor={colors.background}
      {...props}
    />
  );
}

