"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type AppLocale } from "@/lib/locales";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const switchLocale = (next: AppLocale) => {
    setOpen(false);
    if (next !== locale) {
      router.replace(pathname, { locale: next });
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="font-ui flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {locale}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="surface absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[9rem] overflow-hidden py-1 shadow-[var(--ambient-shadow-sm)]"
        >
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                onClick={() => switchLocale(code)}
                className={cn(
                  "font-ui w-full px-4 py-2.5 text-left text-sm transition-colors",
                  code === locale
                    ? "bg-secondary/50 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                )}
              >
                {localeLabels[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
