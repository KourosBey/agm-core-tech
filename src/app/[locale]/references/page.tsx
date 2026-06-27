import { setRequestLocale, getTranslations } from "next-intl/server";
import { ReferencesShowcase } from "@/components/references/references-showcase";
import { JsonLd } from "@/components/seo/json-ld";
import { isAppLocale, type AppLocale } from "@/lib/locales";
import { buildPageMetadata, getBreadcrumbSchema } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "references" });
  const title = t("title");

  return buildPageMetadata({
    locale,
    title,
    description: t("subtitle"),
    path: "references",
  });
}

export default async function ReferencesPage({ params }: Props) {
  const { locale } = await params;
  if (!isAppLocale(locale)) return null;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "references" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema(locale as AppLocale, [
          { name: tNav("home"), path: "" },
          { name: t("title"), path: "references" },
        ])}
      />
      <ReferencesShowcase />
    </>
  );
}
