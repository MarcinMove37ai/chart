import { Config } from 'next';

const nextConfig: Config = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Dodaj trailing slashes
  trailingSlash: true,
};

export default nextConfig;