// ============================================================================
// API Route: /api/equipment
// ============================================================================
// Handles listing and creating equipment.
//
// GET  /api/equipment - List equipment (public)
//   Query: category, minPrice, maxPrice, search, skip, take
//
// POST /api/equipment - Add equipment (admin only)
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createClient(request, response);

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "12");

  let query = supabase
    .from("equipment")
    .select("*", { count: "exact" })
    .range(skip, skip + take - 1);

  if (category) query = query.eq("category", category);
  if (search) query = query.ilike("name", `%${search}%`);

  const { data: equipment, count, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    equipment,
    total: count || 0,
    hasMore: (count || 0) > skip + take,
  });
}

export async function POST(request: NextRequest) {
  const supabase = createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("equipment")
    .insert({
      name: body.name,
      category: body.category,
      description: body.description,
      price: body.price,
      quantity_available: body.quantityAvailable,
      manufacturer: body.manufacturer,
      certifications: body.certifications || null,
      images: body.images || [],
      usage_guidelines: body.usageGuidelines,
      warranty_months: body.warrantyMonths,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
