"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  SERVICE_CATEGORY_KEYS,
  SERVICES_BY_CATEGORY,
  SERVICE_KEYS,
  type ServiceCategoryKey,
  type ServiceKey,
} from "@/lib/services";
import { cn } from "@/lib/utils";

type GlowPosition = {
  top: number;
  height: number;
};

export function ServicesHoverList() {
  const t = useTranslations("services");
  const reducedMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState<ServiceKey>(SERVICE_KEYS[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [glow, setGlow] = useState<GlowPosition>({ top: 0, height: 0 });

  const selectedIndex = SERVICE_KEYS.indexOf(selected);

  const updateGlow = useCallback((index: number | null) => {
    if (index === null || !listRef.current) return;

    const item = itemRefs.current[index];
    if (!item) return;

    const listTop = listRef.current.getBoundingClientRect().top;
    const itemRect = item.getBoundingClientRect();

    setGlow({
      top: itemRect.top - listTop,
      height: itemRect.height,
    });
  }, []);

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
    if (index !== null) updateGlow(index);
  };

  const handleSelect = (key: ServiceKey, index: number) => {
    setSelected(key);
    updateGlow(index);
  };

  const scrollToPricing = () => {
    document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeGlowIndex = hoveredIndex ?? selectedIndex;

  let flatIndex = 0;

  return (
    <div className="relative mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div
        ref={listRef}
        className="relative lg:col-span-5"
        onMouseLeave={() => handleHover(null)}
      >
        {!reducedMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 rounded-2xl bg-brand-highlight/20 blur-[72px]"
            animate={{
              top: glow.top - 12,
              height: glow.height + 24,
              opacity: activeGlowIndex >= 0 ? 0.8 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        <div className="relative z-[1] space-y-10">
          {SERVICE_CATEGORY_KEYS.map((category: ServiceCategoryKey) => (
            <div key={category}>
              <p className="font-ui mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {t(`categories.${category}.label`)}
              </p>
              <div className="divide-y divide-border/50 border-y border-border/50">
                {SERVICES_BY_CATEGORY[category].map((key) => {
                  const index = flatIndex++;
                  const isSelected = selected === key;
                  const isHovered = hoveredIndex === index;

                  return (
                    <button
                      key={key}
                      type="button"
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      onMouseEnter={() => handleHover(index)}
                      onFocus={() => handleHover(index)}
                      onClick={() => handleSelect(key, index)}
                      className="w-full py-6 text-left outline-none sm:py-7"
                      aria-pressed={isSelected}
                      aria-controls="service-detail-panel"
                    >
                      <h3
                        className={cn(
                          "font-service-title text-[clamp(1.2rem,2.4vw,1.85rem)] font-medium leading-[1.15] tracking-[-0.02em] transition-colors duration-500",
                          isSelected
                            ? "text-brand-highlight"
                            : isHovered
                              ? "text-brand-accent"
                              : "text-muted-foreground"
                        )}
                      >
                        {t(`items.${key}.title`)}
                      </h3>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7">
        <div
          id="service-detail-panel"
          className="service-detail-frame lg:sticky lg:top-28"
          aria-live="polite"
        >
          <div className="service-detail-frame__inner min-h-[320px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-accent/15 blur-[72px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-accent/25 to-transparent"
            />

            <div className="relative border-b border-border/50 px-6 py-5 sm:px-9">
              <div className="flex items-center justify-between gap-4">
                <p className="font-ui text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {t("panelBadge")}
                </p>
                <p className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(SERVICE_KEYS.length).padStart(2, "0")}
                </p>
              </div>
            </div>

            <div className="relative px-6 py-8 sm:px-9 sm:py-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-2 select-none font-heading text-[clamp(4rem,12vw,6.5rem)] font-normal leading-none text-foreground/[0.035] sm:right-8"
              >
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>

              {!reducedMotion && (
                <motion.div
                  layoutId="service-detail-accent"
                  className="absolute bottom-8 left-0 top-8 w-[2px] rounded-full bg-gradient-to-b from-brand-accent via-brand-highlight to-transparent"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={
                    reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reducedMotion
                      ? undefined
                      : { opacity: 0, y: -10, filter: "blur(3px)" }
                  }
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-5 sm:pl-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-4xl leading-none text-brand-highlight/35"
                  >
                    &ldquo;
                  </span>

                  <p className="font-ui mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-accent">
                    {t(`categories.${SERVICE_CATEGORY_KEYS.find((c) =>
                      (SERVICES_BY_CATEGORY[c] as readonly string[]).includes(selected)
                    )}.label`)}
                  </p>

                  <h3 className="font-service-title mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-tight text-foreground">
                    {t(`items.${selected}.title`)}
                  </h3>

                  <p className="font-ui mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {t(`items.${selected}.description`)}
                  </p>

                  <button
                    type="button"
                    onClick={scrollToPricing}
                    className="font-ui mt-10 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-brand-accent"
                  >
                    {t("panelCta")}
                    <span aria-hidden="true">→</span>
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
