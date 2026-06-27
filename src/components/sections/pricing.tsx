"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { AppLocale } from "@/lib/locales";
import { getTierPricing, tierKeys, type PricingTier } from "@/lib/regional-pricing";
import {
  SERVICE_CATEGORY_KEYS,
  SERVICES_BY_CATEGORY,
  getServicesInCategory,
  type ServiceCategoryKey,
  type ServiceKey,
} from "@/lib/services";
import { cn } from "@/lib/utils";

type TierKey = PricingTier;

export function PricingSection() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("pricing");
  const tServices = useTranslations("services.items");
  const tCategories = useTranslations("services.categories");
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryKey>(
    SERVICE_CATEGORY_KEYS[0]
  );
  const [activeService, setActiveService] = useState<ServiceKey>(
    SERVICES_BY_CATEGORY.coreEngineering[0]
  );
  const [isSubscription, setIsSubscription] = useState(true);

  const selectCategory = (category: ServiceCategoryKey) => {
    setActiveCategory(category);
    setActiveService(getServicesInCategory(category)[0]);
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const getFeatures = (service: ServiceKey, tier: TierKey): string[] =>
    t.raw(`services.${service}.tiers.${tier}.features`) as string[];

  return (
    <section id="pricing" className="border-t border-border/70 py-32">
      <div className="page-container">
        <SectionReveal>
          <SectionHeader
            label={t("badge")}
            title={t("title")}
            description={t("subtitle")}
            centered
            className="mx-auto text-center [&_h2]:mx-auto [&_p]:mx-auto"
          />
        </SectionReveal>

        <SectionReveal delay={0.04} className="mt-8 flex justify-center">
          <div className="inline-flex max-w-xl items-center gap-3 rounded-sm border border-primary/25 bg-primary/5 px-5 py-3 text-center">
            <span className="font-ui shrink-0 rounded-sm bg-primary px-2 py-0.5 text-xs font-medium tracking-wide text-primary-foreground">
              {t("launchBadge")}
            </span>
            <p className="font-ui text-sm leading-relaxed text-muted-foreground">
              {t("launchNote")}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05} className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {SERVICE_CATEGORY_KEYS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                className={cn(
                  "font-ui rounded-sm border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors",
                  activeCategory === category
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {tCategories(`${category}.label`)}
              </button>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06} className="mt-8">
          <div className="scrollbar-none -mx-6 overflow-x-auto px-6">
            <div className="flex min-w-max gap-2 border-b border-border/60 pb-px md:min-w-0 md:flex-wrap md:justify-center">
              {getServicesInCategory(activeCategory).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveService(key)}
                  className={cn(
                    "shrink-0 px-4 py-3 text-sm transition-colors",
                    activeService === key
                      ? "border-b border-foreground text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tServices(`${key}.title`)}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="mb-12 mt-10 flex justify-center">
          <div className="inline-flex gap-8 border-b border-border/60 pb-1">
            <button
              type="button"
              onClick={() => setIsSubscription(true)}
              className={cn(
                "pb-3 text-sm transition-colors",
                isSubscription
                  ? "border-b border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("toggle.subscription")}
            </button>
            <button
              type="button"
              onClick={() => setIsSubscription(false)}
              className={cn(
                "pb-3 text-sm transition-colors",
                !isSubscription
                  ? "border-b border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("toggle.onetime")}
            </button>
          </div>
        </SectionReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 md:grid-cols-3"
          >
            {tierKeys.map((tier, index) => {
              const features = getFeatures(activeService, tier);
              const isPopular = tier === "professional";
              const isCustom = tier === "enterprise";
              const pricing = !isCustom
                ? getTierPricing(
                    locale,
                    activeService,
                    tier,
                    isSubscription ? "subscription" : "onetime"
                  )
                : null;

              return (
                <SectionReveal key={`${activeService}-${tier}`} delay={index * 0.05}>
                  <div className={cn("h-full", isPopular && "nebula-pricing-glow")}>
                    <div
                      className={cn(
                        "surface flex h-full flex-col p-8 sm:p-10",
                        isPopular && "nebula-pricing-glow__inner"
                      )}
                    >
                      {isPopular && (
                        <p className="section-label mb-6">{t("popular")}</p>
                      )}

                      <h3 className="font-heading text-3xl font-normal">
                        {t(`services.${activeService}.tiers.${tier}.name`)}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {t(`services.${activeService}.tiers.${tier}.description`)}
                      </p>

                      <div className="mb-10 mt-10">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          {pricing ? (
                            <>
                              <span className="font-heading text-4xl font-normal tabular-nums">
                                {pricing.sale}
                              </span>
                              <span className="font-heading text-xl font-normal tabular-nums text-muted-foreground/60 line-through decoration-muted-foreground/40">
                                {pricing.list}
                              </span>
                              <span className="font-ui rounded-sm bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                                {t("discountLabel")}
                              </span>
                            </>
                          ) : (
                            <span className="font-heading text-4xl font-normal tabular-nums">
                              {isSubscription
                                ? t(
                                    `services.${activeService}.tiers.${tier}.priceSubscription`
                                  )
                                : t(
                                    `services.${activeService}.tiers.${tier}.priceOnetime`
                                  )}
                            </span>
                          )}
                          {(isSubscription
                            ? t(
                                `services.${activeService}.tiers.${tier}.periodSubscription`
                              )
                            : t(
                                `services.${activeService}.tiers.${tier}.periodOnetime`
                              )) && (
                            <span className="text-sm text-muted-foreground">
                              {isSubscription
                                ? t(
                                    `services.${activeService}.tiers.${tier}.periodSubscription`
                                  )
                                : t(
                                    `services.${activeService}.tiers.${tier}.periodOnetime`
                                  )}
                            </span>
                          )}
                        </div>
                      </div>

                      <ul className="flex-1 space-y-4">
                        {features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-sm leading-relaxed text-muted-foreground"
                          >
                            <span className="mr-2 text-muted-foreground/50">—</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={scrollToContact}
                        variant={isPopular ? "default" : "outline"}
                        className={cn(
                          "mt-10 h-12 w-full rounded-sm text-sm font-normal tracking-wide",
                          isPopular &&
                            "bg-primary text-primary-foreground shadow-[var(--ambient-shadow-sm)] hover:bg-primary/90"
                        )}
                      >
                        {isCustom ? t("contact") : t("cta")}
                      </Button>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
