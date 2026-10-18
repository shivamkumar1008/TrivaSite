import type { Service } from "@/types"

export const services: Service[] = [
  {
    slug: "web-app-development",
    number: "01",
    category: "BUILD",
    title: "Web & app development",
    description:
      "Digital experiences that feel effortless. Websites, web platforms, and iOS & Android apps built around your users.",
    tags: "Web platforms · Mobile apps · E-commerce",
    detail:
      "From your first customer-facing website to a complex product platform, we plan, design, build, and support software that fits your business. Our approach covers responsive web development, native and cross-platform apps, APIs, and integrations.",
    offerings: [
      "Website development",
      "Web applications",
      "Android & iOS apps",
      "Cross-platform apps",
      "E-commerce platforms",
      "API development",
    ],
    technologies: ["react", "nextjs", "typescript", "nodejs", "flutter", "kotlin", "swift", "tailwindcss"],
  },
  {
    slug: "ai-automation",
    number: "02",
    category: "INTELLIGENCE",
    title: "AI & intelligent automation",
    description:
      "Make AI work for your business. Practical integrations and autonomous agents that turn potential into progress.",
    tags: "AI integration · Agentic AI · Automation",
    detail:
      "Connect AI models to your existing tools, deploy purpose-built agents, and automate repetitive workflows. We start with a specific business problem, define human oversight, and design an integration with clear security and evaluation requirements.",
    offerings: [
      "AI model integration",
      "Agentic AI solutions",
      "Agent deployment",
      "AI chatbots & assistants",
      "Business automation",
    ],
    technologies: ["openai", "anthropic", "googlegemini", "ollama", "huggingface", "pytorch", "tensorflow", "python"],
  },
  {
    slug: "cloud-devops",
    number: "03",
    category: "CLOUD",
    title: "Cloud & DevOps",
    description:
      "Your systems, always on. We deploy, migrate, and look after your cloud infrastructure so your team can focus on the business.",
    tags: "Cloud deployment · Migration · DevOps",
    detail:
      "We design and deploy cloud environments on AWS, Azure, and Google Cloud, migrate existing applications and data, and keep them running — with infrastructure as code, CI/CD pipelines, monitoring, backups, and cost optimisation. Access controls and reliability are planned from the start.",
    offerings: [
      "Cloud architecture & deployment",
      "Cloud migration",
      "Infrastructure as code",
      "CI/CD & DevOps",
      "Monitoring & backups",
      "Cloud cost optimisation",
    ],
    technologies: ["amazonwebservices", "azure", "googlecloud", "docker", "kubernetes", "terraform", "githubactions", "grafana"],
  },
  {
    slug: "data-science-analytics",
    number: "04",
    category: "DATA",
    title: "Data science & analytics",
    description:
      "Turn your data into decisions. We analyse, visualise, and model your data to surface the insights that matter.",
    tags: "Analytics · Visualisation · Machine learning",
    detail:
      "Our data scientists and analysts explore your data, clean and prepare it, and find the patterns and key drivers behind your numbers. We build dashboards your team will actually use, engineer the features that power predictive models, and design the pipelines and databases that keep your data reliable.",
    offerings: [
      "Data analysis & insights",
      "Dashboards & visualisation",
      "Feature engineering",
      "Predictive models & ML",
      "Data pipelines & warehousing",
      "Database design",
    ],
    technologies: ["python", "pandas", "jupyter", "scikitlearn", "apachespark", "plotly", "snowflake", "postgresql"],
  },
  {
    slug: "ui-ux-design",
    number: "05",
    category: "DESIGN",
    title: "UI/UX & product design",
    description:
      "Interfaces people enjoy. Research-led product design that makes complex software feel simple.",
    tags: "Product strategy · UX research · UI design",
    detail:
      "We clarify the problem and the people it affects, then map journeys, prototype ideas, and test them with real users before development. The result is a consistent, accessible design system your engineers can build from with confidence.",
    offerings: [
      "Product strategy & discovery",
      "UX research & testing",
      "UI design & prototyping",
      "Design systems",
      "Accessibility reviews",
    ],
    technologies: ["figma", "framer", "sketch", "tailwindcss", "react"],
  },
  {
    slug: "enterprise-software",
    number: "06",
    category: "ENTERPRISE",
    title: "Enterprise software & integrations",
    description:
      "Systems that work together. Custom business software, ERP and CRM solutions, and integrations that connect your tools.",
    tags: "Custom software · ERP & CRM · Integrations",
    detail:
      "We build internal tools and custom business applications, implement and extend ERP and CRM platforms, connect payment gateways and third-party services, and modernise legacy systems — so information flows between your teams instead of being re-typed.",
    offerings: [
      "Custom business software",
      "ERP & CRM solutions",
      "Payment & third-party integrations",
      "Legacy modernisation",
      "Internal tools & portals",
    ],
    technologies: ["sap", "odoo", "stripe", "shopify", "graphql", "postman", "apachekafka", "spring"],
  },
  {
    slug: "qa-testing",
    number: "07",
    category: "QUALITY",
    title: "Quality assurance & testing",
    description:
      "Release with confidence. Manual and automated testing that catches issues before your customers do.",
    tags: "Test automation · Performance · API testing",
    detail:
      "We plan test strategies, write automated test suites for web, mobile, and APIs, and run functional, regression, performance, and accessibility testing — wired into your CI/CD pipeline so every release is checked the same way.",
    offerings: [
      "Test strategy & planning",
      "Automated testing",
      "Manual & exploratory testing",
      "Performance & load testing",
      "API testing",
    ],
    technologies: ["selenium", "cypress", "jest", "vitest", "postman", "githubactions"],
  },
  {
    slug: "cybersecurity",
    number: "08",
    category: "SECURITY",
    title: "Cybersecurity",
    description:
      "Protect what you build. Security reviews, hardening, and secure practices for your applications and infrastructure.",
    tags: "Security audits · Pen testing · Identity",
    detail:
      "We review applications and cloud setups for vulnerabilities, carry out authorised penetration testing, harden infrastructure, and implement secure authentication and access control. Any compliance or privacy requirements are agreed as part of the project scope.",
    offerings: [
      "Security audits",
      "Penetration testing",
      "Application security reviews",
      "Identity & access management",
      "Infrastructure hardening",
    ],
    technologies: ["owasp", "burpsuite", "wireshark", "cloudflare", "letsencrypt", "vault", "auth0", "keycloak"],
  },
  {
    slug: "digital-marketing",
    number: "09",
    category: "GROWTH",
    title: "Digital marketing",
    description:
      "Get found and grow. SEO, social media, and performance campaigns that bring the right customers to what you’ve built.",
    tags: "SEO · Social media · Performance ads",
    detail:
      "We improve how you rank in search, plan and run social media and paid campaigns on Google and Meta, create content and email journeys that convert, and set up analytics and tracking so every decision is based on real results rather than guesswork.",
    offerings: [
      "Search engine optimisation (SEO)",
      "Social media marketing",
      "Performance & paid ads",
      "Content marketing",
      "Email marketing & automation",
      "Analytics & conversion optimisation",
    ],
    technologies: ["googleads", "googleanalytics", "googlesearchconsole", "googletagmanager", "meta", "semrush", "mailchimp", "hubspot"],
  },
  {
    slug: "support-maintenance",
    number: "10",
    category: "CARE",
    title: "Support & maintenance",
    description:
      "With you beyond launch. Monitoring, updates, and continuous improvements that keep your software healthy.",
    tags: "Monitoring · Updates · Improvements",
    detail:
      "Under an agreed support plan, we monitor your applications, fix issues, keep dependencies and platforms up to date, improve performance, and keep building on your product as your business evolves.",
    offerings: [
      "Application monitoring",
      "Bug fixes & updates",
      "Performance optimisation",
      "Feature enhancements",
      "Technical support",
    ],
    technologies: ["sentry", "datadog", "newrelic", "prometheus", "grafana", "jira", "linux", "nginx"],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)

export const serviceHref = (slug: string) => `/services/${slug}`
