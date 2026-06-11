import { ServicesSection } from "@/features/marketing"
import { PageHero } from "@/components/shared/page-hero"

export const metadata = {
  title: "Services",
  description: "Web, app, design, brand strategy, and AI automation services by Leaflet Digital Solutions.",
}

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        label="Services"
        title="Digital systems for teams that need clarity and speed."
        description="From product design to production-ready development and AI automation, Leaflet helps teams ship cleaner digital experiences."
      />
      <ServicesSection />
    </main>
  )
}
