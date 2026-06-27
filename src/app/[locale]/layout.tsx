import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Viewport } from "next";
import { Cormorant_Garamond, Inter, Syne } from "next/font/google";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/json-ld";
import { isAppLocale, type AppLocale } from "@/lib/locales";
import {
  buildRootMetadata,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/seo";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundEffects } from "@/components/layout/background-effects";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0F1C",
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildRootMetadata(locale as AppLocale, t("title"), t("description"));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const appLocale = locale as AppLocale;

  return (
    <html
      lang={locale}
      className={`dark ${cormorant.variable} ${inter.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <JsonLd
          data={[getOrganizationSchema(), getWebSiteSchema(appLocale)]}
        />
        <NextIntlClientProvider messages={messages}>
          <BackgroundEffects />
          <Navbar />
          <main className="site-content relative flex-1 z-[1]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
