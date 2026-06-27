"use client";

import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionReveal } from "@/components/ui/section-reveal";
import {
  WizardOptionGrid,
  type WizardOption,
} from "@/components/contact/wizard-option-grid";
import { SERVICE_KEYS, type ServiceKey } from "@/lib/services";
import type { AppLocale } from "@/lib/locales";
import { getBudgetLabel, type BudgetKey } from "@/lib/regional-pricing";

const serviceOptions = [...SERVICE_KEYS, "other"] as const;
const budgetOptions = ["small", "medium", "large", "enterprise"] as const;
const timelineOptions = ["urgent", "short", "medium", "long"] as const;

type FormData = {
  service: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialFormData: FormData = {
  service: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  message: "",
};

const totalSteps = 5;
const advanceDelayMs = 220;

export function ContactSection() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("contact");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const selectAndAdvance = useCallback(
    (field: keyof FormData, value: string, nextStep: number) => {
      updateField(field, value);
      window.setTimeout(() => setStep(nextStep), advanceDelayMs);
    },
    [updateField]
  );

  const canProceed = () => {
    switch (step) {
      case 4:
        return !!formData.name && !!formData.email;
      default:
        return true;
    }
  };

  const serviceChoices: WizardOption[] = serviceOptions.map((key) => ({
    id: key,
    label: t(`wizard.services.${key}`),
  }));

  const budgetChoices: WizardOption[] = budgetOptions.map((key) => ({
    id: key,
    label: getBudgetLabel(locale, key),
  }));

  const timelineChoices: WizardOption[] = timelineOptions.map((key) => ({
    id: key,
    label: t(`wizard.timeline.options.${key}`),
  }));

  const stepVariants = {
    enter: { opacity: 0, y: 16 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  if (submitted) {
    return (
      <section id="contact" className="border-t border-border/70 py-32">
        <div className="page-container max-w-2xl text-center">
          <div className="surface p-12 sm:p-16">
            <h2 className="font-heading text-3xl font-normal">
              {t("wizard.success.title")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {t("wizard.success.description")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="border-t border-border/70 py-32">
      <div className="page-container max-w-4xl">
        <SectionReveal className="mb-14">
          <SectionHeader
            label={t("badge")}
            title={t("title")}
            description={t("subtitle")}
            centered
            className="text-center [&_h2]:mx-auto [&_p]:mx-auto"
          />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="surface p-8 sm:p-12">
            <div className="mb-10 flex items-center justify-between gap-4">
              <p className="section-label">
                {String(step).padStart(2, "0")} /{" "}
                {String(totalSteps).padStart(2, "0")}
              </p>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i + 1 <= step
                        ? "h-1 w-6 rounded-full bg-primary/70"
                        : "h-1 w-6 rounded-full bg-border"
                    }
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <div>
                    <h3 className="font-ui text-xl font-semibold sm:text-2xl">
                      {t("wizard.step1.title")}
                    </h3>
                    <p className="font-ui mb-8 mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      {t("wizard.step1.subtitle")}
                    </p>
                    <WizardOptionGrid
                      columns="triple"
                      options={serviceChoices}
                      selectedId={formData.service}
                      onSelect={(id) => selectAndAdvance("service", id, 2)}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-ui text-xl font-semibold sm:text-2xl">
                      {t("wizard.step2.title")}
                    </h3>
                    <p className="font-ui mb-8 mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      {t("wizard.step2.subtitle")}
                    </p>
                    <WizardOptionGrid
                      columns="double"
                      options={budgetChoices}
                      selectedId={formData.budget}
                      onSelect={(id) => selectAndAdvance("budget", id, 3)}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-ui text-xl font-semibold sm:text-2xl">
                      {t("wizard.step3.title")}
                    </h3>
                    <p className="font-ui mb-8 mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      {t("wizard.step3.subtitle")}
                    </p>
                    <WizardOptionGrid
                      columns="double"
                      options={timelineChoices}
                      selectedId={formData.timeline}
                      onSelect={(id) => selectAndAdvance("timeline", id, 4)}
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-ui text-xl font-semibold sm:text-2xl">
                        {t("wizard.step4.title")}
                      </h3>
                      <p className="font-ui mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                        {t("wizard.step4.subtitle")}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("wizard.fields.name")}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="rounded-sm border-border bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("wizard.fields.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="rounded-sm border-border bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t("wizard.fields.company")}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className="rounded-sm border-border bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("wizard.fields.message")}</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        className="min-h-[120px] rounded-sm border-border bg-background"
                      />
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <h3 className="font-ui text-xl font-semibold sm:text-2xl">
                      {t("wizard.step5.title")}
                    </h3>
                    <p className="font-ui mb-8 mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      {t("wizard.step5.subtitle")}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="surface rounded-sm p-4">
                        <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("wizard.review.service")}
                        </p>
                        <p className="font-ui mt-2 text-sm leading-relaxed text-foreground">
                          {t(
                            `wizard.services.${formData.service as ServiceKey | "other"}`
                          )}
                        </p>
                      </div>
                      <div className="surface rounded-sm p-4">
                        <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("wizard.budget.label")}
                        </p>
                        <p className="font-ui mt-2 text-sm leading-relaxed text-foreground">
                          {getBudgetLabel(
                            locale,
                            formData.budget as BudgetKey
                          )}
                        </p>
                      </div>
                      <div className="surface rounded-sm p-4">
                        <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("wizard.timeline.label")}
                        </p>
                        <p className="font-ui mt-2 text-sm leading-relaxed text-foreground">
                          {t(
                            `wizard.timeline.options.${formData.timeline as (typeof timelineOptions)[number]}`
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="surface rounded-sm p-4">
                        <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("wizard.fields.name")}
                        </p>
                        <p className="font-ui mt-2 text-sm text-foreground">{formData.name}</p>
                      </div>
                      <div className="surface rounded-sm p-4">
                        <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {t("wizard.fields.email")}
                        </p>
                        <p className="font-ui mt-2 text-sm text-foreground">{formData.email}</p>
                      </div>
                      {formData.company && (
                        <div className="surface rounded-sm p-4 sm:col-span-2">
                          <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {t("wizard.fields.company")}
                          </p>
                          <p className="font-ui mt-2 text-sm text-foreground">{formData.company}</p>
                        </div>
                      )}
                      {formData.message && (
                        <div className="surface rounded-sm p-4 sm:col-span-2">
                          <p className="font-ui text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {t("wizard.fields.message")}
                          </p>
                          <p className="font-ui mt-2 text-sm leading-relaxed text-foreground">
                            {formData.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-between border-t border-border/60 pt-8">
              {step > 1 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="font-normal text-muted-foreground hover:text-foreground"
                >
                  {t("wizard.buttons.back")}
                </Button>
              ) : (
                <div />
              )}

              {step === 4 && (
                <Button
                  onClick={() => setStep(5)}
                  disabled={!canProceed()}
                  className="h-11 rounded-sm bg-primary px-8 text-sm font-normal tracking-wide text-primary-foreground hover:bg-primary/90"
                >
                  {t("wizard.buttons.next")}
                </Button>
              )}

              {step === 5 && (
                <Button
                  onClick={() => setSubmitted(true)}
                  className="h-11 rounded-sm bg-primary px-8 text-sm font-normal tracking-wide text-primary-foreground hover:bg-primary/90"
                >
                  {t("wizard.buttons.submit")}
                </Button>
              )}

              {step < 4 && (
                <p className="font-ui self-center text-xs text-muted-foreground">
                  {t("wizard.hint.selectToContinue")}
                </p>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
