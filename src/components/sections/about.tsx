"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TechStepSparks } from "@/components/effects/tech-step-sparks";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const stepKeys = ["step1", "step2", "step3", "step4", "step5"] as const;

const stepVariants = {
  hidden: {
    opacity: 0.25,
    y: 14,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

function NebulaStepsMist({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-[8%] h-56 w-56 rounded-full bg-brand-accent/15 blur-[90px]"
        animate={{
          opacity: [0.15, 0.45, 0.2],
          x: [0, 48, 12],
          y: [0, -24, 8],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-[35%] h-72 w-72 rounded-full bg-brand-highlight/12 blur-[100px]"
        animate={{
          opacity: [0.1, 0.4, 0.15],
          x: [0, -36, -8],
          y: [0, 20, -12],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] left-[30%] h-64 w-80 rounded-full bg-brand-accent-deep/10 blur-[110px]"
        animate={{
          opacity: [0.08, 0.35, 0.12],
          x: [0, 24, -16],
          scale: [1, 1.08, 0.96],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 to-transparent"
        animate={{ opacity: [0.5, 0.85, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/90 to-transparent"
        animate={{ opacity: [0.55, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </>
  );
}

type AboutStepItemProps = {
  stepKey: (typeof stepKeys)[number];
  index: number;
  isLast: boolean;
  reducedMotion: boolean;
};

function AboutStepItem({ stepKey, index, isLast, reducedMotion }: AboutStepItemProps) {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "-8% 0px" });
  const [burstKey, setBurstKey] = useState(0);
  const wasInView = useRef(false);

  useEffect(() => {
    if (isInView && !wasInView.current) {
      setBurstKey((current) => current + 1);
    }
    wasInView.current = isInView;
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: false, amount: 0.45, margin: "-8% 0px" }}
      variants={reducedMotion ? undefined : stepVariants}
      transition={{
        duration: 0.85,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative grid gap-4 border-t border-border/60 py-10 sm:grid-cols-[88px_1fr] sm:gap-10 sm:py-12",
        isLast && "border-b border-border/60",
        isInView && !reducedMotion && "z-[2]"
      )}
    >
      {!reducedMotion && (
        <TechStepSparks active={isInView} burstKey={burstKey} index={index} />
      )}

      <div className="relative z-[1] flex items-start gap-4 sm:block">
        <motion.span
          aria-hidden="true"
          className={cn(
            "relative z-10 mt-1 hidden h-3 w-3 shrink-0 rounded-full border bg-background sm:block",
            isInView ? "border-primary/70" : "border-primary/40"
          )}
          animate={
            reducedMotion
              ? undefined
              : isInView
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(34, 211, 238, 0)",
                      "0 0 14px 3px rgba(34, 211, 238, 0.45)",
                      "0 0 4px 1px rgba(34, 211, 238, 0.2)",
                    ],
                  }
                : {
                    boxShadow: "0 0 0 0 rgba(34, 211, 238, 0)",
                  }
          }
          transition={{
            duration: isInView ? 1.2 : 0.4,
            repeat: isInView ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t(`steps.${stepKey}.label`)}
          </p>
          <p
            className={cn(
              "mt-2 font-heading text-3xl font-normal tabular-nums transition-colors duration-500",
              isInView ? "text-primary" : "text-primary/80"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="relative z-[1]">
        <h3 className="font-heading text-xl font-normal sm:text-2xl">
          {t(`steps.${stepKey}.title`)}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-[1.85] text-muted-foreground">
          {t(`steps.${stepKey}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const t = useTranslations("about");
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="border-t border-border/70 py-32">
      <div className="page-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionReveal>
              <SectionHeader
                label={t("badge")}
                title={t("title")}
                description={t("subtitle")}
              />
            </SectionReveal>
          </div>

          <SectionReveal delay={0.1} className="lg:col-span-7">
            <div className="surface p-8 sm:p-10">
              <p className="font-heading text-xl leading-[1.6] text-foreground/90 sm:text-2xl">
                {t("vision")}
              </p>
              <p className="mt-8 text-sm italic text-muted-foreground">
                — {t("founder")}
              </p>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.12} className="mt-16 lg:mt-20">
          <p className="section-label mb-10">{t("stepsHeading")}</p>
        </SectionReveal>

        <div className="relative overflow-hidden rounded-sm py-2">
          <NebulaStepsMist reduced={!!reducedMotion} />

          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[1.35rem] top-0 hidden w-px sm:block"
            initial={{ opacity: 0.2 }}
            animate={
              reducedMotion
                ? { opacity: 0.35 }
                : { opacity: [0.15, 0.55, 0.2] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.28), transparent)",
            }}
          />

          <div className="relative z-[1] space-y-0">
            {stepKeys.map((key, index) => (
              <AboutStepItem
                key={key}
                stepKey={key}
                index={index}
                isLast={index === stepKeys.length - 1}
                reducedMotion={!!reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
