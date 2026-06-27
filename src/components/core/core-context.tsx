"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const CORE_LAYERS = [
  { id: "hero", href: "#hero", layer: 0 },
  { id: "philosophy", href: "#philosophy", layer: 1 },
  { id: "about", href: "#about", layer: 2 },
  { id: "services", href: "#services", layer: 3 },
  { id: "pricing", href: "#pricing", layer: 4 },
  { id: "contact", href: "#contact", layer: 5 },
] as const;

export type CoreLayerId = (typeof CORE_LAYERS)[number]["id"];

type CoreContextValue = {
  activeLayer: number;
  activeModule: string | null;
  setActiveModule: (id: string | null) => void;
  scrollToLayer: (href: string) => void;
};

const CoreContext = createContext<CoreContextValue | null>(null);

export function CoreProvider({ children }: { children: ReactNode }) {
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CORE_LAYERS.forEach(({ id, layer }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveLayer(layer);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToLayer = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <CoreContext.Provider
      value={{ activeLayer, activeModule, setActiveModule, scrollToLayer }}
    >
      {children}
    </CoreContext.Provider>
  );
}

export function useCore() {
  const ctx = useContext(CoreContext);
  if (!ctx) throw new Error("useCore must be used within CoreProvider");
  return ctx;
}
