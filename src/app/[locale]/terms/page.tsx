import { setRequestLocale } from "next-intl/server";
import {
  LegalPageContent,
  generateLegalMetadata,
} from "@/components/legal/legal-page";
import { isAppLocale, type AppLocale } from "@/lib/locales";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isAppLocale(locale)) return {};

  return generateLegalMetadata({
    locale,
    namespace: "terms",
    path: "terms",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isAppLocale(locale)) return null;

  setRequestLocale(locale);

  return (
    <LegalPageContent
      locale={locale as AppLocale}
      namespace="terms"
      path="terms"
    />
  );
}
