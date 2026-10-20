import type { Metadata } from "next"
import About from "@/components/sections/About"
import Commitments from "@/components/sections/Commitments"
import ContactCta from "@/components/sections/ContactCta"
import Growth from "@/components/sections/Growth"
import ButtonLink from "@/components/ui/ButtonLink"
import ContactButton from "@/components/ui/ContactButton"
import PageHero from "@/components/ui/PageHero"
import JsonLd from "@/components/seo/JsonLd"
import { breadcrumbSchema } from "@/lib/jsonLd"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "About us",
  description:
    "TrivaSite is a team of problem-solvers, designers, and engineers who believe the best solutions come from genuine partnerships.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <JsonLd schemas={[breadcrumbSchema([{ name: "About us", path: "/about" }])]} />
      <PageHero
        eyebrow="ABOUT TRIVASITE"
        title={
          <>
            Your ambition.
            <br />
            Our engineering<span className="brand-period">.</span>
          </>
        }
        intro="A technology partner for everything you’re building. We bring strategy, design, and engineering together to help your business move forward with confidence."
        breadcrumbs={[{ label: "About us" }]}
      >
        <ContactButton className="cta">
          Start a conversation <span aria-hidden="true">↗</span>
        </ContactButton>
        <ButtonLink href="/services" variant="subtle" className="text-action">
          Explore our services <span aria-hidden="true">→</span>
        </ButtonLink>
      </PageHero>

      <About />
      <Commitments title="Built on trust." />
      <Growth />
      <ContactCta />
    </>
  )
}
