import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ContactCta from "@/components/sections/ContactCta"
import ButtonLink from "@/components/ui/ButtonLink"
import ContactButton from "@/components/ui/ContactButton"
import PageHero from "@/components/ui/PageHero"
import ServiceGrid from "@/components/ui/ServiceGrid"
import { getIndustry, industries, industryHref } from "@/data/industries"
import { services } from "@/data/services"
import JsonLd from "@/components/seo/JsonLd"
import { breadcrumbSchema } from "@/lib/jsonLd"
import { pageSeo } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  return pageSeo({ title: industry.name, description: industry.description, path: industryHref(slug) })
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const relatedServices = industry.services
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined)

  return (
    <>
      <JsonLd
        schemas={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: industryHref(slug) },
          ]),
        ]}
      />
      <PageHero
        eyebrow={`TECHNOLOGY FOR ${industry.name.toUpperCase()}`}
        title={industry.title}
        intro={industry.description}
        breadcrumbs={[{ label: "Industries", href: "/industries" }, { label: industry.name }]}
      >
        <ContactButton className="cta">
          Discuss your project <span aria-hidden="true">↗</span>
        </ContactButton>
        <ButtonLink href="/industries" variant="subtle" className="text-action">
          All industries <span aria-hidden="true">→</span>
        </ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container approach-grid">
          <div>
            <div className="eyebrow">WHERE WE HELP</div>
            <h2 className="section-title">
              Built around
              <br />
              your customers.
            </h2>
            <p className="approach-description">
              We start with the people you serve and the systems you already rely on, then plan
              the right mix of design, engineering, and data.
            </p>
          </div>
          <ol className="steps">
            {industry.highlights.map((highlight, i) => (
              <li className="step" key={highlight}>
                <span className="step-number">0{i + 1}</span>
                <h3 className="step-title">{highlight}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section approach-section">
        <div className="container">
          <div className="eyebrow">RELEVANT SERVICES</div>
          <h2 className="section-title section-title-spaced">The right expertise for {industry.name.toLowerCase()}.</h2>
          <ServiceGrid items={relatedServices} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">OTHER INDUSTRIES</div>
          <div className="industry-tabs">
            {industries
              .filter((i) => i.slug !== industry.slug)
              .map(({ slug, name }) => (
                <ButtonLink key={slug} href={industryHref(slug)} variant="neutral">
                  {name}
                </ButtonLink>
              ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
