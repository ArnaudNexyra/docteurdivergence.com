"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Méthode", href: "#ai" },
  { label: "Crédibilité", href: "#credibilite" },
  { label: "Accompagnement", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-transparent"
      style={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(18px)",
        boxShadow: scrolled ? "0 4px 20px rgba(11, 42, 89, 0.05)" : "none",
        borderBottomColor: scrolled ? "rgba(11, 42, 89, 0.05)" : "transparent"
      }}
    >
      <div className="dd-container flex h-48 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/images/logo-full.png"
            alt="Docteur Divergence"
            width={616}
            height={208}
            priority
            className="h-40 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-bold text-[#0B2A59] md:flex uppercase tracking-wide">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[#D4AF37]">
              {link.label}
            </Link>
          ))}
        </nav>

        <a href="mailto:adjutonatyem@gmail.com" className="dd-button-primary px-6 py-2.5 text-[14px] uppercase tracking-wider font-bold rounded-[6px]">
          Réserver un appel
        </a>
      </div>
    </header>
  );
}
