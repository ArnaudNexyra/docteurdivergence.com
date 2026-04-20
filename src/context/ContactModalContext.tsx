"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "@/components/ContactModal";
import PaymentModal from "@/components/PaymentModal";

type PostPaymentAction = "contact" | "calendar";

interface ContactModalContextType {
  openContactModal: () => void;
  openCalendarModal: () => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [action, setAction] = useState<PostPaymentAction>("contact");

  const openContactModal = () => { setAction("contact"); setIsPaymentOpen(true); };
  const openCalendarModal = () => { setAction("calendar"); setIsPaymentOpen(true); };
  const closeContactModal = () => { setIsContactOpen(false); setIsPaymentOpen(false); };

  return (
    <ContactModalContext.Provider value={{ openContactModal, openCalendarModal, closeContactModal }}>
      {children}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        action={action}
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
