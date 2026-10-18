import ContactButton from "@/components/ui/ContactButton"
import ProcessSteps from "@/components/ui/ProcessSteps"

export default function Approach() {
  return (
    <section className="section approach-section" id="approach">
      <div className="container approach-grid">
        <div>
          <div className="eyebrow">HOW WE WORK</div>
          <h2 className="section-title">
            Less complexity.
            <br />
            More clarity.
          </h2>
          <p className="approach-description">
            Great software starts with a real conversation. We keep you close to the process, the
            people, and the progress.
          </p>
          <ContactButton className="cta">
            Meet your next tech partner <span aria-hidden="true">↗</span>
          </ContactButton>
        </div>
        <ProcessSteps />
      </div>
    </section>
  )
}
