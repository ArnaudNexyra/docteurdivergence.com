"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const GRID_SIZE = 400;

export default function EncryptionSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;

    el.textContent = Array.from({ length: GRID_SIZE }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(
      " ",
    );

    const interval = setInterval(() => {
      const chars = el.textContent!.split(" ");
      for (let i = 0; i < 10; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = chars.join(" ");
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        paddingTop: 222,
        paddingBottom: 236,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        ref={textRef}
        style={{
          position: "absolute",
          inset: 0,
          fontFamily: "monospace",
          fontSize: 13,
          color: "rgba(212,175,55,0.11)",
          letterSpacing: "0.15em",
          lineHeight: "24px",
          wordBreak: "break-all",
          padding: "0 20px",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      />

      <ScrollReveal>
        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <img src="/images/q-92fb8db8.png" alt="Discipline et structure" style={{ width: 200, height: "auto" }} />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="reflect-container" style={{ position: "relative", zIndex: 3 }}>
          <div className="section-header" style={{ maxWidth: 560, margin: "0 auto" }}>
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
              Discipline
            </p>
            <h2 className="section-title">Couper le bruit pour garder un cadre net.</h2>
            <p className="section-subtitle">
              Entre l&apos;euphorie, la peur et la surcharge d&apos;informations, le vrai enjeu est de revenir a quelques
              regles stables: contexte, risque, execution et patience.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
