import type { ColorValue, RGB, RGBA, HSL } from "../types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toHex2(n: number): string {
  const clamped = Math.round(clamp(n, 0, 255));
  return clamped.toString(16).padStart(2, "0");
}

/** Expands a 3/4-digit hex shorthand (`#f0c` / `#f0c8`) to full form. */
function expandShorthandHex(hex: string): string {
  if (hex.length === 4 || hex.length === 5) {
    let expanded = "#";
    for (let i = 1; i < hex.length; i++) {
      const ch = hex[i] as string;
      expanded += ch + ch;
    }
    return expanded;
  }
  return hex;
}

/**
 * Parses any supported color string (`#rgb`, `#rgba`, `#rrggbb`,
 * `#rrggbbaa`, `rgb(...)`, `rgba(...)`) into an RGBA object.
 * Throws on unrecognized input.
 */
export function parseColor(color: ColorValue): RGBA {
  const value = color.trim();

  if (value.startsWith("#")) {
    const hex = expandShorthandHex(value);
    if (hex.length === 7) {
      return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
        a: 1,
      };
    }
    if (hex.length === 9) {
      return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
        a: parseInt(hex.slice(7, 9), 16) / 255,
      };
    }
    throw new Error(`[react-native-color-library] Invalid hex color: "${color}"`);
  }

  const rgbaMatch = value.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i
  );
  if (rgbaMatch) {
    return {
      r: clamp(Number(rgbaMatch[1]), 0, 255),
      g: clamp(Number(rgbaMatch[2]), 0, 255),
      b: clamp(Number(rgbaMatch[3]), 0, 255),
      a: rgbaMatch[4] !== undefined ? clamp(Number(rgbaMatch[4]), 0, 1) : 1,
    };
  }

  throw new Error(
    `[react-native-color-library] Unrecognized color format: "${color}". ` +
      `Expected a hex string (#rrggbb) or rgb()/rgba() string.`
  );
}

/** Converts a hex color string to an `{ r, g, b }` object. */
export function hexToRgb(hex: ColorValue): RGB {
  const { r, g, b } = parseColor(hex);
  return { r, g, b };
}

/** Converts `{ r, g, b }` to a `#rrggbb` hex string. */
export function rgbToHex({ r, g, b }: RGB): ColorValue {
  return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
}

/** Converts a hex color string to an `rgba(...)` string at the given alpha. */
export function hexToRgba(hex: ColorValue, alphaValue = 1): ColorValue {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alphaValue, 0, 1)})`;
}

/** Converts an `rgba(...)` / `rgb(...)` string to a `#rrggbb` hex string (alpha dropped). */
export function rgbaToHex(rgba: ColorValue): ColorValue {
  const { r, g, b } = parseColor(rgba);
  return rgbToHex({ r, g, b });
}

/** Converts RGB (0–255 each) to HSL (`h` in degrees, `s`/`l` as 0–100). */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) {
      h = 60 * (((gn - bn) / delta) % 6);
    } else if (max === gn) {
      h = 60 * ((bn - rn) / delta + 2);
    } else {
      h = 60 * ((rn - gn) / delta + 4);
    }
  }
  if (h < 0) h += 360;

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

/** Converts HSL (`h` in degrees, `s`/`l` as 0–100) to RGB (0–255 each). */
export function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;
  const hn = ((h % 360) + 360) % 360;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = ln - c / 2;

  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (hn < 60) [rp, gp, bp] = [c, x, 0];
  else if (hn < 120) [rp, gp, bp] = [x, c, 0];
  else if (hn < 180) [rp, gp, bp] = [0, c, x];
  else if (hn < 240) [rp, gp, bp] = [0, x, c];
  else if (hn < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

/** Converts a hex color to an `{ h, s, l }` object. */
export function hexToHsl(hex: ColorValue): HSL {
  return rgbToHsl(hexToRgb(hex));
}

/** Converts an `{ h, s, l }` object to a `#rrggbb` hex string. */
export function hslToHex(hsl: HSL): ColorValue {
  return rgbToHex(hslToRgb(hsl));
}
