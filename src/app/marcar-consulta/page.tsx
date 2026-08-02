import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: t.book.metaTitle,
    description: t.book.metaDescription,
  };
}

export default async function MarcarConsultaPage() {
  const { t } = await getDictionary();

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <h1 className="font-serif text-4xl text-ink">{t.book.heading}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{t.book.intro}</p>

      <div className="mt-10 rounded-3xl border border-line bg-card p-6 sm:p-8">
        <AppointmentForm t={t.book.form} />
      </div>

      <p className="mt-6 text-sm text-muted">
        {t.book.urgencyPre}
        <a
          href={`mailto:${site.email}`}
          className="text-sage-dark underline underline-offset-2"
        >
          {site.email}
        </a>
        {site.phone && (
          <>
            {t.book.urgencyOr}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-sage-dark underline underline-offset-2"
            >
              {site.phone}
            </a>
          </>
        )}
        .
      </p>
    </section>
  );
}
