import type { CreateGradientOptions, GradientConfig } from "../types";

/**
 * Builds a gradient configuration compatible with `react-native-linear-gradient`
 * and similar libraries. Spread the result directly onto the gradient component:
 *
 * @example
 * const myGradient = createGradient({
 *   colors: ["#FF0000", "#0000FF"],
 *   start: { x: 0, y: 0 },
 *   end: { x: 1, y: 1 },
 * });
 *
 * <LinearGradient {...myGradient}>...</LinearGradient>
 */
export function createGradient(options: CreateGradientOptions): GradientConfig {
  const { colors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }, locations } = options;

  if (!colors || colors.length < 2) {
    throw new Error(
      "[react-native-color-library] createGradient requires at least 2 colors."
    );
  }

  if (locations && locations.length !== colors.length) {
    throw new Error(
      "[react-native-color-library] createGradient: `locations` must have the same length as `colors`."
    );
  }

  const config: GradientConfig = { colors, start, end };
  if (locations) {
    config.locations = locations;
  }
  return config;
}
