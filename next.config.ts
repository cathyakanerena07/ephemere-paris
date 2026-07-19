import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lets a verification build run without clobbering the dev server's .next.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/webp'],
  },
}

export default nextConfig
