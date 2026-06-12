// features/marketing/components/faq-section.tsx
"use client"

import { motion } from "motion/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { faqs } from "@/features/marketing/data/faqs"
import { labelViewport, premiumEase, sectionViewport } from "@/lib/motion"

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */

const sectionOrchestrator = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}

const labelReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
}

const headingReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

const subtitleReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase, delay: 0.04 },
  },
}

const dividerReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: premiumEase, delay: 0.1 },
  },
}

const faqListStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.01,
    },
  },
}

const faqItemReveal = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: premiumEase,
    },
  },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function FAQSection() {
  return (
    <section className="relative bg-[var(--background)] py-16 md:py-28">
      {/* Label — animates independently so it can fire first */}
      <motion.div
        variants={labelReveal}
        initial="hidden"
        whileInView="visible"
        viewport={labelViewport}
      >
        <SectionLabel>FAQ</SectionLabel>
      </motion.div>

      <Container wide>
        <motion.div
          variants={sectionOrchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          {/* Heading */}
          <motion.div variants={headingReveal}>
            <SectionHeading>Everything You Need to Know</SectionHeading>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={subtitleReveal}
            className="mt-5 max-w-2xl text-base leading-7 text-white/56"
          >
            From pricing to process—we&apos;ve answered the questions we hear
            most.
          </motion.p>

          <motion.div
            variants={dividerReveal}
            className="mt-10 h-px w-full origin-left bg-white/[0.08]"
          />
          <motion.div variants={faqListStagger}>
            <Accordion
              defaultValue={faqs[0] ? [faqs[0].question] : undefined}
            >
              {faqs.map((faq) => (
                <motion.div key={faq.question} variants={faqItemReveal}>
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
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}