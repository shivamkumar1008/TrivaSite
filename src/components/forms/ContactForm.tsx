"use client"

import { useState } from "react"
import { Button, InputField, TextareaField } from "@figma/astraui"
import { useSite } from "@/components/providers/SiteProvider"

export default function ContactForm() {
  const { brief, setBrief } = useSite()
  const { name, email, message } = brief
  const [draft, setDraft] = useState(false)

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(`${name}\n${email}\n\n${message}`)
      setDraft(false)
    } catch {
      /* The visible brief remains available for manual copying. */
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault()
        setDraft(true)
      }}
    >
      <div className="modal-description">
        Tell us a little about what you have in mind. Prepare a project brief to share with your
        TrivaSite contact.
      </div>
      <InputField
        label="Your name"
        placeholder="Alex Morgan"
        value={name}
        onChange={(value) => setBrief({ ...brief, name: value })}
        required
        autoComplete="name"
      />
      <InputField
        label="Work email"
        type="email"
        placeholder="alex@company.com"
        value={email}
        onChange={(value) => setBrief({ ...brief, email: value })}
        required
        autoComplete="email"
      />
      <TextareaField
        label="What would you like to build?"
        placeholder="A little about your idea, goals, and timeline…"
        value={message}
        onChange={(value) => setBrief({ ...brief, message: value })}
        required
        rows={4}
      />
      {draft ? (
        <div className="draft-result" role="status">
          <strong>Your project brief is ready.</strong>
          <div>
            No message has been sent. Copy your brief below and share it with your TrivaSite
            contact.
          </div>
          <div className="brief-text">
            {name} · {email}
            <br />
            {message}
          </div>
          <Button variant="neutral" type="button" onClick={copyBrief}>
            Copy brief
          </Button>
        </div>
      ) : (
        <Button type="submit" className="cta">
          Prepare project brief ↗
        </Button>
      )}
    </form>
  )
}
