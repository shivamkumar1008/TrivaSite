"use client"

import { useState } from "react"
import { Button } from "@figma/astraui"
import TechnologyLogo from "@/components/ui/TechnologyLogo"
import { technologyRows } from "@/data/technologies"

export default function TechStack() {
  const [paused, setPaused] = useState(false)

  return (
    <section className={`tech-section${paused ? " tech-paused" : ""}`} aria-labelledby="tech-title">
      <div className="container tech-heading">
        <div>
          <div className="eyebrow">THE TOOLS BEHIND THE POSSIBILITIES</div>
          <h2 className="section-title" id="tech-title">
            Built with the right technology.
          </h2>
          <p className="tech-description">
            From proven foundations to what’s next. The right stack for your ambition.
          </p>
        </div>
        <Button variant="neutral" size="small" onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? "Resume motion" : "Pause motion"}
        </Button>
      </div>

      <div className="tech-marquees">
        {technologyRows.map((row, rowIndex) => (
          <div className={`tech-lane tech-lane-${rowIndex}`} key={row.label} role="group" aria-label={row.label}>
            <div className="tech-track">
              {/* The set is rendered twice so the marquee loops seamlessly; the copy is hidden from assistive tech. */}
              {[0, 1].map((copy) => (
                <div className="tech-logo-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {row.items.map((tech) => (
                    <div
                      className="tech-logo"
                      key={tech.slug}
                      tabIndex={copy === 0 ? 0 : undefined}
                      role="img"
                      aria-label={tech.name}
                    >
                      <TechnologyLogo {...tech} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container tech-footnote">
        Technology choices depend on your project. Hover over a logo to see its original colors.
      </div>
    </section>
  )
}
