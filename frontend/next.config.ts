import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Dodaj trailing slashes
  trailingSlash: true,
};

export default nextConfig;