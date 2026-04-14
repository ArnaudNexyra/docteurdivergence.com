import type { CSSProperties } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface CalendarPiece {
  label: string;
  value: string;
  accent: string;
  position: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
  };
}

const calendarPieces: CalendarPiece[] = [
  { label: "Appel diagnostic", value: "Point niveau + blocages", accent: "#d4af37", position: { top: "10%", left: "-5%" } },
  { label: "Débrief exécution", value: "Review des trades", accent: "#4f8bf9", position: { top: "25%", right: "-4%" } },
  { label: "Routine hebdo", value: "Préparation de semaine", accent: "#d32f2f", position: { bottom: "20%", left: "-3%" } },
  { label: "Suivi discipline", value: "Actions à tenir", accent: "#133d7f", position: { bottom: "10%", right: "-5%" } },
];

export default function MeetingsSection() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 120, position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.04)",
          pointerEvents: "none",
          zIndex: 0,
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
              Calendrier de suivi
            </p>
            <h2 className="section-title">Conserve le calendrier animé, mais au service du suivi du trader.</h2>
            <p className="section-subtitle">
              La mise en scène originale reste intacte : un agenda vivant, des cartes flottantes et une sensation
              d'organisation. Ici, il sert à vendre le rythme de travail et la régularité des points de contrôle.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
            <img
              src="/images/q-7bea4872.png"
              alt="Calendrier de suivi et points de controle"
              style={{ width: "100%", borderRadius: 16, display: "block", opacity: 0.9 }}
            />

            {calendarPieces.map((piece, i) => {
              const cardStyle: CSSProperties = {
                position: "absolute",
                ...piece.position,
                background: "rgba(8,18,38,0.76)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                backdropFilter: "blur(12px)",
                animation: `float ${3 + i * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              };

              return (
                <div key={piece.label} style={cardStyle}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: piece.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="17" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
                      <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="1.5" />
                      <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="1.5" />
                      <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>{piece.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(239,237,253,0.5)" }}>{piece.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

