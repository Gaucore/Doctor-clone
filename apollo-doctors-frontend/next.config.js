/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'https://doctor-clone-1-o2jl.onrender.com/api',
    NEXT_PUBLIC_METADATA_BASE_URL: 'https://doctor-clone-1-o2jl.onrender.com',
  },
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
  // Add this for better deployment compatibility
  swcMinify: true,
  // Ensure the app works with or without trailing slashes
  trailingSlash: true,
};

module.exports = nextConfig;