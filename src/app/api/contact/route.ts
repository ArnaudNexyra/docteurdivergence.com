import { Resend } from "resend";
import { NextResponse } from "next/server";

// On initialise Resend avec la clé API (à configurer dans .env.local)
// Si la clé est absente, on utilise une version de test ou on log l'erreur
const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

const NATYEM_EMAIL = "trading@docteurdivergence.com";
const LOGO_URL = "https://docteurdivergence.com/images/docteur-divergence-logo.png";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, dateTime, subject, message } = body;

    // 1. Email pour NATYEM (Notification)
    const natyemEmailHtml = `
      <div style="font-family: sans-serif; color: #0B2A59; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0B2A59; padding: 30px; text-align: center;">
          <img src="${LOGO_URL}" alt="Docteur Divergence" style="width: 80px; height: 80px;" />
          <h1 style="color: #D4AF37; margin-top: 20px; font-size: 24px;">Nouvelle demande d’entretien</h1>
        </div>
        <div style="padding: 40px; background-color: white;">
          <p>Bonjour Natyem,</p>
          <p>Tu as reçu une nouvelle demande de contact depuis le site.</p>
          
          <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Client :</strong> ${firstName} ${lastName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email :</strong> ${email}</p>
            <p style="margin: 0 0 10px 0;"><strong>Téléphone :</strong> ${phone}</p>
            <p style="margin: 0 0 10px 0;"><strong>Date souhaitée :</strong> ${dateTime}</p>
            <p style="margin: 0 0 10px 0;"><strong>Sujet :</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="margin: 0;"><strong>Message :</strong></p>
            <p style="color: #444; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="font-size: 14px; color: #666;">Ce message a été envoyé depuis le formulaire de contact de docteurdivergence.com</p>
        </div>
      </div>
    `;

    // 2. Email pour le CLIENT (Confirmation)
    const clientEmailHtml = `
      <div style="font-family: sans-serif; color: #0B2A59; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: white; padding: 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
          <img src="${LOGO_URL}" alt="Docteur Divergence" style="width: 80px; height: 80px;" />
        </div>
        <div style="padding: 40px; background-color: white;">
          <h2 style="color: #0B2A59; font-size: 22px;">Bonjour ${firstName},</h2>
          <p style="line-height: 1.6; color: #444;">Nous avons bien reçu votre demande d’entretien téléphonique pour un accompagnement trading.</p>
          <p style="line-height: 1.6; color: #444;">Natyem étudie vos disponibilités et reviendra vers vous très prochainement par email ou téléphone pour confirmer le rendez-vous.</p>
          
          <div style="border-left: 4px solid #D4AF37; background-color: #fcfcfc; padding: 20px; margin: 30px 0;">
            <p style="margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; color: #999; font-weight: bold;">Récapitulatif de votre demande :</p>
            <p style="margin: 0; font-style: italic; color: #0B2A59;"><strong>Sujet :</strong> ${subject}</p>
            <p style="margin: 5px 0 0 0; font-style: italic; color: #0B2A59;"><strong>Date souhaitée :</strong> ${dateTime}</p>
          </div>

          <p style="line-height: 1.6; color: #444;">D’ici là, vous pouvez continuer à suivre les dernières analyses directement sur TradingView.</p>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; font-weight: bold;">À très bientôt,</p>
            <p style="margin: 5px 0 0 0; color: #D4AF37; font-weight: bold;">L’équipe Docteur Divergence</p>
          </div>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 11px; color: #999;">
          © 2026 Docteur Divergence — Expertise Ichimoku Kinko Hyo<br/>
          Ceci est un message automatique, merci de ne pas y répondre.
        </div>
      </div>
    `;

    // Envoi des emails (Resend supporte le batching ou envois séparés)
    // Notification à Natyem
    await resend.emails.send({
      from: "Docteur Divergence <trading@docteurdivergence.com>",
      to: NATYEM_EMAIL,
      subject: `Nouveau contact : ${firstName} ${lastName}`,
      html: natyemEmailHtml,
    });

    // Confirmation au client
    await resend.emails.send({
      from: "Docteur Divergence <trading@docteurdivergence.com>",
      to: email,
      subject: "Confirmation de votre demande d’entretien — Docteur Divergence",
      html: clientEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Erreur API Contact:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
