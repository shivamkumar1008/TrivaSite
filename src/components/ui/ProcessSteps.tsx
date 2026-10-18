import { processSteps } from "@/data/site"

export default function ProcessSteps() {
  return (
    <ol className="steps">
      {processSteps.map(({ title, text }, i) => (
        <li className="step" key={title}>
          <span className="step-number">0{i + 1}</span>
          <div>
            <h3 className="step-title">{title}</h3>
            <p className="step-copy">{text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
