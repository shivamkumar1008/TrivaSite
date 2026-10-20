import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    // Everything is public, and AI crawlers are welcome — /llms.txt exists for them.
    // To keep a path out of search, add it to `disallow` here and set
    // `robots: { index: false }` in that page's metadata.
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
