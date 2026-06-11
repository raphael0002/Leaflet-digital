import { PageHero } from "@/components/shared/page-hero"
import { ProjectsSection } from "@/features/marketing"

export const metadata = {
  title: "Work",
  description: "Selected digital product, brand, and web projects by Leaflet Digital Solutions.",
}

export default function WorkPage() {
  return (
    <main>
      <PageHero
        label="Work"
        title="Partner products shaped with uncommon care."
        description="A focused look at the kind of product, brand, and web systems Leaflet creates for growing teams."
      />
      <ProjectsSection />
    </main>
  )
}
