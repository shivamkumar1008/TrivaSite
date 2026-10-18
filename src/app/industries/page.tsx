import type { Metadata } from "next"
import ContactCta from "@/components/sections/ContactCta"
import ButtonLink from "@/components/ui/ButtonLink"
import PageHero from "@/components/ui/PageHero"
import { industries, industryHref } from "@/data/industries"

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Technology for financial services, healthcare, retail & commerce, education, and startups & SaaS.",
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="BUILT FOR YOUR WORLD"
        title={
          <>
            Different industries.
            <br />
            Shared ambition<span className="brand-period">.</span>
          </>
        }
        intro="Every sector has its own users, regulations, and systems. We bring the same care to each — and shape the solution around yours."
        breadcrumbs={[{ label: "Industries" }]}
      />

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {industries.map((industry) => (
              <article className="service-card" key={industry.slug}>
                <div className="service-top">
                  <span className="service-category">{industry.name.toUpperCase()}</span>
                </div>
                <h2 className="service-title">{industry.title}</h2>
                <p className="service-description">{industry.description}</p>
                <ButtonLink
                  href={industryHref(industry.slug)}
                  variant="subtle"
                  className="service-link"
                  aria-label={`Explore ${industry.name}`}
                >
                  Explore industry <span aria-hidden="true">↗</span>
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta title="Don’t see your industry?" text="We love a good challenge. Tell us what you’re building." />
    </>
  )
}
