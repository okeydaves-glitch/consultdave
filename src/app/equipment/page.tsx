// ============================================================================
// Equipment Listing Page — with stagger card animation
// ============================================================================
import { createClient } from "@/lib/supabase/server";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { EquipmentFilter } from "@/components/equipment/EquipmentFilter";
import { MotionList } from "@/components/shared/MotionList";
import { PageTransition } from "@/components/shared/PageTransition";
import type { Equipment } from "@/lib/supabase/types";

interface EquipmentPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    skip?: string;
  }>;
}

export default async function EquipmentPage({ searchParams }: EquipmentPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("equipment").select("*", { count: "exact" });

  if (params.category) query = query.eq("category", params.category);
  if (params.search) query = query.ilike("name", `%${params.search}%`);

  const skip = parseInt(params.skip || "0");
  query = query.range(skip, skip + 12);

  const { data: equipment, count } = await query.order("created_at", { ascending: false });

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Safety Equipment</h1>
        <p className="mt-2 text-muted-foreground">
          Purchase industrial safety equipment for your business.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside>
            <EquipmentFilter />
          </aside>

          <div>
            {equipment && equipment.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  {count} item{equipment.length !== 1 ? "s" : ""} found
                </p>
                <MotionList>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {equipment.map((item) => (
                      <EquipmentCard key={item.id} item={item as Equipment} />
                    ))}
                  </div>
                </MotionList>
              </>
            ) : (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                No equipment found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
