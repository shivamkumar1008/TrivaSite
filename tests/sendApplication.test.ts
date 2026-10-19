// @vitest-environment node
// Server Action tests run in Node, where File/FormData behave as they do on the server.
import { beforeEach, describe, expect, it, vi } from "vitest"

const { send } = vi.hoisted(() => ({ send: vi.fn() }))
vi.mock("resend", () => ({ Resend: class { emails = { send } } }))

import { sendApplication } from "@/lib/sendApplication"

const application = (overrides: Record<string, string | File> = {}) => {
  const data = new FormData()
  const fields: Record<string, string | File> = {
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "General application",
    message: "I build <b>React</b> apps.",
    link: "linkedin.com/in/priya",
    resume: new File(["cv"], "priya-cv.pdf"),
    ...overrides,
  }
  for (const [key, value] of Object.entries(fields)) data.set(key, value)
  return data
}

describe("sendApplication", () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: "1" }, error: null })
    vi.stubEnv("RESEND_API_KEY", "re_test")
    vi.stubEnv("CONTACT_FROM_EMAIL", "TrivaSite <no-reply@trivasite.co.in>")
    vi.stubEnv("CONTACT_TO_EMAIL", "connect@trivasite.co.in")
    vi.stubEnv("CAREERS_TO_EMAIL", "")
  })

  it("emails the team with the resume attached and confirms to the applicant", async () => {
    expect(await sendApplication(application())).toEqual({ ok: true })
    const [team, applicant] = send.mock.calls.map(([args]) => args)

    expect(team.to).toEqual(["connect@trivasite.co.in"])
    expect(team.replyTo).toBe("priya@example.com")
    expect(team.subject).toBe("New application: General application — Priya Sharma")
    expect(team.attachments.map((a: { filename: string }) => a.filename)).toContain("priya-cv.pdf")
    expect(team.html).toContain("https://linkedin.com/in/priya")
    expect(team.html).toContain("&lt;b&gt;React&lt;/b&gt;") // applicant text is escaped

    expect(applicant.to).toBe("priya@example.com")
    expect(applicant.replyTo).toBeUndefined()
    expect(applicant.subject).toMatch(/received your application/)
    expect(applicant.html).toContain("Hi Priya")
    expect(applicant.html).not.toContain("I build") // the confirmation doesn't echo their note
  })

  it("uses CAREERS_TO_EMAIL when set", async () => {
    vi.stubEnv("CAREERS_TO_EMAIL", "careers@trivasite.co.in")
    await sendApplication(application())
    expect(send.mock.calls[0][0].to).toEqual(["careers@trivasite.co.in"])
  })

  it("rejects bad input without sending", async () => {
    expect((await sendApplication(application({ resume: new File(["x"], "cv.exe") }))).ok).toBe(false)
    expect((await sendApplication(application({ email: "not-an-email" }))).ok).toBe(false)
    expect((await sendApplication(application({ role: "Astronaut" }))).ok).toBe(false)
    expect((await sendApplication(application({ link: "not a link" }))).ok).toBe(false)
    expect(send).not.toHaveBeenCalled()
  })

  it("only accepts resumes smaller than 5 MB", async () => {
    const MB = 1024 * 1024
    const big = await sendApplication(application({ resume: new File([new Uint8Array(5 * MB)], "cv.pdf") }))
    expect(big).toEqual({ ok: false, error: "Your resume must be smaller than 5 MB." })
    expect(send).not.toHaveBeenCalled()
    expect(await sendApplication(application({ resume: new File([new Uint8Array(5 * MB - 1)], "cv.pdf") }))).toEqual({ ok: true })
  })

  it("quietly drops bot submissions", async () => {
    expect(await sendApplication(application({ company: "Spam Inc" }))).toEqual({ ok: true })
    expect(send).not.toHaveBeenCalled()
  })
})
