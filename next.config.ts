import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'i.scdn.co',
      'mosaic.scdn.co',
      'image-cdn-ak.spotifycdn.com',
      'seeded-session-images.scdn.co',
    ],
  }
};

export default nextConfig;
