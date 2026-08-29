"use client";

import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  toggleThemeWithTransition: (event?: React.MouseEvent | MouseEvent) => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  // read saved theme only after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
        return;
      }
      const alt = window.localStorage.getItem("rogul-theme") as Theme | null;
      if (alt === "light" || alt === "dark") setTheme(alt);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const applyTheme = useCallback((next: Theme) => {
    setTheme(next);
    // Flush DOM synchronously for View Transition capture; guard inside handler
    try {
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((p) => (p === "light" ? "dark" : "light"));
  }, []);

  const toggleThemeWithTransition = useCallback(
    (event?: React.MouseEvent | MouseEvent) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      // Guard document/window only inside handler (hydration-safe)
      if (typeof document === "undefined" || typeof window === "undefined") {
        applyTheme(next);
        return;
      }

      const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const hasViewTransition =
        typeof (document as unknown as { startViewTransition?: unknown }).startViewTransition === "function";

      if (prefersReducedMotion || !hasViewTransition) {
        applyTheme(next);
        return;
      }

      const x = (event as { clientX?: number } | undefined)?.clientX ?? window.innerWidth / 2;
      const y = (event as { clientY?: number } | undefined)?.clientY ?? window.innerHeight / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const doc = document as unknown as {
        startViewTransition: (cb: () => void) => { ready: Promise<void> };
      };

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          applyTheme(next);
        });
      });

      // Fire wipe animation once the transition is ready
      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
            },
            {
              duration: 520,
              easing: "cubic-bezier(0.4,0,0.2,1)",
              pseudoElement: "::view-transition-new(root)" as unknown as string,
            } as unknown as KeyframeAnimationOptions
          );
        })
        .catch(() => {
          // no-op: if ready rejects, theme already applied
        });
    },
    [theme, applyTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleThemeWithTransition }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
