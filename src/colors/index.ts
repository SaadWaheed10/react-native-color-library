import * as basic from "./basic";
import { named } from "./named";
import { material } from "./material";
import { white, black, transparent, current } from "./neutrals";
import { semantic, light, dark } from "../theme";

// Re-export every shaded family individually for tree-shaking, e.g.:
//   import { blue, red } from "react-native-color-library";
export {
  slate, gray, zinc, neutral, stone,
  red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky,
  blue, indigo, violet, purple, fuchsia, pink, rose,
} from "./basic";

export { named } from "./named";
export { material } from "./material";
export { white, black, transparent, current } from "./neutrals";

/**
 * The full color library, organized into intuitive categories.
 * Use it directly inside `StyleSheet.create()`:
 *
 * @example
 * const styles = StyleSheet.create({
 *   container: { backgroundColor: colors.blue[500] },
 *   title: { color: colors.white },
 * });
 */
export const colors = {
  ...basic,
  white,
  black,
  transparent,
  current,
  named,
  material,
  semantic,
  light,
  dark,
};
