import ScrollReveal from "@/components/ScrollReveal";

interface Integration {
  name: string;
  description: string;
  logoImg?: string;
  logoBg?: string;
  logoChar?: string;
}

const integrations: Integration[] = [
  {
    name: "TradingView",
    description: "Relier la pratique réelle du marché à un environnement où les analyses et publications restent visibles.",
    logoBg: "#2962ff",
    logoChar: "T",
  },
  {
    name: "Google Agenda",
    description: "Poser des rendez-vous de suivi et garder un rythme simple à tenir dans le temps.",
    logoBg: "#34a853",
    logoChar: "G",
  },
  {
    name: "Email & récap",
    description: "Recevoir les points à retravailler et les prochaines actions sans se disperser.",
    logoImg: "/images/q-ffb847cc.png",
  },
  {
    name: "Captures et supports",
    description: "Centraliser screenshots, schémas et éléments de contexte utiles à la progression.",
    logoImg: "/images/q-0fbeed8c.png",
  },
];

export default function IntegrationsSection() {
  return (
    <section
      id="integrations"
      style={{
        paddingTop: 120,
        paddingBottom: 120,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <img
        src="/images/q-87026e2e.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.15,
          zIndex: 0,
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
              Écosystème
            </p>
            <h2 className="section-title">Le template garde son souffle produit, mais parle du parcours client.</h2>
            <p className="section-subtitle">
              On garde la grille, les halos et la logique "intégrations", mais on l'oriente vers les outils et
              points de contact utiles au suivi proposé par Docteur Divergence.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" style={{ maxWidth: 800, margin: "0 auto" }}>
          {integrations.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 80}>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  backdropFilter: "blur(8px)",
                  height: "100%",
                }}
              >
                <div style={{ width: 48, height: 48, marginBottom: 4 }}>
                  {item.logoImg ? (
                    <img src={item.logoImg} alt={item.name} style={{ width: 48, height: 48, objectFit: "contain" }} />
                  ) : (
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        background: item.logoBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>{item.logoChar}</span>
                    </div>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-aeonik)",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "rgba(239,237,253,0.7)",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <img src="/images/docteur-divergence-logo.png" alt="Docteur Divergence" style={{ width: 48, height: 48 }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


