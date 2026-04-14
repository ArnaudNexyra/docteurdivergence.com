import ScrollReveal from "@/components/ScrollReveal";

const pillars = [
  {
    title: "Expérience vécue",
    text: "Le discours vient d'un parcours long, avec des erreurs, des remises en question et un passage structuré vers le trading à temps plein.",
  },
  {
    title: "Mécanique Mentale",
    text: "Le travail ne porte pas seulement sur les graphiques. Il porte aussi sur les réflexes émotionnels qui sabotent la régularité du trader.",
  },
  {
    title: "Suivi Accessible",
    text: "Une pédagogie qui parle aux débutants comme aux profils plus avertis, sans promesses intenables ni jargon inutile.",
  },
] as const;

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(11,42,89,0.03)_0,transparent_60%)]" />

      <div className="dd-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] relative z-10 items-center">
        <ScrollReveal>
          <div className="space-y-6">
            <div className="dd-badge-light max-w-max">
              <span className="h-2 w-2 rounded-full bg-[#0B2A59]" />
              Pourquoi Docteur Divergence ?
            </div>
            <h2 className="max-w-xl text-4xl font-bold md:text-5xl text-[#0B2A59] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
              Un accompagnement construit sur le réel.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-[#1a1a1a]/80 font-medium">
              Docteur Divergence s'adresse à celles et ceux qui veulent enfin poser un cadre sérieux à leur pratique :
              comprendre ce qu'ils regardent, mieux préparer les prises de décision et sortir de la spirale des essais
              sans méthode.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={120 + index * 80}>
              <article className="dd-card-light rounded-[8px] p-6 border-l-4" style={{ borderLeftColor: index === 1 ? '#D4AF37' : index === 2 ? '#D32F2F' : '#0B2A59' }}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#0B2A59] text-sm font-bold text-white shadow-sm">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B2A59] uppercase" style={{ fontFamily: "var(--font-heading)" }}>{pillar.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-[#1a1a1a]/80 font-medium">{pillar.text}</p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

