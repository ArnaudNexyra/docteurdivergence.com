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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, dateTime, subject, message } = body;

    // 1. Notification à Natyem
    const { error: err1 } = await resend.emails.send({
      from: "Docteur Divergence <trading@docteurdivergence.com>",
      to: NATYEM_EMAIL,
      subject: `📞 Nouveau contact : ${firstName} ${lastName}`,
      html: emailWrapper(`
        <h2 style="margin: 0 0 16px; color: #0B2A59; font-size: 20px;">Nouvelle demande d'entretien 📞</h2>
        <p style="margin: 0 0 20px; color: #444; font-size: 15px; line-height: 1.7;">
          Tu as reçu une nouvelle demande de contact depuis le site.
        </p>
        <div style="background: #F4F6F9; border-radius: 10px; padding: 24px; margin: 0 0 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #888; font-size: 13px; width: 130px;">Client</td><td style="padding: 6px 0; color: #0B2A59; font-weight: 700; font-size: 14px;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 6px 0; color: #0B2A59; font-size: 14px;"><a href="mailto:${email}" style="color: #0B2A59;">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Téléphone</td><td style="padding: 6px 0; color: #0B2A59; font-size: 14px;">${phone}</td></tr>
            <tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Date souhaitée</td><td style="padding: 6px 0; color: #0B2A59; font-size: 14px;">${dateTime}</td></tr>
            <tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Sujet</td><td style="padding: 6px 0; color: #0B2A59; font-size: 14px;">${subject}</td></tr>
          </table>
        </div>
        <div style="border-left: 4px solid #D4AF37; background: #FAFAFA; padding: 20px 24px; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 8px; color: #888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
          <p style="margin: 0; color: #444; font-size: 14px; line-height: 1.7;">${message}</p>
        </div>
      `),
    });

    if (err1) {
      console.error("Resend error (Natyem):", err1);
      return NextResponse.json({ error: err1.message }, { status: 500 });
    }

    // 2. Confirmation au client
    const { error: err2 } = await resend.emails.send({
      from: "Docteur Divergence <trading@docteurdivergence.com>",
      to: email,
      subject: "Votre demande d'entretien est bien reçue — Docteur Divergence",
      html: emailWrapper(`
        <h2 style="margin: 0 0 16px; color: #0B2A59; font-size: 20px;">Bonjour ${firstName} ✓</h2>
        <p style="margin: 0 0 20px; color: #444; font-size: 15px; line-height: 1.7;">
          Votre demande d'entretien téléphonique a bien été reçue. Natyem reviendra vers vous très prochainement pour confirmer le créneau.
        </p>
        <div style="background: #F4F6F9; border-radius: 10px; padding: 24px; margin: 0 0 24px;">
          <p style="margin: 0 0 6px; color: #888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Récapitulatif</p>
          <p style="margin: 8px 0 0; color: #0B2A59; font-size: 14px;"><strong>Sujet :</strong> ${subject}</p>
          <p style="margin: 6px 0 0; color: #0B2A59; font-size: 14px;"><strong>Date souhaitée :</strong> ${dateTime}</p>
        </div>
        <div style="border-left: 4px solid #D4AF37; background: #FAFAFA; padding: 20px 24px; margin: 0 0 28px; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; color: #0B2A59; font-style: italic; font-size: 14px; line-height: 1.7;">
            "J'ai échoué plus de 40 fois. Je sais exactement quelle mécanique psychologique et émotionnelle adopter pour réussir."
          </p>
          <p style="margin: 12px 0 0; color: #D4AF37; font-size: 12px; font-weight: 700;">— Natyem, Docteur Divergence</p>
        </div>
        <div style="text-align: center;">
          <a href="https://fr.tradingview.com/u/DocteurDivergence/"
             style="display: inline-block; background: #0B2A59; color: #D4AF37; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 32px; border-radius: 8px; text-decoration: none;">
            Voir les analyses →
          </a>
        </div>
      `),
    });

    if (err2) {
      console.error("Resend error (client):", err2);
      return NextResponse.json({ error: err2.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Erreur API Contact:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
