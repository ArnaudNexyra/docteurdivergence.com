import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://docteurdivergence.com";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { action } = await request.json().catch(() => ({ action: "contact" }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Appel de diagnostic — Docteur Divergence",
              description: "1h d'analyse Ichimoku avec Natyem — plan de travail personnalisé",
            },
            unit_amount: 6000,
          },
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&action=${action ?? "contact"}`,
      cancel_url: `${BASE_URL}/#pricing`,
      locale: "fr",
      metadata: {
        product: "Appel de diagnostic — Docteur Divergence",
        action: action ?? "contact",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Stripe session error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
