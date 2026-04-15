"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle2, ChevronLeft, Shield } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = "loading" | "form" | "processing" | "success" | "error";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount?: number;
  label?: string;
}

// ── Barre de progression ──────────────────────────────────────────────────────

function ProgressBar({ step }: { step: Step }) {
  const paymentDone = step === "success";
  return (
    <div className="flex items-center pb-4">
      {[
        { label: "Paiement", active: true },
        { label: "Réservation", active: paymentDone },
        { label: "Confirmation", active: false },
      ].map((s, i, arr) => (
        <div key={i} className="flex flex-1 items-center">
          <div className="flex flex-col items-center">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300"
              style={{
                backgroundColor: s.active ? "#0B2A59" : "#e5e7eb",
                color: s.active ? "#D4AF37" : "#9ca3af",
              }}
            >
              {i + 1}
            </div>
            <span
              className="mt-1 text-[9px] font-bold uppercase tracking-wider transition-colors duration-300"
              style={{ color: s.active ? "#0B2A59" : "#9ca3af" }}
            >
              {s.label}
            </span>
          </div>
          {i < arr.length - 1 && <div className="mx-2 h-px flex-1 bg-gray-200" />}
        </div>
      ))}
    </div>
  );
}

// ── Formulaire Stripe interne ─────────────────────────────────────────────────

function StripeForm({
  onSuccess,
  onProcessing,
  onError,
}: {
  onSuccess: () => void;
  onProcessing: () => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    onProcessing();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message ?? "Le paiement a échoué. Réessayez.");
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement
        options={{
          layout: "tabs",
          wallets: { applePay: "auto", googlePay: "auto" },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !elements}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2A59] py-4 text-sm font-bold uppercase tracking-wider text-[#D4AF37] shadow-lg transition hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
      >
        <Lock size={14} />
        Payer 60 € en toute sécurité
      </button>
    </form>
  );
}

// ── Modal principale ──────────────────────────────────────────────────────────

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  amount = 60,
  label = "Appel de diagnostic",
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>("loading");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Crée le PaymentIntent dès l'ouverture
  useEffect(() => {
    if (!isOpen) return;
    setStep("loading");
    setClientSecret(null);
    setErrorMsg("");

    fetch("/api/checkout", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setStep("form");
        } else {
          setErrorMsg(data.error ?? "Erreur de chargement.");
          setStep("error");
        }
      })
      .catch(() => {
        setErrorMsg("Impossible de contacter le serveur de paiement.");
        setStep("error");
      });
  }, [isOpen]);

  const handleClose = () => {
    setStep("loading");
    setClientSecret(null);
    setErrorMsg("");
    onClose();
  };

  const handleSuccess = () => {
    setStep("success");
    setTimeout(() => {
      handleClose();
      onSuccess();
    }, 1800);
  };

  const handleError = (msg: string) => {
    setErrorMsg(msg);
    setStep("error");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[110] bg-[#0B2A59]/50 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[111] w-full max-w-[460px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-gray-100 bg-white px-6 pt-5 pb-0">
              <div className="relative flex items-center pb-4">
                {step === "error" && (
                  <button
                    onClick={() => setStep("form")}
                    className="mr-3 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-[#0B2A59]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/50">
                    Paiement sécurisé
                  </span>
                  <span className="text-lg font-bold text-[#0B2A59]">
                    {label} — <span className="text-[#D4AF37]">{amount} €</span>
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Lock size={14} className="text-green-500" />
                  <span className="text-[11px] font-bold text-green-600">SSL 256-bit</span>
                  <button
                    onClick={handleClose}
                    className="ml-2 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#0B2A59]"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <ProgressBar step={step} />
            </div>

            {/* Body */}
            <div className="p-6">

              {/* Chargement */}
              {step === "loading" && (
                <div className="flex flex-col items-center justify-center py-14">
                  <div className="relative mb-4">
                    <div className="h-12 w-12 rounded-full border-4 border-[#0B2A59]/10" />
                    <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-[#D4AF37]" />
                  </div>
                  <p className="text-sm text-gray-400">Initialisation du paiement…</p>
                </div>
              )}

              {/* Formulaire Stripe */}
              {step === "form" && clientSecret && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#0B2A59",
                          colorBackground: "#ffffff",
                          colorText: "#1a1a1a",
                          fontFamily: "system-ui, sans-serif",
                          borderRadius: "8px",
                        },
                      },
                      locale: "fr",
                    }}
                  >
                    <StripeForm
                      onSuccess={handleSuccess}
                      onProcessing={() => setStep("processing")}
                      onError={handleError}
                    />
                  </Elements>
                </motion.div>
              )}

              {/* Traitement */}
              {step === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <div className="relative mb-6">
                    <div className="h-16 w-16 rounded-full border-4 border-[#0B2A59]/10" />
                    <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-[#D4AF37]" />
                  </div>
                  <p className="text-base font-bold text-[#0B2A59]">Paiement en cours…</p>
                  <p className="mt-2 text-sm text-gray-400">Connexion sécurisée au serveur de paiement</p>
                </motion.div>
              )}

              {/* Succès */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                    className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0B2A59]">Paiement validé !</h3>
                  <p className="mt-3 text-sm text-gray-500">Vous allez être redirigé vers la prise de rendez-vous…</p>
                </motion.div>
              )}

              {/* Erreur */}
              {step === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <X size={28} />
                  </div>
                  <p className="text-sm font-bold text-red-500">{errorMsg}</p>
                  <button
                    onClick={() => { setStep("form"); setErrorMsg(""); }}
                    className="mt-6 rounded-lg bg-[#0B2A59] px-6 py-2.5 text-sm font-bold text-[#D4AF37] transition hover:bg-[#0a2450]"
                  >
                    Réessayer
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {(step === "form" || step === "loading") && (
              <div className="flex items-center justify-center gap-2 border-t border-gray-50 bg-gray-50/50 px-6 py-3">
                <Shield size={12} className="text-gray-400" />
                <span className="text-[10px] text-gray-400">
                  Paiement 100 % sécurisé via Stripe — vos données ne sont jamais stockées
                </span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
