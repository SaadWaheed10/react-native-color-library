import type { GradientConfig } from "../types";

const diagonal = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
const horizontal = { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };
const vertical = { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };

/**
 * A large collection of ready-to-use gradient configurations.
 * These are plain config objects, compatible with `react-native-linear-gradient`
 * and similar libraries — spread them onto the gradient component:
 *
 * @example
 * <LinearGradient {...gradients.sunset}>...</LinearGradient>
 */
export const gradients: Record<string, GradientConfig> = {
  // Sunset
  sunset: { colors: ["#ff512f", "#dd2476"], ...diagonal },
  sunsetOrange: { colors: ["#ff7e5f", "#feb47b"], ...horizontal },
  duskGlow: { colors: ["#f857a6", "#ff5858"], ...diagonal },

  // Sunrise
  sunrise: { colors: ["#ff9966", "#ff5e62"], ...horizontal },
  morningLight: { colors: ["#fceabb", "#f8b500"], ...vertical },
  goldenHour: { colors: ["#f7971e", "#ffd200"], ...diagonal },

  // Ocean
  ocean: { colors: ["#2193b0", "#6dd5ed"], ...diagonal },
  deepSea: { colors: ["#000428", "#004e92"], ...vertical },
  aquaMarine: { colors: ["#1a2980", "#26d0ce"], ...horizontal },

  // Sky
  sky: { colors: ["#00c6ff", "#0072ff"], ...vertical },
  clearSky: { colors: ["#89f7fe", "#66a6ff"], ...diagonal },
  twilight: { colors: ["#0f2027", "#203a43", "#2c5364"], ...vertical },

  // Fire
  fire: { colors: ["#f12711", "#f5af19"], ...horizontal },
  flame: { colors: ["#ff416c", "#ff4b2b"], ...diagonal },
  ember: { colors: ["#870000", "#190a05"], ...vertical },

  // Purple
  purpleHaze: { colors: ["#7f00ff", "#e100ff"], ...horizontal },
  royalPurple: { colors: ["#41295a", "#2f0743"], ...diagonal },
  cosmicPurple: { colors: ["#4b0082", "#8a2be2"], ...vertical },

  // Pink
  pinkGlow: { colors: ["#ff9a9e", "#fad0c4"], ...diagonal },
  bubblegum: { colors: ["#ff758c", "#ff7eb3"], ...horizontal },
  candy: { colors: ["#ee9ca7", "#ffdde1"], ...vertical },

  // Blue
  blueSteel: { colors: ["#4facfe", "#00f2fe"], ...diagonal },
  midnightBlue: { colors: ["#232526", "#414345"], ...vertical },
  sapphire: { colors: ["#0f0c29", "#302b63", "#24243e"], ...diagonal },

  // Green
  freshGreen: { colors: ["#56ab2f", "#a8e063"], ...horizontal },
  emeraldGlow: { colors: ["#11998e", "#38ef7d"], ...diagonal },
  forest: { colors: ["#134e5e", "#71b280"], ...vertical },

  // Gold
  goldRush: { colors: ["#bf953f", "#fcf6ba", "#b38728", "#fbf5b7", "#aa771c"], ...horizontal },
  luxuryGold: { colors: ["#ffd700", "#ff8c00"], ...diagonal },

  // Neon
  neonNights: { colors: ["#12c2e9", "#c471ed", "#f64f59"], ...horizontal },
  neonPulse: { colors: ["#00f260", "#0575e6"], ...diagonal },
  cyberpunk: { colors: ["#ff00cc", "#333399"], ...horizontal },

  // Dark
  darkMatter: { colors: ["#000000", "#434343"], ...vertical },
  charcoal: { colors: ["#232526", "#414345"], ...diagonal },
  obsidian: { colors: ["#0f0f0f", "#2c2c2c"], ...vertical },

  // Pastel
  pastelDream: { colors: ["#a1c4fd", "#c2e9fb"], ...diagonal },
  cottonCandy: { colors: ["#fbc2eb", "#a6c1ee"], ...horizontal },
  softPeach: { colors: ["#ffecd2", "#fcb69f"], ...vertical },

  // Minimal
  minimalGray: { colors: ["#e0e0e0", "#f5f5f5"], ...vertical },
  minimalWhite: { colors: ["#ffffff", "#f0f0f0"], ...diagonal },

  // Luxury
  luxury: { colors: ["#1a1a2e", "#16213e", "#0f3460"], ...diagonal },
  velvet: { colors: ["#360033", "#0b8793"], ...horizontal },

  // Modern
  modernSlate: { colors: ["#3a6186", "#89253e"], ...diagonal },
  modernMint: { colors: ["#00b09b", "#96c93d"], ...horizontal },

  // Social
  instagramGlow: { colors: ["#833ab4", "#fd1d1d", "#fcb045"], ...diagonal },
  facebookBlue: { colors: ["#4267b2", "#1877f2"], ...horizontal },
  spotifyGreen: { colors: ["#1db954", "#191414"], ...vertical },

  // Abstract
  abstractWave: { colors: ["#ee0979", "#ff6a00"], ...diagonal },
  abstractFlow: { colors: ["#42275a", "#734b6d"], ...horizontal },
  abstractGrid: { colors: ["#8360c3", "#2ebf91"], ...vertical },
};
