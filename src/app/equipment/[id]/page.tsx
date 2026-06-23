// ============================================================================
// Equipment Detail Page
// ============================================================================
// Shows full details of a single equipment item with "Add to Cart" option.
//
// Route: /equipment/[id]
// ============================================================================

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/shared/Button";
import { HardHat, Package, Award, Shield } from "lucide-react";
import type { Equipment } from "@/lib/supabase/types";

interface EquipmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase
    .from("equipment")
    .select("*")
    .eq("id", id)
    .single();

  if (!item) {
    notFound();
  }

  const typedItem = item as Equipment;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left: Image & Details */}
        <div>
          <div className="aspect-[4/3] rounded-xl bg-muted overflow-hidden">
            {typedItem.images?.[0] ? (
              <img
                src={typedItem.images[0]}
                alt={typedItem.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <HardHat className="h-16 w-16 text-muted-foreground/40" />
              </div>
            )}
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold">{typedItem.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground capitalize">
              {typedItem.category.replace(/_/g, " ")}
            </p>
          </div>

          {typedItem.description && (
            <p className="mt-4 text-muted-foreground">{typedItem.description}</p>
          )}

          {/* Specs */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {typedItem.manufacturer && (
              <div className="rounded-xl border border-border p-4 text-center">
                <Award className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-1 text-sm font-medium">{typedItem.manufacturer}</p>
                <p className="text-xs text-muted-foreground">Manufacturer</p>
              </div>
            )}
            {typedItem.warranty_months && (
              <div className="rounded-xl border border-border p-4 text-center">
                <Shield className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-1 text-sm font-medium">{typedItem.warranty_months} months</p>
                <p className="text-xs text-muted-foreground">Warranty</p>
              </div>
            )}
            <div className="rounded-xl border border-border p-4 text-center">
              <Package className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-1 text-sm font-medium">
                {typedItem.quantity_available > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-xs text-muted-foreground">
                {typedItem.quantity_available} available
              </p>
            </div>
          </div>

          {/* Certifications */}
          {typedItem.certifications && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Certifications</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {(typedItem.certifications as string[]).map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Purchase Card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border p-6 space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(Number(typedItem.price))}
              </p>
              {typedItem.usage_guidelines && (
                <p className="mt-4 text-xs text-muted-foreground">
                  {typedItem.usage_guidelines}
                </p>
              )}
            </div>
            <Button className="w-full" size="lg" disabled={typedItem.quantity_available <= 0}>
              {typedItem.quantity_available > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
