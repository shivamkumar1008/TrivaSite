import type { Metadata } from "next"
import ContactCta from "@/components/sections/ContactCta"
import Faq from "@/components/sections/Faq"
import PageHero from "@/components/ui/PageHero"

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about TrivaSite’s services, timelines, costs, security, and support after launch.",
}

export default function FaqPage() {
  return (
    <>
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
