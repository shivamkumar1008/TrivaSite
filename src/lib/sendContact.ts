"use server"

import { contactAttachments, siteConfig } from "@/data/site"
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

export type SendContactResult = { ok: true } | { ok: false; error: string }

const LIMITS = { name: 120, email: 254, message: 5000 }

/**
 * Emails a contact brief (with any attachments) to the TrivaSite team and sends the visitor a
 * no-reply confirmation. Expects `name`, `email`, `message`, optional `attachments` files, and
 * `company`, a honeypot field real visitors never see or fill.
 */
export async function sendContact(formData: FormData): Promise<SendContactResult> {
  const field = (key: string) => formText(formData, key)
  const name = field("name")
  const email = field("email")
  const message = field("message")
  const files = formFiles(formData, "attachments")

  // Pretend success so bots get no signal.
  if (field("company")) return { ok: true }

  if (!name || !email || !message) return { ok: false, error: "Please fill in every field." }
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "Please enter a valid email address." }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return { ok: false, error: "Your message is too long. Please shorten it and try again." }
  }
  if (files.length > contactAttachments.maxFiles) {
    return { ok: false, error: `Please attach up to ${contactAttachments.maxFiles} files.` }
  }
  if (files.reduce((total, f) => total + f.size, 0) > contactAttachments.maxBytes) {
    return { ok: false, error: "Attachments can be up to 10 MB in total." }
  }
  if (files.some((f) => !contactAttachments.extensions.includes(fileExtension(f.name)))) {
    return { ok: false, error: "One of your files isn’t a supported type." }
  }

  const mail = mailConfig("sendContact")
  if (!mail) return { ok: false, error: SEND_FAILED }

  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message) }
  const attachments = await Promise.all(files.map(toAttachment))
  const fileList = files.map((f) => `${f.name} (${fileSize(f.size)})`)

  const notification = await mail.resend.emails.send({
    from: mail.from,
    to: mail.to,
    replyTo: email,
    subject: `New project brief from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}${fileList.length ? `\n\nAttachments:\n${fileList.join("\n")}` : ""}\n\n${emailTextSignature}`,
    html: emailHtml(
      `<p><strong>Name:</strong> ${safe.name}<br><strong>Email:</strong> ${safe.email}</p><p style="white-space:pre-wrap">${safe.message}</p>${
        fileList.length ? `<p><strong>Attachments:</strong><br>${fileList.map(escapeHtml).join("<br>")}</p>` : ""
      }`,
    ),
    attachments: [...attachments, emailLogoAttachment],
  })
  if (notification.error) {
    console.error("sendContact: notification failed", notification.error)
    return { ok: false, error: SEND_FAILED }
  }

  // No Reply-To: the confirmation points visitors to the public contact address instead.
  // The team already has the brief, so a failed confirmation is logged but not shown to the visitor.
  const contactEmail = mail.publicAddress
  const firstName = name.split(/\s+/)[0]
  const safeFirstName = escapeHtml(firstName)
  const servicesUrl = `${siteConfig.url}/services`
  const steps = [
    ["We review your brief", "A specialist on our team reads through your goals and anything you’ve shared."],
    ["We reach out", `You’ll hear from us ${siteConfig.responseTime} to set up a short call at a time that suits you.`],
    ["You get a clear plan", "Defined deliverables, milestones, and an estimate built around your project."],
  ]

  const autoReply = await mail.resend.emails.send({
    from: mail.from,
    to: email,
    subject: `We’ve received your project brief — ${siteConfig.name}`,
    text: [
      `Hi ${firstName},`,
      `Thank you for reaching out to ${siteConfig.name}. Your project details are now with our team, and we’re looking forward to learning more about what you’re building.`,
      `What happens next:\n${steps.map(([title, text], i) => `${i + 1}. ${title} — ${text}`).join("\n")}`,
      `In the meantime, you can explore our services at ${servicesUrl}.`,
      `Warm regards,\nThe ${siteConfig.name} team`,
      emailTextSignature,
      `—\nThis is an automated message sent from a no-reply address, so replies won’t reach us. To contact us, email ${contactEmail}.`,
    ].join("\n\n"),
    html: emailHtml(
      `<p>Hi ${safeFirstName},</p>
<p>Thank you for reaching out to ${siteConfig.name}. Your project details are now with our team, and we’re looking forward to learning more about what you’re building.</p>
<p style="margin-bottom:4px"><strong>What happens next</strong></p>
<ol style="padding-left:20px;margin-top:0">${steps.map(([title, text]) => `<li style="margin-bottom:6px"><strong>${title}</strong> — ${text}</li>`).join("")}</ol>
<p>In the meantime, feel free to <a href="${servicesUrl}" style="color:#235ce1">explore our services</a>.</p>
<p>Warm regards,<br>The ${siteConfig.name} team</p>`,
      `This is an automated message sent from a no-reply address, so replies won’t reach us. To contact us, email <a href="mailto:${escapeHtml(contactEmail)}" style="color:#888888">${escapeHtml(contactEmail)}</a>.`,
    ),
    attachments: [emailLogoAttachment],
  })
  if (autoReply.error) console.error("sendContact: auto-reply failed", autoReply.error)

  return { ok: true }
}
