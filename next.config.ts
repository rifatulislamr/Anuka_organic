import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  
  reactStrictMode: true,
  images: {
    domains: [
      'example.com', 
      'via.placeholder.com', 
      'images.unsplash.com',
      'localhost',         // Add this for local backend images
      'anukabd.com',
      'endpoints.anukabd.com'
    ],
  },
}

export default nextConfig

