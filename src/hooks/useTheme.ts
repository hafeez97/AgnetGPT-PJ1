import { useEffect } from "react";
import { useThemeStore } from "../stores";

export const handleTheme = (theme) => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }
  const classList = document.documentElement.classList;
  const DARK_THEME = "dark";

  // true if user's system has dark theme
  const isSystemThemeDark = window?.matchMedia(`(prefers-color-scheme: ${DARK_THEME})`).matches;
  // determine whether App should have dark theme
  const shouldAppThemeBeDark = theme === DARK_THEME || (theme === "system" && isSystemThemeDark);

  if (shouldAppThemeBeDark && !classList.contains(DARK_THEME)) {
    classList.add(DARK_THEME);
  } else if (!shouldAppThemeBeDark) {
    classList.remove(DARK_THEME);
  }
};

export const useTheme = () => {
  const theme = useThemeStore.use.theme();
  const setTheme = useThemeStore.use.setTheme();
  const handleSetTheme = (theme) => {
    setTheme(theme);
    handleTheme(theme);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`);

    prefersDark.addEventListener("change", () => {
      handleTheme(theme);
    });
  }, []);

  return {
    theme,
    setTheme: handleSetTheme,
  };
};
