/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'tiktok-live-connector'], // Add tiktok-live-connector
  },
};

export default nextConfig;
