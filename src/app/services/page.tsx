import type { Metadata } from "next"
import Commitments from "@/components/sections/Commitments"
import ContactCta from "@/components/sections/ContactCta"
import TechStack from "@/components/sections/TechStack"
import ContactButton from "@/components/ui/ContactButton"
import PageHero from "@/components/ui/PageHero"
import ServiceGrid from "@/components/ui/ServiceGrid"
import { serviceHref, services } from "@/data/services"
import JsonLd from "@/components/seo/JsonLd"
import { breadcrumbSchema, collectionSchema } from "@/lib/jsonLd"
import { pageSeo } from "@/lib/seo"

const description =
  "Web and app development, AI and automation, cloud and DevOps, data science and analytics, product design, enterprise software, QA, cybersecurity, digital marketing, and ongoing support — one technology partner for every stage of your journey."

export const metadata: Metadata = pageSeo({ title: "Services", description, path: "/services" })

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          collectionSchema(
            "Services",
            description,
            "/services",
            services.map(({ title, slug }) => ({ name: title, path: serviceHref(slug) })),
          ),
          breadcrumbSchema([{ name: "Services", path: "/services" }]),
        ]}
      />
      <PageHero
        eyebrow="WHAT WE DO"
        title={
          <>
            The right expertise.
            <br />
            All in one place<span className="brand-period">.</span>
          </>
        }
        intro="One technology partner for every stage of your journey. We connect strategy, design, and engineering to deliver solutions that make a real difference."
        breadcrumbs={[{ label: "Services" }]}
      >
        <ContactButton className="cta">
          Build with us <span aria-hidden="true">↗</span>
        </ContactButton>
      </PageHero>

      <section className="section">
        <div className="container">
          <ServiceGrid items={services} />
        </div>
      </section>

      <TechStack />
      <Commitments />
      <ContactCta />
    </>
  )
}
