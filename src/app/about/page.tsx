// ============================================================================
// About Page
// ============================================================================
// Tells visitors about the Consult Dave company and its mission.
//
// Route: /about
// ============================================================================

import { CITIES } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">About Consult Dave</h1>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <p>
          Consult Dave is a Nigerian platform that makes it easy for businesses to
          rent vehicles and purchase industrial safety equipment. We combine
          two essential business needs — transportation and workplace safety —
          into one seamless online experience.
        </p>

        <p>
          Founded to serve the growing business community in Nigeria, we
          operate in three major cities and offer a curated selection of
          vehicles and safety gear from trusted manufacturers.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="mt-4 text-muted-foreground">
          To make business operations in Nigeria simpler, safer, and more
          efficient by providing reliable vehicle rentals and quality safety
          equipment through a single, easy-to-use platform.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Our Cities</h2>
        <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-4">
          {CITIES.map((city) => (
            <div
              key={city.value}
              className="rounded-xl border border-border p-4 text-center"
            >
              <h3 className="font-semibold">{city.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Vehicle rentals & equipment delivery
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
