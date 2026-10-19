"use server"

import { GENERAL_APPLICATION, openRoles, resumeUpload } from "@/data/careers"
import { siteConfig } from "@/data/site"
import { emailHtml, emailLogoAttachment, emailTextSignature } from "@/lib/emailLayout"
import {
  EMAIL_PATTERN,
  SEND_FAILED,
  escapeHtml,
  fileExtension,
  formFiles,
  formText,
  mailConfig,
  fileSize,
  toAttachment,
} from "@/lib/mail"

export type SendApplicationResult = { ok: true } | { ok: false; error: string }

const LIMITS = { name: 120, email: 254, phone: 30, link: 300, message: 5000 }
const PHONE_PATTERN = /^[+()\d\s-]{7,}$/

const isUrl = (value: string) => {
  try {
    return Boolean(new URL(value).hostname.includes("."))
  } catch {
    return false
  }
}

const label = (text: string) =>
  `<td style="padding:8px 12px 8px 0;color:#5c6778;font-size:13px;white-space:nowrap;vertical-align:top">${text}</td>`
const cell = (html: string) => `<td style="padding:8px 0;font-size:15px;color:#132640">${html}</td>`

/**
 * Sends a job application (with resume) to the careers inbox and a no-reply confirmation to the
 * applicant. Expects `name`, `email`, `role`, `message`, a `resume` file, optional `phone` and
 * `link`, and `company`, a honeypot field real visitors never see or fill.
 */
