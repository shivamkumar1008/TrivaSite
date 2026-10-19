"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@figma/astraui"
import TeamCard from "@/components/ui/TeamCard"
import { team } from "@/data/team"

export default function Growth() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="growth-section" aria-labelledby="growth-title">
      <div className="container growth-header">
        <div>
          <div className="eyebrow">OUR TEAM</div>
          <h2 id="growth-title" className="section-title">
            The people building with <span className="brand-period">you.</span>
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
          {team.map((member) => (
            <TeamCard
              key={member.slug}
              member={member}
              className="growth-portrait"
              sizes="(max-width: 720px) 60vw, 27vw"
            />
          ))}
        </div>
      </div>
      <div className="container growth-footnote">
        The people behind TrivaSite.{" "}
        <Link href="/team" className="growth-team-link">
          Meet the team <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
