import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Instrument_Sans } from "next/font/google"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import SiteProvider from "@/components/providers/SiteProvider"
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider"
import JsonLd from "@/components/seo/JsonLd"
import { siteConfig } from "@/data/site"
import { organizationSchema, websiteSchema } from "@/lib/jsonLd"
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
  applicationName: siteConfig.name,
  icons: { icon: "/favicon.svg" },
  // Pages override this with their own path via pageSeo().
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google show full-length text snippets, large image previews and video previews.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
        {/* Site-wide entities; every page's own schemas reference these by @id. */}
        <JsonLd schemas={[organizationSchema, websiteSchema]} />
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
