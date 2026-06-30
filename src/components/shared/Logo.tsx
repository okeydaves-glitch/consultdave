"use client";

import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "white";
  showText?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  sm: { icon: 28, fontSize: "text-lg", gap: "gap-1.5" },
  md: { icon: 32, fontSize: "text-xl", gap: "gap-2" },
  lg: { icon: 40, fontSize: "text-2xl", gap: "gap-2.5" },
  xl: { icon: 48, fontSize: "text-3xl", gap: "gap-3" },
};

export function Logo({
  href,
  className = "",
  size = "md",
  color = "default",
  showText = true,
  onClick,
}: LogoProps) {
  const { icon, fontSize, gap } = sizeMap[size];
  const textColor = color === "white" ? "text-white" : "text-[var(--foreground)]";
  const iconBg = color === "white" ? "bg-white/15" : "bg-[var(--primary)]/15";
  const iconColor = color === "white" ? "#ffffff" : "var(--primary)";

  const content = (
    <span className={`inline-flex items-center ${gap} ${className}`}>
      <span className={`flex items-center justify-center rounded-xl ${iconBg} shrink-0`}
        style={{ width: icon, height: icon }}
      >
        <svg
          width={Math.round(icon * 0.6)}
          height={Math.round(icon * 0.6)}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2V13" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 5.5C3.5 7.5 2.5 10 2.5 12.5C2.5 17.5 7 22 12 22C17 22 21.5 17.5 21.5 12.5C21.5 10 20.5 7.5 18.5 5.5"
            stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {showText && (
        <span className={`font-extrabold tracking-tight ${fontSize} ${textColor}`}>
          Consult Dave
        </span>
      )}
    </span>
  );

  if (href) {
    return <Link href={href} className="hover:opacity-80 transition-opacity" onClick={onClick}>{content}</Link>;
  }

  return content;
}
