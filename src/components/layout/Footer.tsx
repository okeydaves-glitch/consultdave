import Link from "next/link";
import { MessageCircle, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--primary)] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-2xl font-extrabold text-[#5555ff] tracking-tight">Consult Dave</h3>
            <p className="mt-3 text-sm text-white/50 leading-relaxed">
              Your trusted partner for safety consultancy, equipment supply, and premium car rentals across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Company</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="text-sm text-white/50 hover:text-[#5555ff] transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-sm text-white/50 hover:text-[#5555ff] transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-sm text-white/50 hover:text-[#5555ff] transition-colors">Contact</Link></li>
              <li><Link href="/cars" className="text-sm text-white/50 hover:text-[#5555ff] transition-colors">Rentals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Services</h4>
            <ul className="mt-4 space-y-3">
              <li><span className="text-sm text-white/50">Safety Consultancy</span></li>
              <li><span className="text-sm text-white/50">Fire Safety Installation</span></li>
              <li><span className="text-sm text-white/50">Equipment Supply</span></li>
              <li><span className="text-sm text-white/50">Site Surveying</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li className="break-words">Lagos, Abuja, Rivers, Imo</li>
              <li className="break-all">hello@consultdave.com</li>
              <li>+234 800 CONSULT</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/50 hover:bg-[#25D366] hover:text-white transition-all">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/50 hover:bg-[#E4405F] hover:text-white transition-all">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} Consult Dave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
