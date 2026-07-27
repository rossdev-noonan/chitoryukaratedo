import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // News/Events submission images now upload to a public Supabase Storage
    // bucket (news-event-images) and get rendered via next/image — this
    // wildcard covers any Supabase project's storage domain without
    // hardcoding this project's specific ref into source code.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
