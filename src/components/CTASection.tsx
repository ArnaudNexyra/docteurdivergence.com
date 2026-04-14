import ScrollReveal from "@/components/ScrollReveal";

export default function CTASection() {
  return (
    <section id="contact" className="py-24 bg-[#F4F6F9] text-[#1a1a1a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="dd-container relative z-10">
        <div className="bg-white rounded-[16px] border border-[#0B2A59]/10 shadow-[0_20px_60px_rgba(11,42,89,0.08)] relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-20">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#0B2A59] to-[#D32F2F]" />

          <ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <div className="dd-badge-light mx-auto max-w-max mb-6">
                <span className="h-2 w-2 rounded-full bg-[#0B2A59]" />
                Contact
              </div>
              <h2 className="mt-5 text-4xl font-bold md:text-5xl text-[#0B2A59] uppercase tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Besoin d&apos;un cadre clair pour votre trading ?
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-[#1a1a1a]/80 font-medium">
                Commençons par un échange direct pour faire le point sur votre situation, vos blocages et définir ensemble l'accompagnement le plus adapté pour atteindre la rentabilité.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:adjutonatyem@gmail.com" className="dd-button-primary text-[15px] px-8 py-3.5 uppercase tracking-wider font-bold rounded-[8px]">
                Prendre rendez-vous
              </a>
              <a
                href="https://fr.tradingview.com/u/DocteurDivergence/"
                target="_blank"
                rel="noreferrer"
                className="dd-button-secondary text-[15px] px-8 py-3.5 uppercase tracking-wider font-bold rounded-[8px]"
              >
                Rejoindre TradingView
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-[#0B2A59]">
              <span className="rounded-[4px] border border-[#0B2A59]/10 bg-[#F4F6F9] px-4 py-2">Tous niveaux</span>
              <span className="rounded-[4px] border border-[#0B2A59]/10 bg-[#F4F6F9] px-4 py-2">Suivi régulier</span>
              <span className="rounded-[4px] border border-[#0B2A59]/10 bg-[#F4F6F9] px-4 py-2">Formation & assistance</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
