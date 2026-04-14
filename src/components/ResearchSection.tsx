import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    title: "Des supports qui restent accessibles",
    desc: "Appels, récap, captures d'écran et plans de marché restent faciles à retrouver pour retravailler proprement.",
  },
  {
    title: "Une mémoire de progression exploitable",
    desc: "Le but n'est pas d'empiler des infos, mais de garder ce qui aide vraiment à corriger les mauvaises habitudes.",
  },
] satisfies { title: string; desc: string }[];

export default function ResearchSection() {
  return (
    <section className="research" style={{ paddingTop: 64, paddingBottom: 128, position: "relative" }}>
      <div className="reflect-container">
        <ScrollReveal>
          <div className="section-header" style={{ marginBottom: 80 }}>
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
              Preparation et relecture
            </p>
            <h2 className="section-title">Ne perds plus ce que le marché t'apprend.</h2>
            <p className="section-subtitle">
              Entre deux sessions, tout ce qui compte doit pouvoir être retrouvé vite : scénarii, captures,
              remarques sur l'exécution et points de vigilance pour la suite.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          <ScrollReveal>
            <div style={{ position: "relative" }}>
              <Image
                src="/images/q-62492b69.png"
                alt="Visualisation de preparation et relecture"
                width={800}
                height={600}
                style={{ width: "100%", height: "auto", opacity: 0.85 }}
                priority
              />
              <Image
                src="/images/docteur-divergence-logo.png"
                alt="Repere central"
                width={80}
                height={80}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {features.map((item) => (
                <div key={item.title}>
                  <h3
                    style={{
                      fontFamily: "var(--font-aeonik)",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: "24px",
                      color: "rgba(239,237,253,0.7)",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

