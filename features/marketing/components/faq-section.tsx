"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { faqs } from "@/features/marketing/data/faqs"

export function FAQSection() {
  return (
    <section className="relative bg-[var(--background)] py-16 md:py-28">
      <SectionLabel>FAQ</SectionLabel>

      <Container wide>
        <Reveal>
          <SectionHeading>Everything You Need to Know</SectionHeading>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/56">
            From pricing to process-we&apos;ve answered the questions we hear most.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.08}>
          <Accordion
            defaultValue={faqs[0] ? [faqs[0].question] : undefined}
            className="border-t border-white/[0.08]"
          >
            <StaggerReveal>
              {faqs.map((faq) => (
                <StaggerItem key={faq.question}>
                  <AccordionItem
                    value={faq.question}
                    className="border-white/[0.08]"
                  >
                    <AccordionTrigger className="py-6 text-left font-heading text-xl font-medium text-white no-underline transition-colors hover:text-white/86 hover:no-underline sm:text-2xl">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent className="max-w-[760px] pb-8 text-base leading-8 text-white/58">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </Accordion>
        </Reveal>
      </Container>
    </section>
  )
}
