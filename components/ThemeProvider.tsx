"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "parchment" | "sepia" | "dark";
export type FontSize = "base" | "lg" | "xl";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("parchment");
  const [fontSize, setFontSize] = useState<FontSize>("lg"); // Default is prose-lg equivalent
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("brlt-theme") as Theme;
    if (storedTheme) setTheme(storedTheme);
    const storedFontSize = localStorage.getItem("brlt-font-size") as FontSize;
    if (storedFontSize) {
      setFontSize(storedFontSize);
      document.documentElement.setAttribute("data-fontsize", storedFontSize);
    } else {
      document.documentElement.setAttribute("data-fontsize", "lg");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "parchment") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("brlt-theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("brlt-font-size", fontSize);
    document.documentElement.setAttribute("data-fontsize", fontSize);
  }, [fontSize, mounted]);

  // Prevent flash of incorrect theme by rendering invisibly until mounted
  // Actually, better to just let it render with default and hydrate
  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
