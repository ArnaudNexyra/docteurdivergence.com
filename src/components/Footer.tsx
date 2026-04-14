import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#0b2a59]/10 bg-white py-8 text-[#1a1a1a]">
      <div className="dd-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-full.png"
            alt="Docteur Divergence"
            width={600}
            height={200}
            className="h-40 w-auto object-contain"
          />
          <span className="text-sm font-bold text-[#1a1a1a]/64 uppercase tracking-wider">Formation trading & accompagnement</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[#1a1a1a]/72">
          <a href="#services" className="no-underline transition hover:text-[#0b2a59]">
            Services
          </a>
          <a href="#credibilite" className="no-underline transition hover:text-[#0b2a59]">
            Crédibilité
          </a>
          <a href="mailto:adjutonatyem@gmail.com" className="no-underline transition hover:text-[#0b2a59]">
            Email
          </a>
          <a
            href="https://fr.tradingview.com/u/DocteurDivergence/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition hover:text-[#0b2a59]"
          >
            TradingView
          </a>
        </div>
      </div>
      <div className="dd-container mt-6 border-t border-[#0b2a59]/10 pt-5 text-xs text-[#1a1a1a]/40 text-center">
        © 2026 Docteur Divergence — Tous droits réservés. Les performances passées ne préjugent pas des performances futures.
      </div>

    </footer>
  );
}
