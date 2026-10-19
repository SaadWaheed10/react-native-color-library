import type { ColorBlindnessType, ColorValue, RGB } from "../types";
import { hexToRgb, rgbToHex } from "./colorConversion";

function clampChannel(n: number): number {
  return Math.min(255, Math.max(0, Math.round(n)));
}

/**
 * LMS simulation matrices (Brettel/Viénot-style approximations)
 * for the three common forms of dichromacy.
 */
const SIMULATION_MATRICES: Record<ColorBlindnessType, number[][]> = {
  // Deuteranopia (green-blind)
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  // Protanopia (red-blind)
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  // Tritanopia (blue-blind)
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
};

function applyMatrix(rgb: RGB, matrix: number[][]): RGB {
  const row0 = matrix[0] as number[];
  const row1 = matrix[1] as number[];
  const row2 = matrix[2] as number[];
  return {
    r: clampChannel(row0[0]! * rgb.r + row0[1]! * rgb.g + row0[2]! * rgb.b),
    g: clampChannel(row1[0]! * rgb.r + row1[1]! * rgb.g + row1[2]! * rgb.b),
    b: clampChannel(row2[0]! * rgb.r + row2[1]! * rgb.g + row2[2]! * rgb.b),
  };
}

/**
 * Approximates how a color appears under a given color-vision deficiency.
 * Useful for a11y previews in Storybook / design QA tools.
 *
 * @example
 * simulateColorBlindness("#16A34A", "deuteranopia")
 */
export function simulateColorBlindness(
  color: ColorValue,
  type: ColorBlindnessType
): ColorValue {
  const matrix = SIMULATION_MATRICES[type];
  if (!matrix) {
    throw new Error(`[react-native-color-library] Unknown color-blindness type: "${type}"`);
  }
  return rgbToHex(applyMatrix(hexToRgb(color), matrix));
}
