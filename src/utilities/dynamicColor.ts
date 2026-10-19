import type { ColorValue, DynamicColorScheme } from "../types";
import { createPalette } from "./palette";
import { createHarmony } from "./harmony";
import { createBrandThemes } from "../theme";
import { createPaletteOklch } from "./oklch";

/**
 * Material You–inspired dynamic color scheme from a single seed color.
 * Builds primary / secondary / tertiary / neutral tonal palettes plus
 * ready light & dark `ThemePalette`s.
 *
 * @example
 * const scheme = createDynamicColorScheme("#7C3AED");
 * scheme.light.primary
 * scheme.primary[500]
 */
export function createDynamicColorScheme(seed: ColorValue): DynamicColorScheme {
  const harmony = createHarmony(seed, "analogous");
  const complementary = createHarmony(seed, "complementary");
  const secondarySeed = harmony[2] ?? complementary[1] ?? seed;
  const tertiarySeed = complementary[1] ?? seed;

  const primary = createPaletteOklch(seed);
  const secondary = createPaletteOklch(secondarySeed);
  const tertiary = createPaletteOklch(tertiarySeed);
  // Neutral: low-chroma version via grayscale mix toward seed hue
  const neutral = createPalette(seed);

  const brand = createBrandThemes(seed);

  return {
    seed,
    primary,
    secondary,
    tertiary,
    neutral,
    light: {
      ...brand.light,
      primary: primary[600],
      secondary: secondary[500],
      info: tertiary[500],
    },
    dark: {
      ...brand.dark,
      primary: primary[400],
      secondary: secondary[400],
      info: tertiary[400],
    },
  };
}
