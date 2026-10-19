import type { NavItem, ProcessStep } from "@/types"

export const siteConfig = {
  name: "TrivaSite",
  title: "TrivaSite — Good technology. Great possibilities.",
  description:
    "TrivaSite is a software services partner for web and app development, AI and automation, cloud and DevOps, data science and analytics, design, enterprise software, testing, cybersecurity, and digital marketing.",
  tagline: "Your ambition. Our engineering.",
  /** Set NEXT_PUBLIC_SITE_URL in production; used for the sitemap and canonical URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** How quickly we promise to reply to a contact brief, used in the form and confirmation email. */
  responseTime: "within 24 hours",
}

/** Files visitors can attach to the contact form. Keep `maxBytes` under `bodySizeLimit` in next.config.ts. */
export const contactAttachments = {
  maxFiles: 5,
  maxBytes: 10 * 1024 * 1024,
  extensions: [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".csv", ".txt", ".png", ".jpg", ".jpeg", ".zip"],
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Our approach", href: "/approach" },
  { label: "Industries", href: "/industries" },
  { label: "About us", href: "/about" },
  { label: "Our team", href: "/team" },
  { label: "Careers", href: "/careers" },
]

export const promises = [
  {
    title: "Built around your business",
    text: "Every recommendation starts with your goals, your users, and the systems you already rely on.",
  },
  {
    title: "Security from day one",
    text: "Access controls, data handling, and integration risks are part of the plan, not an afterthought.",
  },
  {
    title: "With you beyond launch",
    text: "Support, maintenance, and improvements continue under a plan agreed before handover.",
  },
]

export const processSteps: ProcessStep[] = [
  {
    title: "Listen first",
    text: "We understand your goals, your challenges, and the people you’re building for.",
  },
  {
    title: "Build with purpose",
    text: "A clear roadmap. Thoughtful design. Reliable engineering. You’re involved at every step.",
  },
  {
    title: "Grow together",
    text: "Launch is just the beginning. We support, improve, and scale as your business evolves.",
  },
]
