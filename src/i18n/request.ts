import { getRequestConfig } from "next-intl/server";
import { deepMerge } from "@/lib/deep-merge";
import { defaultLocale, isAppLocale } from "@/lib/locales";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isAppLocale(locale)) {
    locale = defaultLocale;
  }

  const enMessages = (await import("../../messages/en.json")).default;

  if (locale === "en") {
    return { locale, messages: enMessages };
  }

  const localeMessages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages: deepMerge(enMessages, localeMessages),
  };
});
