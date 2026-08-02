"use client";

import { useRouter } from "next/navigation";
import { setLocaleCookie } from "@/i18n/setLocale";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  const choose = (next: Locale) => {
    if (next === locale) return;
    setLocaleCookie(next);
    router.refresh();
  };

  const buttonClass = (target: Locale) =>
    `rounded px-1 transition-colors ${
      locale === target
        ? "font-semibold text-ink"
        : "text-muted hover:text-ink"
    }`;

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        type="button"
        onClick={() => choose("pt")}
        className={buttonClass("pt")}
        aria-label="Português"
      >
        PT
      </button>
      <span className="text-line" aria-hidden>
        ·
      </span>
      <button
        type="button"
        onClick={() => choose("en")}
        className={buttonClass("en")}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
