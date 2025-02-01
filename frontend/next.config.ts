/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  // Zmieniamy assetPrefix na prawidłową wartość
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // Dodajemy konfigurację dla fontów
  optimizeFonts: false
};

export default nextConfig;