"use client";

import { useState } from "react";
import Link from "next/link";
import { PhonePrefixSelect } from "@/components/PhonePrefixSelect";
import type { Dictionary } from "@/i18n/dictionaries";

type FormDict = Dictionary["book"]["form"];
type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/30";

export function AppointmentForm({ t }: { t: FormDict }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const periodOptions = [
    { value: "manha", label: t.periodManha },
    { value: "tarde", label: t.periodTarde },
    { value: "noite", label: t.periodNoite },
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const numberRaw = String(formData.get("phone") ?? "").trim();
    const prefix = String(formData.get("phonePrefix") ?? "");
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: numberRaw ? `${prefix} ${numberRaw}` : "",
      periods: formData.getAll("periods").map(String),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(t.errorFallback);

      form.reset();
      setStatus("success");
    } catch {
      setErrorMsg(t.errorFallback);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage-soft p-8 text-center">
        <h2 className="font-serif text-2xl text-sage-dark">
          {t.successHeading}
        </h2>
        <p className="mt-3 text-muted">{t.successText}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full border border-sage px-5 py-2.5 font-medium text-sage-dark transition-colors hover:bg-white"
        >
          {t.back}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          {t.name} <span className="text-sage">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            {t.email} <span className="text-sage">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            {t.phone} <span className="text-muted">{t.optional}</span>
          </label>
          <div className="mt-1 flex items-stretch">
            <PhonePrefixSelect name="phonePrefix" />
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              maxLength={30}
              autoComplete="tel-national"
              className="w-full rounded-r-xl border border-line bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/30"
            />
          </div>
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-ink">
          {t.periodsLabel} <span className="text-muted">{t.optional}</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-3">
          {periodOptions.map((p) => (
            <label key={p.value} className="cursor-pointer">
              <input
                type="checkbox"
                name="periods"
                value={p.value}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line bg-white px-5 py-2 text-sm text-ink transition-colors hover:border-sage peer-checked:border-sage peer-checked:bg-sage peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-sage/30">
                {p.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          {t.message} <span className="text-muted">{t.optional}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={t.messagePlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-line text-sage focus:ring-sage/30"
        />
        <label htmlFor="consent" className="text-sm text-muted">
          {t.consent} <span className="text-sage">*</span>
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-sage px-6 py-3 font-medium text-white transition-colors hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
