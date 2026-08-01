"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-1 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/30";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      modality: String(formData.get("modality") ?? "indiferente"),
      preferredTime: String(formData.get("preferredTime") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Ocorreu um erro.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro. Tente novamente.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage-soft p-8 text-center">
        <h2 className="font-serif text-2xl text-sage-dark">Pedido enviado</h2>
        <p className="mt-3 text-muted">
          Obrigada pelo seu contacto. Recebi o seu pedido e entrarei em contacto
          consigo em breve para combinarmos a consulta.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full border border-sage px-5 py-2.5 font-medium text-sage-dark transition-colors hover:bg-white"
        >
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Nome <span className="text-sage">*</span>
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
            Email <span className="text-sage">*</span>
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
            Telefone <span className="text-muted">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="modality" className="text-sm font-medium text-ink">
            Modalidade
          </label>
          <select
            id="modality"
            name="modality"
            defaultValue="indiferente"
            className={inputClass}
          >
            <option value="indiferente">Indiferente</option>
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="preferredTime"
            className="text-sm font-medium text-ink"
          >
            Preferência de horário{" "}
            <span className="text-muted">(opcional)</span>
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            maxLength={200}
            placeholder="Ex.: tardes durante a semana"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Mensagem <span className="text-muted">(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Se quiser, deixe uma breve mensagem sobre o que a/o traz à consulta."
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
          Autorizo o tratamento dos meus dados para efeitos de contacto e
          marcação de consulta. Os dados são confidenciais e não são partilhados
          com terceiros. <span className="text-sage">*</span>
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
        {status === "submitting" ? "A enviar…" : "Enviar pedido"}
      </button>
    </form>
  );
}
