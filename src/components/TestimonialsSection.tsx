import ScrollReveal from "@/components/ScrollReveal";

const proofPoints = [
  {
    title: "Expertise technique",
    text: "Une maîtrise approfondie de l'Ichimoku Kinko Hyo et de l'analyse des divergences, testée sur les marchés en temps réel.",
  },
  {
    title: "Transparence totale",
    text: "Aucun faux espoir. La rentabilité exige discipline, gestion du risque et temps. C'est ce que nous transmettons.",
  },
  {
    title: "Parcours de terrain",
    text: "Plus de 6 années d'expérimentation avant d'atteindre la rentabilité constante et de l'enseigner avec légitimité.",
  },
] as const;

export default function TestimonialsSection() {
  return (
    <section id="credibilite" className="py-24 bg-white relative overflow-hidden">
      <div className="reflect-container relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="dd-badge-light mx-auto max-w-max mb-6">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
              Crédibilité & Rigueur
            </div>
            <h2 className="mt-5 text-4xl font-bold md:text-5xl text-[#0B2A59] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
              L'excellence au service de vos résultats.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#1a1a1a]/80 font-medium">
              Une image institutionnelle bâtie sur l'action concrète. Les outils fournis proviennent de stratégies qui ont fait leurs preuves dans un environnement à forte pression.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <ScrollReveal delay={100}>
            <article className="dd-card-light rounded-[8px] p-8 h-full flex flex-col justify-between border-t-4" style={{ borderTopColor: "#0B2A59" }}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B2A59]/60">Engagement de résultat</p>
                  <h3 className="mt-3 text-2xl font-bold text-[#0B2A59]" style={{ fontFamily: "var(--font-heading)" }}>Une méthode directe, calme et disciplinée.</h3>
                </div>
                <a
                  href="https://fr.tradingview.com/u/DocteurDivergence/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[4px] bg-[#0B2A59] px-6 py-3 text-sm font-bold text-white uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0B2A59] transition-colors"
                >
                  Mon profil TradingView
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-auto">
                {proofPoints.map((point) => (
                  <div key={point.title} className="rounded-[4px] bg-[#F4F6F9] p-5 border border-[#0B2A59]/5">
                    <h4 className="text-sm font-bold text-[#0B2A59] uppercase">{point.title}</h4>
                    <p className="mt-3 text-[13px] leading-6 text-[#1a1a1a]/80 font-medium">{point.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <article className="dd-card-light rounded-[8px] p-8 h-full flex flex-col justify-between border-t-4" style={{ borderTopColor: "#D32F2F" }}>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0B2A59]/60">Écosystème Analytique</p>
                <h3 className="mt-4 text-2xl font-bold text-[#0B2A59]" style={{ fontFamily: "var(--font-heading)" }}>La data avant l'émotion.</h3>
                <p className="mt-4 text-base leading-7 text-[#1a1a1a]/80 font-medium">
                  Le marché ne fait pas de cadeaux. C'est pourquoi nous utilisons des outils techniques neutres pour écarter le biais psychologique et trader la réalité objective du prix et des équilibres Ichimoku.
                </p>
              </div>

              <div className="mt-8 grid gap-3">
                {[
                  "Psychologie et gestion des émotions",
                  "Plan de trading strict",
                  "Étude approfondie Ichimoku Kinko Hyo",
                  "Risk Management professionnel",
                ].map((keyword) => (
                  <div
                    key={keyword}
                    className="flex items-center gap-3 rounded-[4px] border border-[#0B2A59]/10 bg-[#F4F6F9] px-4 py-3 text-sm font-medium text-[#1a1a1a]"
                  >
                    <span className="h-4 w-4 bg-[#0B2A59] rounded-sm flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true"><path d="M1 4L3.5 6.5L9 1" stroke="#D4AF37" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span>{keyword}</span>
                  </div>
                ))}
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
