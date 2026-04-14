"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "@/components/ContactModal";
import PaymentModal from "@/components/PaymentModal";

type PostPaymentAction = "contact" | "calendar";

const CALENDAR_URL = "https://calendar.app.google/gb3hrkXL4iTwSTET8";

interface ContactModalContextType {
  openContactModal: () => void;
  openCalendarModal: () => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [postPaymentAction, setPostPaymentAction] = useState<PostPaymentAction>("contact");

  const openContactModal = () => {
    setPostPaymentAction("contact");
    setIsPaymentOpen(true);
  };

  const openCalendarModal = () => {
    setPostPaymentAction("calendar");
    setIsPaymentOpen(true);
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
    setIsPaymentOpen(false);
  };

  const handlePaymentSuccess = () => {
    if (postPaymentAction === "calendar") {
      window.open(CALENDAR_URL, "_blank", "noreferrer");
    } else {
      setIsContactOpen(true);
    }
  };

  return (
    <ContactModalContext.Provider value={{ openContactModal, openCalendarModal, closeContactModal }}>
      {children}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={60}
        label="Appel de diagnostic"
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}
