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
- 🎯 **`createPalette`** / **`createPaletteOklch`** for generating a full 50–950 scale
- 🎭 **`createHarmony`** — complementary, analogous, triadic, tetradic, split-complementary
- 🌓 **`createBrandThemes`** — full light + dark themes from one brand color
- 🔘 **Optional `ThemeProvider` + `ThemeToggle`** — one-button light/dark mode with
  customizable colors **and fonts** that switch with the mode
- 📐 **Design tokens** — spacing, radius, opacity, z-index, elevation/shadows
- 🎨 **Theme presets** — `minimal`, `vibrant`, `oled`, `highContrast`, `soft`, `midnight`
- ♿ **High-contrast & night-shift** modes
- 💾 **`usePersistedTheme`** — AsyncStorage/MMKV-friendly persistence
- 🧩 **`ThemedView` / `ThemedText` / `ThemedStatusBar` / `ThemeScope`**
- ✨ **`AnimatedThemeView`** — smooth fade on mode change
- 🕐 **`useTimeBasedTheme`** — morning/day/evening/night schemes
- 🧠 **`createDynamicColorScheme`**, **`auditTheme`**, **`extractPaletteFromPixels`**
- 🎛️ **HSV picker math** + **Display-P3** helpers
- 🧊 **Skia gradient configs** (linear / radial / sweep / mesh)
- 📤 **Style Dictionary / CSS variable export**
- 🧪 **`ContrastPreview`** in-app a11y panel
- 🛠️ **CLI** — `npx rn-color init --brand #7C3AED`
- 🛠️ **Color utilities**: `lighten`, `darken`, `alpha`, `mix`, `invert`, `grayscale`,
  `saturate`, `desaturate`, `rotateHue`, `setHue`, `warmer`, `cooler`, `randomColor`,
  `randomPalette`, plus hex/rgb/hsl/OKLCH conversions
- ♿ **Contrast & a11y**: `getContrastRatio`, `getContrastText`, `meetsContrastGuidelines`,
  `ensureContrast`, `findAccessibleShade`, `getLuminance`, `isLight`, `isDark`,
  `simulateColorBlindness`
- 🔍 **`nearestColor`** / **`deltaE`** — map any hex to the closest library (or custom) color
- 📊 **`charts`** — sequential, diverging, and categorical chart palettes
- 🪟 **`tokens`** / **`overlays`** — scrim, glass, shadow, focus-ring UI tokens
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

### Brand → light + dark themes

```tsx
import { createBrandThemes } from "react-native-color-library";

const themes = createBrandThemes("#7C3AED");
themes.light.primary;
themes.dark.background;
```

## One-Toggle Light / Dark Mode (optional)

Static colors still work with zero setup. When you want a live light/dark switch —
including **fonts and colors that change with the mode** — wrap your app once:

```tsx
import {
  ThemeProvider,
  ThemeToggle,
  createAppTheme,
  useTheme,
  useThemedStyles,
} from "react-native-color-library";
import { View, Text } from "react-native";

const appTheme = createAppTheme({
  brand: "#7C3AED",
  // Shared fonts (both modes)
  fonts: {
    family: { sans: "Inter", mono: "JetBrainsMono" },
    sizes: { md: 16, xl: 22 },
  },
  // Optional per-mode overrides
  light: {
    colors: { background: "#ffffff", card: "#f8fafc" },
  },
  dark: {
    colors: { background: "#0a0a0a", card: "#171717" },
    fonts: { family: { sans: "Inter-Medium" } }, // different font in dark mode
  },
});

export function Root() {
  return (
    <ThemeProvider theme={appTheme} defaultMode="system">
      <App />
    </ThemeProvider>
  );
}

function App() {
  const { colors, fonts, isDark, toggle } = useTheme();
  const styles = useThemedStyles((t) => ({
    screen: { flex: 1, backgroundColor: t.colors.background, padding: 24 },
    title: {
      color: t.colors.text,
      fontFamily: t.fonts.family.sans,
      fontSize: t.fonts.sizes.xl,
      fontWeight: t.fonts.weights.bold,
    },
    subtitle: {
      color: t.colors.textMuted,
      fontFamily: t.fonts.family.sans,
      fontSize: t.fonts.sizes.md,
    },
  }));

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Hello {isDark ? "Dark" : "Light"}</Text>
      <Text style={styles.subtitle}>Colors & fonts follow the mode.</Text>

      {/* Ready-made toggle button */}
      <ThemeToggle lightLabel="☀️ Dark mode" darkLabel="🌙 Light mode" />

      {/* Or build your own with toggle() */}
      {/* <Button title="Toggle" onPress={toggle} /> */}
    </View>
  );
}
```

### Persist the user's choice

```tsx
<ThemeProvider
  theme={appTheme}
  mode={savedMode}                 // "light" | "dark" | "system"
  onModeChange={async (mode) => {
    await AsyncStorage.setItem("theme", mode);
  }}
>
  {children}
</ThemeProvider>
```

