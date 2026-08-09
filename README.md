# react-native-color-library

A comprehensive, TypeScript-first color, gradient, and theming library for React Native.

Stop creating a `colors.ts` in every project. Install once, get a massive, well-organized
color system that works directly with `StyleSheet.create()` — no provider, no config, no
custom components.

```tsx
import { StyleSheet } from "react-native";
import { colors } from "react-native-color-library";

const styles = StyleSheet.create({
  container: { backgroundColor: colors.blue[500] },
  title: { color: colors.white },
  subtitle: { color: colors.gray[600] },
});
```

## Features

- 🎨 **22 shaded color families** (blue, red, green, purple, gray, slate, …), each with an
  11-step `50`–`950` scale
- 🏷️ **90+ standard named colors** (`tomato`, `coral`, `navy`, `turquoise`, …)
- 🧱 **Material Design–inspired palettes** (`material.blue[500]`, `material.red[500]`, …)
- 🌈 **40+ ready-to-use gradient presets**, grouped by mood (sunset, ocean, neon, pastel, …)
- 🧪 **`createGradient`** for building your own gradient configs
- 🖌️ **`createColor`** for normalizing any hex/rgb/rgba input
- 🎯 **`createPalette`** for generating a full 50–950 scale from one brand color
- 🛠️ **Color utilities**: `lighten`, `darken`, `alpha`, `mix`, `invert`, `grayscale`,
  `saturate`, `desaturate`, plus hex/rgb/hsl conversions
- ♿ **Contrast utilities**: `getContrastRatio`, `getContrastText`, `meetsContrastGuidelines`
- 🧩 **Semantic colors & themes**: `colors.semantic`, `colors.light`, `colors.dark`,
  `createTheme`
- 📦 **Tree-shakable**: `import { blue, red } from "react-native-color-library"`
- 🚫 **Zero runtime cost** for static colors — they're just strings
- ✅ **No native modules** — pure TypeScript/JavaScript, old & new architecture, Expo,
  iOS, and Android compatible

## Installation

```bash
npm install react-native-color-library
```

or

```bash
yarn add react-native-color-library
```

`react-native` is a peer dependency (`>=0.60.0`) — no native linking required.

## Quick Start

```tsx
import { StyleSheet } from "react-native";
import { colors } from "react-native-color-library";

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.gray[50] },
  card: { backgroundColor: colors.white, borderColor: colors.gray[200] },
  title: { color: colors.blue[700] },
});
```

Or import only what you need, for the smallest possible bundle:

```tsx
import { blue, red, white } from "react-native-color-library";
```

## Color Categories

```tsx
colors.blue[500]          // shaded families — 50 to 950
colors.gray[900]
colors.named.tomato        // standard named colors
colors.material.blue[500]  // Material Design–inspired palettes
colors.white               // neutrals
colors.black
colors.transparent
colors.semantic.primary    // semantic tokens
colors.light.background    // light theme palette
colors.dark.background     // dark theme palette
```

Available shaded families: `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`,
`teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`,
`slate`, `gray`, `zinc`, `neutral`, `stone` — each with shades `50, 100, 200, 300, 400, 500,
600, 700, 800, 900, 950`.

Full IntelliSense and autocomplete are included for every family and shade.

## Gradients

React Native's core `View` doesn't support CSS gradients natively — `gradients.sunset`
returns a **configuration object** for a gradient library like
[`react-native-linear-gradient`](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
or `expo-linear-gradient`, not a string you can assign to `backgroundColor`.

```tsx
import LinearGradient from "react-native-linear-gradient";
import { gradients } from "react-native-color-library";

<LinearGradient {...gradients.sunset} style={{ flex: 1 }}>
  {/* ... */}
</LinearGradient>;
```

`gradients.sunset` looks like:

```ts
{
  colors: ["#ff512f", "#dd2476"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}
```

Presets span sunset, sunrise, ocean, sky, fire, purple, pink, blue, green, gold, neon,
dark, pastel, minimal, luxury, modern, social, and abstract categories.

### Custom gradients

```tsx
import { createGradient, colors } from "react-native-color-library";

const myGradient = createGradient({
  colors: [colors.red[500], colors.blue[500]],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
});
```

## Custom Colors

```tsx
import { createColor } from "react-native-color-library";

const brandColor = createColor("#7C3AED");
const brandColor2 = createColor("rgb(124, 58, 237)");
const brandColor3 = createColor("rgba(124, 58, 237, 0.5)");

const styles = StyleSheet.create({
  button: { backgroundColor: brandColor },
});
```

`createColor` normalizes the input to a lowercase `#rrggbb` hex string, or an
`rgba(...)` string when the input has an alpha channel — both are valid directly inside
`StyleSheet.create()`.

## Custom Palettes

Generate a full `50`–`950` scale from a single brand color:

```tsx
import { createPalette } from "react-native-color-library";

const brand = createPalette("#7C3AED");

brand[50];  // near-white tint
brand[500]; // "#7c3aed" — your input, normalized
brand[950]; // near-black shade
```

## Color Utilities

```tsx
import { lighten, darken, alpha, mix, invert, grayscale } from "react-native-color-library";

lighten("#7C3AED", 20);
darken("#7C3AED", 20);
alpha("#7C3AED", 0.5);       // -> "rgba(124, 58, 237, 0.5)"
mix("#FF0000", "#0000FF", 0.5);
invert("#FFFFFF");
grayscale("#FF0000");
```

Conversions:

```tsx
import { hexToRgb, rgbToHex, hexToRgba, rgbaToHex, hexToHsl, hslToHex } from "react-native-color-library";
```

## Contrast Utilities

```tsx
import { getContrastRatio, getContrastText, meetsContrastGuidelines } from "react-native-color-library";

getContrastRatio(colors.white, colors.blue[600]); // 1–21

const textColor = getContrastText(colors.blue[600]); // "#ffffff" or "#000000"

meetsContrastGuidelines(colors.white, colors.blue[600], { level: "AA" }); // boolean
```

## Semantic Colors & Themes

```tsx
colors.semantic.primary;
colors.semantic.success;
colors.semantic.error;
```

Customize semantic tokens:

```tsx
import { createTheme } from "react-native-color-library";

const mySemantics = createTheme({
  primary: "#7C3AED",
  success: "#16A34A",
  error: "#DC2626",
});
```

Light/dark theme palettes:

```tsx
import { light, dark } from "react-native-color-library";

light.background; // "#ffffff"
dark.background;   // near-black
```

Build a custom theme from either base:

```tsx
import { createThemePalette, dark } from "react-native-color-library";

const myDarkTheme = createThemePalette(dark, { primary: "#7C3AED" });
```

## No Component Lock-In

This library never requires custom components. Keep using `View`, `Text`, `Pressable`,
`Image`, `ScrollView`, `FlatList`, and `StyleSheet` exactly as you already do — the
library only supplies color values and utilities.

## Compatibility

- Pure TypeScript/JavaScript — **no native modules**
- React Native CLI and Expo
- iOS and Android
- Old and new architecture
- Works with any React Native version that supports standard ES2019+ features; the
  latest stable RN is used as the reference/dev environment, but no specific RN version
  is required

## License

MIT
