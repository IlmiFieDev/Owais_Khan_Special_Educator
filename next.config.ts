import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Next's development controls out of the portfolio UI. Runtime errors
  // still remain visible in the terminal and browser console.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/hi/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
