"use client"

import { Button } from "@figma/astraui"
import { useSite } from "@/components/providers/SiteProvider"
import ButtonLink from "@/components/ui/ButtonLink"
import { industries, industryHref } from "@/data/industries"

export default function Industries() {
  const { industry, setIndustry, openContact } = useSite()
  const active = industries[industry]

  return (
    <section className="section" id="industries">
      <div className="container">
        <div className="eyebrow">BUILT FOR YOUR WORLD</div>
        <h2 className="section-title">Different industries. Shared ambition.</h2>
        <div className="industry-tabs" role="group" aria-label="Industry selection">
          {industries.map(({ name }, i) => (
            <Button
              key={name}
              variant={industry === i ? "primary" : "neutral"}
              aria-pressed={industry === i}
              onClick={() => setIndustry(i)}
            >
              {name}
            </Button>
          ))}
        </div>
        <div className="industry-content" aria-live="polite">
          <div>
            <div className="industry-label">TECHNOLOGY FOR {active.name.toUpperCase()}</div>
            <h3 className="industry-title">{active.title}</h3>
          </div>
          <div className="industry-description">
            {active.description}
            <div className="industry-actions">
              <ButtonLink href={industryHref(active.slug)} variant="subtle" className="industry-link">
                See how we help ↗
              </ButtonLink>
              <Button variant="subtle" className="industry-link" onClick={openContact}>
                Discuss your project ↗
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
