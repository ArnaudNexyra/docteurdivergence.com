# Suivi d'avancement — Site Docteur Divergence

## Légende
- ✅ Fait & déployé
- 🔄 En cours
- ⏳ En attente (dépendance externe)
- 🔒 Verrouillé intentionnellement (ouverture future)
- ❌ Refusé / hors scope

---

## Infrastructure & Déploiement
- ✅ Next.js 16 App Router, React 19, TypeScript strict
- ✅ Tailwind v4, design tokens (navy/gold/red)
- ✅ Déployé sur Vercel — https://docteurdivergence.com
- ✅ Domaine email vérifié sur Resend (trading@docteurdivergence.com via GoDaddy)
- ✅ RESEND_API_KEY configurée en Vercel (project-level)

## Pages & Sections
- ✅ Navbar (lien ancres, CTA "Réserver un appel")
- ✅ HeroSection (CTA principal actif, "Prendre RDV" verrouillé + EmailCaptureInline)
- ✅ AboutSection / Crédibilité (id="credibilite")
- ✅ TestimonialsSection
- ✅ FaqSection (7 Q&A accordion, Ichimoku/trading)
- ✅ PricingSection (60€, CTA actif "Réserver un appel — 60 €")
- ✅ CTASection (CTA actif, "Prendre RDV" verrouillé + EmailCaptureInline)
- ✅ Footer

## Fonctionnalités
- ✅ Modal paiement Stripe (PaymentElement — Card / Apple Pay / Google Pay)
- ✅ PaymentIntent API `/api/checkout` (60€, EUR)
- ✅ Webhook Stripe `/api/webhook` (emails sur payment_intent.succeeded)
- ✅ Email double (notification Natyem + reçu client branded HTML)
- ✅ Email capture inline + notification `/api/notify`
- ✅ Formulaire de contact `/api/contact`
- ✅ Bouton WhatsApp flottant (+33629322874)
- ✅ Cookie banner RGPD (3 catégories, localStorage)
- ✅ Scroll reveal animations (Framer Motion)
- 🔒 Bouton "Prendre rendez-vous" (calendrier) — verrouillé, ouverture quand Natyem fournit lien Cal

## Configuration en attente (Natyem)
- ⏳ Créer webhook Stripe → URL : `https://docteurdivergence.com/api/webhook`
  - Events : `payment_intent.succeeded` + `payment_intent.payment_failed`
  - Copier `whsec_...` → Vercel env var `STRIPE_WEBHOOK_SECRET`
- ⏳ Confirmer que STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY sont en Vercel

## Refusé / hors scope
- ❌ PayPal
- ❌ Compteur de places disponibles
- ❌ Tests A/B complexes
- ❌ Auto-follow TradingView (impossible techniquement — CORS/sécurité navigateur)

---

*Dernière mise à jour : 2026-04-17*
