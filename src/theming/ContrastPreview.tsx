import { View, Text, StyleSheet, type ViewStyle } from "react-native";
import type { AppTheme, ColorValue } from "../types";
import { auditTheme } from "../utilities/audit";
import { getContrastRatio } from "../utilities/contrast";
import { useTheme } from "./ThemeContext";

export interface ContrastPreviewProps {
  /** Theme to audit — defaults to the active `useTheme()` theme. */
  theme?: AppTheme;
  /** Compact = score only; full = list issues. */
  variant?: "compact" | "full";
  style?: ViewStyle;
}

/**
 * In-app WCAG contrast audit panel for designers/devs.
 * Drop under `ThemeProvider` to see live scores as you tweak tokens.
 *
 * @example
 * <ContrastPreview variant="full" />
 */
export function ContrastPreview({
  theme: themeProp,
  variant = "full",
  style,
}: ContrastPreviewProps) {
  const ctx = useTheme();
  const theme = themeProp ?? ctx.theme;
  const report = auditTheme(theme);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text,
            fontFamily: theme.fonts.family.sans,
            fontSize: theme.fonts.sizes.md,
            fontWeight: theme.fonts.weights.bold,
          },
        ]}
      >
        Contrast score: {report.score}/100
      </Text>
      <Text
        style={{
          color: theme.colors.textMuted,
          fontFamily: theme.fonts.family.sans,
          fontSize: theme.fonts.sizes.sm,
          marginBottom: 8,
        }}
      >
        {report.passed} passed · {report.failed} failed
      </Text>

      {variant === "full" &&
        report.issues.map((issue) => (
          <View key={issue.pair} style={styles.row}>
            <View style={styles.swatches}>
              <Swatch color={issue.background} />
              <Swatch color={issue.foreground} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: theme.fonts.sizes.sm,
                  fontFamily: theme.fonts.family.sans,
                }}
              >
                {issue.pair}
              </Text>
              <Text
                style={{
                  color: theme.colors.error,
                  fontSize: theme.fonts.sizes.xs,
                  fontFamily: theme.fonts.family.mono,
                }}
              >
                {issue.ratio.toFixed(2)}:1
                {issue.suggestion ? ` → try ${issue.suggestion}` : ""}
              </Text>
            </View>
          </View>
        ))}

      {variant === "full" && report.issues.length === 0 && (
        <Text
          style={{
            color: theme.colors.success,
            fontFamily: theme.fonts.family.sans,
            fontSize: theme.fonts.sizes.sm,
          }}
        >
          All key pairs meet WCAG AA.
        </Text>
      )}
    </View>
  );
}

function Swatch({ color }: { color: ColorValue }) {
  return (
    <View
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        backgroundColor: color,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#888",
        marginRight: 4,
      }}
    />
  );
}

/** Tiny helper for custom preview UIs. */
export function previewContrastRatio(fg: ColorValue, bg: ColorValue): number {
  return getContrastRatio(fg, bg);
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: { marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  swatches: { flexDirection: "row", marginRight: 8 },
});
