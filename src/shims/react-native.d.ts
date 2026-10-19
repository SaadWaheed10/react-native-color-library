/**
 * Minimal ambient typings for the React Native APIs this library uses.
 * Consumer apps already have real `react-native` types; this keeps
 * library typecheck/build working without installing RN as a dependency.
 */
declare module "react-native" {
  import type { ComponentType, ReactNode } from "react";

  export type ColorSchemeName = "light" | "dark" | null | undefined;

  export const Platform: {
    OS: "ios" | "android" | "windows" | "macos" | "web";
    select: <T>(specs: { ios?: T; android?: T; native?: T; default?: T }) => T;
  };

  export const Appearance: {
    getColorScheme: () => ColorSchemeName;
    addChangeListener: (
      listener: (preferences: { colorScheme: ColorSchemeName }) => void
    ) => { remove: () => void };
  };

  export const StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => T;
    hairlineWidth: number;
    absoluteFillObject: Record<string, unknown>;
  };

  export type ViewStyle = Record<string, unknown>;
  export type TextStyle = Record<string, unknown>;
  export type ImageStyle = Record<string, unknown>;
  export type StyleProp<T> =
    | T
    | Array<T | null | undefined | false | StyleProp<T>>
    | null
    | undefined
    | false;

  export interface PressableProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    accessibilityRole?: string;
    accessibilityLabel?: string;
    accessibilityState?: Record<string, unknown>;
    [key: string]: unknown;
  }

  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    pointerEvents?: "auto" | "none" | "box-none" | "box-only";
    [key: string]: unknown;
  }

  export interface TextProps {
    style?: StyleProp<TextStyle>;
    children?: ReactNode;
    [key: string]: unknown;
  }

  export interface StatusBarProps {
    barStyle?: "default" | "light-content" | "dark-content";
    backgroundColor?: string;
    [key: string]: unknown;
  }

  export class AnimatedValue {
    constructor(value: number);
    setValue(value: number): void;
  }

  export const Animated: {
    Value: typeof AnimatedValue;
    View: ComponentType<ViewProps & { style?: StyleProp<ViewStyle> }>;
    timing: (
      value: AnimatedValue,
      config: { toValue: number; duration: number; useNativeDriver?: boolean }
    ) => { start: (cb?: () => void) => void };
  };

  export const Pressable: ComponentType<PressableProps>;
  export const Text: ComponentType<TextProps>;
  export const View: ComponentType<ViewProps>;
  export const StatusBar: ComponentType<StatusBarProps>;
}
