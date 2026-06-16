import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Jika Development build, gunakan React Server Components untuk meningkatkan performa
  reactCompiler: true,
  output: 'standalone',
  
  // Jika production build, un-command ini untuk menghasilkan static export
  // output: 'export',      
  // images: { unoptimized: true },
};

export default nextConfig;
