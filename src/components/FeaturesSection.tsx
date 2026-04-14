import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    title: "Diagnostic Personnalisé",
    description:
      "Un appel individuel pour évaluer votre niveau d'analyse macro/micro, repérer vos biais récurrents et structurer votre prochaine étape.",
    accent: "Appel 1h à partir de 60 €",
  },
  {
    title: "Formation Trading",
    description:
      "Un cursus intensif centré sur la structure de prix, l'Ichimoku Kinko Hyo, la gestion stricte du risque et l'exécution sans hésitation.",
    accent: "Niveaux débutant & intermédiaire",
  },
  {
    title: "Mentorat Continu",
    description:
      "Ne restez plus isolé face aux marchés. Assistance ciblée et validation de setups pour instaurer une rigueur professionnelle au quotidien.",
    accent: "Orientation discipline & régularité",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section id="services" className="py-24 bg-[#F4F6F9] text-[#1a1a1a]">
      <div className="dd-container">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="dd-badge-light mx-auto max-w-max mb-6">
              <span className="h-2 w-2 rounded-full bg-[#D32F2F]" />
              Accompagnement
            </div>
            <h2 className="mt-5 text-4xl font-bold md:text-5xl text-[#0B2A59] uppercase tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Un cadre simple à comprendre, exigeant à suivre, pensé pour durer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#1a1a1a]/80 font-medium">
              Notre promesse n'est pas de vous vendre du rêve, mais de vous forger des compétences. Des retours réguliers, des méthodes éprouvées (Ichimoku) et une lecture de marché lucide.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={120 + index * 80}>
              <article className="dd-card-light h-full p-8 rounded-[8px] flex flex-col items-start bg-white shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="mb-8 h-12 w-12 rounded-[4px] flex items-center justify-center p-3"
                  style={{
                    background:
                      index === 0
                        ? "rgba(212,175,55,0.15)"
                        : index === 1
                          ? "rgba(11,42,89,0.1)"
                          : "rgba(211,47,47,0.1)",
                    color: 
                      index === 0
                        ? "#D4AF37"
                        : index === 1
                          ? "#0B2A59"
                          : "#D32F2F",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {index === 0 ? <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /> : 
                     index === 1 ? <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></> : 
                     <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>}
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0B2A59]/60">Service 0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-bold text-[#0B2A59]" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-[#1a1a1a]/80 font-medium mb-8">{service.description}</p>
                <div className="mt-auto inline-flex rounded-[4px] border border-[#0B2A59]/10 bg-[#f4f6f9] px-4 py-2 text-[13px] font-bold text-[#0B2A59]">
                  {service.accent}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
