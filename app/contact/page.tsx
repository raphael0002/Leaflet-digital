import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { DarkCard } from "@/components/shared/dark-card"
import { PageHero } from "@/components/shared/page-hero"

export const metadata = {
  title: "Contact",
  description: "Start a project with Leaflet Digital Solutions.",
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact"
        title="Tell us what you want your digital system to do."
        description="Share the goal, the constraints, and what success should look like. We will help map the cleanest path forward."
      />
      <section className="bg-[var(--background)] py-16 md:py-24">
        <Container>
          <DarkCard className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white">Start with a focused consultation.</h2>
              <p className="mt-5 text-base leading-8 text-white/62">
                The production contact form is ready to be connected to a server action or CRM. For
                now, send us the basics and we&apos;ll shape the next step.
              </p>
            </div>
            <div className="grid content-center gap-4">
              <p className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 text-white/70">
                Email: hello@leafletdigitalsolutions.com
              </p>
              <Link href="mailto:hello@leafletdigitalsolutions.com" className={buttonVariants({ variant: "orange", size: "lg" })}>
                Contact us
                <ArrowRight />
              </Link>
            </div>
          </DarkCard>
        </Container>
      </section>
    </main>
  )
}
