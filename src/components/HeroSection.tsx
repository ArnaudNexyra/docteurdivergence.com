"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const highlights = [
  "6 ans pour devenir rentable et en faire un métier à temps plein",
  "Accompagnement humain pour débutants comme traders déjà actifs",
  "Approche disciplinée, psychologie et exécution, pas promesses faciles",
];

export default function HeroSection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = [
    "J'ai échoué plus de 40 fois, je sais exactement quelle mécanique psychologique et émotionnelle adopter pour réussir.",
    "Trader à temps plein, il m'a fallu 6 ans pour être rentable. La persévérance finit toujours par triompher.",
    "Aujourd'hui je suis libre géographiquement. Je vous transmets mon expérience du terrain sans aucun filtre."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section className="relative overflow-hidden pb-20 pt-32 text-[#1a1a1a] md:pb-28 md:pt-40">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#f4f6f9] to-[#ffffff] opacity-50 blur-3xl" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#0b2a59]/5 to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="dd-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <ScrollReveal>
            <div className="dd-badge-light max-w-max">
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
              Trading, formation et accompagnement
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="space-y-6 relative z-10">
              <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl text-[#0b2a59] uppercase tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Apprenez à trader avec la méthode Ichimoku Kinko Hyo
              </h1>
              <p className="dd-text-light-muted max-w-2xl text-lg leading-8 font-medium">
                Docteur Divergence accompagne les profils débutants comme avertis à maîtriser leur lecture du marché, leur
                psychologie et leur exécution à travers un suivi de terrain concret.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="flex flex-wrap gap-4 relative z-10">
              <a
                href="https://calendar.app.google/gb3hrkXL4iTwSTET8"
                target="_blank"
                rel="noreferrer"
                className="dd-button-primary px-8"
              >
                Prendre rendez-vous
              </a>
              <a 
                href="https://www.youtube.com/@doc.divergence" 
                className="dd-button-secondary no-underline inline-flex items-center"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Suivre une leçon
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={260}>
            <ul className="grid gap-3 text-sm text-[#1a1a1a]/80 md:grid-cols-3 relative z-10">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-[6px] border border-[#0b2a59]/10 bg-white/60 px-5 py-4 backdrop-blur shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={160}>
          <div className="dd-card-light relative overflow-hidden p-7 md:p-8 rounded-[6px]">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0b2a59]/70">Docteur Divergence</p>
                <h2 className="text-3xl font-bold text-[#0b2a59] uppercase" style={{ fontFamily: "var(--font-heading)" }}>Suivi axe rentabilite</h2>
              </div>
              <div className="rounded-[4px] border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-sm text-[#0b2a59] font-medium">
                Finance & Expertise
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[6px] border border-[#0b2a59]/10 bg-[#f4f6f9] p-5">
                <div className="mb-5 h-16 w-16 rounded-[4px] bg-white flex items-center justify-center p-2 shadow-sm border border-[#0b2a59]/5">
                  <Image
                    src="/images/docteur-divergence-logo.png"
                    alt="Logo Docteur Divergence"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm uppercase tracking-[0.16em] text-[#0b2a59] font-bold">Objectif</p>
                <p className="mt-4 text-[14px] leading-relaxed text-[#1a1a1a]/80 font-medium">
                  Faire progresser le trader sur ses entrées, sa discipline et sa capacité à rester cohérent dans la
                  durée avec l'Ichimoku. L'accompagnement permet d'identifier et corriger précisément vos biais psychologiques. Finis les paris au hasard : apprenez à lire le marché de manière chirurgicale et à appliquer la routine stricte d'un trader rentable.
                </p>
              </div>

              <div className="space-y-4 rounded-[6px] border border-[#0b2a59]/10 bg-white p-5 shadow-sm">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-[#0b2a59]/70 font-bold">Points forts</p>
                  <div className="mt-4 space-y-3">
                    <StatRow label="Analyse technique" value="Ichimoku" color="#0b2a59" />
                    <StatRow label="Suivi régulier" value="Continue" color="#d4af37" />
                    <StatRow label="Psychologie du trader" value="Concrète" color="#d32f2f" />
                  </div>
                </div>
                <div className="rounded-[4px] bg-[#f0f3f8] px-5 py-4 text-[13px] leading-relaxed font-medium text-[#0b2a59] border-l-4 border-[#d32f2f] min-h-[80px] shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuote}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="italic w-full"
                    >
                      "{quotes[currentQuote]}"
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between text-sm py-1.5 border-b border-[#0b2a59]/5 last:border-0">
      <span className="text-[#1a1a1a]/80 font-medium">{label}</span>
      <span className="font-bold" style={{ color }}>{value}</span>
    </div>
  );
}


