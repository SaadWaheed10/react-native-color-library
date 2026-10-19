import type { AppTheme, AppThemeConfig, ExportedTokens } from "../types";

function flattenColors(theme: AppTheme): Record<string, { value: string }> {
  const out: Record<string, { value: string }> = {};
  for (const [key, value] of Object.entries(theme.colors)) {
    out[key] = { value };
  }
  return out;
}

/**
 * Exports an `AppTheme` as Style Dictionary–compatible JSON tokens.
 *
 * @example
 * const tokens = exportStyleDictionaryTokens(theme.light);
 * // write to tokens.json for Figma / SD pipelines
 */
export function exportStyleDictionaryTokens(theme: AppTheme): ExportedTokens {
  return {
    color: flattenColors(theme),
    font: {
      "family.sans": { value: theme.fonts.family.sans },
      "family.serif": { value: theme.fonts.family.serif },
      "family.mono": { value: theme.fonts.family.mono },
      "size.md": { value: theme.fonts.sizes.md },
      "size.lg": { value: theme.fonts.sizes.lg },
      "weight.regular": { value: theme.fonts.weights.regular },
      "weight.bold": { value: theme.fonts.weights.bold },
    },
    spacing: Object.fromEntries(
      Object.entries(theme.spacing).map(([k, v]) => [k, { value: v }])
    ),
    radius: Object.fromEntries(
      Object.entries(theme.radius).map(([k, v]) => [k, { value: v }])
    ),
    opacity: Object.fromEntries(
      Object.entries(theme.opacity).map(([k, v]) => [k, { value: v }])
    ),
    zIndex: Object.fromEntries(
      Object.entries(theme.zIndex).map(([k, v]) => [k, { value: v }])
    ),
  };
}

/**
 * Exports both light and dark themes as a nested Style Dictionary document.
 */
export function exportThemeConfigTokens(config: AppThemeConfig): {
  light: ExportedTokens;
  dark: ExportedTokens;
} {
  return {
    light: exportStyleDictionaryTokens(config.light),
    dark: exportStyleDictionaryTokens(config.dark),
  };
}

/** CSS custom-property string for web / RN-web. */
export function exportCssVariables(theme: AppTheme, prefix = "rn"): string {
  const lines: string[] = [":root {"];
  for (const [key, value] of Object.entries(theme.colors)) {
    lines.push(`  --${prefix}-color-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(theme.spacing)) {
    lines.push(`  --${prefix}-spacing-${key}: ${value}px;`);
  }
  for (const [key, value] of Object.entries(theme.radius)) {
    lines.push(`  --${prefix}-radius-${key}: ${value}px;`);
  }
  lines.push(`  --${prefix}-font-sans: ${theme.fonts.family.sans};`);
  lines.push("}");
  return lines.join("\n");
}
