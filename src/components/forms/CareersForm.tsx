"use client"

import { useRef, useState, useTransition } from "react"
import { Button, InputField, SelectField, TextareaField } from "@figma/astraui"
import { GENERAL_APPLICATION, openRoles, resumeUpload } from "@/data/careers"
import { sendApplication } from "@/lib/sendApplication"

const emptyForm = { name: "", email: "", phone: "", link: "", message: "" }

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

type CareersFormProps = {
  /** Selected role title, or GENERAL_APPLICATION. Lifted so "Apply" buttons on role cards can set it. */
  role: string
  onRoleChange: (role: string) => void
}

export default function CareersForm({ role, onRoleChange }: CareersFormProps) {
  const [form, setForm] = useState(emptyForm)
  const [resume, setResume] = useState<File | null>(null)
  const [company, setCompany] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const fileInput = useRef<HTMLInputElement>(null)

  const update = (key: keyof typeof emptyForm) => (value: string) => setForm({ ...form, [key]: value })
  const roleOptions = [
    ...openRoles.map(({ title }) => ({ value: title, label: title })),
    { value: GENERAL_APPLICATION, label: "General application (no specific role)" },
  ]

  const pickResume = (file: File | undefined) => {
    if (!file) return
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
    if (!resumeUpload.extensions.includes(ext)) setError("Please upload your resume as a PDF or Word document.")
    else if (file.size >= resumeUpload.maxBytes) setError("Your resume must be smaller than 5 MB.")
    else {
      setError(null)
      setResume(file)
    }
  }

  if (sent) {
    return (
      <div className="draft-result" role="status">
        <strong>Thanks for applying — we’ve got it!</strong>
        <div>We read every application personally and will reach out if there’s a fit.</div>
        <Button variant="neutral" type="button" onClick={() => setSent(false)}>
          Submit another application
        </Button>
      </div>
    )
  }

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (!resume) {
          setError("Please attach your resume.")
          fileInput.current?.focus()
          return
        }
        setError(null)
        const data = new FormData()
        for (const [key, value] of Object.entries(form)) data.set(key, value)
        data.set("role", role)
        data.set("company", company)
        data.set("resume", resume)
        startTransition(async () => {
          try {
            const result = await sendApplication(data)
            if (result.ok) {
              setForm(emptyForm)
              setResume(null)
              onRoleChange(GENERAL_APPLICATION)
              setSent(true)
            } else {
              setError(result.error)
            }
          } catch {
            setError("We couldn’t send your application right now. Please try again later.")
          }
        })
      }}
    >
      {/* With no openings there is nothing to choose: every application is a general one. */}
      {openRoles.length > 0 && <SelectField label="Role" options={roleOptions} value={role} onChange={onRoleChange} />}
      <InputField
        label="Full name"
        placeholder="Alex Morgan"
        value={form.name}
        onChange={update("name")}
        required
        autoComplete="name"
      />
      <InputField
        label="Email"
        type="email"
        placeholder="alex@email.com"
        value={form.email}
        onChange={update("email")}
        required
        autoComplete="email"
      />
      <InputField
        label="Phone (optional)"
        type="tel"
        placeholder="+91 98765 43210"
        value={form.phone}
        onChange={update("phone")}
        autoComplete="tel"
      />
      <InputField
        label="LinkedIn or portfolio (optional)"
        type="url"
        placeholder="linkedin.com/in/your-name"
        value={form.link}
        onChange={update("link")}
        autoComplete="url"
      />
      <TextareaField
        label="Tell us about yourself"
        placeholder="What you do, what you’d like to work on, and why TrivaSite…"
        value={form.message}
        onChange={update("message")}
        required
        rows={5}
      />
      <div className="form-files">
        <span className="form-files-label">Resume</span>
        <label className="form-files-drop">
          <input
            ref={fileInput}
            type="file"
            accept={resumeUpload.extensions.join(",")}
            className="form-files-input"
            onChange={(e) => {
              pickResume(e.target.files?.[0])
              e.target.value = ""
            }}
          />
          <span>
            <strong>{resume ? "Replace resume" : "Upload your resume"}</strong> — PDF or Word
          </span>
          <span className="form-files-hint">PDF, DOC or DOCX · less than 5 MB</span>
        </label>
        {resume && (
          <ul className="form-files-list">
            <li>
              <span className="form-files-name">{resume.name}</span>
              <span className="form-files-size">{formatSize(resume.size)}</span>
              <button
                type="button"
                className="form-files-remove"
                aria-label={`Remove ${resume.name}`}
                onClick={() => {
                  setResume(null)
                  fileInput.current?.focus()
                }}
              >
                ×
              </button>
            </li>
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
        {pending ? "Sending…" : "Submit application ↗"}
      </Button>
    </form>
  )
}
