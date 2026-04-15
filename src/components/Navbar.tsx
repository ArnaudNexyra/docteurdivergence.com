"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContactModal } from "@/context/ContactModalContext";

const navLinks = [
  { label: "Méthode", href: "#ai" },
  { label: "Crédibilité", href: "#credibilite" },
  { label: "Accompagnement", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backgroundColor: scrolled ? "transparent" : "rgba(255,255,255,0.95)",
        backdropFilter: scrolled ? "none" : "blur(18px)",
        boxShadow: scrolled ? "none" : "0 2px 20px rgba(11,42,89,0.06)",
        borderBottom: scrolled ? "none" : "1px solid rgba(11,42,89,0.05)",
        transition: "background-color 0.5s ease, backdrop-filter 0.5s ease, box-shadow 0.5s ease, border 0.5s ease",
      }}
    >
      <div
        className="dd-container flex items-center justify-between gap-6"
        style={{
          height: scrolled ? "60px" : "72px",
          transition: "height 0.5s ease",
        }}
      >
        {/* Logo — disparaît au scroll */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline"
          style={{
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateY(-6px)" : "translateY(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: scrolled ? "none" : "auto",
          }}
        >
          <Image
            src="/images/logo-full.png"
            alt="Docteur Divergence"
            width={616}
            height={208}
            priority
            className="h-40 w-auto object-contain"
          />
        </Link>

        {/* Nav — disparaît au scroll */}
        <nav
          className="hidden md:flex items-center gap-8 text-[15px] font-bold text-[#0B2A59] uppercase tracking-wide"
          style={{
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateY(-6px)" : "translateY(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: scrolled ? "none" : "auto",
          }}
        >
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[#D4AF37]">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bouton — se réduit en bulle flottante au scroll */}
        <button
          onClick={openContactModal}
          className="dd-button-primary font-bold uppercase tracking-wider"
          style={{
            padding: scrolled ? "8px 18px" : "10px 24px",
            fontSize: scrolled ? "11px" : "14px",
            borderRadius: scrolled ? "100px" : "6px",
            boxShadow: scrolled ? "0 4px 20px rgba(11,42,89,0.25)" : "none",
            transition: "all 0.5s ease",
            whiteSpace: "nowrap",
          }}
        >
          Réserver un appel
        </button>
      </div>
    </header>
  );
}
