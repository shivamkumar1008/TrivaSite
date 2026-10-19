"use client"

import { useRef, useState, useTransition } from "react"
import { Button, InputField, TextareaField } from "@figma/astraui"
import { useSite } from "@/components/providers/SiteProvider"
import { contactAttachments, siteConfig } from "@/data/site"
import { sendContact } from "@/lib/sendContact"

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

export default function ContactForm() {
  const { brief, setBrief } = useSite()
  const { name, email, message } = brief
  const [files, setFiles] = useState<File[]>([])
  const [company, setCompany] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const fileInput = useRef<HTMLInputElement>(null)

  const addFiles = (picked: File[]) => {
    const next = [...files, ...picked]
    const unsupported = picked.find((f) => !contactAttachments.extensions.includes(f.name.slice(f.name.lastIndexOf(".")).toLowerCase()))
    if (unsupported) setError(`“${unsupported.name}” isn’t a supported file type.`)
    else if (next.length > contactAttachments.maxFiles) setError(`You can attach up to ${contactAttachments.maxFiles} files.`)
    else if (next.reduce((total, f) => total + f.size, 0) > contactAttachments.maxBytes)
      setError("Attachments can be up to 10 MB in total.")
    else {
      setError(null)
      setFiles(next)
    }
  }

  if (sent) {
    return (
      <div className="draft-result" role="status">
        <strong>Thank you — your project brief is with our team.</strong>
        <div>
          We’re excited to learn more about your idea. Someone from our team will personally get in touch{" "}
          {siteConfig.responseTime} to talk through the next steps.
        </div>
        <Button variant="neutral" type="button" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault()
        setError(null)
        const data = new FormData()
        data.set("name", name)
        data.set("email", email)
        data.set("message", message)
        data.set("company", company)
        for (const file of files) data.append("attachments", file)
        startTransition(async () => {
          try {
            const result = await sendContact(data)
            if (result.ok) {
              setBrief({ name: "", email: "", message: "" })
              setFiles([])
              setSent(true)
            } else {
              setError(result.error)
            }
          } catch {
            setError("We couldn’t send your message right now. Please try again later.")
          }
        })
      }}
    >
      <div className="modal-description">
        Tell us a little about what you have in mind. You’ll hear from us {siteConfig.responseTime}.
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
      <div className="form-files">
        <span className="form-files-label">Attachments (optional)</span>
        <label className="form-files-drop">
          <input
            ref={fileInput}
            type="file"
            multiple
            accept={contactAttachments.extensions.join(",")}
            className="form-files-input"
            onChange={(e) => {
              addFiles(Array.from(e.target.files ?? []))
              e.target.value = ""
            }}
          />
          <span>
            <strong>Choose files</strong> — briefs, wireframes, or documents
          </span>
          <span className="form-files-hint">PDF, Word, PowerPoint, Excel, images or ZIP · up to 10 MB total</span>
        </label>
        {files.length > 0 && (
          <ul className="form-files-list">
            {files.map((file, i) => (
              <li key={`${file.name}-${i}`}>
                <span className="form-files-name">{file.name}</span>
                <span className="form-files-size">{formatSize(file.size)}</span>
                <button
                  type="button"
                  className="form-files-remove"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => {
                    setFiles(files.filter((_, j) => j !== i))
                    fileInput.current?.focus()
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="form-honeypot"
      />
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <Button type="submit" className="cta" disabled={pending}>
        {pending ? "Sending…" : "Send message ↗"}
      </Button>
    </form>
  )
}
