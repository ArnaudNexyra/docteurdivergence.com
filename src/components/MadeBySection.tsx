import Image from "next/image";

export default function MadeBySection() {
  return (
    <section className="relative overflow-hidden bg-[#F4F6F9] py-10">
      {/* Fond dégradé violet subtil */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3b1f6b]/8 via-transparent to-[#3b1f6b]/8 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />

      <div className="dd-container relative z-10 flex flex-col items-center gap-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
          Site conçu &amp; propulsé par
        </p>

        <a
          href="https://e-gestsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-transform hover:scale-105"
        >
          <Image
            src="/images/logo-egest.png"
            alt="E-Gest Solutions"
            width={200}
            height={60}
            className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </a>

        <a
          href="https://e-gestsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#7c3aed]/70 hover:text-[#7c3aed] transition-colors tracking-wide"
        >
          e-gestsolutions.com
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
