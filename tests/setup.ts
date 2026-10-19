import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

afterEach(() => cleanup())

// jsdom does not implement these browser APIs used by the site and @figma/astraui.
// (Skipped for tests that run in the Node environment, e.g. Server Action tests.)
if (typeof window !== "undefined") {
  Element.prototype.scrollIntoView = () => {}
  window.scrollTo = () => {}
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}
