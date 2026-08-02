import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

async function readLocaleCookie(): Promise<Locale | undefined> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : undefined;
}

export async function getLocale(): Promise<Locale> {
  return (await readLocaleCookie()) ?? DEFAULT_LOCALE;
}

export async function hasLocalePreference(): Promise<boolean> {
  return (await readLocaleCookie()) !== undefined;
}

export async function getDictionary(): Promise<{
  locale: Locale;
  t: Dictionary;
}> {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
