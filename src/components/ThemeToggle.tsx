import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { applyTheme, getStoredTheme, type Theme } from "../lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = getStoredTheme();
    applyTheme(initial);
    return initial;
  });

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      {theme === "dark" ? <Sun size={14} strokeWidth={1.6} /> : <Moon size={14} strokeWidth={1.6} />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
