import type { Metadata } from "next";
import { defaultLocale, locales, type AppLocale } from "@/lib/locales";

export const FAVICON_PATH = "/favicon.png";

export const SITE_NAME = "AGM Core Tech";
export const SITE_EMAIL = "info@agmcoretech.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://agmcoretech.com";

/** Public routes included in sitemap (path without leading slash) */
export const PUBLIC_ROUTES = ["", "references", "privacy", "terms"] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

const ogLocaleMap: Record<AppLocale, string> = {
  en: "en_US",
  tr: "tr_TR",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_BR",
};

export function localePath(locale: AppLocale, path: PublicRoute | string = ""): string {
  const normalized = path.replace(/^\//, "");
  if (!normalized) return `${SITE_URL}/${locale}`;
  return `${SITE_URL}/${locale}/${normalized}`;
}

export function buildAlternates(locale: AppLocale, path: PublicRoute | string = "") {
  const languageEntries = locales.map((l) => [l, localePath(l, path)] as const);
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(languageEntries),
      "x-default": localePath(defaultLocale, path),
    },
  };
}

function buildTwitter(title: string, description: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/opengraph-image`],
  };
}

function buildOpenGraph(
  locale: AppLocale,
  title: string,
  description: string,
  path: PublicRoute | string = ""
): Metadata["openGraph"] {
  return {
    title,
    description,
    url: localePath(locale, path),
    siteName: SITE_NAME,
    locale: ogLocaleMap[locale],
    alternateLocale: locales
      .filter((l) => l !== locale)
      .map((l) => ogLocaleMap[l]),
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
}: {
  locale: AppLocale;
  title: string;
  description: string;
  path?: PublicRoute | string;
}): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: buildAlternates(locale, path),
    openGraph: buildOpenGraph(locale, title, description, path),
    twitter: buildTwitter(title, description),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildRootMetadata(
  locale: AppLocale,
  title: string,
  description: string
): Metadata {
  return {
    ...buildPageMetadata({ locale, title, description, path: "" }),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    icons: {
      icon: [{ url: FAVICON_PATH, type: "image/png" }],
      shortcut: [{ url: FAVICON_PATH, type: "image/png" }],
      apple: [{ url: FAVICON_PATH, type: "image/png" }],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    logo: `${SITE_URL}${FAVICON_PATH}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_EMAIL,
      contactType: "customer service",
      availableLanguage: locales,
    },
  };
}

export function getWebSiteSchema(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: localePath(locale),
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getBreadcrumbSchema(
  locale: AppLocale,
  items: { name: string; path: PublicRoute | string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localePath(locale, item.path),
    })),
  };
}
