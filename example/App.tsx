/**
 * Expo / RN demo — copy into an Expo app or run alongside the library.
 * Shows ThemeProvider, ThemeToggle, presets, ContrastPreview, and themed primitives.
 */
import { ScrollView, StyleSheet } from "react-native";
import {
  ThemeProvider,
  ThemeToggle,
  ThemedView,
  ThemedText,
  ThemedStatusBar,
  ContrastPreview,
  AnimatedThemeView,
  createAppTheme,
  themePresets,
  useTheme,
} from "react-native-color-library";

const demoTheme = createAppTheme({
  brand: "#7C3AED",
  fonts: { family: { sans: "System" } },
  // try: themePresets.oled / .vibrant / .midnight
});

function DemoScreen() {
  const { isDark, colors, spacing, elevation } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: spacing.lg,
        gap: spacing.md,
      }}
    >
      <ThemedStatusBar />
      <ThemedText size="2xl" weight="bold">
        Color Library Demo
      </ThemedText>
      <ThemedText tone="muted">
        Mode: {isDark ? "dark" : "light"} · primary {colors.primary}
      </ThemedText>

      <ThemedView
        surface
        elevation="md"
        style={{ padding: spacing.md, borderRadius: 12 }}
      >
        <ThemedText weight="semibold">Elevated card</ThemedText>
        <ThemedText tone="muted" size="sm">
          Shadow token: elevation.md
        </ThemedText>
      </ThemedView>

      <ThemeToggle lightLabel="☀️ Switch to dark" darkLabel="🌙 Switch to light" />

      <ContrastPreview variant="compact" />

      <ThemedText size="sm" tone="muted">
        Also try themePresets.oled, usePersistedTheme, useTimeBasedTheme,
        createDynamicColorScheme, and Skia gradient helpers.
      </ThemedText>

      {/* silence unused */}
      <ThemedText style={{ opacity: 0 }}>{elevation.sm.elevation}</ThemedText>
    </ScrollView>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={demoTheme} defaultMode="system">
      <AnimatedThemeView style={styles.flex}>
        <ThemedView style={styles.flex}>
          <DemoScreen />
        </ThemedView>
      </AnimatedThemeView>
    </ThemeProvider>
  );
}

// Optional alternate: ThemeProvider theme={themePresets.vibrant}
void themePresets;

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
