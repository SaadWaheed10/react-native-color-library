import type { ChartPalettes, ColorValue } from "../types";
import { blue, cyan, green, indigo, orange, pink, purple, red, teal, yellow } from "../colors/basic";

const sequential: ColorValue[] = [
  blue[100],
  blue[200],
  blue[300],
  blue[400],
  blue[500],
  blue[600],
  blue[700],
  blue[800],
  blue[900],
];

const sequentialWarm: ColorValue[] = [
  yellow[100],
  yellow[200],
  orange[300],
  orange[400],
  orange[500],
  red[500],
  red[600],
  red[700],
  red[800],
];

const sequentialCool: ColorValue[] = [
  cyan[100],
  cyan[200],
  teal[300],
  teal[400],
  blue[500],
  blue[600],
  indigo[600],
  indigo[700],
  indigo[800],
];

const diverging: ColorValue[] = [
  red[700],
  red[500],
  red[300],
  "#e5e7eb",
  blue[300],
  blue[500],
  blue[700],
];

const categorical3: ColorValue[] = [blue[500], orange[500], green[500]];
const categorical4: ColorValue[] = [...categorical3, purple[500]];
const categorical5: ColorValue[] = [...categorical4, pink[500]];
const categorical6: ColorValue[] = [...categorical5, teal[500]];
const categorical8: ColorValue[] = [...categorical6, yellow[500], indigo[500]];
const categorical10: ColorValue[] = [...categorical8, red[500], cyan[500]];

/**
 * Ready-made chart color sets — sequential, diverging, and categorical.
 * Values are plain hex strings for any charting library.
 *
 * @example
 * charts.categorical[5]
 * charts.sequential
 * charts.diverging
 */
export const charts: ChartPalettes = {
  sequential,
  sequentialWarm,
  sequentialCool,
  diverging,
  categorical: {
    3: categorical3,
    4: categorical4,
    5: categorical5,
    6: categorical6,
    8: categorical8,
    10: categorical10,
  },
};
