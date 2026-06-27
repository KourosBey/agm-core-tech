import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="page-container flex min-h-[60vh] flex-col items-center justify-center py-32 text-center">
      <p className="section-label mb-4">{t("label")}</p>
      <h1 className="font-heading text-4xl font-normal sm:text-5xl">{t("title")}</h1>
      <p className="font-ui mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        {t("description")}
      </p>
      <Link
        href="/"
        className="font-ui mt-10 inline-flex h-11 items-center justify-center rounded-sm bg-primary px-8 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {t("cta")}
      </Link>
    </section>
  );
}

export async function generateMetadata() {
  const t = await getTranslations("notFound");

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: true,
    },
  };
}
