import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-ecosystem.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
