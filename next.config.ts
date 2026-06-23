import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow loading images from Supabase Storage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
