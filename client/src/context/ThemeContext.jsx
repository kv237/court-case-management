import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { ThemeContext }
  from "./theme-context";

const STORAGE_KEY = "court-theme";

export const ThemeProvider = ({
  children,
}) => {
  const getInitialTheme = () => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme =
      localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {
      return savedTheme;
    }

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    return prefersDark
      ? "dark"
      : "light";
  };

  const [theme, setTheme] =
    useState(getInitialTheme);

  useLayoutEffect(() => {
    const root =
      document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === "dark",
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};