import type { ColorValue } from "../types";

export const white: ColorValue = "#ffffff";
export const black: ColorValue = "#000000";

/** Fully transparent — safe to use anywhere React Native accepts a color. */
export const transparent: ColorValue = "rgba(0, 0, 0, 0)";

/**
 * React Native does not support CSS's `currentColor`. This is exported
 * for API familiarity/documentation purposes only — it resolves to
 * black and should generally be avoided in favor of an explicit color.
 */
export const current: ColorValue = "#000000";
