import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";

const areas = [
  {
    title: "Ansiedade e stress",
    text: "Estratégias para compreender e gerir a preocupação, a tensão e o cansaço do dia a dia.",
  },
  {
    title: "Depressão",
    text: "Apoio para recuperar energia, sentido e prazer nas atividades do quotidiano.",
  },
  {
    title: "Burnout",
    text: "Acompanhamento na exaustão associada ao trabalho, ajudando a restabelecer o equilíbrio.",
  },
  {
    title: "Dificuldades emocionais e relacionais",
    text: "Espaço para reconhecer e regular as emoções mais difíceis e para melhorar a comunicação, os limites e as relações interpessoais e familiares.",
  },
  {
    title: "Autoestima",
    text: "Trabalho de autoconhecimento e reforço de uma autoestima mais saudável e estável.",
  },
  {
    title: "Desenvolvimento pessoal",
    text: "Um caminho de autoconhecimento e crescimento, ao seu ritmo e de acordo com os seus objetivos.",
  },
  {
    title: "Luto",
    text: "Um espaço para viver e integrar a perda, ao seu próprio ritmo e sem julgamentos.",
  },
  {
    title: "Trauma",
    text: "Acompanhamento na elaboração de experiências difíceis, promovendo segurança e recuperação.",
  },
  {
    title: "Psicologia do Desporto",
    text: "Apoio a atletas na gestão da ansiedade competitiva, confiança, motivação, foco, gestão emocional e recuperação de lesão.",
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

          {/* Fotografia */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl border border-line bg-sage-soft">
            <Image
              src="/rita.png"
              alt={`Fotografia de ${site.practitionerName}`}
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
          <h2 className="font-serif text-3xl text-ink">Sobre mim</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Realizo acompanhamento psicológico a crianças, adolescentes e
              adultos, proporcionando um espaço seguro, empático e livre de
              julgamentos, onde cada pessoa se pode sentir ouvida e compreendida.
            </p>
            <p>
              A minha intervenção baseia-se na Terapia Cognitivo-Comportamental
              (TCC), uma abordagem cientificamente validada que procura
              compreender a relação entre pensamentos, emoções e comportamentos,
              promovendo estratégias práticas para lidar com os desafios do dia a
              dia e melhorar o bem-estar psicológico.
            </p>
            <p>
              Paralelamente, desenvolvo intervenção na área da Psicologia do
              Desporto, apoiando atletas na gestão das exigências psicológicas
              associadas à prática desportiva, com foco no desenvolvimento de
              competências que potenciem o bem-estar e o rendimento.
            </p>
            <p>
              O acompanhamento é personalizado e construído em conjunto,
              respeitando a singularidade de cada pessoa e os seus objetivos,
              necessidades e expectativas.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas de intervenção */}
      <section
        id="areas"
        className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:py-20"
      >
        <h2 className="font-serif text-3xl text-ink">Áreas de intervenção</h2>
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
