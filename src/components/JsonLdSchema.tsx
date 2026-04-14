export default function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://docteurdivergence.com/#person",
        name: "Docteur Divergence",
        description:
          "Trader à temps plein après 6 ans d'efforts. Spécialiste Ichimoku Kinko Hyo, accompagnement trading par téléphone.",
        url: "https://docteurdivergence.com",
        sameAs: [
          "https://fr.tradingview.com/u/DocteurDivergence/",
          "https://www.youtube.com/@doc.divergence",
        ],
        image: "https://docteurdivergence.com/images/docteur-divergence-brand.png",
      },
      {
        "@type": "Service",
        "@id": "https://docteurdivergence.com/#service",
        name: "Accompagnement trading par appel téléphonique",
        description:
          "Call de coaching trading individuel avec Docteur Divergence. Méthode Ichimoku Kinko Hyo, psychologie du trader, analyse technique, suivi régulier. Adapté aux débutants comme aux traders avertis.",
        provider: { "@id": "https://docteurdivergence.com/#person" },
        url: "https://docteurdivergence.com",
        offers: {
          "@type": "Offer",
          price: "60",
          priceCurrency: "EUR",
          description: "1 heure d'accompagnement trading par téléphone",
          availability: "https://schema.org/InStock",
        },
        areaServed: {
          "@type": "Country",
          name: "France",
        },
        serviceType: "Formation et accompagnement trading",
        audience: {
          "@type": "Audience",
          audienceType: "Traders débutants et avertis cherchant la rentabilité",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://docteurdivergence.com/#website",
        url: "https://docteurdivergence.com",
        name: "Docteur Divergence",
        description:
          "Formation trading et accompagnement téléphonique — Méthode Ichimoku Kinko Hyo",
        publisher: { "@id": "https://docteurdivergence.com/#person" },
        inLanguage: "fr-FR",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