export async function sendApplication(formData: FormData): Promise<SendApplicationResult> {
  const field = (key: string) => formText(formData, key)
  const name = field("name")
  const email = field("email")
  const phone = field("phone")
  const role = field("role") || GENERAL_APPLICATION
  const message = field("message")
  let link = field("link")
  const [resume, ...extraFiles] = formFiles(formData, "resume")

  // Pretend success so bots get no signal.
  if (field("company")) return { ok: true }

  if (!name || !email || !message) return { ok: false, error: "Please fill in your name, email and a short note." }
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "Please enter a valid email address." }
  if (phone && !PHONE_PATTERN.test(phone)) return { ok: false, error: "Please enter a valid phone number." }
  if (role !== GENERAL_APPLICATION && !openRoles.some((r) => r.title === role)) {
    return { ok: false, error: "That role is no longer open. Please choose another or apply generally." }
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    link.length > LIMITS.link ||
    message.length > LIMITS.message
  ) {
    return { ok: false, error: "Some of your answers are too long. Please shorten them and try again." }
  }
  if (link && !/^https?:\/\//i.test(link)) link = `https://${link}`
  if (link && !isUrl(link)) return { ok: false, error: "Please enter a valid LinkedIn or portfolio link." }
  if (!resume || extraFiles.length) return { ok: false, error: "Please attach your resume (one file)." }
  if (!resumeUpload.extensions.includes(fileExtension(resume.name))) {
    return { ok: false, error: "Please upload your resume as a PDF or Word document." }
  }
  if (resume.size >= resumeUpload.maxBytes) return { ok: false, error: "Your resume must be smaller than 5 MB." }

  const mail = mailConfig("sendApplication", "CAREERS_TO_EMAIL")
  if (!mail) return { ok: false, error: SEND_FAILED }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    role: escapeHtml(role),
    link: escapeHtml(link),
    message: escapeHtml(message),
    resume: escapeHtml(resume.name),
  }
  const resumeLine = `${resume.name} (${fileSize(resume.size)})`

  const notification = await mail.resend.emails.send({
    from: mail.from,
    to: mail.to,
    replyTo: email,
    subject: `New application: ${role} — ${name}`,
    text: [
      `New application for: ${role}`,
      `Name: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}${link ? `\nLink: ${link}` : ""}\nResume: ${resumeLine} (attached)`,
      `About them:\n${message}`,
      `Reply to this email to answer ${name} directly.`,
      emailTextSignature,
    ].join("\n\n"),
    html: emailHtml(
      `<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#235ce1;font-weight:600">New application</p>
<h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:#132640">${safe.role}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-top:1px solid #e8edf3;border-bottom:1px solid #e8edf3;margin-bottom:20px">
  <tr>${label("Name")}${cell(safe.name)}</tr>
  <tr>${label("Email")}${cell(`<a href="mailto:${safe.email}" style="color:#235ce1">${safe.email}</a>`)}</tr>
  ${phone ? `<tr>${label("Phone")}${cell(`<a href="tel:${safe.phone.replace(/[^\d+]/g, "")}" style="color:#235ce1">${safe.phone}</a>`)}</tr>` : ""}
  ${link ? `<tr>${label("LinkedIn / portfolio")}${cell(`<a href="${safe.link}" style="color:#235ce1">${safe.link}</a>`)}</tr>` : ""}
  <tr>${label("Resume")}${cell(`${safe.resume} <span style="color:#758196">(${fileSize(resume.size)}, attached)</span>`)}</tr>
</table>
<p style="margin:0 0 6px;font-weight:600">About them</p>
<p style="margin:0 0 20px;white-space:pre-wrap">${safe.message}</p>
<p style="margin:0;font-size:13px;color:#5c6778">Reply to this email to answer ${safe.name} directly.</p>`,
    ),
    attachments: [await toAttachment(resume), emailLogoAttachment],
  })
  if (notification.error) {
    console.error("sendApplication: notification failed", notification.error)
    return { ok: false, error: SEND_FAILED }
  }

  // No Reply-To: the confirmation comes from the no-reply sender and points to the careers inbox.
  // The team already has the application, so a failed confirmation is logged, not shown.
  const firstName = name.split(/\s+/)[0]
  const appliedFor = role === GENERAL_APPLICATION ? "" : ` for the ${role} role`
  const teamUrl = `${siteConfig.url}/team`
  const steps = [
    ["We review your application", "Someone from our team reads every application and resume personally."],
    ["We get in touch", "If your experience matches what we’re looking for, we’ll contact you to set up a conversation."],
    ["We keep you in mind", "If there isn’t a fit right now, we’ll keep your details in mind as new roles open up."],
  ]
  const noReplyNote = `This is an automated message sent from a no-reply address, so replies won’t reach us. Questions about your application? Email ${mail.publicAddress}.`

  const autoReply = await mail.resend.emails.send({
    from: mail.from,
    to: email,
    subject: `We’ve received your application — ${siteConfig.name}`,
    text: [
      `Hi ${firstName},`,
      `Thank you for applying to ${siteConfig.name}${appliedFor}. Your application and resume are with our team, and we’re glad you’d like to build with us.`,
      `Your application\nRole: ${role}\nResume: ${resume.name}`,
      `What happens next:\n${steps.map(([title, text], i) => `${i + 1}. ${title} — ${text}`).join("\n")}`,
      `In the meantime, meet the people you’d be working with: ${teamUrl}`,
      `Warm regards,\nThe ${siteConfig.name} team`,
      emailTextSignature,
      `—\n${noReplyNote}`,
    ].join("\n\n"),
    html: emailHtml(
      `<p>Hi ${escapeHtml(firstName)},</p>
<p>Thank you for applying to ${siteConfig.name}${escapeHtml(appliedFor)}. Your application and resume are with our team, and we’re glad you’d like to build with us.</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f4f7fb;border-radius:12px;margin:20px 0">
  <tr><td style="padding:16px 20px;font-size:14px;line-height:1.7">
    <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#235ce1;font-weight:600;margin-bottom:4px">Your application</div>
    <strong>Role:</strong> ${safe.role}<br><strong>Resume:</strong> ${safe.resume}
  </td></tr>
</table>
<p style="margin-bottom:4px"><strong>What happens next</strong></p>
<ol style="padding-left:20px;margin-top:0">${steps.map(([title, text]) => `<li style="margin-bottom:6px"><strong>${title}</strong> — ${text}</li>`).join("")}</ol>
<p>In the meantime, <a href="${teamUrl}" style="color:#235ce1">meet the people you’d be working with</a>.</p>
<p>Warm regards,<br>The ${siteConfig.name} team</p>`,
      `This is an automated message sent from a no-reply address, so replies won’t reach us. Questions about your application? Email <a href="mailto:${escapeHtml(mail.publicAddress)}" style="color:#888888">${escapeHtml(mail.publicAddress)}</a>.`,
    ),
    attachments: [emailLogoAttachment],
  })
  if (autoReply.error) console.error("sendApplication: auto-reply failed", autoReply.error)

  return { ok: true }
}
