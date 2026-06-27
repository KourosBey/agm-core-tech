"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteFrame } from "@/components/references/site-frame";
import { SectionReveal } from "@/components/ui/section-reveal";
import { REFERENCES } from "@/lib/references";

export function ReferencesShowcase() {
  const t = useTranslations("references");

  return (
    <div className="py-32 pt-28 sm:pt-32">
      <div className="page-container">
        <SectionReveal>
          <Link
            href="/"
            className="section-label mb-10 inline-block transition-colors hover:text-foreground"
          >
            {t("backHome")}
          </Link>

          <h1 className="max-w-3xl font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.1] tracking-[-0.02em]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <div className="mt-20 space-y-20">
          {REFERENCES.map((item, index) => (
            <SectionReveal key={item.key} delay={index * 0.06}>
              <div className="space-y-8">
                <SiteFrame
                  url={item.url}
                  title={t(`items.${item.key}.title`)}
                />

                <div className="max-w-2xl">
                  <p className="section-label mb-3">{t(`items.${item.key}.category`)}</p>
                  <h2 className="font-heading text-3xl font-normal">
                    {t(`items.${item.key}.title`)}
                  </h2>
                  <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">
                    {t(`items.${item.key}.description`)}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
