import type { AppLocale } from "@/lib/locales";
import { SERVICE_KEYS, type ServiceKey } from "@/lib/services";

export const tierKeys = ["starter", "professional", "enterprise"] as const;
export type PricingTier = (typeof tierKeys)[number];

/** Early-partner launch discount — applied to all list prices */
export const LAUNCH_DISCOUNT_RATE = 0.2;

type TierAmounts = {
  subscription: number;
  onetime: number;
};

type RegionKey = "eur" | "usd" | "try" | "brl";

const localeRegion: Record<AppLocale, RegionKey> = {
  en: "usd",
  tr: "try",
  de: "eur",
  fr: "eur",
  es: "eur",
  pt: "brl",
};

/** EUR baseline — solo freelance rates (de, fr, es) */
const eurPrices: Record<ServiceKey, Record<"starter" | "professional", TierAmounts>> = {
  customSoftware: { starter: { subscription: 2900, onetime: 9800 }, professional: { subscription: 5300, onetime: 18000 } },
  scalableBackend: { starter: { subscription: 2300, onetime: 7800 }, professional: { subscription: 4750, onetime: 14800 } },
  apiIntegrations: { starter: { subscription: 1450, onetime: 3700 }, professional: { subscription: 2600, onetime: 7000 } },
  databaseOptimization: { starter: { subscription: 800, onetime: 2300 }, professional: { subscription: 1800, onetime: 5300 } },
  erpInventorySystems: { starter: { subscription: 1800, onetime: 6200 }, professional: { subscription: 3700, onetime: 11500 } },
  marketplacePlatforms: { starter: { subscription: 1650, onetime: 4000 }, professional: { subscription: 2900, onetime: 7500 } },
  workflowAutomation: { starter: { subscription: 1900, onetime: 6500 }, professional: { subscription: 3900, onetime: 12000 } },
  enterpriseTechConsulting: { starter: { subscription: 1250, onetime: 2900 }, professional: { subscription: 2450, onetime: 6200 } },
  digitalTransformationConsulting: { starter: { subscription: 1400, onetime: 3200 }, professional: { subscription: 2700, onetime: 6800 } },
};

const usdPrices: Record<ServiceKey, Record<"starter" | "professional", TierAmounts>> = {
  customSoftware: { starter: { subscription: 3200, onetime: 10800 }, professional: { subscription: 5900, onetime: 19800 } },
  scalableBackend: { starter: { subscription: 2550, onetime: 8600 }, professional: { subscription: 5250, onetime: 16200 } },
  apiIntegrations: { starter: { subscription: 1650, onetime: 4100 }, professional: { subscription: 2900, onetime: 7700 } },
  databaseOptimization: { starter: { subscription: 850, onetime: 2550 }, professional: { subscription: 2000, onetime: 5900 } },
  erpInventorySystems: { starter: { subscription: 2000, onetime: 6800 }, professional: { subscription: 4100, onetime: 12600 } },
  marketplacePlatforms: { starter: { subscription: 1800, onetime: 4400 }, professional: { subscription: 3200, onetime: 8200 } },
  workflowAutomation: { starter: { subscription: 2100, onetime: 7200 }, professional: { subscription: 4300, onetime: 13200 } },
  enterpriseTechConsulting: { starter: { subscription: 1350, onetime: 3200 }, professional: { subscription: 2700, onetime: 6800 } },
  digitalTransformationConsulting: { starter: { subscription: 1500, onetime: 3500 }, professional: { subscription: 2950, onetime: 7500 } },
};

const tryPrices: Record<ServiceKey, Record<"starter" | "professional", TierAmounts>> = {
  customSoftware: { starter: { subscription: 80000, onetime: 315000 }, professional: { subscription: 149000, onetime: 505000 } },
  scalableBackend: { starter: { subscription: 64000, onetime: 217000 }, professional: { subscription: 133000, onetime: 415000 } },
  apiIntegrations: { starter: { subscription: 41000, onetime: 102000 }, professional: { subscription: 73000, onetime: 195000 } },
  databaseOptimization: { starter: { subscription: 22000, onetime: 64000 }, professional: { subscription: 51000, onetime: 149000 } },
  erpInventorySystems: { starter: { subscription: 51000, onetime: 172000 }, professional: { subscription: 102000, onetime: 320000 } },
  marketplacePlatforms: { starter: { subscription: 46000, onetime: 112000 }, professional: { subscription: 82000, onetime: 208000 } },
  workflowAutomation: { starter: { subscription: 54000, onetime: 182000 }, professional: { subscription: 108000, onetime: 335000 } },
  enterpriseTechConsulting: { starter: { subscription: 34500, onetime: 80000 }, professional: { subscription: 69000, onetime: 172000 } },
  digitalTransformationConsulting: { starter: { subscription: 39000, onetime: 88000 }, professional: { subscription: 76000, onetime: 188000 } },
};

