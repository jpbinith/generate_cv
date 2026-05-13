import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:4000/auth/:path*",
      },
      {
        source: "/api/master-profile",
        destination: "http://localhost:4000/master-profile",
      },
      {
        source: "/api/health",
        destination: "http://localhost:4000/health",
      },
    ];
  },
};

export default nextConfig;
