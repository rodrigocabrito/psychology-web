import Link from "next/link";
import { site } from "@/config/site";

// TODO: substituir pelos textos reais das suas áreas de intervenção.
const areas = [
  {
    title: "Ansiedade e stress",
    text: "Estratégias para lidar com a preocupação excessiva, o cansaço e a tensão do dia a dia.",
  },
  {
    title: "Depressão e humor",
    text: "Apoio para recuperar energia, sentido e prazer nas atividades do quotidiano.",
  },
  {
    title: "Relações e vida pessoal",
    text: "Espaço para refletir sobre relações, transições de vida e autoconhecimento.",
  },
];

// TODO: substituir pelos passos reais do seu processo de acompanhamento.
const steps = [
  {
    title: "Primeiro contacto",
    text: "Envia um pedido de consulta e eu respondo para combinarmos o melhor horário.",
  },
  {
    title: "Sessão inicial",
    text: "Conhecemo-nos, percebo o que o traz à consulta e definimos objetivos.",
  },
  {
    title: "Acompanhamento",
    text: "Trabalhamos juntos, ao seu ritmo, num processo confidencial e sem julgamentos.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-sage">
              {site.role}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {site.practitionerName}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {site.shortIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/marcar-consulta"
                className="rounded-full bg-sage px-6 py-3 font-medium text-white transition-colors hover:bg-sage-dark"
              >
                Marcar consulta
              </Link>
              <a
                href="#sobre"
                className="rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-sage"
              >
                Saber mais
              </a>
            </div>
          </div>

          {/* Photo placeholder — TODO: substituir por uma fotografia sua */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border border-line bg-sage-soft">
            <div className="flex h-full w-full items-center justify-center p-6 text-center">
              <span className="font-serif text-lg text-sage-dark">
                A sua fotografia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre mim */}
      <section id="sobre" className="border-t border-line bg-white/60">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <h2 className="font-serif text-3xl text-ink">Sobre mim</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {/* TODO: substituir pela sua biografia real. */}
            <p>
              Sou {site.practitionerName}, {site.role.toLowerCase()}. Acredito
              que cada pessoa é única e que a terapia é um espaço de escuta,
              respeito e colaboração.
            </p>
            <p>
              Ao longo do meu percurso, tenho acompanhado pessoas em diferentes
              fases da vida, ajudando-as a compreender-se melhor e a desenvolver
              recursos para lidar com as suas dificuldades.
            </p>
            <p>
              Descreva aqui a sua formação, experiência e a abordagem que
              utiliza no seu trabalho.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas de intervenção */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-serif text-3xl text-ink">Áreas de intervenção</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
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
      <section className="border-t border-line bg-white/60">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <h2 className="font-serif text-3xl text-ink">Como funciona</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
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
          <p className="mt-8 text-sm text-muted">{site.modalities}.</p>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl bg-sage px-8 py-12 text-center text-white sm:px-16">
          <h2 className="font-serif text-3xl text-white">
            Pronto para dar o primeiro passo?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Envie um pedido de consulta e entrarei em contacto consigo para
            combinarmos o melhor momento.
          </p>
          <Link
            href="/marcar-consulta"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-medium text-sage-dark transition-colors hover:bg-cream"
          >
            Marcar consulta
          </Link>
        </div>
      </section>
    </>
  );
}