const brlPrices: Record<ServiceKey, Record<"starter" | "professional", TierAmounts>> = {
  customSoftware: { starter: { subscription: 17200, onetime: 59000 }, professional: { subscription: 32000, onetime: 108000 } },
  scalableBackend: { starter: { subscription: 13800, onetime: 47000 }, professional: { subscription: 28500, onetime: 89000 } },
  apiIntegrations: { starter: { subscription: 8900, onetime: 22000 }, professional: { subscription: 15800, onetime: 42000 } },
  databaseOptimization: { starter: { subscription: 4700, onetime: 13800 }, professional: { subscription: 10800, onetime: 32000 } },
  erpInventorySystems: { starter: { subscription: 10800, onetime: 37000 }, professional: { subscription: 22100, onetime: 69000 } },
  marketplacePlatforms: { starter: { subscription: 9800, onetime: 24000 }, professional: { subscription: 17500, onetime: 45000 } },
  workflowAutomation: { starter: { subscription: 11500, onetime: 39000 }, professional: { subscription: 23200, onetime: 72000 } },
  enterpriseTechConsulting: { starter: { subscription: 7400, onetime: 17200 }, professional: { subscription: 14800, onetime: 37000 } },
  digitalTransformationConsulting: { starter: { subscription: 8200, onetime: 19000 }, professional: { subscription: 16200, onetime: 41000 } },
};

const regionPrices: Record<
  RegionKey,
  Record<ServiceKey, Record<"starter" | "professional", TierAmounts>>
> = {
  eur: eurPrices,
  usd: usdPrices,
  try: tryPrices,
  brl: brlPrices,
};

const intlLocale: Record<AppLocale, string> = {
  en: "en-US",
  tr: "tr-TR",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  pt: "pt-BR",
};

function formatAmount(locale: AppLocale, amount: number): string {
  const region = localeRegion[locale];

  if (region === "try") {
    return `₺${amount.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}`;
  }

  if (region === "usd") {
    return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }

  if (region === "brl") {
    return `R$ ${amount.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
  }

  const formatted = amount.toLocaleString(intlLocale[locale], {
    maximumFractionDigits: 0,
  });

  if (locale === "fr") {
    return `${formatted.replace(/\s/g, " ")} €`;
  }

  return `${formatted} €`;
}

function applyLaunchDiscount(amount: number): number {
  return Math.round(amount * (1 - LAUNCH_DISCOUNT_RATE));
}

function getTierAmount(
  locale: AppLocale,
  service: ServiceKey,
  tier: "starter" | "professional",
  type: "subscription" | "onetime"
): number {
  const region = localeRegion[locale];
  const amounts = regionPrices[region][service][tier];
  return type === "subscription" ? amounts.subscription : amounts.onetime;
}

export type TierPricing = {
  list: string;
  sale: string;
};

export function getTierPricing(
  locale: AppLocale,
  service: ServiceKey,
  tier: PricingTier,
  type: "subscription" | "onetime"
): TierPricing | null {
  if (tier === "enterprise") return null;

  const listAmount = getTierAmount(locale, service, tier, type);
  const saleAmount = applyLaunchDiscount(listAmount);

  return {
    list: formatAmount(locale, listAmount),
    sale: formatAmount(locale, saleAmount),
  };
}

export function getTierPrice(
  locale: AppLocale,
  service: ServiceKey,
  tier: PricingTier,
  type: "subscription" | "onetime"
): string | null {
  const pricing = getTierPricing(locale, service, tier, type);
  return pricing?.sale ?? null;
}

export type BudgetKey = "small" | "medium" | "large" | "enterprise";

const budgetLabels: Record<AppLocale, Record<BudgetKey, string>> = {
  en: {
    small: "Under $9,000",
    medium: "$9,000 – $45,000",
    large: "$45,000 – $135,000",
    enterprise: "$135,000+",
  },
  tr: {
    small: "₺285.000 altı",
    medium: "₺285.000 – ₺1.430.000",
    large: "₺1.430.000 – ₺4.300.000",
    enterprise: "₺4.300.000+",
  },
  de: {
    small: "Unter 8.000 €",
    medium: "8.000 € – 40.000 €",
    large: "40.000 € – 120.000 €",
    enterprise: "120.000 €+",
  },
  fr: {
    small: "Moins de 8 000 €",
    medium: "8 000 € – 40 000 €",
    large: "40 000 € – 120 000 €",
    enterprise: "150 000 €+",
  },
  es: {
    small: "Menos de 8.000 €",
    medium: "8.000 € – 50.000 €",
    large: "50.000 € – 150.000 €",
    enterprise: "150.000 €+",
  },
  pt: {
    small: "Abaixo de R$ 45.000",
    medium: "R$ 45.000 – R$ 225.000",
    large: "R$ 225.000 – R$ 675.000",
    enterprise: "R$ 675.000+",
  },
};

export function getBudgetLabel(locale: AppLocale, key: BudgetKey): string {
  return budgetLabels[locale][key];
}

export { SERVICE_KEYS };
