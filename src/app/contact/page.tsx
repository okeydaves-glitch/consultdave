// ============================================================================
// Contact Page
// ============================================================================
// A simple contact page with business info and a contact form.
//
// Route: /contact
// ============================================================================

import { Button } from "@/components/shared/Button";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground">hello@saferent.com</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-sm text-muted-foreground">+234 800 SAFERENT</p>
          </div>
          <div>
            <h3 className="font-semibold">Locations</h3>
            <p className="text-sm text-muted-foreground">
              Lagos, Abuja, Port Harcourt
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Business Hours</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Friday: 8:00 AM - 6:00 PM
              <br />
              Saturday: 9:00 AM - 3:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Send us a message and we will get back to you within 24 hours.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <Button>
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
