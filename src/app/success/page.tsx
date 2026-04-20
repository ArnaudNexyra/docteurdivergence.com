"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

const CALENDAR_URL = "https://calendar.app.google/gb3hrkXL4iTwSTET8";

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const action = params.get("action") ?? "contact";
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch("/api/verify-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setStatus("done");
          setTimeout(() => {
            if (action === "calendar") {
              window.location.href = CALENDAR_URL;
            } else {
              window.location.href = "/?showContact=1";
            }
          }, 2500);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId, action]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div
          style={{
            height: 4,
            background: "linear-gradient(to right, #D4AF37, #0B2A59, #D32F2F)",
            borderRadius: "8px 8px 0 0",
            margin: "-40px -40px 32px",
          }}
        />

        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 animate-spin text-[#0B2A59]" size={48} />
            <h1 className="text-xl font-bold text-[#0B2A59]">Confirmation en cours…</h1>
            <p className="mt-2 text-sm text-gray-500">Vérification de votre paiement</p>
          </>
        )}

        {status === "done" && (
          <>
            <CheckCircle2 className="mx-auto mb-4 text-green-500" size={56} />
            <h1 className="text-2xl font-bold text-[#0B2A59]">Paiement confirmé !</h1>
            <p className="mt-3 text-sm text-gray-500">
              {action === "calendar"
                ? "Vous allez être redirigé vers la prise de rendez-vous…"
                : "Vous allez être redirigé vers le formulaire de contact…"}
            </p>
            <p className="mt-2 text-xs text-gray-400">Un reçu vous a été envoyé par email.</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-red-500 text-2xl font-bold">!</span>
            </div>
            <h1 className="text-xl font-bold text-[#0B2A59]">Session introuvable</h1>
            <p className="mt-2 text-sm text-gray-500">
              Si vous avez été débité, contactez-nous à{" "}
              <a href="mailto:trading@docteurdivergence.com" className="text-[#0B2A59] underline">
                trading@docteurdivergence.com
              </a>
            </p>
            <a
              href="/"
              className="mt-6 inline-block rounded-lg bg-[#0B2A59] px-6 py-2.5 text-sm font-bold text-[#D4AF37]"
            >
              Retour à l'accueil
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}
