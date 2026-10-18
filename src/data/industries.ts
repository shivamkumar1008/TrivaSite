import type { Industry } from "@/types"

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial services",
    title: "Confidence in every transaction.",
    description:
      "Secure digital platforms, intelligent workflows, and clear data insights for a connected financial experience.",
    highlights: [
      "Customer portals and mobile banking experiences",
      "Workflow automation for onboarding and back-office tasks",
      "Reporting dashboards built on dependable data pipelines",
    ],
    services: ["web-app-development", "data-science-analytics", "cybersecurity"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    title: "Better connected. Better care.",
    description:
      "Patient-focused platforms, connected systems, and reliable data infrastructure that help care teams work better.",
    highlights: [
      "Patient-facing apps for booking, records, and communication",
      "Integrations that connect clinical and administrative systems",
      "Data infrastructure designed with access controls from the start",
    ],
    services: ["web-app-development", "data-science-analytics", "cybersecurity"],
  },
  {
    slug: "retail-commerce",
    name: "Retail & commerce",
    title: "Experiences that turn browsing into business.",
    description:
      "Seamless storefronts, mobile shopping experiences, and integrated operations built around your customers.",
    highlights: [
      "E-commerce storefronts and mobile shopping apps",
      "Inventory, order, and fulfilment integrations",
      "Sales analytics and AI-assisted customer support",
    ],
    services: ["web-app-development", "digital-marketing", "data-science-analytics"],
  },
  {
    slug: "education",
    name: "Education",
    title: "Make learning more accessible.",
    description:
      "Intuitive learning platforms, mobile apps, and data tools that bring educators and learners closer together.",
    highlights: [
      "Learning platforms that work on every device",
      "Tools that help educators manage courses and track progress",
      "AI-assisted search across learning materials",
    ],
    services: ["web-app-development", "ui-ux-design", "ai-automation"],
  },
  {
    slug: "startups-saas",
    name: "Startups & SaaS",
    title: "From first idea to your next milestone.",
    description:
      "Thoughtful MVP development, scalable product architecture, and a collaborative engineering partner as you grow.",
    highlights: [
      "MVP scoping, design, and development",
      "Product architecture that scales with your customers",
      "Cloud infrastructure and DevOps as you grow",
    ],
    services: ["web-app-development", "ui-ux-design", "cloud-devops"],
  },
]

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug)

export const industryHref = (slug: string) => `/industries/${slug}`
