import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Unsplash — used for office photos on the contact page
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Aceternity assets — used for globe markers + marquee
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      // Three-globe textures (Earth texture + bump map)
      {
        protocol: "https",
        hostname: "unpkg.com",
      },
      {
        protocol: "https",
        hostname: "www.contiki.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      }

    ],
  },
  allowedDevOrigins: ['192.168.100.197'],
};

export default nextConfig;
