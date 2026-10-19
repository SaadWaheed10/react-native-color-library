import type { ColorValue, HSV, RGB } from "../types";
import { hexToRgb, rgbToHex } from "./colorConversion";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Converts RGB (0–255) to HSV (`h` 0–360, `s`/`v` 0–100). */
export function rgbToHsv({ r, g, b }: RGB): HSV {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;
  return { h, s, v };
}

/** Converts HSV to RGB (0–255). */
export function hsvToRgb({ h, s, v }: HSV): RGB {
  const sn = clamp(s, 0, 100) / 100;
  const vn = clamp(v, 0, 100) / 100;
  const hn = ((h % 360) + 360) % 360;
  const c = vn * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = vn - c;

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

export function hexToHsv(color: ColorValue): HSV {
  return rgbToHsv(hexToRgb(color));
}

export function hsvToHex(hsv: HSV): ColorValue {
  return rgbToHex(hsvToRgb(hsv));
}

/**
 * Color-picker helpers — map a point on a classic HSV square / hue wheel.
 * `x`/`y` are normalized 0–1.
 */
export function hsvFromPickerCoords(
  hue: number,
  x: number,
  y: number
): HSV {
  return {
    h: ((hue % 360) + 360) % 360,
    s: clamp(x, 0, 1) * 100,
    v: (1 - clamp(y, 0, 1)) * 100,
  };
}

/** Hue from an angle on a hue wheel (`angle` in degrees). */
export function hueFromWheelAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}
