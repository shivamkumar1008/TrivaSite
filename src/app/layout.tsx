import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Instrument_Sans } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import SiteProvider from "@/components/providers/SiteProvider"
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider"
import { siteConfig } from "@/data/site"
import "./globals.css"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // ThemeProvider toggles the `dark` class on <html> after hydration.
    <html lang="en" className={instrumentSans.variable} suppressHydrationWarning>
      <body>
        <SmoothScrollProvider>
          <SiteProvider>
            <div className="site">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </SiteProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
