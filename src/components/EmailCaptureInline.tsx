"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function EmailCaptureInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue. Réessayez.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 text-green-600">
        <CheckCircle2 size={15} />
        <span className="text-[12px] font-semibold">Vous serez parmi les premiers prévenus !</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-1.5 w-full max-w-xs">
      <p className="text-[11px] font-semibold italic text-[#0B2A59]/40 tracking-wide mb-0.5">
        Coming soon… être notifié à l&apos;ouverture :
      </p>
      <div className="flex w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37] transition">
        <input
          type="email"
          required
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2 text-[12px] text-[#1a1a1a] placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center gap-1.5 bg-[#0B2A59] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] transition hover:bg-[#0a2450] disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Send size={13} />
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="text-[11px] text-red-500">{errorMsg}</p>
      )}
    </form>
  );
}
