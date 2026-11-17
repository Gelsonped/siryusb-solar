import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us.i.posthog.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.1.3'],
};

export default nextConfig;