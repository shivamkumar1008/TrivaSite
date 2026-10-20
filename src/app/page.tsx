import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import PromiseStrip from "@/components/sections/PromiseStrip"
import Services from "@/components/sections/Services"
import TechStack from "@/components/sections/TechStack"
import Approach from "@/components/sections/Approach"
import Industries from "@/components/sections/Industries"
import Faq from "@/components/sections/Faq"
import About from "@/components/sections/About"
import ContactCta from "@/components/sections/ContactCta"
import Growth from "@/components/sections/Growth"

// Title, description and OpenGraph come from the root layout; the home page only needs
// its canonical URL so "/" never competes with a tracked or trailing-slash variant.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <Services />
      <TechStack />
      <Approach />
      <Industries />
      <Faq />
      <About />
      <ContactCta />
      <Growth />
    </>
  )
}
