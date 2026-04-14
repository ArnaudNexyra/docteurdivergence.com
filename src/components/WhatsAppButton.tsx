"use client";

// TODO: remplacer par le vrai numéro WhatsApp de Natyem (format international sans + ni espaces)
// Ex: 33612345678 pour +33 6 12 34 56 78
const WHATSAPP_NUMBER = "33629322874";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Natyem, je souhaite en savoir plus sur l'accompagnement trading avec Docteur Divergence."
);

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* WhatsApp SVG officiel */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.363.632 4.573 1.729 6.483L2.667 29.333l7.07-1.698A13.266 13.266 0 0 0 16.003 29.333c7.364 0 13.33-5.969 13.33-13.333S23.367 2.667 16.003 2.667zm0 24.267a11.006 11.006 0 0 1-5.618-1.537l-.403-.24-4.196 1.008 1.05-4.075-.264-.42A10.957 10.957 0 0 1 5.001 16c0-6.066 4.935-11 11.002-11 6.066 0 11 4.934 11 11s-4.934 11-11 11zm6.03-8.232c-.33-.165-1.952-.964-2.255-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.293-.193.22-.386.247-.716.083-.33-.165-1.392-.513-2.651-1.635-.98-.873-1.642-1.95-1.834-2.28-.193-.33-.021-.508.145-.672.15-.148.33-.386.495-.579.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.579-.083-.165-.743-1.79-1.018-2.45-.268-.643-.54-.556-.743-.566l-.633-.011c-.22 0-.578.083-.881.413-.303.33-1.155 1.128-1.155 2.752s1.183 3.193 1.348 3.413c.165.22 2.328 3.556 5.641 4.988.789.34 1.404.543 1.883.695.79.25 1.51.215 2.079.13.634-.094 1.952-.798 2.228-1.57.275-.77.275-1.43.193-1.57-.083-.138-.303-.22-.633-.385z"/>
      </svg>

      {/* Pulse animé */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
    </a>
  );
}
