import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { PUBLIC_ROUTES, localePath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    PUBLIC_ROUTES.map((route) => ({
      url: localePath(locale, route),
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "references" ? 0.8 : 0.5,
    }))
  );
}
