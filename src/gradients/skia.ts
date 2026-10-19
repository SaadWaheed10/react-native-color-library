import type {
  ColorValue,
  SkiaGradientConfig,
  SkiaLinearGradient,
  SkiaRadialGradient,
  SkiaSweepGradient,
} from "../types";

/**
 * Skia-friendly gradient configs (pure data — no `@shopify/react-native-skia` import).
 * Spread into Skia `LinearGradient` / `RadialGradient` / `SweepGradient` props.
 */

export function createSkiaLinearGradient(options: {
  colors: ColorValue[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  positions?: number[];
}): SkiaLinearGradient {
  return {
    type: "linear",
    start: options.start ?? { x: 0, y: 0 },
    end: options.end ?? { x: 1, y: 1 },
    colors: options.colors,
    positions: options.positions,
  };
}

export function createSkiaRadialGradient(options: {
  colors: ColorValue[];
  center?: { x: number; y: number };
  radius?: number;
  positions?: number[];
}): SkiaRadialGradient {
  return {
    type: "radial",
    center: options.center ?? { x: 0.5, y: 0.5 },
    radius: options.radius ?? 0.5,
    colors: options.colors,
    positions: options.positions,
  };
}

export function createSkiaSweepGradient(options: {
  colors: ColorValue[];
  center?: { x: number; y: number };
  positions?: number[];
}): SkiaSweepGradient {
  return {
    type: "sweep",
    center: options.center ?? { x: 0.5, y: 0.5 },
    colors: options.colors,
    positions: options.positions,
  };
}

/** Mesh-like multi-stop linear helper (evenly spaced positions). */
export function createSkiaMeshStops(colors: ColorValue[]): SkiaGradientConfig {
  const positions = colors.map((_, i) =>
    colors.length === 1 ? 0 : i / (colors.length - 1)
  );
  return createSkiaLinearGradient({ colors, positions });
}

/** Convert a library `GradientConfig` into a Skia linear gradient. */
export function toSkiaLinear(gradient: {
  colors: ColorValue[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
}): SkiaLinearGradient {
  return createSkiaLinearGradient({
    colors: gradient.colors,
    start: gradient.start,
    end: gradient.end,
    positions: gradient.locations,
  });
}
