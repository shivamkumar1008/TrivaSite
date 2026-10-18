export type Service = {
  slug: string
  number: string
  category: string
  title: string
  description: string
  tags: string
  detail: string
  /** What the service covers; also listed in the footer. */
  offerings: string[]
  /** Slugs from `technologyRows` shown on the service page. */
  technologies: string[]
}

export type Industry = {
  slug: string
  name: string
  title: string
  description: string
  highlights: string[]
  /** Slugs of the most relevant services. */
  services: string[]
}

export type Technology = {
  name: string
  slug: string
}

export type TechnologyRow = {
  label: string
  items: Technology[]
}

export type Faq = {
  question: string
  answer: string
}

export type Portrait = {
  image: string
  title: string
  caption: string
}

export type ProcessStep = {
  title: string
  text: string
}

export type NavItem = {
  label: string
  href: string
}

export type ContactBrief = {
  name: string
  email: string
  message: string
}