`defaultMode="system"` follows the device; tapping `ThemeToggle` switches to an
explicit light/dark preference. Colors **and** fonts always come from the active
mode's half of your `createAppTheme` config.

### Design tokens, presets, persistence, primitives

```tsx
import {
  createAppTheme,
  themePresets,
  usePersistedTheme,
  ThemeScope,
  ThemedView,
  ThemedText,
  ThemedStatusBar,
  AnimatedThemeView,
  useTimeBasedTheme,
  ContrastPreview,
  auditTheme,
  createDynamicColorScheme,
  exportStyleDictionaryTokens,
  createSkiaLinearGradient,
} from "react-native-color-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Full design system from one brand
const theme = createAppTheme({
  brand: "#7C3AED",
  nightShift: true,
  tokens: { spacing: { md: 20 }, radius: { lg: 16 } },
});

// Or use a pack
themePresets.oled;
themePresets.vibrant;

// Persist mode
const { mode, setMode, hydrated } = usePersistedTheme({ storage: AsyncStorage });

// Nested brand for one screen
<ThemeScope theme={{ colors: { primary: "#16a34a" } }}>...</ThemeScope>

// Themed primitives + animated fade
<AnimatedThemeView style={{ flex: 1 }}>
  <ThemedView style={{ flex: 1 }}>
    <ThemedStatusBar />
    <ThemedText size="xl" weight="bold">Hello</ThemedText>
    <ContrastPreview />
  </ThemedView>
</AnimatedThemeView>

// Time-of-day + Material You–style dynamic color
useTimeBasedTheme({ base: theme });
createDynamicColorScheme("#7C3AED");
auditTheme(theme.light);
exportStyleDictionaryTokens(theme.light);
createSkiaLinearGradient({ colors: ["#f00", "#00f"] });
```

### CLI

```bash
npx rn-color init --brand #7C3AED
npx rn-color init --brand #0d9488 --preset soft --out src/theme.ts
```

See `example/App.tsx` for a full demo screen.

## Color Harmonies

```tsx
import { createHarmony } from "react-native-color-library";

createHarmony("#7C3AED", "complementary");
createHarmony("#7C3AED", "analogous");
createHarmony("#7C3AED", "triadic");
createHarmony("#7C3AED", "tetradic");
createHarmony("#7C3AED", "split-complementary");
```

## OKLCH / OKLab

Perceptually uniform conversions and palette generation:

```tsx
import {
  hexToOklch,
  oklchToHex,
  lightenOklch,
  darkenOklch,
  createPaletteOklch,
} from "react-native-color-library";

const oklch = hexToOklch("#7C3AED");
lightenOklch("#7C3AED", 0.1);
const brand = createPaletteOklch("#7C3AED");
```

## Accessibility Auto-Fix

```tsx
import {
  ensureContrast,
  findAccessibleShade,
  getLuminance,
  isLight,
  simulateColorBlindness,
  blue,
} from "react-native-color-library";

ensureContrast("#ffffff", "#cccccc"); // nudges until WCAG AA
findAccessibleShade(blue, "#ffffff");
getLuminance("#3b82f6");
isLight("#ffffff"); // true
simulateColorBlindness("#16A34A", "deuteranopia");
```

## Nearest Color Matching

```tsx
import { nearestColor, deltaE, createPalette } from "react-native-color-library";

nearestColor("#7B3FE4");
// → { name: "violet", shade: 500, value: "...", distance: ... }

deltaE("#ff0000", "#00ff00");

const brand = createPalette("#7C3AED");
nearestColor("#6d28d9", brand); // search within a custom scale
```

## Extra Manipulation Helpers

```tsx
import {
  rotateHue,
  setHue,
  warmer,
  cooler,
  randomColor,
  randomPalette,
} from "react-native-color-library";

rotateHue("#3b82f6", 40);
setHue("#3b82f6", 200);
warmer("#3b82f6");
cooler("#ef4444");
randomColor({ hue: 260 });
randomPalette({ hue: 120 });
```

## Chart Palettes & UI Tokens

```tsx
import { charts, tokens, overlays, createTokens } from "react-native-color-library";

charts.sequential;
charts.diverging;
charts.categorical[5];

tokens.scrim;      // modal backdrop
tokens.glass;      // frosted surface tint
tokens.focusRing;
overlays.darkHeavy;

createTokens({ scrim: "rgba(0, 0, 0, 0.8)" });
```

## No Component Lock-In

Static color/gradient/utility APIs never require custom components. Keep using
`View`, `Text`, `Pressable`, and `StyleSheet` as you already do.

The optional theming layer (`ThemeProvider`, `ThemeToggle`, `useTheme`) is opt-in —
use it only when you want a live light/dark toggle with mode-aware colors and fonts.

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
