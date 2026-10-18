"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@figma/astraui"
import { growthPortraits, unsplashUrl } from "@/data/portraits"

export default function Growth() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="growth-section" aria-labelledby="growth-title">
      <div className="container growth-header">
        <div>
          <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
          <h2 id="growth-title" className="section-title">
            TrivaSite grows with <span className="brand-period">you.</span>
          </h2>
        </div>
        <div className="growth-controls">
          <span>Big ambitions. Real possibilities.</span>
          <Button variant="neutral" size="small" aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? "Resume motion" : "Pause motion"}
          </Button>
        </div>
      </div>
      <div className={`portrait-window${paused ? " is-paused" : ""}`}>
        <div className="portrait-track">
          {growthPortraits.map((portrait) => (
            <figure className="growth-portrait" key={portrait.image}>
              <Image
                src={unsplashUrl(portrait.image, 800)}
                alt="Illustrative portrait of a business professional"
                fill
                sizes="(max-width: 720px) 60vw, 27vw"
              />
              <figcaption>
                <strong>{portrait.title}</strong>
                <span>{portrait.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="container growth-footnote">
        Built for people with a vision, at every stage of business. Portraits are illustrative.
      </div>
    </section>
  )
}
