import type { ReactNode } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useTheme } from "./ThemeContext";

export interface ThemeToggleProps extends Omit<PressableProps, "onPress"> {
  /** Custom label/content. Receives `isDark` so you can swap icons. */
  children?: ReactNode | ((isDark: boolean) => ReactNode);
  /** Fallback label when `children` is omitted and mode is light. */
  lightLabel?: string;
  /** Fallback label when `children` is omitted and mode is dark. */
  darkLabel?: string;
  /** Optional style for the inner label `Text`. */
  labelStyle?: StyleProp<TextStyle>;
  /** Optional style for the pressable container. */
  style?: StyleProp<ViewStyle>;
  /** Called after the theme toggles. */
  onToggle?: (isDark: boolean) => void;
}

/**
 * Ready-made light/dark toggle button.
 * Drop it anywhere under `ThemeProvider` — one press flips the mode.
 *
 * @example
 * <ThemeToggle />
 * <ThemeToggle lightLabel="☀️" darkLabel="🌙" />
 * <ThemeToggle>{(isDark) => <Icon name={isDark ? "sun" : "moon"} />}</ThemeToggle>
 */
export function ThemeToggle({
  children,
  lightLabel = "Dark mode",
  darkLabel = "Light mode",
  labelStyle,
  style,
  onToggle,
  ...pressableProps
}: ThemeToggleProps) {
  const { isDark, toggle, colors, fonts } = useTheme();

  const handlePress = () => {
    toggle();
    // After toggle, the next mode is the opposite of current isDark.
    onToggle?.(!isDark);
  };

  const content =
    typeof children === "function"
      ? children(isDark)
      : children ?? (
          <Text
            style={[
              styles.label,
              {
                color: colors.text,
                fontFamily: fonts.family.sans,
                fontSize: fonts.sizes.sm,
                fontWeight: fonts.weights.medium,
              },
              labelStyle,
            ]}
          >
            {isDark ? darkLabel : lightLabel}
          </Text>
        );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
      accessibilityState={{ checked: isDark }}
      onPress={handlePress}
      style={[
        styles.button,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
      {...pressableProps}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
  },
});
