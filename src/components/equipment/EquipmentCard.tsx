// ============================================================================
// Equipment Card Component — with hover lift + entrance animation
// ============================================================================
import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { HardHat } from "lucide-react";
import { staggerItem, cardHover } from "@/lib/animations";
import type { Equipment } from "@/lib/supabase/types";

interface EquipmentCardProps {
  item: Equipment;
}

export function EquipmentCard({ item }: EquipmentCardProps) {
  const imageUrl = item.images?.[0] || null;

  return (
    <motion.div variants={staggerItem}>
      <Link
        href={`/equipment/${item.id}`}
        className="group block rounded-xl border border-border bg-background overflow-hidden hover:shadow-md transition-shadow"
      >
        {/* Image — zoom on hover */}
        <motion.div
          className="relative aspect-[4/3] bg-muted overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <HardHat className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
        </motion.div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            <span className="text-lg font-bold text-primary whitespace-nowrap">
              {formatCurrency(Number(item.price))}
            </span>
          </div>

          <p className="text-xs text-muted-foreground capitalize">
            {item.category?.replace(/_/g, " ")}
          </p>

          {item.manufacturer && (
            <p className="text-xs text-muted-foreground">{item.manufacturer}</p>
          )}

          <p className="text-xs text-muted-foreground">
            {item.quantity_available > 0
              ? `${item.quantity_available} in stock`
              : "Out of stock"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
