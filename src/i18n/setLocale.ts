import { LOCALE_COOKIE, type Locale } from "./config";

/** Persists the chosen locale in a cookie so the server can render in it. */
export function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
