"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AboutSection from "@/components/AboutSection";
import AISection from "@/components/AISection";
import CTASection from "@/components/CTASection";
import FaqSection from "@/components/FaqSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MadeBySection from "@/components/MadeBySection";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useContactModal } from "@/context/ContactModalContext";

function HomeInner() {
  const params = useSearchParams();
  const { openContactModal } = useContactModal();

  useEffect(() => {
    if (params.get("showContact") === "1") {
      setTimeout(openContactModal, 500);
    }
  }, []);

  return (
    <div className="bg-white text-[#1a1a1a] min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AISection />
        <PricingSection />
        <TestimonialsSection />
        <AboutSection />
        <FaqSection />
        <CTASection />
      </main>
      <MadeBySection />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}
