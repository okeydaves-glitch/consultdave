"use client";

import type { ReactNode } from "react";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-[40px] bg-card p-8 lg:p-10 shadow-xl border border-border/50">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold text-primary tracking-tight">Consult Dave</span>
            </Link>
            <h1 className="mt-6 text-2xl font-extrabold text-foreground">{title}</h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>

          <div className="mt-8 space-y-4">{children}</div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </div>
  );
}
