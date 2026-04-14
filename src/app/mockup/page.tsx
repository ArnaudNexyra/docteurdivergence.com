"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import Image from "next/image";

export default function MockupPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-8 md:p-16">
      <div className="mx-auto max-w-4xl space-y-16">
        <div>
          <h1 className="font-heading text-4xl font-bold text-[#0B2A59]">Validation Visuelle (Page Mockup)</h1>
          <p className="mt-4 text-lg text-gray-600">
            Cette page permet de valider le rendu du formulaire et de l&apos;email avant l&apos;intégration finale.
          </p>
        </div>

        {/* Section Formulation */}
        <section className="rounded-2xl border border-gray-100 bg-[#F4F6F9] p-10 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0B2A59]">1. Le Formulaire (Modale)</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="dd-button-primary"
            >
              Tester l&apos;ouverture du formulaire
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Clique sur le bouton ci-dessus pour voir le formulaire s&apos;afficher. Il respecte ta demande : Logo bien posé sur blanc, minimaliste, tout en français.
          </p>
        </section>

        {/* Section Email Preview */}
        <section className="rounded-2xl border border-gray-200 bg-white p-10 shadow-lg">
          <h2 className="mb-8 text-2xl font-bold text-[#0B2A59]">2. L&apos;Email de Confirmation (Aperçu)</h2>
          
          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-gray-100 shadow-2xl">
            {/* Simulation d'un email */}
            <div className="bg-gray-100 px-4 py-2 text-[10px] text-gray-400">
              Objet : Confirmation de votre demande d&apos;entretien téléphonique — Docteur Divergence
            </div>
            
            <div className="bg-white p-8">
              {/* Header Logo */}
              <div className="mb-10 flex justify-center border-b border-gray-50 pb-8">
                <div className="relative h-20 w-20">
                  <Image
                    src="/images/docteur-divergence-logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-[#0B2A59]">
                <h3 className="text-xl font-bold">Bonjour [Prénom],</h3>
                <p className="leading-relaxed text-gray-700">
                  Nous avons bien reçu votre demande d&apos;entretien pour un accompagnement trading.
                  Natyem prendra connaissance de vos disponibilités et reviendra vers vous très prochainement.
                </p>

                <div className="rounded-lg bg-gray-50 p-6 border-l-2 border-[#D4AF37]">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-widest opacity-50">Résumé de votre demande :</h4>
                  <ul className="space-y-2 text-sm italic text-gray-600">
                    <li><strong>Sujet :</strong> Accompagnement individuel</li>
                    <li><strong>Date souhaitée :</strong> [Date et Heure sélectionnées]</li>
                    <li><strong>Téléphone :</strong> [Votre Numéro]</li>
                  </ul>
                </div>

                <p className="leading-relaxed text-gray-700">
                  D&apos;ici là, vous pouvez continuer à suivre les dernières analyses directement sur TradingView.
                </p>

                <div className="pt-8">
                  <p className="text-sm font-bold">À très bientôt,</p>
                  <p className="text-sm text-[#D4AF37]">L&apos;équipe Docteur Divergence</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 border-t border-gray-100 pt-8 text-center text-[10px] text-gray-400">
                Ce message a été envoyé automatiquement. Merci de ne pas y répondre directement.
                <br />
                © 2026 Docteur Divergence — Expertise Ichimoku Kinko Hyo
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-500 italic">
            Note : Natyem recevra un email similaire mais avec tous les détails techniques pour se préparer à l&apos;appel.
          </p>
        </section>

        <div className="flex justify-center pt-8">
           <button 
             onClick={() => window.location.href = '/'}
             className="text-sm font-bold text-gray-400 hover:text-[#0B2A59] transition"
           >
             ← Retour au site principal
           </button>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
