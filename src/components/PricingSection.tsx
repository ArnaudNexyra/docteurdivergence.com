'use client';

import ScrollReveal from "@/components/ScrollReveal";
import { useContactModal } from "@/context/ContactModalContext";
import EmailCaptureInline from "@/components/EmailCaptureInline";

const features = [
  "Point complet sur ton niveau actuel et tes blocages",
  "Lecture de marché (Ichimoku) et erreurs récurrentes",
  "Risque, discipline et exécution",
  "Plan de travail concret pour la suite",
  "Orientation vers la formation ou un suivi renforcé",
  "Compte-rendu d'analyse simple à réutiliser",
];

export default function PricingSection() {
  const { openContactModal } = useContactModal();

  return (
    <section
      id="pricing"
      style={{
        paddingTop: 120,
        paddingBottom: 120,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#F4F6F9"
      }}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(11,42,89,0.04)_0,transparent_100%)]" />

      <div className="reflect-container" style={{ position: "relative", zIndex: 3 }}>
        <ScrollReveal>
          <div className="section-header" style={{ marginBottom: 64 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1a1a1a",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 12,
              }}
            >
              Évaluation initiale
            </p>
            <h2 className="section-title">Un premier point simple pour cadrer la suite.</h2>
            <p className="section-subtitle">Sans abonnement imposé, avec un plan d'action clair dès le départ.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(11,42,89,0.1)",
              borderRadius: 24,
              padding: 48,
              maxWidth: 480,
              margin: "0 auto",
              boxShadow: "0 14px 45px rgba(11,42,89,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 64,
                  fontWeight: 800,
                  color: "#0B2A59",
                  lineHeight: 1,
                  letterSpacing: "-0.02em"
                }}
              >
                60
              </span>
              <span style={{ fontSize: 24, color: "#1a1a1a", fontWeight: 700 }}>€</span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgba(26,26,26,0.6)",
                marginBottom: 32,
                fontWeight: 500
              }}
            >
              l'appel individuel de diagnostic
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 32px 0",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {features.map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 16,
                    color: "rgba(26,26,26,0.85)",
                    fontWeight: 500
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "rgba(212,175,55,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="10" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#D4AF37"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={openContactModal}
              className="dd-button-primary uppercase tracking-wider w-full"
              style={{
                textAlign: "center",
                fontSize: 14,
                padding: "16px 24px",
                display: "block",
                boxSizing: "border-box",
                borderRadius: 8
              }}
            >
              <span>Réserver un appel — 60 €</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

