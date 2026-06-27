"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionReveal } from "@/components/ui/section-reveal";
import { cn } from "@/lib/utils";

const pillarKeys = ["precision", "resilience", "evolution"] as const;
type PillarKey = (typeof pillarKeys)[number];

export function PhilosophySection() {
  const t = useTranslations("philosophy");
  const [active, setActive] = useState<PillarKey>("precision");

  return (
    <section id="philosophy" className="border-t border-border/70 py-32">
      <div className="page-container">
        <SectionReveal>
          <div className="surface relative overflow-hidden px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <span
              className="pointer-events-none absolute -left-2 top-6 select-none font-heading text-[clamp(6rem,18vw,11rem)] leading-none text-primary/10"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div className="relative z-10 max-w-3xl">
              <p className="section-label">{t("badge")}</p>
              <h2 className="mt-6 font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-tight">
                {t("quoteTitle")}
              </h2>

              <blockquote className="mt-10 border-l border-primary/30 pl-6 font-heading text-[clamp(1.25rem,2.5vw,1.875rem)] font-normal italic leading-[1.45] text-foreground/90 sm:pl-8">
                {t("quote")}
              </blockquote>

              <footer className="mt-10 flex flex-col gap-1 sm:ml-8 sm:border-l sm:border-border/50 sm:pl-8">
                <p className="font-heading text-lg">{t("founder.name")}</p>
                <p className="text-sm text-muted-foreground">{t("founder.role")}</p>
              </footer>
            </div>

            <div className="relative z-10 mt-16 border-t border-border/60 pt-10 lg:mt-20 lg:pt-12">
              <div className="grid gap-2 sm:grid-cols-3">
                {pillarKeys.map((key) => {
                  const isActive = active === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActive(key)}
                      className={cn(
                        "group rounded-sm px-4 py-5 text-left transition-colors sm:px-5",
                        isActive
                          ? "bg-secondary/70"
                          : "hover:bg-secondary/35"
                      )}
                    >
                      <p
                        className={cn(
                          "font-mono text-[10px] tracking-[0.2em] transition-colors",
                          isActive ? "text-accent-foreground" : "text-muted-foreground"
                        )}
                      >
                        {t(`pillars.${key}.code`)}
                      </p>
                      <p
                        className={cn(
                          "mt-3 font-heading text-xl transition-all",
                          isActive && "italic text-foreground"
                        )}
                      >
                        {t(`pillars.${key}.title`)}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 min-h-[5.5rem] max-w-3xl px-4 sm:px-5">
                <p className="text-base leading-[1.85] text-muted-foreground">
                  {t(`pillars.${active}.description`)}
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
