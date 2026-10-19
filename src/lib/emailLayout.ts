import { siteConfig } from "@/data/site"
import { emailLogoBase64 } from "@/lib/emailLogo"

const LOGO_CID = "trivasite-logo"
const siteHost = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "")

/** Inline logo for the banner; add it to every email that uses `emailHtml`. */
export const emailLogoAttachment = {
  filename: "trivasite.png",
  content: Buffer.from(emailLogoBase64, "base64"),
  contentId: LOGO_CID,
}

/** Brand banner (logo, name and tagline) that closes every automated email. */
const banner = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#102542;border-radius:12px">
  <tr>
    <td style="padding:20px 24px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="middle" style="padding-right:16px">
            <div style="background:#ffffff;border-radius:14px;padding:6px;width:48px">
              <img src="cid:${LOGO_CID}" width="48" height="48" alt="${siteConfig.name} logo" style="display:block;border:0">
            </div>
          </td>
          <td valign="middle" style="font-family:Arial,Helvetica,sans-serif">
            <div style="font-size:22px;line-height:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px">${siteConfig.name}<span style="color:#3fd0c9">.</span></div>
            <div style="font-size:14px;line-height:20px;color:#d4e1fc">${siteConfig.tagline}</div>
            <div style="font-size:12px;line-height:18px;padding-top:4px"><a href="${siteConfig.url}" style="color:#8fb0f5;text-decoration:none">${siteHost}</a></div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`

/**
 * Wraps an email body in the shared layout: content, then the brand banner, then an optional
 * small-print footnote. Pair with `emailLogoAttachment` so the banner's logo shows.
 */
export function emailHtml(body: string, footnote?: string) {
  return `<div style="background:#f4f7fb;padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px">
  <tr>
    <td style="padding:32px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#222222">${body}</td>
  </tr>
  <tr>
    <td style="padding:16px 24px 24px">${banner}</td>
  </tr>
</table>
${footnote ? `<p style="max-width:560px;margin:16px auto 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#888888;text-align:center">${footnote}</p>` : ""}
</div>`
}

/** Plain-text equivalent of the banner for the text part of an email. */
export const emailTextSignature = `${siteConfig.name} — ${siteConfig.tagline}\n${siteHost}`
