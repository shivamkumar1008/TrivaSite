import { careersEmail } from "@/data/careers"
import { faqs } from "@/data/faqs"
import { industries, industryHref } from "@/data/industries"
import { serviceHref, services } from "@/data/services"
import { siteConfig } from "@/data/site"
import { team, teamHref } from "@/data/team"
import { absoluteUrl } from "@/lib/seo"

/**
 * /llms.txt — the llmstxt.org convention: a Markdown summary of the site for LLMs and
 * AI search crawlers, which otherwise have to infer structure from rendered HTML.
 *
 * Generated from src/data rather than committed as a static file in public/, so adding a
 * service, industry or team member updates it automatically.
 */

// Everything is read from src/data at build time, so prerender it like robots.txt and
// sitemap.xml instead of letting the GET handler run per request.
export const dynamic = "force-static"

const link = (label: string, path: string, description: string) =>
  `- [${label}](${absoluteUrl(path)}): ${description}`

function body(): string {
  const sections = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.tagline} TrivaSite plans, designs, builds, and supports software for businesses — from a first website to connected platforms, AI-assisted workflows, and the cloud infrastructure underneath. We reply to new enquiries ${siteConfig.responseTime}.`,
    "",
    "## Services",
    "",
    ...services.map((service) => link(service.title, serviceHref(service.slug), service.description)),
    "",
    "## Industries",
    "",
    ...industries.map((industry) => link(industry.name, industryHref(industry.slug), industry.description)),
    "",
    "## Company",
    "",
    link("About TrivaSite", "/about", "Who we are and what we care about."),
    link("Our approach", "/approach", "How a project runs: listen first, build with purpose, grow together."),
    link("Our team", "/team", "The people who plan, design, build, and support your software."),
    ...team.map((member) => link(member.name, teamHref(member.slug), member.caption)),
    "",
    "## Contact & careers",
    "",
    link("Contact", "/contact", `Start a conversation about a project; we reply ${siteConfig.responseTime}.`),
    link("Careers", "/careers", `Open roles and general applications (${careersEmail}).`),
    "",
    "## FAQ",
    "",
    link("Frequently asked questions", "/faq", "Services, timelines, cost, security, and support after launch."),
    "",
    // The answers verbatim, so an assistant can respond without fetching another page.
    ...faqs.flatMap(({ question, answer }) => [`### ${question}`, "", answer, ""]),
    "## Optional",
    "",
    link("Sitemap", "/sitemap.xml", "Every indexable URL on the site."),
  ]
  return `${sections.join("\n").trimEnd()}\n`
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
