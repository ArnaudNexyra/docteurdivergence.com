"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Lock, CheckCircle2, ChevronLeft, Shield } from "lucide-react";
import Image from "next/image";

type PaymentMethod = "apple" | "google" | "card" | "paypal" | null;
type Step = "select" | "card-form" | "processing" | "success";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount?: number;
  label?: string;
}

// ── SVG Logos ────────────────────────────────────────────────────────────────

function ApplePayLogo() {
  return (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      <path d="M14.12 7.2c-.9 1.06-2.34 1.88-3.76 1.76-.18-1.42.52-2.94 1.36-3.88.9-1.06 2.46-1.84 3.72-1.9.16 1.46-.42 2.9-1.32 4.02zm1.3 2.06c-2.08-.12-3.86 1.18-4.84 1.18-.98 0-2.48-1.12-4.1-1.1-2.12.04-4.08 1.22-5.16 3.14-2.22 3.82-.58 9.48 1.56 12.58 1.04 1.52 2.3 3.2 3.94 3.14 1.58-.06 2.18-.98 4.08-.98 1.9 0 2.44.98 4.1.94 1.7-.04 2.78-1.52 3.82-3.04 1.2-1.72 1.68-3.4 1.72-3.48-.04-.04-3.3-1.28-3.34-5.04-.04-3.16 2.58-4.66 2.7-4.74-1.48-2.18-3.78-2.56-4.48-2.6z" fill="currentColor"/>
      <text x="22" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="600" fill="currentColor">Pay</text>
    </svg>
  );
}

function GooglePayLogo() {
  return (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      <text x="0" y="22" fontFamily="'Product Sans', system-ui, sans-serif" fontSize="15" fontWeight="500">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#34A853">o</tspan>
        <tspan fill="#FBBC05">o</tspan>
        <tspan fill="#EA4335">g</tspan>
        <tspan fill="#4285F4">l</tspan>
        <tspan fill="#34A853">e</tspan>
        <tspan fill="#1a1a1a" dx="3">Pay</tspan>
      </text>
    </svg>
  );
}

function PayPalLogo() {
  return (
    <svg viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
      <path d="M10.5 4h7.2c3.6 0 6 1.6 5.4 5.2-.6 3.8-3.4 5.4-7 5.4h-1.8L13 20H9l1.5-16zm3.2 7.6h1.6c1.4 0 2.6-.6 2.8-2 .2-1.4-.8-2-2.2-2h-1.4l-.8 4z" fill="#009CDE"/>
      <path d="M22.5 4h7.2c3.6 0 6 1.6 5.4 5.2-.6 3.8-3.4 5.4-7 5.4h-1.8L25 20h-4l1.5-16zm3.2 7.6h1.6c1.4 0 2.6-.6 2.8-2 .2-1.4-.8-2-2.2-2h-1.4l-.8 4z" fill="#003087"/>
      <path d="M36 14.4c.6-3.8 3.4-5.4 7-5.4h1.8L46 4h4l-1.5 16h-3.6l.4-2c-.8 1.4-2.2 2.2-4 2.2-2.8 0-4.6-1.8-5.3-5.8zm3.8.2c.4 2 1.4 3 3 3 1.8 0 3.2-1.2 3.6-3.4.4-2.2-.6-3.4-2.4-3.4-2.2 0-3.8 1.4-4.2 3.8z" fill="#009CDE"/>
      <text x="50" y="20" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#003087">l</text>
    </svg>
  );
}

