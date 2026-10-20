import type { Metadata } from "next"
import { siteConfig } from "@/data/site"

/** Absolute URL for a site-relative path, e.g. "/services" → "https://trivasite.co.in/services". */
export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString()

type PageSeoInput = {
  /** Page title; omit on the home page to use the site-wide default. */
  title?: string
  description: string
  /** Site-relative path, used for the canonical link and the OpenGraph URL. */
  path: string
  /** Share image, site-relative. Falls back to whatever the root layout sets. */
  image?: { url: string; alt: string; width?: number; height?: number }
}

/**
 * Per-page metadata with a canonical URL and page-specific OpenGraph tags.
 * Everything not set here (siteName, images, twitter) is inherited from the root layout,
 * so a page only has to state what makes it different.
 */
export function pageSeo({ title, description, path, image }: PageSeoInput): Metadata {
  const ogTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const images = image ? [{ ...image, url: absoluteUrl(image.url) }] : undefined

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl(path),
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(images ? { images } : {}),
    },
  }
}
