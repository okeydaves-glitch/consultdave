// ============================================================================
// Car Listing Page — with stagger card animation
// ============================================================================
import { createClient } from "@/lib/supabase/server";
import { CarCard } from "@/components/car/CarCard";
import { CarFilter } from "@/components/car/CarFilter";
import { MotionList } from "@/components/shared/MotionList";
import { PageTransition } from "@/components/shared/PageTransition";
import type { Car } from "@/lib/supabase/types";

interface CarsPageProps {
  searchParams: Promise<{
    location?: string;
    category?: string;
    transmission?: string;
    skip?: string;
  }>;
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("cars")
    .select("*", { count: "exact" })
    .eq("is_available", true);

  if (params.location) query = query.eq("location", params.location);
  if (params.category) query = query.eq("category", params.category);
  if (params.transmission) query = query.eq("transmission", params.transmission);

  const skip = parseInt(params.skip || "0");
  query = query.range(skip, skip + 11);

  const { data: cars, count } = await query.order("created_at", { ascending: false });

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Rent a Car</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our available vehicles in Lagos, Abuja, Rivers, and Imo.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside>
            <CarFilter />
          </aside>

          <div>
            {cars && cars.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  {count} car{cars.length !== 1 ? "s" : ""} found
                </p>
                <MotionList>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {cars.map((car) => (
                      <CarCard key={car.id} car={car as Car} />
                    ))}
                  </div>
                </MotionList>
              </>
            ) : (
              <div className="flex h-40 items-center justify-center text-muted-foreground">
                No cars found matching your criteria. Try adjusting the filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
