"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin, Clock } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { BrandLogo } from "@/components/layout/brand-logo";

export function Footer() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const year = new Date().getFullYear();

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-content border-t border-border/70 py-20 sm:py-24">
      <div className="page-container flex flex-col items-center">
        <div className="surface w-full max-w-lg px-8 py-10 text-center sm:px-12 sm:py-12">
          <p className="section-label mb-3">{t("contact.badge")}</p>
          <h2 className="font-heading text-3xl font-normal">{t("contact.title")}</h2>
          <p className="font-ui mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {t("contact.subtitle")}
          </p>

          <div className="mt-10 space-y-5 text-left">
            <a
              href="mailto:info@agmcoretech.com"
              className="font-ui group flex items-start gap-4 rounded-sm border border-border/50 bg-secondary/20 px-4 py-3 transition-colors hover:border-border hover:bg-secondary/35"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("contact.emailLabel")}
                </p>
                <p className="mt-1 text-sm text-foreground">info@agmcoretech.com</p>
              </div>
            </a>

            <div className="font-ui flex items-start gap-4 rounded-sm border border-border/50 bg-secondary/20 px-4 py-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("contact.locationLabel")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {t("contact.location")}
                </p>
              </div>
            </div>

            <div className="font-ui flex items-start gap-4 rounded-sm border border-border/50 bg-secondary/20 px-4 py-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("contact.hoursLabel")}
                </p>
                <p className="mt-1 text-sm text-foreground">{t("contact.hours")}</p>
              </div>
            </div>
          </div>

          {isHome ? (
            <Link
              href="/#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToContact();
              }}
              className="font-ui mt-10 inline-flex h-11 w-full items-center justify-center rounded-sm bg-primary px-10 text-sm font-normal tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              {t("contact.cta")}
            </Link>
          ) : (
            <Link
              href="/#contact"
              className="font-ui mt-10 inline-flex h-11 w-full items-center justify-center rounded-sm bg-primary px-10 text-sm font-normal tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              {t("contact.cta")}
            </Link>
          )}
        </div>

        <div className="mt-16 flex w-full max-w-lg flex-col items-center gap-4 border-t border-border/60 pt-8 text-center">
          <BrandLogo linked={false} imageClassName="h-11 sm:h-12" />
          <p className="font-ui text-xs text-muted-foreground">
            © {year} AGM Core Tech. {t("rights")}
          </p>
          <div className="flex gap-8 text-xs text-muted-foreground">
            <Link href="/privacy" className="font-ui transition-colors hover:text-foreground">
              {t("links.privacy")}
            </Link>
            <Link href="/terms" className="font-ui transition-colors hover:text-foreground">
              {t("links.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
