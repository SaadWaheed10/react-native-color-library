import { useEffect, useRef, type ReactNode } from "react";
import { Animated, StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "./ThemeContext";

export interface AnimatedThemeViewProps {
  children: ReactNode;
  /** Fade duration in ms when mode changes. Default 220. */
  duration?: number;
  style?: ViewStyle;
}

/**
 * Smoothly fades the screen background when light/dark mode toggles.
 * Uses React Native's built-in `Animated` API (no Reanimated required).
 *
 * @example
 * <ThemeProvider>
 *   <AnimatedThemeView style={{ flex: 1 }}>
 *     <App />
 *   </AnimatedThemeView>
 * </ThemeProvider>
 */
export function AnimatedThemeView({
  children,
  duration = 220,
  style,
}: AnimatedThemeViewProps) {
  const { colors, mode } = useTheme();
  const opacity = useRef(new Animated.Value(1)).current;
  const prevMode = useRef(mode);

  useEffect(() => {
    if (prevMode.current === mode) return;
    prevMode.current = mode;
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [mode, duration, opacity]);

  return (
    <View style={[{ flex: 1, backgroundColor: colors.background }, style]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity }]} pointerEvents="none">
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.background }]} />
      </Animated.View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

/**
 * Interpolate between two theme colors for custom animated UI.
 * Returns the "to" color immediately; pair with RN Animated for transitions.
 */
export function getThemeTransitionColors(
  from: string,
  to: string
): { from: string; to: string } {
  return { from, to };
}

const styles = StyleSheet.create({
  content: { flex: 1 },
});
