import ContactButton from "@/components/ui/ContactButton"
import ServiceGrid from "@/components/ui/ServiceGrid"
import { services } from "@/data/services"

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="eyebrow">WHAT WE DO</div>
        <div className="section-heading-row">
          <h2 className="section-title">
            The right expertise.
            <br />
            All in one place.
          </h2>
          <p className="section-intro">
            One technology partner for every stage of your journey.
            <br className="desktop-break" /> We connect strategy, design, and engineering to
            deliver
            <br className="desktop-break" /> solutions that make a real difference.
          </p>
        </div>
        <ServiceGrid items={services} />
        <div className="services-note">
          <span>Have something else in mind? We love a good challenge.</span>
          <ContactButton variant="subtle">
            Tell us about it <span aria-hidden="true">→</span>
          </ContactButton>
        </div>
      </div>
    </section>
  )
}
