import type { Metadata } from "next"
import ContactCta from "@/components/sections/ContactCta"
import Faq from "@/components/sections/Faq"
import PageHero from "@/components/ui/PageHero"
import JsonLd from "@/components/seo/JsonLd"
import { breadcrumbSchema, faqSchema } from "@/lib/jsonLd"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Frequently asked questions",
  description:
    "Answers about TrivaSite’s services, timelines, costs, security, and support after launch.",
  path: "/faq",
})

export default function FaqPage() {
  return (
    <>
      {/* The FAQ list also appears on the home page, but the FAQPage schema lives only
          here so Google has a single canonical source for the rich result. */}
      <JsonLd schemas={[faqSchema(), breadcrumbSchema([{ name: "FAQ", path: "/faq" }])]} />
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Frequently asked questions<span className="brand-period">.</span>
          </>
        }
        intro="Everything you need to know about working with TrivaSite. Can’t find what you’re looking for? Just ask."
        breadcrumbs={[{ label: "FAQ" }]}
      />
      <Faq
        title={
          <>
            Answers,
            <br />
            without the jargon.
          </>
        }
      />
      <ContactCta title="Still have a question?" text="We’d love to hear it. Tell us what you’re thinking about." />
    </>
  )
}
