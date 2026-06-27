"use client";

import { useTranslations } from "next-intl";
import { SectionReveal } from "@/components/ui/section-reveal";
import { HeroGallery } from "@/components/sections/hero-gallery";

export function HeroSection() {
  const t = useTranslations("hero");

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pb-28 pt-32 sm:pt-36">
      <div className="page-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-7">
            <SectionReveal>
              <p className="section-label mb-10">{t("badge")}</p>
            </SectionReveal>

            <SectionReveal delay={0.05}>
              <h1 className="font-heading text-[clamp(2.75rem,7vw,5.25rem)] font-normal leading-[1.02] tracking-[-0.02em]">
                {t("title")}
                <br />
                <span className="text-display-accent">{t("titleHighlight")}</span>
              </h1>
            </SectionReveal>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <SectionReveal delay={0.12}>
              <p className="text-base leading-[1.75] text-muted-foreground">
                {t("subtitle")}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.18}>
              <div className="mt-10 flex max-w-sm flex-col gap-3">
                <span className="nebula-cta-border nebula-cta-border--primary w-full sm:w-fit">
                  <button
                    type="button"
                    onClick={() => scrollTo("#services")}
                    className="nebula-cta-border__inner h-12 w-full whitespace-nowrap px-8 text-sm font-normal tracking-wide shadow-[var(--ambient-shadow-sm)] transition-colors sm:w-auto"
                  >
                    {t("ctaPrimary")}
                  </button>
                </span>
                <span className="nebula-cta-border nebula-cta-border--ghost w-full sm:w-fit">
                  <button
                    type="button"
                    onClick={() => scrollTo("#contact")}
                    className="nebula-cta-border__inner h-12 w-full whitespace-nowrap px-8 text-sm font-normal tracking-wide transition-colors sm:w-auto"
                  >
                    {t("ctaSecondary")}
                  </button>
                </span>
              </div>
            </SectionReveal>
          </div>
        </div>

        <SectionReveal delay={0.24}>
          <div className="mt-16 lg:mt-20">
            <div className="surface overflow-hidden border-border/60 p-2 sm:p-2.5">
              <HeroGallery />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
