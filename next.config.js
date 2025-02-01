/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : ''
};

module.exports = nextConfig;
