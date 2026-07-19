import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assistfactory.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Serve all images unoptimized: /public assets are already sized/compressed,
    // and this avoids Vercel's Image Optimization quota (402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED),
    // which was leaving newly-added images blank on production.
    unoptimized: true,
  },
};

export default nextConfig;
