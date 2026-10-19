import { getService, serviceHref } from "@/data/services"
import { industries, industryHref } from "@/data/industries"

type FooterLink = { label: string; href: string }
type FooterGroup = { heading: string; links: FooterLink[] }

/** A footer group listing a service's offerings, each linking to that service's page. */
const serviceGroup = (heading: string, slug: string): FooterGroup => {
  const service = getService(slug)
  if (!service) throw new Error(`Unknown service in footer: ${slug}`)
  return { heading, links: service.offerings.map((label) => ({ label, href: serviceHref(slug) })) }
}

/** A footer group linking to whole service pages. */
const servicePages = (heading: string, slugs: string[]): FooterGroup => ({
  heading,
  links: slugs.map((slug) => {
    const service = getService(slug)
    if (!service) throw new Error(`Unknown service in footer: ${slug}`)
    return { label: service.title, href: serviceHref(slug) }
  }),
})

export const footerColumns: FooterGroup[][] = [
  [serviceGroup("DEVELOPMENT", "web-app-development"), serviceGroup("DESIGN", "ui-ux-design")],
  [serviceGroup("AI & AUTOMATION", "ai-automation"), serviceGroup("CLOUD & DEVOPS", "cloud-devops")],
  [
    serviceGroup("DATA & ANALYTICS", "data-science-analytics"),
    servicePages("MORE SERVICES", ["enterprise-software", "qa-testing", "cybersecurity", "digital-marketing", "support-maintenance"]),
  ],
  [
    {
      heading: "COMPANY",
      links: [
        { label: "About TrivaSite", href: "/about" },
        { label: "Our team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Our approach", href: "/approach" },
        { label: "All services", href: "/services" },
        { label: "Frequently asked questions", href: "/faq" },
        { label: "Work with us", href: "/contact" },
      ],
    },
    {
      heading: "INDUSTRIES",
      links: industries.map(({ name, slug }) => ({ label: name, href: industryHref(slug) })),
    },
  ],
]
