import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/i18n/server";

export default async function HomePage() {
  const { locale, t } = await getDictionary();

  const areas = [...t.areas.items].sort((a, b) =>
    a.title.localeCompare(b.title, locale),
  );

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-sage">
              {t.role}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {t.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {t.hero.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/marcar-consulta"
                className="rounded-full bg-sage px-6 py-3 font-medium text-white transition-colors hover:bg-sage-dark"
              >
                {t.hero.book}
              </Link>
              <a
                href="#sobre"
                className="rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-sage"
              >
                {t.hero.more}
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border border-line bg-sage-soft">
            <Image
              src="/rita.png"
              alt={t.hero.photoAlt}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Sobre mim */}
      <section
        id="sobre"
        className="scroll-mt-24 border-t border-line bg-white/60"
      >
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="font-serif text-3xl text-ink">{t.about.heading}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {t.about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas de intervenção */}
      <section
        id="areas"
        className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:py-20"
      >
        <h2 className="font-serif text-3xl text-ink">{t.areas.heading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.title}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <h3 className="font-serif text-xl text-ink">{area.title}</h3>
              <p className="mt-3 text-muted">{area.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section
        id="como-funciona"
        className="scroll-mt-24 border-t border-line bg-white/60"
      >
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <h2 className="font-serif text-3xl text-ink">{t.how.heading}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {t.how.steps.map((step, i) => (
              <div key={step.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft font-serif text-lg text-sage-dark">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-serif text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">{t.how.modalities}</p>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl bg-sage px-8 py-12 text-center text-white sm:px-16">
          <h2 className="font-serif text-3xl text-white">{t.cta.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">{t.cta.text}</p>
          <Link
            href="/marcar-consulta"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-medium text-sage-dark transition-colors hover:bg-cream"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
