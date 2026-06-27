"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CORE_LAYERS, useCore } from "@/components/core/core-context";
import { cn } from "@/lib/utils";

export function CoreNavigator() {
  const t = useTranslations("core");
  const { activeLayer, scrollToLayer } = useCore();

  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-3"
      aria-label={t("navigatorLabel")}
    >
      {CORE_LAYERS.map(({ id, href, layer }) => {
        const isActive = activeLayer === layer;
        const isPast = activeLayer > layer;

        return (
          <button
            key={id}
            onClick={() => scrollToLayer(href)}
            className="group flex items-center gap-3 text-left"
            aria-current={isActive ? "true" : undefined}
          >
            <div className="relative flex items-center justify-center">
              <motion.div
                className={cn(
                  "rounded-full border transition-colors duration-300",
                  isActive
                    ? "h-4 w-4 border-emerald-neon bg-emerald-neon/30"
                    : isPast
                      ? "h-3 w-3 border-cyber/50 bg-cyber/20"
                      : "h-3 w-3 border-white/15 bg-transparent group-hover:border-white/30"
                )}
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {layer < CORE_LAYERS.length - 1 && (
                <div
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 w-px h-3 mt-0.5",
                    isPast ? "bg-cyber/40" : "bg-white/10"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-[11px] font-medium uppercase tracking-widest transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                isActive && "opacity-100 translate-x-0 text-emerald-neon"
              )}
            >
              {t(`layers.${id}`)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
