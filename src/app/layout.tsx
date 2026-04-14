import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import JsonLdSchema from "@/components/JsonLdSchema";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "700", "800"],
  display: "swap",
});

const interV = localFont({
  src: [
    { path: "../../public/fonts/InterV/regular.woff2", weight: "400" },
    { path: "../../public/fonts/InterV/medium.woff2", weight: "500" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://docteurdivergence.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Docteur Divergence — Accompagnement trading Ichimoku | 60€/h",
  description:
    "Trader à temps plein après 6 ans d'efforts, Docteur Divergence accompagne débutants et traders avertis par téléphone. Méthode Ichimoku, psychologie du trader, suivi régulier. Premier appel à 60€.",
  keywords: [
    "formation trading",
    "accompagnement trading",
    "ichimoku kinko hyo",
    "trading débutant",
    "call trading",
    "psychologie trader",
    "Docteur Divergence",
  ],
  authors: [{ name: "Docteur Divergence" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Docteur Divergence — Accompagnement trading Ichimoku",
    description:
      "6 ans d'échecs, maintenant rentable à temps plein. Je vous transmets chaque mécanique psychologique et technique pour atteindre la rentabilité. Call trading 60€/h.",
    url: SITE_URL,
    siteName: "Docteur Divergence",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Docteur Divergence — Formation & Accompagnement Trading Ichimoku",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Docteur Divergence — Accompagnement trading",
    description:
      "6 ans d'échecs, maintenant rentable à temps plein. Call trading Ichimoku 60€/h.",
    images: ["/seo/og-image.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import { ContactModalProvider } from "@/context/ContactModalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${interV.variable}`}>
      <head>
        <JsonLdSchema />
      </head>
      <body>
        <ContactModalProvider>
          {children}
        </ContactModalProvider>
      </body>
    </html>
  );
}
