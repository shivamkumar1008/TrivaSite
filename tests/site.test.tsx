import type { ReactNode } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import CareersForm from "@/components/forms/CareersForm"
import ContactForm from "@/components/forms/ContactForm"
import Header from "@/components/layout/Header"
import SiteProvider from "@/components/providers/SiteProvider"
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider"
import Faq from "@/components/sections/Faq"
import Growth from "@/components/sections/Growth"
import Hero from "@/components/sections/Hero"
import Industries from "@/components/sections/Industries"
import Services from "@/components/sections/Services"
import { faqs } from "@/data/faqs"
import { heroSlides } from "@/data/heroSlides"
import { industries } from "@/data/industries"
import { services } from "@/data/services"
import { team } from "@/data/team"

const { lenisScrollTo, pathname, sendContact, sendApplication } = vi.hoisted(() => ({
  sendContact: vi.fn(),
  sendApplication: vi.fn(),
  lenisScrollTo: vi.fn(),
  pathname: { current: "/" },
}))

vi.mock("lenis", () => ({
  default: class {
    scrollTo = lenisScrollTo
    stop = vi.fn()
    start = vi.fn()
    destroy = vi.fn()
  },
}))

vi.mock("@/lib/sendContact", () => ({ sendContact }))
vi.mock("@/lib/sendApplication", () => ({ sendApplication }))

vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }))

vi.mock("next/image", () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: Record<string, unknown>) => <img {...props} />,
}))

const renderWithSite = (ui: ReactNode) =>
  render(
    <SmoothScrollProvider>
      <SiteProvider>{ui}</SiteProvider>
    </SmoothScrollProvider>,
  )

beforeEach(() => {
  pathname.current = "/"
  lenisScrollTo.mockClear()
})

describe("Services", () => {
  it("links every service card to its page", () => {
    renderWithSite(<Services />)
    for (const service of services) {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument()
      expect(screen.getByRole("link", { name: `Explore ${service.title}` })).toHaveAttribute(
        "href",
        `/services/${service.slug}`,
      )
    }
  })

  it("opens the contact modal", () => {
    renderWithSite(<Services />)
    fireEvent.click(screen.getByRole("button", { name: /tell us about it/i }))
    expect(screen.getByRole("dialog", { name: "Let’s talk about your idea" })).toBeInTheDocument()
  })
})

describe("Header", () => {
  it("marks the current route and links to pages", () => {
    pathname.current = "/services/ai-automation"
    renderWithSite(<Header />)
    const nav = screen.getByRole("navigation", { name: "Main navigation" })
    expect(within(nav).getByRole("link", { name: /services/i })).toHaveAttribute("aria-current", "page")
    expect(within(nav).getByRole("link", { name: "About us" })).toHaveAttribute("href", "/about")
  })

  it("smooth-scrolls to the top when the wordmark is clicked on the home page", () => {
    renderWithSite(<Header />)
    fireEvent.click(screen.getByRole("link", { name: "TrivaSite home" }))
    expect(lenisScrollTo).toHaveBeenCalledWith(0, expect.anything())
  })
})

describe("Industries", () => {
  it("switches the active industry and links to its page", () => {
    renderWithSite(<Industries />)
    expect(screen.getByText(industries[0].title)).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: industries[1].name }))
    expect(screen.getByText(industries[1].title)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: industries[1].name })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("link", { name: /see how we help/i })).toHaveAttribute(
      "href",
      `/industries/${industries[1].slug}`,
    )
  })
})

describe("FAQ", () => {
  it("toggles an answer", () => {
    renderWithSite(<Faq />)
    const trigger = screen.getByRole("button", { name: faqs[0].question })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(faqs[0].answer)).toBeVisible()
  })
})

describe("Hero carousel", () => {
  const activeSlide = () => screen.getAllByRole("group", { hidden: true }).find((el) => el.hasAttribute("data-active"))

  it("shows one slide at a time and moves with the arrows and dots", () => {
    renderWithSite(<Hero />)
    expect(activeSlide()).toHaveAccessibleName(`1 of ${heroSlides.length}`)

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }))
    expect(activeSlide()).toHaveAccessibleName(`2 of ${heroSlides.length}`)

    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }))
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }))
    expect(activeSlide()).toHaveAccessibleName(`${heroSlides.length} of ${heroSlides.length}`)

    fireEvent.click(screen.getByRole("button", { name: /show slide 3/i }))
    expect(activeSlide()).toHaveAccessibleName(`3 of ${heroSlides.length}`)
    expect(activeSlide()).not.toHaveAttribute("aria-hidden", "true")
  })

  it("auto-advances until paused", () => {
    vi.useFakeTimers()
    try {
      renderWithSite(<Hero />)
      act(() => vi.advanceTimersByTime(5000))
      expect(activeSlide()).toHaveAccessibleName(`2 of ${heroSlides.length}`)

      fireEvent.click(screen.getByRole("button", { name: "Pause" }))
      act(() => vi.advanceTimersByTime(15000))
      expect(activeSlide()).toHaveAccessibleName(`2 of ${heroSlides.length}`)
    } finally {
      vi.useRealTimers()
    }
  })
})

