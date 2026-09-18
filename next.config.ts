import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 for listing photos (pixel fidelity), 75 default for small UI raster assets.
    qualities: [75, 90],
    // Assets are immutable in this deployment; let browsers and the Vercel image cache keep
    // optimized renditions instead of regenerating them (default TTL is 60s).
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
