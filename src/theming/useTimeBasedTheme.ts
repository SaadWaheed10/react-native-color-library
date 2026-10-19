import { useEffect, useMemo, useState } from "react";
import type { AppThemeConfig, ThemeMode, TimeOfDay } from "../types";
import { createAppTheme } from "./createAppTheme";
import { nightShiftPalette } from "./nightShift";

export interface TimeBasedThemeOptions {
  /** Brand / base theme to vary across the day. */
  base?: AppThemeConfig;
  /** Override hour boundaries (0–23). */
  schedule?: {
    morning?: number;
    day?: number;
    evening?: number;
    night?: number;
  };
  /** Tick interval in ms to re-evaluate (default 60_000). */
  intervalMs?: number;
}

function getTimeOfDay(
  hour: number,
  schedule: Required<NonNullable<TimeBasedThemeOptions["schedule"]>>
): TimeOfDay {
  if (hour >= schedule.night || hour < schedule.morning) return "night";
  if (hour < schedule.day) return "morning";
  if (hour < schedule.evening) return "day";
  return "evening";
}

/**
 * Resolves the current time-of-day segment and a themed config that
 * warms / darkens automatically toward evening and night.
 *
 * @example
 * const { timeOfDay, theme, suggestedMode } = useTimeBasedTheme({ base: myTheme });
 * <ThemeProvider theme={theme} defaultMode={suggestedMode}>
 */
export function useTimeBasedTheme(options: TimeBasedThemeOptions = {}) {
  const {
    base = createAppTheme(),
    schedule: scheduleOpt,
    intervalMs = 60_000,
  } = options;

  const schedule = {
    morning: scheduleOpt?.morning ?? 6,
    day: scheduleOpt?.day ?? 10,
    evening: scheduleOpt?.evening ?? 17,
    night: scheduleOpt?.night ?? 21,
  };

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const timeOfDay = getTimeOfDay(now.getHours(), schedule);

  const theme = useMemo<AppThemeConfig>(() => {
    if (timeOfDay === "day" || timeOfDay === "morning") {
      return base;
    }
    const amount = timeOfDay === "evening" ? 12 : 22;
    return {
      light: base.light,
      dark: {
        ...base.dark,
        colors: {
          ...base.dark.colors,
          ...nightShiftPalette(base.dark.colors, amount),
        },
      },
    };
  }, [base, timeOfDay]);

  const suggestedMode: ThemeMode =
    timeOfDay === "night" || timeOfDay === "evening" ? "dark" : "light";

  return { timeOfDay, theme, suggestedMode, now };
}

/** Pure helper — resolve time-of-day from a Date. */
export function resolveTimeOfDay(
  date: Date = new Date(),
  schedule?: TimeBasedThemeOptions["schedule"]
): TimeOfDay {
  return getTimeOfDay(date.getHours(), {
    morning: schedule?.morning ?? 6,
    day: schedule?.day ?? 10,
    evening: schedule?.evening ?? 17,
    night: schedule?.night ?? 21,
  });
}
