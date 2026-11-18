import type { NextConfig } from "next";

/**
 * 求人のURL名を番号から英字に変えたときの転送（2026-11-18）。
 * 媒体やSNSに貼られた古いURLを、新しいURLへ恒久的に転送する。
 */
const LEGACY_CAREER_SLUGS: Record<string, string> = {
  "1": "web-coder",
  "2": "route-sales",
  "3": "print-binding-staff",
  "4": "press-operator",
  "5": "oshikatsu-goods-sales",
  "6": "planning-sales",
  "7": "sales-assistant",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(LEGACY_CAREER_SLUGS).map(([from, to]) => ({
      source: `/career/${from}`,
      destination: `/career/${to}`,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
