import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/json-ld";
import type { AppLocale } from "@/lib/locales";
import {
  buildPageMetadata,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/seo";

type LegalPageProps = {
  locale: AppLocale;
  namespace: "privacy" | "terms";
  path: "privacy" | "terms";
};

export async function generateLegalMetadata({
  locale,
  namespace,
  path,
}: LegalPageProps) {
  const t = await getTranslations({ locale, namespace: `legal.${namespace}` });

  return buildPageMetadata({
    locale,
    title: t("title"),
    description: t("metaDescription"),
    path,
  });
}

export async function LegalPageContent({
  locale,
  namespace,
  path,
}: LegalPageProps) {
  const t = await getTranslations({ locale, namespace: `legal.${namespace}` });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const sectionKeys = ["data", "use", "rights", "contact"] as const;

  return (
    <>
      <JsonLd
        data={[
          getOrganizationSchema(),
          getBreadcrumbSchema(locale, [
            { name: tNav("home"), path: "" },
            { name: t("title"), path },
          ]),
        ]}
      />
      <article className="page-container max-w-3xl py-32">
        <header className="border-b border-border/70 pb-10">
          <p className="section-label mb-4">{t("title")}</p>
          <h1 className="font-heading text-4xl font-normal sm:text-5xl">
            {t("title")}
          </h1>
          <p className="font-ui mt-4 text-sm text-muted-foreground">{t("updated")}</p>
          <p className="font-ui mt-6 text-base leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </header>

        <div className="mt-12 space-y-10">
          {sectionKeys.map((key) => (
            <section key={key}>
              <h2 className="font-heading text-2xl font-normal">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="font-ui mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {t(`sections.${key}.body`)}
              </p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
