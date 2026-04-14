"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone, Mail, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const handleClose = () => {
    setIsSubmitted(false);
    setError(null);
    setDateValue("");
    setTimeValue("");
    onClose();
  };

  // Empêcher le scroll quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateValue || !timeValue) {
      setError("Veuillez sélectionner une date et une heure.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateTime: formData.get("dateTime"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi. Veuillez réessayer.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !isSubmitted) return null;

  return (
    <AnimatePresence>
      {(isOpen || isSubmitted) && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-[#0B2A59]/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative flex flex-col items-center border-b border-gray-100 bg-white p-8 pt-10 text-center">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#0B2A59]"
              >
                <X size={20} />
              </button>

              <div className="mb-4 flex items-center justify-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#D4AF37]/20 shadow-sm">
                  <Image
                    src="/images/docteur-divergence-logo.png"
                    alt="Docteur Divergence"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>

              <h2 className="font-heading text-2xl font-bold text-[#0B2A59]">
                {isSubmitted ? "Demande envoyée !" : "Demander un entretien téléphonique"}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {isSubmitted 
                  ? "Merci pour votre confiance. Natyem vous recontactera très prochainement." 
                  : "Remplissez ce formulaire et Natyem vous recontactera pour fixer un premier échange."}
              </p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-8">
              {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-500 border border-red-100 italic">
                  {error}
                </div>
              )}

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">
                        Prénom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          required
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Ex: Jean"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">
                        Nom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          required
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Ex: Dupont"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          required
                          type="email"
                          id="email"
                          name="email"
                          placeholder="jean@exemple.com"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          required
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="06 12 34 56 78"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">
                      Disponibilités souhaitées
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        <input
                          required
                          type="date"
                          id="dateValue"
                          value={dateValue}
                          onChange={(e) => setDateValue(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        />
                      </div>
                      <input
                        required
                        type="time"
                        id="timeValue"
                        value={timeValue}
                        onChange={(e) => setTimeValue(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-4 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                    <input
                      type="hidden"
                      name="dateTime"
                      value={dateValue && timeValue ? `${dateValue}T${timeValue}` : ""}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">
                      Sujet à aborder
                    </label>
                    <select
                      required
                      id="subject"
                      name="subject"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="Accompagnement individuel">Accompagnement individuel</option>
                      <option value="Evaluation technique">Évaluation technique</option>
                      <option value="Question sur la méthode Ichimoku">Question sur la méthode Ichimoku</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[#0B2A59]/60">
                        Votre message
                      </label>
                      <span className={`text-[10px] font-bold ${charCount > 1900 ? 'text-red-500' : 'text-gray-400'}`}>
                        {charCount} / 2000
                      </span>
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
                      <textarea
                        required
                        id="message"
                        name="message"
                        rows={4}
                        maxLength={2000}
                        onChange={(e) => setCharCount(e.target.value.length)}
                        placeholder="Comment Natyem peut-il vous aider ?"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B2A59] py-3.5 text-sm font-bold uppercase tracking-wider text-[#D4AF37] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />
                    ) : (
                      <>
                        <Send size={16} />
                        Envoyer ma demande
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500 shadow-inner"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0B2A59]">Votre demande est bien reçue !</h3>
                  <p className="mt-4 max-w-sm text-gray-500">
                    Natyem a été prévenu et reviendra vers vous par email ou téléphone dans les plus brefs délais.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-10 font-bold text-[#D4AF37] underline transition hover:text-[#0B2A59]"
                  >
                    Fermer la fenêtre
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-50 bg-gray-50/50 p-4 text-center text-[10px] text-gray-400">
              © {new Date().getFullYear()} Docteur Divergence — Politique de confidentialité
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
