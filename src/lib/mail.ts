import { Resend } from "resend"

/** Helpers shared by the server actions that send email (contact form, careers form). Server-only. */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const SEND_FAILED = "We couldn’t send your message right now. Please try again later."

export const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

/** ".pdf" from "Resume.PDF". */
export const fileExtension = (filename: string) => filename.slice(filename.lastIndexOf(".")).toLowerCase()

/** "240 KB" or "2.4 MB". */
export const fileSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

/** Trimmed string value of a form field ("" when missing). */
export const formText = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim()

/** Non-empty uploaded files for a form field. */
export const formFiles = (formData: FormData, key: string) =>
  formData.getAll(key).filter((f): f is File => f instanceof File && f.size > 0)

export const toAttachment = async (file: File) => ({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) })

/**
 * Resend client plus sender and inbox addresses from the environment, or null (logged) when
 * something is missing. `inbox` is the override env var for this form, falling back to CONTACT_TO_EMAIL.
 */
export function mailConfig(caller: string, inboxVar?: string) {
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env
  const inbox = (inboxVar && process.env[inboxVar]) || CONTACT_TO_EMAIL
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !inbox) {
    console.error(`${caller}: RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL must be set`)
    return null
  }
  const to = inbox.split(",").map((address) => address.trim())
  return { resend: new Resend(RESEND_API_KEY), from: CONTACT_FROM_EMAIL, to, publicAddress: to[0] }
}
