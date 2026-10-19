import type { Metadata } from "next"
import CareersBoard from "@/components/sections/CareersBoard"
import ButtonLink from "@/components/ui/ButtonLink"
import PageHero from "@/components/ui/PageHero"
import ScrollButton from "@/components/ui/ScrollButton"
import { careerValues } from "@/data/careers"

export const metadata: Metadata = {
  title: "Careers",
  description: "Work at TrivaSite. See open roles, apply online, or send us your resume for future opportunities.",
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title={
          <>
            Build what’s next with us<span className="brand-period">.</span>
          </>
        }
        intro="We’re a growing team of engineers, designers and problem-solvers. If you love building things that work beautifully, we’d like to hear from you."
        breadcrumbs={[{ label: "Careers" }]}
      >
        <ScrollButton to="#apply" className="cta">
          Apply now <span aria-hidden="true">↓</span>
        </ScrollButton>
        <ButtonLink href="/team" variant="subtle" className="text-action">
          Meet the team <span aria-hidden="true">→</span>
        </ButtonLink>
      </PageHero>

      <section className="section approach-section">
        <div className="container">
          <div className="eyebrow">WHY TRIVASITE</div>
          <h2 className="section-title">Good work. Great people.</h2>
          <div className="card-grid">
            {careerValues.map(({ title, text }, i) => (
              <div className="info-card info-card-light" key={title}>
                <span className="info-card-number">0{i + 1}</span>
                <h3 className="info-card-title">{title}</h3>
                <p className="info-card-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CareersBoard />
    </>
  )
}
