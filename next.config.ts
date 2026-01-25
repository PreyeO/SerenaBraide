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
    // Disable optimization for S3 signed URLs to prevent caching issues
    unoptimized: false,
  },
};

export default nextConfig;
