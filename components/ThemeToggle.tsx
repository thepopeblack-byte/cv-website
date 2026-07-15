"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { trackEvent } from "@/lib/analytics";

type Theme = "dark" | "light";

const themeChangeEvent = "popeblack-theme-change";

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("popeblack-theme", nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
    trackEvent("theme_change", { theme: nextTheme });
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      }
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
    >
      <span className="theme-icon theme-icon-sun" aria-hidden="true">
        <Sun size={15} />
      </span>
      <span className="theme-icon theme-icon-moon" aria-hidden="true">
        <Moon size={15} />
      </span>
    </button>
  );
}
