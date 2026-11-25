"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type TextSize = "sm" | "md" | "lg" | "xl";

export interface A11ySettings {
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  textSize: TextSize;
  highContrast: boolean;
  calmMode: boolean;
}

interface A11yContextValue extends A11ySettings {
  update: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void;
}

const defaults: A11ySettings = {
  reduceMotion: false,
  dyslexiaFont: false,
  textSize: "md",
  highContrast: false,
  calmMode: false,
};

const A11yContext = createContext<A11yContextValue>({
  ...defaults,
  update: () => {},
});

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(defaults);

  // Load from localStorage on mount + respect prefers-reduced-motion
  useEffect(() => {
    try {
      const stored = localStorage.getItem("a11y-settings");
      if (stored) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {}

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setSettings((prev) => ({ ...prev, reduceMotion: true }));
    }
    const handler = (e: MediaQueryListEvent) => {
      setSettings((prev) => ({ ...prev, reduceMotion: e.matches }));
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Persist to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem("a11y-settings", JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Apply classes to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
    html.classList.toggle("a11y-dyslexia", settings.dyslexiaFont);
    html.classList.toggle("a11y-high-contrast", settings.highContrast);
    html.classList.toggle("a11y-calm", settings.calmMode);
    // Text size
    html.classList.remove("text-size-sm", "text-size-md", "text-size-lg", "text-size-xl");
    html.classList.add(`text-size-${settings.textSize}`);
  }, [settings]);

  const update = useCallback(
    <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <A11yContext.Provider value={{ ...settings, update }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  return useContext(A11yContext);
}

// Keep the user's individual switches intact while stopping motion in either mode.
export function useMotionDisabled() {
  const { reduceMotion, calmMode } = useA11y();
  return reduceMotion || calmMode;
}
