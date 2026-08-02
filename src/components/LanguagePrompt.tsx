"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PT from "country-flag-icons/react/3x2/PT";
import GB from "country-flag-icons/react/3x2/GB";
import { setLocaleCookie } from "@/i18n/setLocale";
import type { Locale } from "@/i18n/config";

export function LanguagePrompt({ show }: { show: boolean }) {
  const [open, setOpen] = useState(show);
  const router = useRouter();

  if (!open) return null;

  const choose = (locale: Locale) => {
    setLocaleCookie(locale);
    setOpen(false);
    router.refresh();
  };

  const optionClass =
    "flex items-center justify-center gap-3 rounded-full border border-line bg-white px-6 py-3 text-ink transition-colors hover:border-sage hover:bg-sage-soft";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-cream p-8 text-center shadow-xl">
        <h2 className="font-serif text-2xl text-ink">Escolha o idioma</h2>
        <p className="mt-1 text-sm text-muted">Choose your language</p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => choose("pt")}
            className={optionClass}
          >
            <PT className="h-4 w-6 rounded-sm" />
            Português
          </button>
          <button
            type="button"
            onClick={() => choose("en")}
            className={optionClass}
          >
            <GB className="h-4 w-6 rounded-sm" />
            English
          </button>
        </div>
      </div>
    </div>
  );
}
