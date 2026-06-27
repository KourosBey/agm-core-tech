"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  HERO_GALLERY,
  HERO_GALLERY_INTERVAL_MS,
} from "@/lib/hero-gallery";
import { cn } from "@/lib/utils";

export function HeroGallery() {
  const t = useTranslations("hero.gallery");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_GALLERY.length);
    }, HERO_GALLERY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const slide = HERO_GALLERY[index];

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm bg-background"
      aria-roledescription="carousel"
      aria-label={t("label")}
      aria-live="off"
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={t(`slides.${slide.altKey}.alt`)}
              fill
              className="object-cover"
              style={{ objectPosition: slide.objectPosition }}
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={index === 0}
            />

            <div className="pointer-events-none absolute inset-0 bg-[#0a0f1c]/35" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0f1c]/90 via-[#0a0f1c]/35 to-[#0a0f1c]/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/95 via-[#0a0f1c]/20 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(34,211,238,0.08),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(167,139,250,0.06),transparent_50%)]" />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
          <div className="max-w-md">
            <p className="section-label mb-2 text-foreground/80">
              {t(`slides.${slide.altKey}.category`)}
            </p>
            <p className="font-heading text-xl text-foreground sm:text-2xl">
              {t(`slides.${slide.altKey}.title`)}
            </p>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            {HERO_GALLERY.map((item, dotIndex) => (
              <span
                key={item.src}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  dotIndex === index
                    ? "w-8 bg-brand-accent"
                    : "w-3 bg-foreground/20"
                )}
                aria-hidden="true"
              />
            ))}
            <p className="ml-2 font-mono text-xs tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(HERO_GALLERY.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
