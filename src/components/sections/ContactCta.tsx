import type { ReactNode } from "react"
import ContactButton from "@/components/ui/ContactButton"

type ContactCtaProps = {
  title?: ReactNode
  text?: ReactNode
}

export default function ContactCta({
  title = "What are you imagining?",
  text = "Bring your idea. We’ll bring the expertise to move it forward.",
}: ContactCtaProps) {
  return (
    <section className="contact-section">
      <div className="container contact-inner">
        <div>
          <div className="eyebrow">LET’S MAKE IT HAPPEN</div>
          <h2 className="section-title">{title}</h2>
          <p className="contact-copy">{text}</p>
        </div>
        <ContactButton className="cta">
          Let’s build something great <span aria-hidden="true">↗</span>
        </ContactButton>
      </div>
    </section>
  )
}
