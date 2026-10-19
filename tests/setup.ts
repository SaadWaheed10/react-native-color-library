import { vi } from "vitest";

vi.mock("react-native", () => {
  class AnimatedValue {
    value: number;
    constructor(value: number) {
      this.value = value;
    }
    setValue(value: number) {
      this.value = value;
    }
  }

  return {
    Platform: {
      OS: "ios",
      select: <T,>(specs: { ios?: T; android?: T; default?: T }) =>
        specs.ios ?? specs.default ?? specs.android,
    },
    Appearance: {
      getColorScheme: () => "light" as const,
      addChangeListener: () => ({ remove: () => undefined }),
    },
    StyleSheet: {
      create: <T,>(styles: T) => styles,
      hairlineWidth: 1,
      absoluteFillObject: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    Animated: {
      Value: AnimatedValue,
      View: "Animated.View",
      timing: () => ({ start: (cb?: () => void) => cb?.() }),
    },
    Pressable: "Pressable",
    Text: "Text",
    View: "View",
    StatusBar: "StatusBar",
  };
});
