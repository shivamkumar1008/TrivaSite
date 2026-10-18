import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      // "Cloud, data & engineering" was split into two services; keep old links working.
      { source: "/services/cloud-data-engineering", destination: "/services/cloud-devops", permanent: true },
    ]
  },
}

export default nextConfig
