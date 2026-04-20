"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Shield } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: "contact" | "calendar";
  amount?: number;
  label?: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  action,
  amount = 60,
  label = "Appel de diagnostic",
}: PaymentModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [isOpen]);

  const handlePay = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMsg(data.error ?? "Impossible de créer la session de paiement.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erreur de connexion. Réessayez.");
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-[#0B2A59]/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[111] w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-gray-100 px-6 pt-5 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/50">
                    Paiement sécurisé
                  </span>
                  <p className="text-lg font-bold text-[#0B2A59]">
                    {label} — <span className="text-[#D4AF37]">{amount} €</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={13} className="text-green-500" />
                  <span className="text-[11px] font-bold text-green-600">SSL</span>
                  <button
                    onClick={onClose}
                    className="ml-2 rounded-full p-2 text-gray-400 transition hover:bg-gray-100"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Vous allez être redirigé vers la page de paiement sécurisée Stripe.
                Le paiement est traité directement par Stripe — aucune donnée bancaire
                ne transite par notre serveur.
              </p>

              <div className="rounded-xl bg-[#F4F6F9] p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-[#1a1a1a]/70">Appel de diagnostic trading</span>
                <span className="text-lg font-extrabold text-[#0B2A59]">{amount} €</span>
              </div>

              {status === "error" && (
                <p className="text-sm font-bold text-red-500 text-center">{errorMsg}</p>
              )}

              <button
                onClick={handlePay}
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2A59] py-4 text-sm font-bold uppercase tracking-wider text-[#D4AF37] shadow-lg transition hover:bg-[#0a2450] disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37]" />
                    Redirection en cours…
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Payer {amount} € en toute sécurité
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-gray-50 bg-gray-50/50 px-6 py-3">
              <Shield size={11} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">
                Paiement 100 % sécurisé via Stripe — vos données ne sont jamais stockées
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
