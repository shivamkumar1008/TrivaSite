import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "node:path"

// Next.js builds the app; Vite powers the unit/component test runner.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    // Worker threads start much faster than forked processes on Windows, which avoids
    // "Timeout waiting for worker to respond" when the machine is busy (e.g. a dev server running).
    pool: "threads",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
  },
})
