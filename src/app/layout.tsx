import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/shared/Toast";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Consult Dave — Safety Consultancy & Premium Car Rentals",
    template: "%s | Consult Dave",
  },
  description:
    "Your trusted safety consultant in Nigeria. Fire safety installation, equipment supply, site surveying, and premium car rentals. Serving Lagos, Abuja, Rivers, and Imo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased min-h-screen flex flex-col`}>
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
