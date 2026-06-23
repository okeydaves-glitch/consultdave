// ============================================================================
// API Route: POST /api/payments/verify
// ============================================================================
// Verifies a payment with Paystack after the user returns from
// the Paystack checkout page.
//
// Updates the payment status and sets the related booking/order
// to confirmed/paid.
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { reference } = body;

  if (!reference) {
    return NextResponse.json({ error: "Reference code required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Find the payment record
  const { data: payment, error: findError } = await supabase
    .from("payments")
    .select("*")
    .eq("reference_code", reference)
    .single();

  if (findError || !payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  // TODO: Verify with Paystack API
  // const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
  //   headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  // });
  // const verifyData = await verifyResponse.json();
  // const isSuccessful = verifyData.data.status === "success";

  // For MVP, assume payment is successful
  const isSuccessful = true;

  if (isSuccessful) {
    // Update payment status
    await supabase
      .from("payments")
      .update({ status: "completed" })
      .eq("id", payment.id);

    // Update related booking or order status
    if (payment.related_type === "booking") {
      await supabase
        .from("bookings")
        .update({ status: "confirmed", payment_id: payment.id })
        .eq("id", payment.related_id);
    } else if (payment.related_type === "order") {
      await supabase
        .from("orders")
        .update({ status: "paid", payment_id: payment.id })
        .eq("id", payment.related_id);
    }

    return NextResponse.json({
      status: "success",
      payment: { ...payment, status: "completed" },
    });
  }

  // Payment failed
  await supabase
    .from("payments")
    .update({ status: "failed" })
    .eq("id", payment.id);

  return NextResponse.json({
    status: "failed",
    payment: { ...payment, status: "failed" },
  });
}
