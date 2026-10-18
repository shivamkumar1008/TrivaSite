"use client"

import { Modal } from "@figma/astraui"
import ContactForm from "@/components/forms/ContactForm"
import { useSite } from "@/components/providers/SiteProvider"

export default function ContactModal() {
  const { contactOpen, closeContact } = useSite()

  return (
    <Modal isOpen={contactOpen} onClose={closeContact} title="Let’s talk about your idea" className="site-modal">
      <ContactForm />
    </Modal>
  )
}
