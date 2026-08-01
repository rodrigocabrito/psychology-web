import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Marcar consulta",
  description: "Envie um pedido de consulta e entrarei em contacto consigo.",
};

export default function MarcarConsultaPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <h1 className="font-serif text-4xl text-ink">Marcar consulta</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Preencha o formulário abaixo com o seu pedido. Entrarei em contacto
        consigo, normalmente em 24 a 48 horas, para combinarmos o melhor
        horário. {site.modalities}.
      </p>

      <div className="mt-10 rounded-3xl border border-line bg-card p-6 sm:p-8">
        <AppointmentForm />
      </div>

      <p className="mt-6 text-sm text-muted">
        Em caso de urgência, contacte diretamente através de{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-sage-dark underline underline-offset-2"
        >
          {site.email}
        </a>{" "}
        ou{" "}
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="text-sage-dark underline underline-offset-2"
        >
          {site.phone}
        </a>
        .
      </p>
    </section>
  );
}
