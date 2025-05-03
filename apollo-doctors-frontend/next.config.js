/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.apollo247.in',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all external domains
      },
    ],
    unoptimized: true, // This will bypass the Image Optimization API
  },
};

module.exports = nextConfig;