function StripeLogo() {
  return (
    <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
      <path d="M5 10.5c0-1.6 1.3-2.2 3.3-2.2 3 0 6.7.9 9.7 2.5V5.2C15 3.8 11.9 3 8.3 3 3.4 3 0 5.4 0 10.8c0 8.4 11.6 7 11.6 10.6 0 1.9-1.6 2.5-3.8 2.5-3.3 0-7.4-1.3-10.7-3.1v5.7C.5 27.6 3.9 28.4 7.8 28.4c5 0 8.5-2.5 8.5-7.9C16.2 12.7 5 14.4 5 10.5z" fill="#635BFF"/>
      <text x="20" y="18" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="600" fill="#635BFF">stripe</text>
    </svg>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────

export default function PaymentModal({ isOpen, onClose, onSuccess, amount = 60, label = "Appel de diagnostic" }: PaymentModalProps) {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<PaymentMethod>(null);
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setStep("select");
    setSelected(null);
    setCardData({ number: "", expiry: "", cvv: "", name: "" });
    setCardErrors({});
    onClose();
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelected(method);
    if (method === "card") {
      setStep("card-form");
    } else {
      simulatePayment();
    }
  };

  const simulatePayment = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        handleClose();
        onSuccess();
      }, 1800);
    }, 2000);
  };

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (cardData.number.replace(/\s/g, "").length < 16) errors.number = "Numéro invalide";
    if (cardData.expiry.length < 5) errors.expiry = "Date invalide";
    if (cardData.cvv.length < 3) errors.cvv = "CVV invalide";
    if (!cardData.name.trim()) errors.name = "Nom requis";
    if (Object.keys(errors).length > 0) { setCardErrors(errors); return; }
    simulatePayment();
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
                {step === "card-form" && (
                  <button
                    onClick={() => setStep("select")}
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

              {/* Barre de progression */}
              <div className="flex items-center pb-4">
                {[
                  { label: "Paiement", active: true },
                  { label: "Réservation", active: step === "success" },
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
                    {i < arr.length - 1 && (
                      <div className="mx-2 h-px flex-1 bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="p-6">

              {/* ── Étape 1 : Sélection méthode ── */}
              {step === "select" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <p className="mb-5 text-sm text-gray-500">Choisissez votre mode de paiement :</p>

                  {/* Apple Pay */}
                  <button
                    onClick={() => handleMethodSelect("apple")}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-black bg-black py-4 text-white transition hover:opacity-90 active:scale-[0.98]"
                  >
                    <ApplePayLogo />
                  </button>

                  {/* Google Pay */}
                  <button
                    onClick={() => handleMethodSelect("google")}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white py-4 transition hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
                  >
                    <GooglePayLogo />
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ou payer avec</span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  {/* Carte bancaire */}
                  <button
                    onClick={() => handleMethodSelect("card")}
                    className="flex w-full items-center gap-4 rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-left transition hover:border-[#0B2A59]/30 hover:bg-gray-50 active:scale-[0.98]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#635BFF]/10">
                      <CreditCard size={20} className="text-[#635BFF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#1a1a1a]">Carte bancaire</p>
                      <p className="text-xs text-gray-400">Visa, Mastercard, Amex</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {["V", "M", "A"].map((c, i) => (
                        <span key={i} className="flex h-6 w-9 items-center justify-center rounded border border-gray-200 text-[10px] font-bold text-gray-500 bg-gray-50">
                          {c === "V" ? "VISA" : c === "M" ? "MC" : "AMEX"}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => handleMethodSelect("paypal")}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-[#FFC439] py-4 transition hover:bg-[#f0b830] active:scale-[0.98]"
                  >
                    <PayPalLogo />
                  </button>
                </motion.div>
              )}

              {/* ── Étape 2 : Formulaire carte ── */}
              {step === "card-form" && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleCardSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">Nom sur la carte</label>
                    <input
                      type="text"
                      placeholder="Jean Dupont"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm transition focus:outline-none focus:ring-1 ${cardErrors.name ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"}`}
                    />
                    {cardErrors.name && <p className="text-xs text-red-500">{cardErrors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">Numéro de carte</label>
                    <div className="relative">
                      <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="4242 4242 4242 4242"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                        className={`w-full rounded-lg border bg-gray-50 py-3 pl-10 pr-4 text-sm font-mono transition focus:outline-none focus:ring-1 ${cardErrors.number ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"}`}
                      />
                    </div>
                    {cardErrors.number && <p className="text-xs text-red-500">{cardErrors.number}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">Expiration</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                        className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm font-mono transition focus:outline-none focus:ring-1 ${cardErrors.expiry ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"}`}
                      />
                      {cardErrors.expiry && <p className="text-xs text-red-500">{cardErrors.expiry}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">CVV</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        className={`w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm font-mono transition focus:outline-none focus:ring-1 ${cardErrors.cvv ? "border-red-300 focus:ring-red-300" : "border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"}`}
                      />
                      {cardErrors.cvv && <p className="text-xs text-red-500">{cardErrors.cvv}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2A59] py-4 text-sm font-bold uppercase tracking-wider text-[#D4AF37] shadow-lg transition hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <Lock size={14} />
                    Payer {amount} € en toute sécurité
                  </button>
                </motion.form>
              )}

              {/* ── Étape 3 : Traitement ── */}
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
                  <p className="text-base font-bold text-[#0B2A59]">Paiement en cours...</p>
                  <p className="mt-2 text-sm text-gray-400">Connexion sécurisée au serveur de paiement</p>
                </motion.div>
              )}

              {/* ── Étape 4 : Succès ── */}
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
            </div>

            {/* Footer */}
            {(step === "select" || step === "card-form") && (
              <div className="flex items-center justify-center gap-2 border-t border-gray-50 bg-gray-50/50 px-6 py-3">
                <Shield size={12} className="text-gray-400" />
                <span className="text-[10px] text-gray-400">
                  Paiement 100 % sécurisé — vos données ne sont jamais stockées
                </span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