describe("Contact form", () => {
  const fill = () => {
    fireEvent.change(screen.getByPlaceholderText("Alex Morgan"), { target: { value: "Alex" } })
    fireEvent.change(screen.getByPlaceholderText("alex@company.com"), { target: { value: "alex@example.com" } })
    fireEvent.change(screen.getByPlaceholderText(/your idea/i), { target: { value: "An app" } })
    fireEvent.click(screen.getByRole("button", { name: /send message/i }))
  }

  beforeEach(() => sendContact.mockReset())

  it("sends the brief and confirms", async () => {
    sendContact.mockResolvedValue({ ok: true })
    renderWithSite(<ContactForm />)
    fill()
    expect(await screen.findByText(/your project brief is with our team/i)).toBeInTheDocument()
    const data: FormData = sendContact.mock.calls[0][0]
    expect(Object.fromEntries(data)).toEqual({ name: "Alex", email: "alex@example.com", message: "An app", company: "" })
  })

  it("attaches files and rejects unsupported ones", async () => {
    sendContact.mockResolvedValue({ ok: true })
    const { container } = renderWithSite(<ContactForm />)
    const input = container.querySelector<HTMLInputElement>('input[type="file"]')!
    fireEvent.change(input, { target: { files: [new File(["x"], "virus.exe")] } })
    expect(screen.getByRole("alert")).toHaveTextContent("isn’t a supported file type")
    fireEvent.change(input, { target: { files: [new File(["brief"], "brief.pdf")] } })
    expect(screen.getByText("brief.pdf")).toBeInTheDocument()
    fill()
    await screen.findByText(/your project brief is with our team/i)
    const data: FormData = sendContact.mock.calls[0][0]
    expect((data.getAll("attachments") as File[]).map((f) => f.name)).toEqual(["brief.pdf"])
  })

  it("shows the server error", async () => {
    sendContact.mockResolvedValue({ ok: false, error: "Please try again later." })
    renderWithSite(<ContactForm />)
    fill()
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Please try again later."))
  })
})

describe("Team carousel", () => {
  it("links every member's card to their profile", () => {
    renderWithSite(<Growth />)
    for (const member of team) {
      const card = screen.getByRole("link", { name: new RegExp(member.name) })
      expect(card).toHaveAttribute("href", `/team/${member.slug}`)
      expect(card).toHaveTextContent(member.quote)
    }
    expect(screen.getByRole("link", { name: /meet the team/i })).toHaveAttribute("href", "/team")
  })
})

describe("Careers form", () => {
  const renderForm = () => {
    const onRoleChange = vi.fn()
    const view = renderWithSite(<CareersForm role="General application" onRoleChange={onRoleChange} />)
    const resumeInput = view.container.querySelector<HTMLInputElement>('input[type="file"]')!
    fireEvent.change(screen.getByPlaceholderText("Alex Morgan"), { target: { value: "Priya Sharma" } })
    fireEvent.change(screen.getByPlaceholderText("alex@email.com"), { target: { value: "priya@example.com" } })
    fireEvent.change(screen.getByPlaceholderText(/what you do/i), { target: { value: "Frontend developer." } })
    return { resumeInput }
  }

  beforeEach(() => sendApplication.mockReset())

  it("rejects non-resume files and sends the application with the resume", async () => {
    sendApplication.mockResolvedValue({ ok: true })
    const { resumeInput } = renderForm()
    fireEvent.change(resumeInput, { target: { files: [new File(["x"], "photo.png")] } })
    expect(screen.getByRole("alert")).toHaveTextContent("PDF or Word")
    fireEvent.change(resumeInput, { target: { files: [new File([new Uint8Array(5 * 1024 * 1024)], "big.pdf")] } })
    expect(screen.getByRole("alert")).toHaveTextContent("smaller than 5 MB")
    fireEvent.change(resumeInput, { target: { files: [new File(["cv"], "priya-cv.pdf")] } })
    fireEvent.click(screen.getByRole("button", { name: /submit application/i }))
    expect(await screen.findByText(/thanks for applying/i)).toBeInTheDocument()
    const data: FormData = sendApplication.mock.calls[0][0]
    expect(data.get("name")).toBe("Priya Sharma")
    expect(data.get("role")).toBe("General application")
    expect((data.get("resume") as File).name).toBe("priya-cv.pdf")
  })

  it("requires a resume and shows server errors", async () => {
    sendApplication.mockResolvedValue({ ok: false, error: "Please try again later." })
    const { resumeInput } = renderForm()
    fireEvent.click(screen.getByRole("button", { name: /submit application/i }))
    expect(screen.getByRole("alert")).toHaveTextContent("attach your resume")
    expect(sendApplication).not.toHaveBeenCalled()
    fireEvent.change(resumeInput, { target: { files: [new File(["cv"], "cv.docx")] } })
    fireEvent.click(screen.getByRole("button", { name: /submit application/i }))
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Please try again later."))
  })
})
