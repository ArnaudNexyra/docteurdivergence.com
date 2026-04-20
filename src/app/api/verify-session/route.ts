import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const NATYEM_EMAIL = "trading@docteurdivergence.com";
const YEAR = new Date().getFullYear();

const emailWrapper = (content: string) => `
<div style="font-family: sans-serif; background: #F4F6F9; padding: 40px 0;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(11,42,89,0.08);">
    <div style="background: #0B2A59; padding: 36px; text-align: center;">
      <p style="margin: 0; color: #D4AF37; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;">Docteur Divergence</p>
      <h1 style="margin: 12px 0 0; color: white; font-size: 22px; font-weight: 800;">Formation & Accompagnement Trading</h1>
    </div>
    <div style="height: 4px; background: linear-gradient(to right, #D4AF37, #0B2A59, #D32F2F);"></div>
    <div style="padding: 40px 36px;">${content}</div>
    <div style="background: #F4F6F9; border-top: 1px solid #eee; padding: 20px 36px; text-align: center;">
      <p style="margin: 0; color: #999; font-size: 11px; line-height: 1.6;">
        © ${YEAR} Docteur Divergence — Expertise Ichimoku Kinko Hyo<br/>
        <a href="https://docteurdivergence.com" style="color: #D4AF37; text-decoration: none;">docteurdivergence.com</a>
      </p>
    </div>
  </div>
</div>`;

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const { sessionId } = await request.json();
  if (!sessionId) return NextResponse.json({ ok: false, error: "Missing sessionId" }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ ok: false, error: "Not paid" }, { status: 402 });
    }

    const customerEmail = session.customer_details?.email ?? "";
    const customerName = session.customer_details?.name ?? "";
    const amount = ((session.amount_total ?? 6000) / 100).toFixed(2);
    const ref = session.id;

    // Notification Natyem
    await resend.emails.send({
      from: "Docteur Divergence <trading@docteurdivergence.com>",
      to: NATYEM_EMAIL,
      subject: `💳 Paiement reçu — ${amount} €${customerName ? ` — ${customerName}` : ""}`,
      html: emailWrapper(`
        <h2 style="margin: 0 0 16px; color: #0B2A59; font-size: 20px;">Nouveau paiement reçu 💳</h2>
        <p style="margin: 0 0 20px; color: #444; font-size: 15px; line-height: 1.7;">
          Un client vient de payer l'appel de diagnostic.
        </p>
        <div style="background: #F4F6F9; border-radius: 10px; padding: 24px; margin: 0 0 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #888; font-size: 13px; width: 130px;">Montant</td><td style="padding: 6px 0; color: #0B2A59; font-weight: 700; font-size: 16px;">${amount} €</td></tr>
            ${customerName ? `<tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Client</td><td style="padding: 6px 0; color: #0B2A59; font-size: 14px;">${customerName}</td></tr>` : ""}
            ${customerEmail ? `<tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 6px 0; color: #0B2A59; font-size: 14px;"><a href="mailto:${customerEmail}" style="color: #0B2A59;">${customerEmail}</a></td></tr>` : ""}
            <tr><td style="padding: 6px 0; color: #888; font-size: 13px;">Référence</td><td style="padding: 6px 0; color: #666; font-size: 12px; font-family: monospace;">${ref}</td></tr>
          </table>
        </div>
      `),
    });

    // Reçu client
    if (customerEmail) {
      await resend.emails.send({
        from: "Docteur Divergence <trading@docteurdivergence.com>",
        to: customerEmail,
        subject: "Votre paiement est confirmé — Docteur Divergence",
        html: emailWrapper(`
          <h2 style="margin: 0 0 16px; color: #0B2A59; font-size: 20px;">
            ${customerName ? `Bonjour ${customerName.split(" ")[0]},` : "Bonjour,"} votre paiement est confirmé ✓
          </h2>
          <p style="margin: 0 0 20px; color: #444; font-size: 15px; line-height: 1.7;">
            Nous avons bien reçu votre règlement de <strong>${amount} €</strong> pour l'appel de diagnostic trading avec Natyem.
          </p>
          <div style="background: #F4F6F9; border-left: 4px solid #D4AF37; border-radius: 0 8px 8px 0; padding: 20px 24px; margin: 0 0 28px;">
            <p style="margin: 0 0 4px; color: #888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Récapitulatif</p>
            <p style="margin: 8px 0 0; color: #0B2A59; font-size: 14px;"><strong>Prestation :</strong> Appel de diagnostic — Méthode Ichimoku</p>
            <p style="margin: 4px 0 0; color: #0B2A59; font-size: 14px;"><strong>Montant :</strong> ${amount} €</p>
            <p style="margin: 4px 0 0; color: #666; font-size: 12px; font-family: monospace;">Réf : ${ref}</p>
          </div>
          <p style="margin: 0 0 28px; color: #444; font-size: 14px; line-height: 1.7;">
            Natyem prendra contact avec vous très prochainement pour confirmer le créneau de votre appel.
          </p>
          <div style="text-align: center;">
            <a href="https://fr.tradingview.com/u/DocteurDivergence/"
               style="display: inline-block; background: #0B2A59; color: #D4AF37; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 32px; border-radius: 8px; text-decoration: none;">
              Voir les analyses en attendant →
            </a>
          </div>
        `),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erreur";
    console.error("verify-session error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
