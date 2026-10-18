import { promises } from "@/data/site"

export default function PromiseStrip() {
  return (
    <section className="promise-strip" aria-label="Our commitments">
      <div className="container promise-inner">
        <div className="promise-intro">
          Big ideas deserve
          <br />
          <strong>a dependable partner.</strong>
        </div>
        {promises.map(({ title }, i) => (
          <div key={title}>
            <span>{String(i + 1).padStart(2, "0")}</span> {title}
          </div>
        ))}
      </div>
    </section>
  )
}
