// ============================================================================
// Profile Page
// ============================================================================
// Lets users view and edit their profile information.
//
// Route: /dashboard/profile
// ============================================================================

import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your account information.
      </p>

      <div className="mt-6 max-w-md space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-foreground">Name</label>
          <p className="mt-1 text-sm text-muted-foreground">{profile?.name}</p>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-foreground">Email</label>
          <p className="mt-1 text-sm text-muted-foreground">{profile?.email}</p>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-foreground">Phone</label>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile?.phone || "Not provided"}
          </p>
        </div>

        {/* Member Since */}
        <div>
          <label className="text-sm font-medium text-foreground">Member Since</label>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
