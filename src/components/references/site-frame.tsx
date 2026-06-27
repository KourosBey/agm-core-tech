"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getDisplayUrl } from "@/lib/references";
import { cn } from "@/lib/utils";

type SiteFrameProps = {
  url: string;
  title: string;
  className?: string;
};

export function SiteFrame({ url, title, className }: SiteFrameProps) {
  const t = useTranslations("references");
  const [copied, setCopied] = useState(false);
  const displayUrl = getDisplayUrl(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <article className={cn("surface overflow-hidden rounded-sm", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-lg italic text-muted-foreground transition-colors hover:text-foreground"
        >
          {displayUrl}
        </a>

        <div className="flex items-center gap-6 text-sm">
          <button
            type="button"
            onClick={copyLink}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? t("copied") : t("copyLink")}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/90 underline-offset-4 hover:underline"
          >
            {t("visitSite")}
          </a>
        </div>
      </div>

      <div className="relative h-[min(70vh,640px)] bg-background">
        <iframe
          src={url}
          title={title}
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </article>
  );
}
