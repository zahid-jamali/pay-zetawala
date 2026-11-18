import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // If STATIC_EXPORT is true (e.g. for Cloudflare Pages), export to out/
  ...(process.env.STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
