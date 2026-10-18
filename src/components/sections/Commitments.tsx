import { promises } from "@/data/site"

export default function Commitments({ title = "What you can count on." }: { title?: string }) {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">OUR COMMITMENTS</div>
        <h2 className="section-title">{title}</h2>
        <div className="card-grid">
          {promises.map(({ title, text }, i) => (
            <div className="info-card" key={title}>
              <span className="info-card-number">{String(i + 1).padStart(2, "0")} /</span>
              <h3 className="info-card-title">{title}</h3>
              <p className="info-card-text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
