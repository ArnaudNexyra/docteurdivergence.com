import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 6000, // 60€ en centimes
      currency: "eur",
      payment_method_types: ["card"],
      metadata: { product: "Appel de diagnostic — Docteur Divergence" },
      description: "Appel de diagnostic trading — Docteur Divergence",
      statement_descriptor_suffix: "DIAGTRADING",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Stripe PaymentIntent error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
