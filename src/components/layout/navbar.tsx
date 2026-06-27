"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "about", href: "/#about", hash: "#about" },
  { key: "services", href: "/#services", hash: "#services" },
  { key: "references", href: "/references" as const },
  { key: "pricing", href: "/#pricing", hash: "#pricing" },
  { key: "contact", href: "/#contact", hash: "#contact" },
] as const;

const navLinkClass =
  "text-sm text-muted-foreground hover:text-foreground transition-colors font-normal tracking-wide whitespace-nowrap";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (hash: string) => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (!isHome) return;
    event.preventDefault();
    scrollTo(hash);
    setMobileOpen(false);
  };

  const renderNavItem = (item: (typeof navItems)[number], mobile = false) => {
    if (item.href === "/references") {
      return (
        <Link
          key={item.key}
          href="/references"
          onClick={() => setMobileOpen(false)}
          className={cn(
            navLinkClass,
            mobile && "py-3 text-left border-b border-border/60 last:border-0 w-full",
            pathname === "/references" && "text-foreground"
          )}
        >
          {t(item.key)}
        </Link>
      );
    }

    const hash = "hash" in item ? item.hash : "";

    return (
      <Link
        key={item.key}
        href={item.href}
        onClick={(event) => handleSectionClick(event, hash)}
        className={cn(
          navLinkClass,
          mobile && "py-3 text-left border-b border-border/60 last:border-0 w-full"
        )}
      >
        {t(item.key)}
      </Link>
    );
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-6 sm:py-3",
            scrolled
              ? "border-border/80 bg-background/90 shadow-[var(--ambient-shadow-sm)] backdrop-blur-md"
              : "border-border/50 bg-background/70 backdrop-blur-sm"
          )}
        >
          <BrandLogo priority />

          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label={t("main")}
          >
            {navItems.map((item) => renderNavItem(item))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <LocaleSwitcher />

            <Link
              href="/#contact"
              onClick={(event) => handleSectionClick(event, "#contact")}
              className="hidden font-heading text-sm italic text-foreground/90 transition-colors hover:text-foreground sm:inline"
            >
              {t("cta")}
            </Link>

            <button
              type="button"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="absolute left-4 right-4 top-[4.75rem] surface rounded-2xl p-5 flex flex-col gap-1 sm:left-6 sm:right-6"
            aria-label={t("main")}
          >
            {navItems.map((item) => renderNavItem(item, true))}
            <div className="border-b border-border/60 py-3">
              <LocaleSwitcher />
            </div>
            <Link
              href="/#contact"
              onClick={(event) => handleSectionClick(event, "#contact")}
              className="mt-4 py-3 text-left font-heading text-sm italic text-foreground"
            >
              {t("cta")}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
