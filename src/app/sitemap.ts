import type { MetadataRoute } from "next"
import { industries, industryHref } from "@/data/industries"
import { serviceHref, services } from "@/data/services"
import { siteConfig } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...services.map(({ slug }) => serviceHref(slug)),
    "/industries",
    ...industries.map(({ slug }) => industryHref(slug)),
    "/approach",
    "/about",
    "/faq",
    "/contact",
  ]
  return paths.map((path) => ({ url: new URL(path, siteConfig.url).toString() }))
}
