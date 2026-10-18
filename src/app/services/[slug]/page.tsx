import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ContactCta from "@/components/sections/ContactCta"
import ButtonLink from "@/components/ui/ButtonLink"
import ContactButton from "@/components/ui/ContactButton"
import PageHero from "@/components/ui/PageHero"
import ProcessSteps from "@/components/ui/ProcessSteps"
import ServiceGrid from "@/components/ui/ServiceGrid"
import TechnologyLogo from "@/components/ui/TechnologyLogo"
import { getService, services } from "@/data/services"
import { allTechnologies } from "@/data/technologies"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug)
  return service ? { title: service.title, description: service.description } : {}
}


export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug)
  if (!service) notFound()

  const technologies = service.technologies
    .map((slug) => allTechnologies.find((t) => t.slug === slug))
    .filter((t) => t !== undefined)
  // The next three services in order (wrapping around), so every page links onward to a full row.
  const index = services.indexOf(service)
  const otherServices = [1, 2, 3].map((step) => services[(index + step) % services.length])

  return (
    <>
      <PageHero
        eyebrow={`${service.number} / ${service.category}`}
        title={
          <>
            {service.title}
            <span className="brand-period">.</span>
          </>
        }
        intro={service.description}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      >
        <ContactButton className="cta">
          Discuss your project <span aria-hidden="true">↗</span>
        </ContactButton>
        <ButtonLink href="/services" variant="subtle" className="text-action">
          All services <span aria-hidden="true">→</span>
        </ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <div>
            <div className="eyebrow">OVERVIEW</div>
            <h2 className="section-title">How we can help.</h2>
            <p className="detail-copy">{service.detail}</p>
            <div className="service-tags">{service.tags}</div>
          </div>
          <div>
            <h3 className="list-heading">What we deliver</h3>
            <ul className="check-list">
              {service.offerings.map((offering) => (
                <li key={offering}>{offering}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section tech-grid-section" aria-labelledby="service-tech-title">
        <div className="container">
          <div className="eyebrow">TOOLS WE OFTEN USE</div>
          <h2 className="section-title" id="service-tech-title">
            The right stack for the job.
          </h2>
          <ul className="tech-grid">
            {technologies.map((tech) => (
              <li className="tech-logo" key={tech.slug} aria-label={tech.name}>
                <TechnologyLogo {...tech} />
              </li>
            ))}
          </ul>
          <p className="tech-footnote">
            Technology choices depend on your project and the systems you already use.
          </p>
        </div>
      </section>

      <section className="section approach-section">
        <div className="container approach-grid">
          <div>
            <div className="eyebrow">HOW WE WORK</div>
            <h2 className="section-title">
              Less complexity.
              <br />
              More clarity.
            </h2>
            <p className="approach-description">
              You’re involved at every step, from the first conversation to the support that
              follows launch.
            </p>
            <ButtonLink href="/approach" variant="subtle" className="text-action">
              Our approach <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">EXPLORE MORE</div>
          <h2 className="section-title section-title-spaced">Other ways we can help.</h2>
          <ServiceGrid items={otherServices} />
        </div>
      </section>

      <ContactCta />
    </>
  )
}
