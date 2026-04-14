import ScrollReveal from "@/components/ScrollReveal";

interface CardData {
  title: string;
  description: string;
  image: string;
}

const cards: CardData[] = [
  {
    title: "Tes erreurs recurrentes deviennent visibles.",
    description: "Les prises de position ne restent plus des impressions floues: elles se relisent et se comparent.",
    image: "/images/q-c92fad10.png",
  },
  {
    title: "Chaque session garde une trace utile.",
    description: "Plans de marche, captures, notes et retours s'empilent dans un meme fil logique.",
    image: "/images/q-f6418f24.png",
  },
  {
    title: "La progression reste lisible dans le temps.",
    description: "Tu vois ce qui s'ameliore, ce qui revient trop souvent et ce qu'il faut corriger en priorite.",
    image: "/images/q-871c3758.png",
  },
];

export default function ConnectedSection() {
  return (
    <section
      id="connected"
      style={{
        paddingTop: 496,
        paddingBottom: 145,
        position: "relative",
      }}
    >
      <img
        src="/images/q-44e26a19.png"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 806,
          height: 849,
          zIndex: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div className="reflect-container" style={{ position: "relative", zIndex: 3 }}>
        <ScrollReveal>
          <div className="section-header" style={{ marginBottom: 64 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(239,237,253,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 12,
              }}
            >
              Tout ton parcours reste relie
            </p>

            <h2 className="section-title">Relie preparation, execution et retour d&apos;experience.</h2>

            <p className="section-subtitle" style={{ maxWidth: 600, margin: "0 auto" }}>
              Le template Reflect s&apos;appuie sur des cartes tres visuelles. Ici, elles montrent comment
              l&apos;accompagnement rassemble les analyses, les erreurs et les progres au meme endroit.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 100}>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div style={{ aspectRatio: "468/256", overflow: "hidden" }}>
                  <img
                    src={card.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-aeonik)",
                      fontSize: 18,
                      fontWeight: 500,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: "20px",
                      color: "rgba(239,237,253,0.7)",
                      margin: 0,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
