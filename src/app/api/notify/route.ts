import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");
const NATYEM_EMAIL = "trading@docteurdivergence.com";
const YEAR = new Date().getFullYear();

const emailWrapper = (content: string) => `
<div style="font-family: sans-serif; background: #F4F6F9; padding: 40px 0;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(11,42,89,0.08);">
    <div style="background: #0B2A59; padding: 36px; text-align: center;">
      <p style="margin: 0; color: #D4AF37; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;">Docteur Divergence</p>
      <h1 style="margin: 12px 0 0; color: white; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">Formation & Accompagnement Trading</h1>
    </div>
    <div style="height: 4px; background: linear-gradient(to right, #D4AF37, #0B2A59, #D32F2F);"></div>
    <div style="padding: 40px 36px;">
      ${content}
    </div>
    <div style="background: #F4F6F9; border-top: 1px solid #eee; padding: 20px 36px; text-align: center;">
      <p style="margin: 0; color: #999; font-size: 11px; line-height: 1.6;">
        © ${YEAR} Docteur Divergence — Expertise Ichimoku Kinko Hyo<br/>
        <a href="https://docteurdivergence.com" style="color: #D4AF37; text-decoration: none;">docteurdivergence.com</a>
      </p>
    </div>
  </div>
</div>`;

const natyemHtml = (email: string) => emailWrapper(`
  <h2 style="margin: 0 0 16px; color: #0B2A59; font-size: 20px;">Nouveau lead 🔔</h2>
  <p style="margin: 0 0 20px; color: #444; font-size: 15px; line-height: 1.7;">
    Une personne souhaite être notifiée dès l'ouverture des réservations :
  </p>
  <div style="background: #F4F6F9; border-left: 4px solid #D4AF37; border-radius: 0 8px 8px 0; padding: 20px 24px; margin: 0 0 24px;">
    <p style="margin: 0; color: #0B2A59; font-size: 18px; font-weight: 700;">${email}</p>
  </div>
  <p style="margin: 0; color: #888; font-size: 13px;">
    Contacte-le en priorité dès l'ouverture des réservations.
  </p>
`);

const leadHtml = () => emailWrapper(`
  <h2 style="margin: 0 0 16px; color: #0B2A59; font-size: 20px;">Votre inscription est confirmée ✓</h2>
  <p style="margin: 0 0 20px; color: #444; font-size: 15px; line-height: 1.7;">
    Vous serez parmi les <strong>premiers informés</strong> dès l'ouverture des réservations pour l'appel de diagnostic trading avec Natyem.
  </p>
  <div style="border-left: 4px solid #D4AF37; background: #FAFAFA; padding: 20px 24px; margin: 0 0 28px; border-radius: 0 8px 8px 0;">
    <p style="margin: 0; color: #0B2A59; font-style: italic; font-size: 14px; line-height: 1.7;">
      "J'ai échoué plus de 40 fois. Je sais exactement quelle mécanique psychologique et émotionnelle adopter pour réussir."
    </p>
    <p style="margin: 12px 0 0; color: #D4AF37; font-size: 12px; font-weight: 700;">— Natyem, Docteur Divergence</p>
  </div>
  <p style="margin: 0 0 28px; color: #444; font-size: 14px; line-height: 1.7;">
    En attendant, retrouvez les dernières analyses de marché sur TradingView et YouTube.
  </p>
  <div style="text-align: center;">
    <a href="https://fr.tradingview.com/u/DocteurDivergence/"
       style="display: inline-block; background: #0B2A59; color: #D4AF37; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 32px; border-radius: 8px; text-decoration: none;">
      Voir les analyses →
    </a>
  </div>
`);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // 1. Notification à Natyem
    const { error: err1 } = await resend.emails.send({
      from: "Docteur Divergence <onboarding@resend.dev>",
      to: NATYEM_EMAIL,
      subject: `🔔 Nouveau lead : ${email}`,
      html: natyemHtml(email),
    });

    if (err1) {
      console.error("Resend error (Natyem):", err1);
      return NextResponse.json({ error: err1.message }, { status: 500 });
    }

    // 2. Confirmation au lead
    const { error: err2 } = await resend.emails.send({
      from: "Docteur Divergence <onboarding@resend.dev>",
      to: email,
      subject: "Vous serez parmi les premiers prévenus — Docteur Divergence",
      html: leadHtml(),
    });

    if (err2) {
      console.error("Resend error (lead):", err2);
      return NextResponse.json({ error: err2.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Erreur API Notify:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
