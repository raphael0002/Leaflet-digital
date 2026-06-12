// app/contact/page.tsx
import type { Metadata } from "next"
import { ContactPage } from "@/features/marketing/pages/contact-page"

export const metadata: Metadata = {
  title: "Contact — Leaflet Digital Solutions",
  description:
    "Get in touch with Leaflet. Tell us about your project, find our offices, or schedule a quick call with our remote-first team.",
}

export default function Page() {
  return <ContactPage />
}