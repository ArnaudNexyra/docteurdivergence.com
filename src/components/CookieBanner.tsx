"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ChevronDown, X } from "lucide-react";

const STORAGE_KEY = "dd_cookie_consent";

interface ConsentState {
  decided: boolean;
  analytics: boolean;
  marketing: boolean;
}

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Dispatch event pour que d'autres scripts puissent réagir
  window.dispatchEvent(new CustomEvent("dd:consent", { detail: state }));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = loadConsent();
    if (!consent?.decided) {
      // Délai léger pour ne pas bloquer le LCP
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (all: boolean) => {
    const state: ConsentState = {
      decided: true,
      analytics: all ? true : analytics,
      marketing: all ? true : marketing,
    };
    saveConsent(state);
    setVisible(false);
  };

  const refuse = () => {
    saveConsent({ decided: true, analytics: false, marketing: false });
    setVisible(false);
  };

  const saveCustom = () => {
    saveConsent({ decided: true, analytics, marketing });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="fixed bottom-4 left-4 right-4 z-[200] mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white shadow-2xl"
        >
          <div className="p-5">
            {/* Titre */}
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <Cookie size={18} className="shrink-0 text-[#D4AF37]" />
                <span className="text-[13px] font-bold text-[#0B2A59]">
                  Ce site utilise des cookies
                </span>
              </div>
              <button
                onClick={refuse}
                className="shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-[#0B2A59] transition"
                aria-label="Refuser et fermer"
              >
                <X size={15} />
              </button>
            </div>

            <p className="mb-4 text-[12px] leading-relaxed text-gray-500">
              Nous utilisons des cookies pour le bon fonctionnement du site (nécessaires) et, avec votre accord, pour mesurer l&apos;audience (analytiques) et personnaliser certains contenus (marketing).
            </p>

            {/* Détails / Personnaliser */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    {/* Nécessaires — toujours actifs */}
                    <CookieToggle
                      label="Nécessaires"
                      description="Authentification, sécurité, préférences de session. Requis pour le fonctionnement du site."
                      checked={true}
                      disabled
                      onChange={() => {}}
                    />
                    {/* Analytiques */}
                    <CookieToggle
                      label="Analytiques"
                      description="Mesure d'audience anonymisée pour améliorer le site (aucune donnée personnelle transmise)."
                      checked={analytics}
                      onChange={setAnalytics}
                    />
                    {/* Marketing */}
                    <CookieToggle
                      label="Marketing"
                      description="Contenus et publicités adaptés à vos intérêts via des partenaires tiers."
                      checked={marketing}
                      onChange={setMarketing}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Boutons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => accept(true)}
                className="rounded-lg bg-[#0B2A59] px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-[#D4AF37] transition hover:bg-[#0a2450]"
              >
                Tout accepter
              </button>
              <button
                onClick={refuse}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-gray-500 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Tout refuser
              </button>
              {showDetails ? (
                <button
                  onClick={saveCustom}
                  className="rounded-lg border border-[#D4AF37]/40 px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-[#0B2A59] transition hover:bg-[#D4AF37]/10"
                >
                  Enregistrer mes choix
                </button>
              ) : (
                <button
                  onClick={() => setShowDetails(true)}
                  className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-gray-400 underline hover:text-gray-600 transition"
                >
                  Personnaliser
                  <ChevronDown size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Bande RGPD */}
          <div className="rounded-b-2xl border-t border-gray-50 bg-gray-50/60 px-5 py-2 text-[10px] text-gray-400">
            Conformément au RGPD et à la loi Informatique & Libertés. Vos choix sont mémorisés 6 mois.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Sous-composant toggle ─────────────────────────────────────────────────────
function CookieToggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-[12px] font-bold text-[#0B2A59]">
          {label}{" "}
          {disabled && (
            <span className="ml-1 rounded bg-gray-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-500">
              Toujours actif
            </span>
          )}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className="relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed"
        style={{ backgroundColor: checked ? "#0B2A59" : "#d1d5db" }}
      >
        <span
          className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: checked ? "translateX(16px)" : "translateX(0)" }}
        />
      </button>
    </div>
  );
}
