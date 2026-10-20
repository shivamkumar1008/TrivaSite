import { careersEmail } from "@/data/careers"
import { faqs } from "@/data/faqs"
import { siteConfig } from "@/data/site"
import { socials } from "@/data/socials"
import { team, teamHref } from "@/data/team"
import { absoluteUrl } from "@/lib/seo"
import type { Faq, Service, TeamMember } from "@/types"

/**
 * Schema.org JSON-LD for rich results in Google and for AI crawlers that read structured
 * data instead of parsing the page. Rendered by <JsonLd> into an inline script tag, so
 * nothing here affects the visible page.
 */

/** Stable @id values so separate graphs on different pages refer to the same entities. */
const ORGANIZATION_ID = absoluteUrl("/#organization")
const WEBSITE_ID = absoluteUrl("/#website")

/** Profile URLs for sameAs; mailto: and wa.me links aren't profiles, so they're dropped. */
const profileUrls = socials
  .filter(({ href }) => href.startsWith("http") && !href.includes("wa.me"))
  .map(({ href }) => href)

const contactEmail = process.env.CONTACT_TO_EMAIL?.replace(/.*<|>.*/g, "").trim() || "connect@trivasite.co.in"

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/brand/trivasite-mark-email.png"),
  },
  sameAs: profileUrls,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contactEmail,
      url: absoluteUrl("/contact"),
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "human resources",
      email: careersEmail,
      url: absoluteUrl("/careers"),
      availableLanguage: ["en"],
    },
  ],
  employee: team.map(({ name, slug }) => ({
    "@type": "Person",
    name,
    url: absoluteUrl(teamHref(slug)),
  })),
}

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
}

/** Trail for a page's breadcrumbs. Pass the same items given to <Breadcrumbs>, plus Home. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map(({ name, path }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  }
}

export function serviceSchema(service: Service, path: string) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    name: service.title,
    description: service.detail,
    url: absoluteUrl(path),
    serviceType: service.title,
    provider: { "@id": ORGANIZATION_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} offerings`,
      itemListElement: service.offerings.map((offering) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offering },
      })),
    },
  }
}

/** FAQPage rich result. Defaults to the shared FAQ list used on /faq and the home page. */
export function faqSchema(items: Faq[] = faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}

export function personSchema(member: TeamMember) {
  const path = teamHref(member.slug)
  return {
    "@type": "Person",
    "@id": absoluteUrl(`${path}#person`),
    name: member.name,
    description: member.caption,
    url: absoluteUrl(path),
    image: absoluteUrl(member.photo),
    email: member.email,
    worksFor: { "@id": ORGANIZATION_ID },
    sameAs: [member.linkedin, ...(member.portfolio ? [member.portfolio] : [])],
  }
}

/** A CollectionPage for the index routes that list services, industries or people. */
export function collectionSchema(name: string, description: string, path: string, items: { name: string; path: string }[]) {
  return {
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map(({ name: itemName, path: itemPath }, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: itemName,
        url: absoluteUrl(itemPath),
      })),
    },
  }
}
