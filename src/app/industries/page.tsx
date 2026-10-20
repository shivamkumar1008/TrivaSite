import type { Metadata } from "next"
import ContactCta from "@/components/sections/ContactCta"
import ButtonLink from "@/components/ui/ButtonLink"
import PageHero from "@/components/ui/PageHero"
import { industries, industryHref } from "@/data/industries"
import JsonLd from "@/components/seo/JsonLd"
import { breadcrumbSchema, collectionSchema } from "@/lib/jsonLd"
import { pageSeo } from "@/lib/seo"

const description =
  "Technology for financial services, healthcare, retail & commerce, education, and startups & SaaS."

export const metadata: Metadata = pageSeo({ title: "Industries", description, path: "/industries" })

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          collectionSchema(
            "Industries",
            description,
            "/industries",
            industries.map(({ name, slug }) => ({ name, path: industryHref(slug) })),
          ),
          breadcrumbSchema([{ name: "Industries", path: "/industries" }]),
        ]}
      />
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
