import type { ReactNode } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { act, fireEvent, render, screen, within } from "@testing-library/react"
import Header from "@/components/layout/Header"
import SiteProvider from "@/components/providers/SiteProvider"
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider"
import Faq from "@/components/sections/Faq"
import Hero from "@/components/sections/Hero"
import Industries from "@/components/sections/Industries"
import Services from "@/components/sections/Services"
import { faqs } from "@/data/faqs"
import { heroSlides } from "@/data/heroSlides"
import { industries } from "@/data/industries"
import { services } from "@/data/services"

const { lenisScrollTo, pathname } = vi.hoisted(() => ({
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
      act(() => vi.advanceTimersByTime(7000))
      expect(activeSlide()).toHaveAccessibleName(`2 of ${heroSlides.length}`)

      fireEvent.click(screen.getByRole("button", { name: "Pause" }))
      act(() => vi.advanceTimersByTime(21000))
      expect(activeSlide()).toHaveAccessibleName(`2 of ${heroSlides.length}`)
    } finally {
      vi.useRealTimers()
    }
  })
})
