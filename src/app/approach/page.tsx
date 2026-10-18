import type { Metadata } from "next"
import Commitments from "@/components/sections/Commitments"
import ContactCta from "@/components/sections/ContactCta"
import ContactButton from "@/components/ui/ContactButton"
import PageHero from "@/components/ui/PageHero"
import ProcessSteps from "@/components/ui/ProcessSteps"

export const metadata: Metadata = {
  title: "Our approach",
  description:
    "Listen first, build with purpose, grow together. How TrivaSite keeps you close to the process, the people, and the progress.",
}

const disciplines = [
  {
    title: "Product strategy",
    text: "We clarify the problem, the people it affects, and what success looks like before a line of code is written.",
  },
  {
    title: "UI & UX design",
    text: "Interfaces that feel effortless, designed and tested with the people who will use them.",
  },
  {
    title: "Responsive experiences",
    text: "Websites and apps that work beautifully on every screen, from phones to large displays.",
  },
]

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="HOW WE WORK"
        title={
          <>
            Less complexity.
            <br />
            More clarity<span className="brand-period">.</span>
          </>
        }
        intro="Great software starts with a real conversation. We keep you close to the process, the people, and the progress."
        breadcrumbs={[{ label: "Our approach" }]}
      >
        <ContactButton className="cta">
          Meet your next tech partner <span aria-hidden="true">↗</span>
        </ContactButton>
      </PageHero>

      <section className="section">
        <div className="container approach-grid">
          <div>
            <div className="eyebrow">THREE STEPS</div>
            <h2 className="section-title">
              A clear path from
              <br />
              idea to impact.
            </h2>
            <p className="approach-description">
              Each engagement follows the same rhythm, scaled to the size of your project.
            </p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="section approach-section">
        <div className="container">
          <div className="eyebrow">DESIGN & EXPERIENCE</div>
          <h2 className="section-title">Thoughtfully designed.</h2>
          <div className="card-grid">
            {disciplines.map(({ title, text }, i) => (
              <div className="info-card info-card-light" key={title}>
                <span className="info-card-number">{String(i + 1).padStart(2, "0")} /</span>
                <h3 className="info-card-title">{title}</h3>
                <p className="info-card-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Commitments />
      <ContactCta />
    </>
  )
}
