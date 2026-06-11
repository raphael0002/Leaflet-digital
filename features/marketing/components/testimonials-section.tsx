import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { testimonials } from "@/features/marketing/data/testimonials"

export function TestimonialsSection() {
  return (
    <section className="relative bg-[var(--background)] py-16 md:py-28">
      <SectionLabel>Testimonials</SectionLabel>
      <Container wide>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading>
            They are satisfied with
            <br />
            the results we provide
          </SectionHeading>
          <div className="flex gap-3">
            <Button variant="outlineDark" size="icon-lg" aria-label="Previous testimonial">
              <ArrowLeft />
            </Button>
            <Button variant="outlineDark" size="icon-lg" aria-label="Next testimonial">
              <ArrowRight />
            </Button>
          </div>
        </Reveal>

        <StaggerReveal className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <figure className="border-t border-white/[0.08] pt-7 transition-colors duration-300 ease-[var(--ease-premium)] hover:border-white/[0.16]">
                <blockquote className="text-sm leading-7 text-white/58">{testimonial.quote}</blockquote>
                <figcaption className="mt-9">
                  <p className="text-base font-medium text-white">{testimonial.name}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  )
}
