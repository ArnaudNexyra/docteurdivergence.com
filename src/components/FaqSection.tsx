"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    q: "À qui s'adresse nos services ?",
    a: "L'accompagnement s'adresse à tous les profils : débutants qui cherchent une méthode solide dès le départ, et traders actifs qui stagnent ou perdent régulièrement. Le premier appel permet justement de situer ton niveau et d'adapter la suite.",
  },
  {
    q: "En quoi consiste l'appel de diagnostic à 60 € ?",
    a: "C'est un échange individuel d'environ 1h avec Natyem. On fait le point sur ton niveau actuel, tes erreurs récurrentes, ta lecture de marché et ta gestion du risque. Tu repars avec un plan de travail concret et un compte-rendu écrit. Aucun engagement pour la suite n'est exigé.",
  },
  {
    q: "Que se passe-t-il après l'appel de diagnostic ?",
    a: "Selon ton profil et tes objectifs, Natyem t'orientera vers une formation Ichimoku, un suivi en mentorat continu, ou un travail autonome à partir du compte-rendu. Aucune offre ne t'est imposée — la décision t'appartient entièrement.",
  },
  {
    q: "La méthode Ichimoku est-elle adaptée aux marchés actuels ?",
    a: "Oui. L'Ichimoku Kinko Hyo est une méthode de lecture du marché applicable sur n'importe quel actif (actions, crypto, forex, matières premières) et sur n'importe quelle unité de temps. Elle reste pertinente précisément parce qu'elle lit la structure du marché, pas les modes.",
  },
  {
    q: "Combien de temps dure l'accompagnement ?",
    a: "Ça dépend de toi. L'appel de diagnostic est une prestation ponctuelle. Le mentorat continu se structure sur plusieurs semaines ou mois selon le plan défini lors du diagnostic. Il n'y a pas d'abonnement imposé ni de durée minimale cachée.",
  },
  {
    q: "Est-ce remboursable si ça ne me convient pas ?",
    a: "L'appel de diagnostic est une prestation de conseil réalisée en direct — elle ne fait pas l'objet d'un remboursement une fois effectuée. En revanche, la qualité de l'échange et le sérieux du compte-rendu sont garantis. Si tu as un doute, pose tes questions avant de réserver.",
  },
  {
    q: "Comment se déroule le paiement et la prise de rendez-vous ?",
    a: "Tu règles directement en ligne (carte, Apple Pay, Google Pay ou PayPal), puis tu choisis ton créneau via le calendrier de réservation. Un email de confirmation t'est envoyé immédiatement. Tout se fait en moins de 5 minutes.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="dd-container">
        <ScrollReveal>
          <div className="section-header mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a1a1a] mb-3">
              Questions fréquentes
            </p>
            <h2 className="section-title">Tout ce que tu veux savoir avant de te lancer.</h2>
            <p className="section-subtitle">Des réponses directes, sans jargon ni promesses intenables.</p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-2xl divide-y divide-gray-100">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 40}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-bold text-[#0B2A59] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className="mt-0.5 shrink-0 text-[#D4AF37] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-5 text-[14px] leading-relaxed text-[#1a1a1a]/70">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
