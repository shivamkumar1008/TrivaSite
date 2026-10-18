"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { Button } from "@figma/astraui"
import { faqs } from "@/data/faqs"

const defaultTitle = (
  <>
    Frequently asked
    <br />
    questions
  </>
)

export default function Faq({ title = defaultTitle }: { title?: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <h2 className="section-title faq-title" id="faq-title">
          {title}
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const open = openIndex === index
            return (
              <div className="faq-item" key={faq.question}>
                <h3>
                  <Button
                    variant="subtle"
                    className="faq-trigger"
                    id={`faq-question-${index}`}
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-chevron" aria-hidden="true" />
                  </Button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  hidden={!open}
                  className="faq-answer"
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
