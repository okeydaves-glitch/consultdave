// ============================================================================
// Car Card Component — with hover lift + entrance animation
// ============================================================================
import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Car } from "lucide-react";
import { staggerItem, cardHover } from "@/lib/animations";
import type { Car as CarType } from "@/lib/supabase/types";

interface CarCardProps {
  car: CarType;
}

export function CarCard({ car }: CarCardProps) {
  const imageUrl = car.images?.[0] || null;

  return (
    <motion.div variants={staggerItem}>
      <Link
        href={`/cars/${car.id}`}
        className="group block rounded-xl border border-border bg-background overflow-hidden hover:shadow-md transition-shadow"
      >
        {/* Car Image — with scale zoom on hover */}
        <motion.div
          className="relative aspect-[16/10] bg-muted overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={car.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Car className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
        </motion.div>

        {/* Car Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground">{car.name}</h3>
            <span className="text-lg font-bold text-primary whitespace-nowrap">
              {formatCurrency(Number(car.daily_price))}
              <span className="text-xs font-normal text-muted-foreground">/day</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="capitalize">{car.category}</span>
            <span>{car.year}</span>
            <span className="capitalize">{car.transmission}</span>
            <span>{car.seats} seats</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="capitalize">{car.location?.replace("_", " ")}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
