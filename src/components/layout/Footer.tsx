import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-extrabold text-primary tracking-tight">Consult Dave</h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Your trusted partner for safety consultancy, equipment supply, and premium car rentals across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/cars" className="text-sm text-white/60 hover:text-white transition-colors">Rentals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Services</h4>
            <ul className="mt-4 space-y-3">
              <li><span className="text-sm text-white/60">Safety Consultancy</span></li>
              <li><span className="text-sm text-white/60">Fire Safety Installation</span></li>
              <li><span className="text-sm text-white/60">Equipment Supply</span></li>
              <li><span className="text-sm text-white/60">Site Surveying</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>Lagos, Abuja, Port Harcourt</li>
              <li>hello@consultdave.com</li>
              <li>+234 800 CONSULT</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-primary hover:text-white transition-all text-sm">WA</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-primary hover:text-white transition-all text-sm">IG</a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Consult Dave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
