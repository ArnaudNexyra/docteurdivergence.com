import ScrollReveal from "@/components/ScrollReveal";

const roadmap = [
  "Clarifier ton profil, tes erreurs recurrentes et ton niveau reel",
  "Poser une methode de lecture du marche et de preparation des setups",
  "Travailler la discipline, la patience et la coherence d'execution",
  "Installer un suivi regulier pour progresser sans rester seul",
];

export default function TetrisSection() {
  return (
    <section id="methode" className="dd-section text-white">
      <div className="dd-container">
        <div className="dd-card relative overflow-hidden p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(211,47,47,0.12),transparent_26%)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="dd-badge max-w-max">
                  <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                  Methode
                </div>
                <h2 className="max-w-lg text-4xl font-medium md:text-5xl">
                  Une progression guidee pour remettre de l&apos;ordre dans ton trading.
                </h2>
                <p className="dd-text-muted max-w-xl text-lg leading-8">
                  Le travail se fait pas a pas: on part de ton niveau actuel, on identifie les failles qui coutent
                  cher, puis on installe une routine plus propre pour tenir dans le temps.
                </p>
                <a href="mailto:adjutonatyem@gmail.com" className="dd-button-secondary">
                  Parler de mon profil
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="rounded-[1.75rem] border border-white/10 bg-[#09172d] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.16em] text-white/56">Plan de travail</span>
                  <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/12 px-3 py-1 text-xs font-semibold text-[#f0cf68]">
                    Orientation resultat
                  </span>
                </div>

                <div className="space-y-5">
                  {roadmap.map((item, index) => (
                    <div key={item} className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <p className="text-base leading-7 text-white/88">{item}</p>
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">
                          Etape 0{index + 1}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${62 + index * 10}%`,
                            background:
                              index === 0
                                ? "#4f8bf9"
                                : index === 1
                                  ? "#d4af37"
                                  : index === 2
                                    ? "#d32f2f"
                                    : "#ffffff",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
