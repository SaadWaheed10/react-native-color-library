import { describe, it, expect } from "vitest";
import { colors, blue, red, white, black, named, material, semantic, light, dark } from "../src/index";

describe("colors", () => {
  it("exposes shaded families with all 11 shades", () => {
    const shadeKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
    for (const key of shadeKeys) {
      expect(blue[key]).toMatch(/^#[0-9a-f]{6}$/);
      expect(red[key]).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("exposes white/black/transparent/current", () => {
    expect(white).toBe("#ffffff");
    expect(black).toBe("#000000");
    expect(colors.transparent).toBe("rgba(0, 0, 0, 0)");
  });

  it("exposes named CSS colors", () => {
    expect(named.tomato).toBe("#ff6347");
    expect(named.gold).toBe("#ffd700");
  });

  it("exposes material palettes", () => {
    expect(material.blue[500]).toMatch(/^#[0-9a-f]{6}$/);
    expect(material.red[500]).toBe("#f44336");
  });

  it("exposes the combined colors object with nested categories", () => {
    expect(colors.blue[500]).toBe(blue[500]);
    expect(colors.material.green[500]).toBe(material.green[500]);
    expect(colors.named.coral).toBe(named.coral);
  });

  it("exposes semantic and theme colors", () => {
    expect(semantic.primary).toBeDefined();
    expect(light.background).toBe("#ffffff");
    expect(dark.background).toBeDefined();
  });
});
