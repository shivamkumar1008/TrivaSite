import type { MetadataRoute } from "next"
import { industries, industryHref } from "@/data/industries"
import { serviceHref, services } from "@/data/services"
import { team, teamHref } from "@/data/team"
import { absoluteUrl } from "@/lib/seo"

type Entry = {
  path: string
  /** Relative weight for crawlers; the home page is 1. */
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}

/**
 * Priorities follow the site's shape: the home page first, then the commercial pages a
 * visitor is most likely to land on from search, then the supporting pages.
 */
const entries: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },

  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...services.map(({ slug }) => ({
    path: serviceHref(slug),
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),

  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  ...industries.map(({ slug }) => ({
    path: industryHref(slug),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),

  { path: "/approach", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },

  // Roles change more often than the rest of the site.
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },

  { path: "/team", priority: 0.5, changeFrequency: "yearly" },
  ...team.map(({ slug }) => ({
    path: teamHref(slug),
    priority: 0.4,
    changeFrequency: "yearly" as const,
  })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  // One timestamp for the whole build: these pages ship from source, so the deploy time is
  // the only honest "last modified" we have. Per-page dates would need real edit tracking.
  const lastModified = new Date()

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }))
}
