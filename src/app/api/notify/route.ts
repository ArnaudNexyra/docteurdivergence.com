import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");
const NATYEM_EMAIL = "trading@docteurdivergence.com";
const LOGO_URL = "https://docteurdivergence.com/images/docteur-divergence-logo.png";

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
      subject: `Nouveau lead en attente d'ouverture : ${email}`,
      html: `
        <div style="font-family: sans-serif; color: #0B2A59; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0B2A59; padding: 30px; text-align: center;">
            <img src="${LOGO_URL}" alt="Docteur Divergence" style="width: 80px; height: 80px;" />
            <h1 style="color: #D4AF37; margin-top: 20px; font-size: 22px;">Nouveau lead intéressé</h1>
          </div>
          <div style="padding: 40px; background-color: white;">
            <p>Bonjour Natyem,</p>
            <p>Une personne souhaite être notifiée dès l'ouverture des réservations :</p>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #D4AF37;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #0B2A59;">${email}</p>
            </div>
            <p style="font-size: 14px; color: #666;">Pensez à le contacter en priorité à l'ouverture des réservations.</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 11px; color: #999;">
            © ${new Date().getFullYear()} Docteur Divergence
          </div>
        </div>
      `,
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
      html: `
        <div style="font-family: sans-serif; color: #0B2A59; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: white; padding: 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
            <img src="${LOGO_URL}" alt="Docteur Divergence" style="width: 80px; height: 80px;" />
          </div>
          <div style="padding: 40px; background-color: white;">
            <h2 style="color: #0B2A59; font-size: 22px;">Votre demande est enregistrée.</h2>
            <p style="line-height: 1.7; color: #444;">
              Merci pour votre intérêt ! Les réservations ne sont pas encore ouvertes, mais vous serez parmi les <strong>premiers à être contactés</strong> dès leur ouverture.
            </p>
            <div style="border-left: 4px solid #D4AF37; background-color: #fcfcfc; padding: 20px; margin: 30px 0;">
              <p style="margin: 0; color: #0B2A59; font-style: italic; line-height: 1.6;">
                "J'ai échoué plus de 40 fois, je sais exactement quelle mécanique psychologique et émotionnelle adopter pour réussir."
              </p>
              <p style="margin: 10px 0 0 0; font-weight: bold; color: #D4AF37; font-size: 13px;">— Natyem, Docteur Divergence</p>
            </div>
            <p style="line-height: 1.6; color: #444;">En attendant, suivez les dernières analyses sur TradingView et YouTube.</p>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin: 0; font-weight: bold;">À très bientôt,</p>
              <p style="margin: 5px 0 0 0; color: #D4AF37; font-weight: bold;">L'équipe Docteur Divergence</p>
            </div>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 11px; color: #999;">
            © ${new Date().getFullYear()} Docteur Divergence — Expertise Ichimoku Kinko Hyo<br/>
            Vous recevez cet email car vous avez demandé à être notifié depuis docteurdivergence.com
          </div>
        </div>
      `,
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
