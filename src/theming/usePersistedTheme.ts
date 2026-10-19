import { useCallback, useEffect, useState } from "react";
import type { ThemeModePreference, ThemeStorage } from "../types";

const DEFAULT_KEY = "@rn-color-library/theme-mode";

export interface UsePersistedThemeOptions {
  /** Storage adapter (AsyncStorage, MMKV wrapper, etc.). */
  storage: ThemeStorage;
  /** Storage key. */
  key?: string;
  /** Fallback before hydration / when nothing stored. */
  defaultMode?: ThemeModePreference;
}

export interface UsePersistedThemeResult {
  /** Preference to pass into `ThemeProvider` `mode`. */
  mode: ThemeModePreference;
  /** Persist + update preference — pass to `ThemeProvider` `onModeChange`. */
  setMode: (mode: ThemeModePreference) => void;
  /** `true` after the initial storage read completes. */
  hydrated: boolean;
}

/**
 * Persists light/dark/system preference via any async (or sync) storage.
 *
 * @example
 * import AsyncStorage from "@react-native-async-storage/async-storage";
 *
 * const { mode, setMode, hydrated } = usePersistedTheme({ storage: AsyncStorage });
 *
 * if (!hydrated) return null;
 * return (
 *   <ThemeProvider mode={mode} onModeChange={setMode}>
 *     <App />
 *   </ThemeProvider>
 * );
 */
export function usePersistedTheme(
  options: UsePersistedThemeOptions
): UsePersistedThemeResult {
  const { storage, key = DEFAULT_KEY, defaultMode = "system" } = options;
  const [mode, setModeState] = useState<ThemeModePreference>(defaultMode);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await storage.getItem(key);
        if (!cancelled && (raw === "light" || raw === "dark" || raw === "system")) {
          setModeState(raw);
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storage, key]);

  const setMode = useCallback(
    (next: ThemeModePreference) => {
      setModeState(next);
      void Promise.resolve(storage.setItem(key, next));
    },
    [storage, key]
  );

  return { mode, setMode, hydrated };
}
