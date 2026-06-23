// ============================================================================
// API Route: POST /api/payments/webhook
// ============================================================================
// Handles incoming webhook events from Paystack.
// Paystack sends events here when payment status changes.
//
// IMPORTANT: This route MUST:
// 1. Verify the Paystack signature to ensure the request is genuine
// 2. Respond with 200 OK quickly (Paystack will retry if not)
// 3. Not do heavy processing synchronously (use a queue if needed)
//
// Paystack signature verification:
//   hash = HMAC-SHA512(rawBody, PAYSTACK_SECRET_KEY)
//   if hash !== request.headers['x-paystack-signature'] => reject
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    // Read the raw request body (needed for signature verification)
    const rawBody = await request.text();

    // TODO: Verify Paystack signature
    // const signature = request.headers.get("x-paystack-signature");
    // const hash = createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    //   .update(rawBody)
    //   .digest("hex");
    // if (hash !== signature) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    const event = JSON.parse(rawBody);

    // Only process successful charge events
    if (event.event !== "charge.success") {
      return NextResponse.json({ status: "ignored" });
    }

    const reference = event.data.reference;
    const supabase = createAdminClient();

    // Find the payment
    const { data: payment } = await supabase
      .from("payments")
      .select("*")
      .eq("reference_code", reference)
      .single();

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Update payment status
    await supabase
      .from("payments")
      .update({ status: "completed" })
      .eq("id", payment.id);

    // Update related booking/order
    if (payment.related_type === "booking") {
      await supabase
        .from("bookings")
        .update({ status: "confirmed", payment_id: payment.id })
        .eq("id", payment.related_id);

      // TODO: Send booking confirmation email
    } else if (payment.related_type === "order") {
      await supabase
        .from("orders")
        .update({ status: "paid", payment_id: payment.id })
        .eq("id", payment.related_id);

      // TODO: Send order confirmation email
    }

    // Always return 200 to acknowledge the webhook
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
