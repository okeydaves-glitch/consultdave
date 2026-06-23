// ============================================================================
// API Route: POST /api/auth/logout
// ============================================================================
// Signs the user out by clearing their Supabase session.
// ============================================================================

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Logged out successfully" });
  const supabase = createClient(request, response);

  await supabase.auth.signOut();

  return response;
}
