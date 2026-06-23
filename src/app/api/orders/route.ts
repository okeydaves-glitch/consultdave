// ============================================================================
// API Route: /api/orders
// ============================================================================
// Handles creating and listing equipment orders.
//
// POST /api/orders - Create a new order (requires auth)
//   Body: { items: [{ equipmentId, quantity }], shippingAddress, deliveryOption }
//
// GET /api/orders - List user's orders (requires auth)
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.items?.length || !body.shippingAddress || !body.deliveryOption) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const adminSupabase = createAdminClient();

  // Calculate total by fetching each item's price
  let totalAmount = 0;
  const orderItemsData = [];

  for (const item of body.items) {
    const { data: equipment } = await adminSupabase
      .from("equipment")
      .select("price, quantity_available")
      .eq("id", item.equipmentId)
      .single();

    if (!equipment) {
      return NextResponse.json(
        { error: `Equipment ${item.equipmentId} not found` },
        { status: 404 }
      );
    }

    if (equipment.quantity_available < item.quantity) {
      return NextResponse.json(
        { error: `Insufficient stock for item ${item.equipmentId}` },
        { status: 400 }
      );
    }

    const subtotal = Number(equipment.price) * item.quantity;
    totalAmount += subtotal;

    orderItemsData.push({
      equipment_id: item.equipmentId,
      quantity: item.quantity,
      unit_price: Number(equipment.price),
      subtotal,
    });
  }

  // Create the order with items in a transaction
  const orderNumber = generateOrderNumber();

  const { data: order, error: orderError } = await adminSupabase
    .from("orders")
    .insert({
      user_id: user.id,
      order_number: orderNumber,
      status: "pending",
      total_amount: totalAmount,
      shipping_address: body.shippingAddress,
      delivery_option: body.deliveryOption,
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  // Create order items
  const { error: itemsError } = await adminSupabase
    .from("order_items")
    .insert(
      orderItemsData.map((item) => ({ ...item, order_id: order.id }))
    );

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  // In production, initialize Paystack payment here
  const paymentUrl = `/checkout?orderId=${order.id}`;

  return NextResponse.json({ order, paymentUrl });
}

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let query = supabase
    .from("orders")
    .select("*, order_items(quantity, unit_price, subtotal, equipment(name))", {
      count: "exact",
    })
    .eq("user_id", user.id);

  if (status) query = query.eq("status", status);

  const { data: orders, count, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders, total: count || 0 });
}
