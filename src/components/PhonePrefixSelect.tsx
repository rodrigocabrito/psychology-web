"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import PT from "country-flag-icons/react/3x2/PT";
import BR from "country-flag-icons/react/3x2/BR";
import ES from "country-flag-icons/react/3x2/ES";
import FR from "country-flag-icons/react/3x2/FR";
import GB from "country-flag-icons/react/3x2/GB";
import DE from "country-flag-icons/react/3x2/DE";
import CH from "country-flag-icons/react/3x2/CH";
import LU from "country-flag-icons/react/3x2/LU";
import NL from "country-flag-icons/react/3x2/NL";
import BE from "country-flag-icons/react/3x2/BE";
import IE from "country-flag-icons/react/3x2/IE";
import US from "country-flag-icons/react/3x2/US";
import AO from "country-flag-icons/react/3x2/AO";
import MZ from "country-flag-icons/react/3x2/MZ";
import CV from "country-flag-icons/react/3x2/CV";
import type { Locale } from "@/i18n/config";

type FlagComponent = ComponentType<{ title?: string; className?: string }>;

type Country = {
  code: string;
  dial: string;
  names: Record<Locale, string>;
  Flag: FlagComponent;
};

const COUNTRIES: Country[] = [
  { code: "PT", dial: "+351", names: { pt: "Portugal", en: "Portugal" }, Flag: PT },
  { code: "BR", dial: "+55", names: { pt: "Brasil", en: "Brazil" }, Flag: BR },
  { code: "ES", dial: "+34", names: { pt: "Espanha", en: "Spain" }, Flag: ES },
  { code: "FR", dial: "+33", names: { pt: "França", en: "France" }, Flag: FR },
  { code: "GB", dial: "+44", names: { pt: "Reino Unido", en: "United Kingdom" }, Flag: GB },
  { code: "DE", dial: "+49", names: { pt: "Alemanha", en: "Germany" }, Flag: DE },
  { code: "CH", dial: "+41", names: { pt: "Suíça", en: "Switzerland" }, Flag: CH },
  { code: "LU", dial: "+352", names: { pt: "Luxemburgo", en: "Luxembourg" }, Flag: LU },
  { code: "NL", dial: "+31", names: { pt: "Países Baixos", en: "Netherlands" }, Flag: NL },
  { code: "BE", dial: "+32", names: { pt: "Bélgica", en: "Belgium" }, Flag: BE },
  { code: "IE", dial: "+353", names: { pt: "Irlanda", en: "Ireland" }, Flag: IE },
  { code: "US", dial: "+1", names: { pt: "Estados Unidos", en: "United States" }, Flag: US },
  { code: "AO", dial: "+244", names: { pt: "Angola", en: "Angola" }, Flag: AO },
  { code: "MZ", dial: "+258", names: { pt: "Moçambique", en: "Mozambique" }, Flag: MZ },
  { code: "CV", dial: "+238", names: { pt: "Cabo Verde", en: "Cape Verde" }, Flag: CV },
];

export function PhonePrefixSelect({
  name,
  locale,
}: {
  name: string;
  locale: Locale;
}) {
  const [selected, setSelected] = useState<Country>(
    () => COUNTRIES.find((c) => c.code === "PT")!,
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Alphabetical by localized name, with Portugal pinned first.
  const ordered = useMemo(
    () =>
      [...COUNTRIES].sort((a, b) =>
        a.code === "PT"
          ? -1
          : b.code === "PT"
            ? 1
            : a.names[locale].localeCompare(b.names[locale], locale),
      ),
    [locale],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const SelectedFlag = selected.Flag;
  const codeLabel = locale === "pt" ? "Indicativo do país" : "Country code";

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Value submitted with the form */}
      <input type="hidden" name={name} value={selected.dial} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${codeLabel}: ${selected.names[locale]} ${selected.dial}`}
        className="flex h-full items-center gap-2 rounded-l-xl border border-r-0 border-line bg-white px-3 py-2.5 text-ink outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/30"
      >
        <SelectedFlag className="h-4 w-6 rounded-sm" />
        <span className="text-sm">{selected.dial}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 max-h-64 w-64 overflow-auto rounded-xl border border-line bg-white p-1 shadow-lg"
        >
          {ordered.map((country) => {
            const Flag = country.Flag;
            const isSelected = country.code === selected.code;
            return (
              <li key={country.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelected(country);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-sage-soft ${
                    isSelected ? "bg-sage-soft" : ""
                  }`}
                >
                  <Flag className="h-4 w-6 shrink-0 rounded-sm" />
                  <span className="flex-1 text-ink">
                    {country.names[locale]}
                  </span>
                  <span className="text-muted">{country.dial}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
