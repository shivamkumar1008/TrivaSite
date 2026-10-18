export type HeroSlide = {
  id: string
  eyebrow: string
  /** First line, shown in brand blue. */
  accent: string
  /** Second line, shown in the text colour. */
  title: string
  description: string
  /** "Know more" link for the slide. */
  href: string
  linkLabel: string
  image: { id: string; alt: string; position?: string }
  /** Floating glass card in the top corner of the image. */
  card: { label: string; title: string }
  /** Floating capability chips beside the image. */
  chips: string[]
  /** Pill at the bottom of the image. */
  pill: string
}

/** Photos are from Unsplash (free to use under the Unsplash License). */
export const heroSlides: HeroSlide[] = [
  {
    id: "partner",
    eyebrow: "YOUR AMBITION. OUR ENGINEERING.",
    accent: "Good technology.",
    title: "Great possibilities.",
    description:
      "From the first idea to what’s next, we build software that moves your business forward. Thoughtfully designed. Expertly engineered. Built on trust.",
    href: "/about",
    linkLabel: "Why TrivaSite",
    image: { id: "1600880292203-757bb62b4baf", alt: "Two colleagues celebrating a successful project at their desk", position: "50% 35%" },
    card: { label: "ONE PARTNER", title: "Strategy · Design · Engineering" },
    chips: ["Dedicated team", "Security from day one", "With you beyond launch"],
    pill: "Meet your tech partner",
  },
  {
    id: "build",
    eyebrow: "01 / BUILD",
    accent: "Websites & apps",
    title: "your customers love to use.",
    description:
      "Responsive websites, web platforms, and native & cross-platform Android and iOS apps — designed around your users and built to grow with you.",
    href: "/services/web-app-development",
    linkLabel: "Explore development",
    image: { id: "1512941937669-90a1b58e7e9c", alt: "A smartphone home screen full of app icons", position: "50% 50%" },
    card: { label: "WEB & APP DEVELOPMENT", title: "From first launch to full platform" },
    chips: ["Android & iOS", "Web platforms", "E-commerce"],
    pill: "Web & app development",
  },
  {
    id: "intelligence",
    eyebrow: "02 / INTELLIGENCE",
    accent: "AI agents & automation",
    title: "that drive real progress.",
    description:
      "Integrate AI models with your tools, deploy purpose-built agents, and automate repetitive work — with human oversight and clear evaluation built in.",
    href: "/services/ai-automation",
    linkLabel: "Explore AI services",
    image: { id: "1677442136019-21780ecad995", alt: "Glowing blue 3D letters spelling AI", position: "60% 50%" },
    card: { label: "AI & INTELLIGENT AUTOMATION", title: "Practical AI, built for your business" },
    chips: ["AI model integration", "Agentic AI", "Workflow automation"],
    pill: "AI & intelligent automation",
  },
  {
    id: "cloud",
    eyebrow: "03 / CLOUD",
    accent: "Cloud & DevOps",
    title: "that keeps you always on.",
    description:
      "We deploy, migrate, and maintain your cloud infrastructure on AWS, Azure, and Google Cloud — with automated pipelines, monitoring, and backups built in.",
    href: "/services/cloud-devops",
    linkLabel: "Explore cloud & DevOps",
    image: { id: "1558494949-ef010cbdcc31", alt: "Rows of servers with neatly routed cables in a data centre", position: "50% 50%" },
    card: { label: "CLOUD & DEVOPS", title: "Deployed, monitored, maintained" },
    chips: ["AWS · Azure · Google Cloud", "CI/CD pipelines", "Monitoring & backups"],
    pill: "Cloud & DevOps",
  },
  {
    id: "data",
    eyebrow: "04 / DATA",
    accent: "Data science & analytics",
    title: "that turns data into decisions.",
    description:
      "We analyse and visualise your data, find the key drivers behind your numbers, engineer features, and build predictive models your team can act on.",
    href: "/services/data-science-analytics",
    linkLabel: "Explore data & analytics",
    image: { id: "1460925895917-afdab827c52f", alt: "A laptop showing an analytics dashboard with charts", position: "40% 50%" },
    card: { label: "DATA SCIENCE & ANALYTICS", title: "Insights you can act on" },
    chips: ["Dashboards & visualisation", "Feature engineering", "Predictive models"],
    pill: "Data science & analytics",
  },
  {
    id: "marketing",
    eyebrow: "05 / GROWTH",
    accent: "Digital marketing",
    title: "that grows your audience.",
    description:
      "SEO, social media, and performance campaigns on Google and Meta — backed by analytics, so you know exactly what’s bringing customers in.",
    href: "/services/digital-marketing",
    linkLabel: "Explore marketing",
    image: { id: "1611926653458-09294b3142bf", alt: "A smartphone screen showing a folder of social media apps", position: "50% 50%" },
    card: { label: "DIGITAL MARKETING", title: "Get found. Get chosen." },
    chips: ["SEO", "Social media", "Google & Meta ads"],
    pill: "Digital marketing",
  },
  {
    id: "support",
    eyebrow: "06 / CARE",
    accent: "Support & maintenance",
    title: "that keeps you moving.",
    description:
      "Launch is just the beginning. We monitor your applications, fix issues, keep everything up to date, and keep improving your product as your business grows.",
    href: "/services/support-maintenance",
    linkLabel: "Explore support plans",
    image: { id: "1531482615713-2afd69097998", alt: "Two engineers reviewing code together on a laptop", position: "50% 40%" },
    card: { label: "SUPPORT & MAINTENANCE", title: "With you beyond launch" },
    chips: ["Monitoring & alerts", "Updates & bug fixes", "Feature enhancements"],
    pill: "Support & maintenance",
  },
]

/** Quick links under the hero ("Looking for a service?"). */
export const heroQuickLinks = [
  { label: "Build a website", href: "/services/web-app-development", icon: "web" },
  { label: "Launch a mobile app", href: "/services/web-app-development", icon: "mobile" },
  { label: "Deploy AI agents", href: "/services/ai-automation", icon: "ai" },
  { label: "Move to the cloud", href: "/services/cloud-devops", icon: "cloud" },
  { label: "Analyse your data", href: "/services/data-science-analytics", icon: "data" },
  { label: "Design your product", href: "/services/ui-ux-design", icon: "design" },
  { label: "Secure your systems", href: "/services/cybersecurity", icon: "security" },
  { label: "Grow your audience", href: "/services/digital-marketing", icon: "marketing" },
  { label: "Get ongoing support", href: "/services/support-maintenance", icon: "support" },
] as const
