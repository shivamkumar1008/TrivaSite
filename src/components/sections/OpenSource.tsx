import { openSourceProjects } from "@/data/openSource"

export default function OpenSource() {
  return (
    <section className="section" aria-labelledby="open-source-title">
      <div className="container">
        <div className="eyebrow">OUR OPEN-SOURCE PROJECTS</div>
        <h2 className="section-title" id="open-source-title">
          Built in the open, free to use.
        </h2>
        <div className="card-grid">
          {openSourceProjects.map(({ name, url, tag, description }) => (
            <a className="info-card oss-card" href={url} target="_blank" rel="noopener noreferrer" key={url}>
              <span className="info-card-number">{tag}</span>
              <h3 className="info-card-title">{name}</h3>
              <p className="info-card-text">{description}</p>
              <span className="oss-card-link">
                {new URL(url).hostname} <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
