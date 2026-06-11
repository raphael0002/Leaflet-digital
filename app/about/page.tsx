import { AboutStorySection, ProcessSection, WhyUsSection } from "@/features/marketing"
import { PageHero } from "@/components/shared/page-hero"

export const metadata = {
  title: "About",
  description: "Learn about Leaflet Digital Solutions and its remote-first delivery model.",
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        label="About"
        title="Built remote. Built different. Built for growth."
        description="Leaflet combines elite remote talent, tight execution, and transparent async collaboration for modern businesses."
      />
      <AboutStorySection />
      <WhyUsSection />
      <ProcessSection />
    </main>
  )
}
