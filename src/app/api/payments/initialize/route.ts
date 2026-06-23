// ============================================================================
// API Route: POST /api/payments/initialize
// ============================================================================
// Initializes a payment with Paystack.
// Creates a payment record and returns the Paystack authorization URL.
//
// In production, this calls Paystack API:
//   POST https://api.paystack.co/transaction/initialize
//   Headers: { Authorization: "Bearer PAYSTACK_SECRET_KEY" }
//   Body: { email, amount, reference, callback_url }
//
// For MVP, we return a mock URL.
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json();

  // Create a payment record in the database
  const adminSupabase = createAdminClient();
  const referenceCode = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const { data: payment, error } = await adminSupabase
    .from("payments")
    .insert({
      user_id: user.id,
      amount: body.amount,
      currency: "NGN",
      payment_method: body.paymentMethod || "bank_transfer",
      provider: "paystack",
      reference_code: referenceCode,
      status: "pending",
      related_type: body.relatedType,
      related_id: body.relatedId,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // TODO: Call Paystack API here
  // const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email: user.email,
  //     amount: body.amount * 100, // Paystack uses kobo (smallest currency unit)
  //     reference: referenceCode,
  //     callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payments/verify?reference=${referenceCode}`,
  //   }),
  // });
  // const paystackData = await paystackResponse.json();
  // return NextResponse.json({ authorization_url: paystackData.data.authorization_url, accessCode: paystackData.data.access_code });

  // MVP mock response
  return NextResponse.json({
    authorization_url: `https://checkout.paystack.com/${referenceCode}`,
    accessCode: referenceCode,
  });
}
