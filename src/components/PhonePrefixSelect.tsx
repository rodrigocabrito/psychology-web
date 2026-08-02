"use client";

import { useEffect, useRef, useState } from "react";
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

type FlagComponent = ComponentType<{ title?: string; className?: string }>;

type Country = {
  code: string;
  dial: string;
  name: string;
  Flag: FlagComponent;
};

const COUNTRIES: Country[] = [
  { code: "PT", dial: "+351", name: "Portugal", Flag: PT },
  { code: "BR", dial: "+55", name: "Brasil", Flag: BR },
  { code: "ES", dial: "+34", name: "Espanha", Flag: ES },
  { code: "FR", dial: "+33", name: "França", Flag: FR },
  { code: "GB", dial: "+44", name: "Reino Unido", Flag: GB },
  { code: "DE", dial: "+49", name: "Alemanha", Flag: DE },
  { code: "CH", dial: "+41", name: "Suíça", Flag: CH },
  { code: "LU", dial: "+352", name: "Luxemburgo", Flag: LU },
  { code: "NL", dial: "+31", name: "Países Baixos", Flag: NL },
  { code: "BE", dial: "+32", name: "Bélgica", Flag: BE },
  { code: "IE", dial: "+353", name: "Irlanda", Flag: IE },
  { code: "US", dial: "+1", name: "Estados Unidos", Flag: US },
  { code: "AO", dial: "+244", name: "Angola", Flag: AO },
  { code: "MZ", dial: "+258", name: "Moçambique", Flag: MZ },
  { code: "CV", dial: "+238", name: "Cabo Verde", Flag: CV },
];

export function PhonePrefixSelect({ name }: { name: string }) {
  const [selected, setSelected] = useState<Country>(COUNTRIES[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Value submitted with the form */}
      <input type="hidden" name={name} value={selected.dial} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Indicativo do país: ${selected.name} ${selected.dial}`}
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
          {COUNTRIES.map((country) => {
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
                  <span className="flex-1 text-ink">{country.name}</span>
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
