import { Container } from "@/components/shared/container"
import { PageHero } from "@/components/shared/page-hero"
import { DarkCard } from "@/components/shared/dark-card"

export const metadata = {
  title: "Blog",
  description: "Insights from Leaflet Digital Solutions on web, apps, automation, and digital growth.",
}

const posts = [
  "How async delivery keeps projects moving",
  "What to automate before you hire another operator",
  "A practical checklist for high-converting service websites",
]

export default function BlogPage() {
  return (
    <main>
      <PageHero
        label="Blog"
        title="Practical notes on building better digital systems."
        description="Short, useful thinking on websites, apps, automation, remote delivery, and digital growth."
      />
      <section className="bg-[var(--background)] py-16 md:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <DarkCard key={post}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--brand)]">
                  Insight
                </p>
                <h2 className="mt-5 font-heading text-2xl font-bold text-white">{post}</h2>
                <p className="mt-4 text-sm leading-7 text-white/56">
                  Coming soon. This static page is structured for future CMS content.
                </p>
              </DarkCard>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
