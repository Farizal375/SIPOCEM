import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Menghilangkan warning cross origin saat akses via IP
    serverActions: {
      allowedOrigins: ["192.168.56.1:3000", "localhost:3000"], 
    },
  },
};

export default nextConfig;