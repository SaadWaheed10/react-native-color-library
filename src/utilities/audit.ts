import type {
  AppTheme,
  ColorValue,
  ContrastIssue,
  ThemeAuditReport,
  ThemePalette,
} from "../types";
import {
  ensureContrast,
  getContrastRatio,
  meetsContrastGuidelines,
} from "./contrast";

const DEFAULT_PAIRS: Array<[string, keyof ThemePalette, keyof ThemePalette]> = [
  ["text on background", "text", "background"],
  ["muted on background", "textMuted", "background"],
  ["text on surface", "text", "surface"],
  ["primary on background", "primary", "background"],
  ["secondary on background", "secondary", "background"],
  ["error on background", "error", "background"],
];

/**
 * Audits a theme palette for WCAG contrast issues and suggests fixes.
 *
 * @example
 * const report = auditTheme(myTheme.light);
 * console.log(report.score, report.issues);
 */
export function auditTheme(
  theme: AppTheme | ThemePalette,
  options: { level?: "AA" | "AAA" } = {}
): ThemeAuditReport {
  const level = options.level ?? "AA";
  const colors = "colors" in theme ? theme.colors : theme;
  const issues: ContrastIssue[] = [];
  let passed = 0;

  for (const [label, fgKey, bgKey] of DEFAULT_PAIRS) {
    const foreground = colors[fgKey];
    const background = colors[bgKey];
    const ratio = getContrastRatio(foreground, background);
    const passesAA = meetsContrastGuidelines(foreground, background, { level: "AA" });
    const passesAAA = meetsContrastGuidelines(foreground, background, { level: "AAA" });
    const ok = level === "AAA" ? passesAAA : passesAA;

    if (ok) {
      passed += 1;
    } else {
      issues.push({
        pair: label,
        foreground,
        background,
        ratio,
        passesAA,
        passesAAA,
        suggestion: ensureContrast(background, foreground, { level }),
      });
    }
  }

  const total = DEFAULT_PAIRS.length;
  const failed = total - passed;
  const score = Math.round((passed / total) * 100);

  return { score, issues, passed, failed };
}

/** Audits an arbitrary list of foreground/background pairs. */
export function auditColorPairs(
  pairs: Array<{ name: string; foreground: ColorValue; background: ColorValue }>,
  options: { level?: "AA" | "AAA" } = {}
): ThemeAuditReport {
  const level = options.level ?? "AA";
  const issues: ContrastIssue[] = [];
  let passed = 0;

  for (const pair of pairs) {
    const ratio = getContrastRatio(pair.foreground, pair.background);
    const passesAA = meetsContrastGuidelines(pair.foreground, pair.background, {
      level: "AA",
    });
    const passesAAA = meetsContrastGuidelines(pair.foreground, pair.background, {
      level: "AAA",
    });
    const ok = level === "AAA" ? passesAAA : passesAA;
    if (ok) passed += 1;
    else {
      issues.push({
        pair: pair.name,
        foreground: pair.foreground,
        background: pair.background,
        ratio,
        passesAA,
        passesAAA,
        suggestion: ensureContrast(pair.background, pair.foreground, { level }),
      });
    }
  }

  const total = pairs.length || 1;
  return {
    score: Math.round((passed / total) * 100),
    issues,
    passed,
    failed: total - passed,
  };
}
