import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Room for the contact form's 10 MB of attachments plus the text fields.
    serverActions: { bodySizeLimit: "12mb" },
  },
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
