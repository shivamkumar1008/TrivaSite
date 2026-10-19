import type { Metadata } from "next"
import ContactForm from "@/components/forms/ContactForm"
import PageHero from "@/components/ui/PageHero"

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your idea and start the conversation with TrivaSite.",
}

const nextSteps = [
  {
    title: "Share your idea",
    text: "Tell us what you want to build, who it’s for, and any timeline you have in mind.",
  },
  {
    title: "Talk it through",
    text: "We’ll discuss your goals, existing systems, and what a first phase could look like.",
  },
  {
    title: "Get a clear plan",
    text: "You receive defined deliverables, milestones, and an estimate — not a one-size-fits-all price.",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="LET’S MAKE IT HAPPEN"
        title={
          <>
            What are you imagining<span className="brand-period">?</span>
          </>
        }
        intro="Bring your idea. We’ll bring the expertise to move it forward."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container contact-page-grid">
          <div>
            <div className="eyebrow">WHAT HAPPENS NEXT</div>
            <h2 className="section-title section-title-spaced">From first message to a clear plan.</h2>
            <ol className="steps">
              {nextSteps.map(({ title, text }, i) => (
                <li className="step" key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <div>
                    <h3 className="step-title">{title}</h3>
                    <p className="step-copy">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="contact-card">
            <h2 className="list-heading">Tell us about your project</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
