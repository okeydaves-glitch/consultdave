// ============================================================================
// Root Layout — with animation support
// ============================================================================
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/shared/Toast";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SafeRent — Car Rentals & Safety Equipment",
    template: "%s | SafeRent",
  },
  description:
    "Rent cars and purchase industrial safety equipment in Lagos, Abuja, and Port Harcourt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <ScrollToTop />
            <Footer />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
