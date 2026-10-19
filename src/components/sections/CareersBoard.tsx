"use client"

import { useState } from "react"
import { Button } from "@figma/astraui"
import CareersForm from "@/components/forms/CareersForm"
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider"
import { GENERAL_APPLICATION, careersEmail, openRoles } from "@/data/careers"

/** Open roles (or an empty state) plus the application form; "Apply" on a role preselects it. */
export default function CareersBoard() {
  const [role, setRole] = useState(GENERAL_APPLICATION)
  const { scrollTo } = useSmoothScroll()

  const applyFor = (title: string) => {
    setRole(title)
    scrollTo("#apply")
  }

  return (
    <>
      <section className="section" aria-labelledby="roles-title">
        <div className="container">
          <div className="eyebrow">OPEN ROLES</div>
          <h2 id="roles-title" className="section-title section-title-spaced">
            {openRoles.length ? "Join the team." : "No open roles right now."}
          </h2>
          {openRoles.length ? (
            <ul className="role-list">
              {openRoles.map((r) => (
                <li className="role-card" key={r.slug}>
                  <div className="role-card-head">
                    <div>
                      <h3 className="role-title">{r.title}</h3>
                      <p className="role-meta">
                        {r.type} · {r.location}
                      </p>
                    </div>
                    <Button className="cta" onClick={() => applyFor(r.title)}>
                      Apply <span aria-hidden="true">↗</span>
                    </Button>
                  </div>
                  <p className="role-summary">{r.summary}</p>
                  <details className="role-details">
                    <summary>Role details</summary>
                    <div className="role-details-grid">
                      <div>
                        <h4 className="list-heading">What you’ll do</h4>
                        <ul className="check-list">
                          {r.responsibilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="list-heading">What we’re looking for</h4>
                        <ul className="check-list">
                          {r.requirements.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          ) : (
            <div className="role-empty">
              <p>
                We don’t have an opening at the moment, but we’re always happy to meet talented people. Send us your
                resume and a few lines about yourself — when a role opens up that fits, you’ll be among the first we
                contact.
              </p>
              <Button className="cta" onClick={() => scrollTo("#apply")}>
                Drop your resume <span aria-hidden="true">↓</span>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="section careers-apply-section" id="apply" aria-labelledby="apply-title">
        <div className="container contact-page-grid">
          <div>
            <div className="eyebrow">APPLY</div>
            <h2 id="apply-title" className="section-title section-title-spaced">
              {openRoles.length ? "Apply in a few minutes." : "Send us your resume."}
            </h2>
            <ol className="steps">
              {[
                ["Tell us about you", "Share your details, a short note and your resume (PDF or Word, less than 5 MB)."],
                ["Get a confirmation", "You’ll receive an email right away confirming we have your application."],
                ["Hear from us", "Our team reviews every application and reaches out when there’s a good fit."],
              ].map(([title, text], i) => (
                <li className="step" key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <div>
                    <h3 className="step-title">{title}</h3>
                    <p className="step-copy">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="careers-contact">
              Questions about a role or recruitment? Email{" "}
              <a href={`mailto:${careersEmail}`}>{careersEmail}</a>
            </p>
          </div>
          <div className="contact-card">
            <h3 className="list-heading">
              {role === GENERAL_APPLICATION ? "General application" : `Apply: ${role}`}
            </h3>
            <CareersForm role={role} onRoleChange={setRole} />
          </div>
        </div>
      </section>
    </>
  )
}
