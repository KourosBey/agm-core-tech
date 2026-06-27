"use client";

import { useTranslations } from "next-intl";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesHoverList } from "@/components/services/services-hover-list";

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section id="services" className="border-t border-border/70 py-32">
      <div className="page-container">
        <SectionReveal>
          <SectionHeader
            label={t("badge")}
            title={t("title")}
            description={t("subtitle")}
          />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <ServicesHoverList />
        </SectionReveal>
      </div>
    </section>
  );
}
