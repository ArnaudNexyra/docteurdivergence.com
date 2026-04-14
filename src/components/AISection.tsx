"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 6.5C9 6.327 8.86 6.188 8.688 6.188C7.652 6.188 6.813 5.348 6.813 4.313C6.813 4.14 6.673 4 6.5 4C6.327 4 6.188 4.14 6.188 4.313C6.188 5.348 5.348 6.188 4.313 6.188C4.14 6.188 4 6.327 4 6.5C4 6.673 4.14 6.813 4.313 6.813C5.348 6.813 6.188 7.652 6.188 8.688C6.188 8.86 6.327 9 6.5 9C6.673 9 6.813 8.86 6.813 8.688C6.813 7.652 7.652 6.813 8.688 6.813C8.86 6.813 9 6.673 9 6.5Z"
      fill="url(#sg1)"
    />
    <defs>
      <linearGradient id="sg1" x1="4" y1="4" x2="9" y2="9">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#0B2A59" />
      </linearGradient>
    </defs>
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#0B2A59", flexShrink: 0 }}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#D4AF37" }}
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

import { features, mockPosts } from "@/lib/data";



export default function AISection() {
  const [currentPost, setCurrentPost] = useState(0);
  const nextPost = () => setCurrentPost((prev) => (prev + 1) % mockPosts.length);
  const prevPost = () => setCurrentPost((prev) => (prev - 1 + mockPosts.length) % mockPosts.length);

  useEffect(() => {
    const timer = setInterval(nextPost, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="ai"
      className="relative overflow-hidden py-24 bg-white"
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(11,42,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(11,42,89,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="reflect-container relative z-10">
        <ScrollReveal>
          <div className="section-header mb-16">
            <div className="dd-badge-light mb-6">
              <SparkleIcon />
              Structure & Méthode
            </div>

            <h2 className="section-title">De l'intuition floue à une exécution millimétrée.</h2>

            <p className="section-subtitle">
              Arrêtez de trader au doigt mouillé. Adoptez une lecture de marché claire, sans bruit parasite, en utilisant les règles éprouvées de l'Ichimoku Kinko Hyo et une gestion saine du risque.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div
              style={{
                background: "#f4f6f9",
                border: "1px solid rgba(11,42,89,0.1)",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 10px 40px rgba(11,42,89,0.05)",
                minHeight: "440px",
                display: "flex",
                flexDirection: "column",
                userSelect: "none"
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(11,42,89,0.08)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#1a1a1a",
                  fontSize: 14,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  fontWeight: 500
                }}
              >
                <div className="flex items-center gap-2">
                  <SearchIcon />
                  Analyses TradingView
                </div>
                <div className="flex gap-1">
                  {mockPosts.map((_, i) => (
                    <div 
                      key={i}
                      onClick={() => setCurrentPost(i)}
                      className="cursor-pointer transition-all duration-300"
                      style={{ 
                        width: currentPost === i ? 16 : 6, 
                        height: 6, 
                        borderRadius: 3, 
                        backgroundColor: currentPost === i ? "#0B2A59" : "rgba(11,42,89,0.2)" 
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden" style={{ borderRadius: 8 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPost}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) prevPost();
                      else if (info.offset.x < -80) nextPost();
                    }}
                    style={{
                      background: "#ffffff",
                      borderRadius: 8,
                      overflow: "hidden",
                      border: "1px solid rgba(11,42,89,0.05)",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "grab",
                      touchAction: "pan-y"
                    }}
                    whileTap={{ cursor: "grabbing" }}
                  >
                    <div style={{ height: "180px", width: "100%", position: "relative", overflow: "hidden", backgroundColor: "#0B2A59" }}>
                      <Image 
                        src={mockPosts[currentPost].image} 
                        alt="Chart preview" 
                        fill
                        draggable={false}
                        className="object-cover opacity-80"
                      />
                    </div>
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div className="flex items-center justify-between mb-2">
                        <div style={{ color: "#0B2A59", fontWeight: 700, fontSize: "16px", fontFamily: "var(--font-heading)" }}>
                          {mockPosts[currentPost].title}
                        </div>
                        <span className="text-[10px] bg-[#f4f6f9] px-2 py-0.5 rounded-full text-[#0B2A59]/60 font-bold">
                          {currentPost + 1} / {mockPosts.length}
                        </span>
                      </div>
                      <div style={{ fontSize: "13px", color: "#1a1a1a", opacity: 0.8, lineHeight: 1.6 }}>
                        {mockPosts[currentPost].text}
                      </div>
                      <a 
                        href="https://fr.tradingview.com/u/DocteurDivergence/#published-charts" 
                        target="_blank" 
                        rel="noreferrer" 
                        draggable={false}
                        style={{ marginTop: "auto", paddingTop: "12px", display: "inline-block", fontSize: "12px", fontWeight: "bold", color: "#D32F2F", textTransform: "uppercase" }}
                      >
                        Voir l'analyse →
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#0B2A59",
                  lineHeight: "40px",
                  marginBottom: 32,
                  textTransform: "uppercase"
                }}
              >
                Ce que la formation permet de faire
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {features.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      fontSize: 18,
                      lineHeight: "28px",
                      color: "rgba(26,26,26,0.85)",
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "rgba(212,175,55,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
