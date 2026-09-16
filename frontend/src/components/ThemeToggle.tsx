"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Toggles a `dark` class on <html>, persisting the preference to localStorage. */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("palmai_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("palmai_theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/50 backdrop-blur transition hover:scale-105 dark:bg-white/10"
    >
      {isDark ? <Sun size={18} className="text-gold-400" /> : <Moon size={18} className="text-brand-600" />}
    </button>
  );
}
