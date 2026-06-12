// features/marketing/components/projects-section.tsx
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { FloatingSquares } from "@/components/shared/floating-squares"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { projects } from "@/features/marketing/data/projects"
import {
  fadeUp,
  fadeUpScale,
  popIn,
  scaleIn,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const orchestrator = sectionStagger(0.14, 0.04)
const labelV = fadeUp(10, 0.5)
const heading = fadeUp(28, 0.65)
const squares = scaleIn(0.85, 1)
const projectsGrid = sectionStagger(0.16, 0.1)
const projectCard = fadeUpScale(48, 0.96, 0.72)
const visual = scaleIn(0.94, 0.6)
const content = sectionStagger(0.06, 0.15)
const text = fadeUp(12, 0.45)
const tags = sectionStagger(0.04, 0.25)
const tag = popIn(0.85, 0.35)

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[var(--background)] py-16 md:py-28"
    >
      <motion.div
        variants={labelV}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <SectionLabel>Our projects</SectionLabel>
      </motion.div>

      <Container wide className="relative">
        <motion.div
          variants={squares}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="absolute right-8 top-0 z-0"
        >
          <FloatingSquares />
        </motion.div>

        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.div variants={heading} className="relative z-10 max-w-[820px]">
            <SectionHeading>
              Elevating our Partners&apos;
              <br />
              Products with Unparalleled Value
            </SectionHeading>
          </motion.div>

          <motion.div
            variants={projectsGrid}
            className="relative z-10 mt-10 grid gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-16"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={projectCard}
                className={cn(index % 2 === 1 && "lg:mt-24")}
              >
                <article className="group transition-transform duration-300 ease-[var(--ease-premium)] hover:-translate-y-1">
                  <motion.div variants={visual}>
                    <ProjectVisual index={index} />
                  </motion.div>

                  <motion.div variants={content} className="mt-6 flex items-start justify-between gap-5">
                    <div>
                      <motion.h3 variants={text} className="font-heading text-2xl font-bold text-white">
                        {project.title}
                      </motion.h3>
                      <motion.p variants={text} className="mt-3 max-w-[420px] text-sm leading-6 text-white/52">
                        {project.description}
                      </motion.p>
                      <motion.div variants={tags} className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                          <motion.div key={t} variants={tag}>
                            <Badge
                              variant="outline"
                              className="h-8 rounded-full border-white/14 bg-transparent px-3 text-white/58"
                            >
                              {t}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    <motion.div variants={text}>
                      <Link
                        href="/work"
                        className={cn(
                          buttonVariants({ variant: "white", size: "sm" }),
                          "shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-1"
                        )}
                      >
                        View detail
                        <ArrowRight className="size-4" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* <Reveal className="mt-14 flex justify-center">
          <Link href="/work" className={buttonVariants({ variant: "outlineDark" })}>
            Explore Our More Projects
            <ArrowUpRight />
          </Link>
        </Reveal> */}
      </Container>
    </section>
  )
}

function ProjectVisual({ index }: { index: number }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-white/[0.06] bg-[var(--card)] transition-colors duration-300 ease-[var(--ease-premium)] group-hover:border-[var(--brand)]/20 sm:aspect-[16/10]">
      <div className="absolute inset-0 origin-center transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-[1.025]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(248,130,33,0.16),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute left-[12%] top-[18%] h-[58%] w-[62%] rounded-2xl border border-white/10 bg-black/24 shadow-2xl" />
        <div className="absolute bottom-[14%] right-[10%] h-[44%] w-[42%] rounded-2xl border border-white/10 bg-white/[0.04]" />
        <div className="absolute left-[16%] top-[26%] h-2 w-24 rounded-full bg-white/16" />
        <div className="absolute left-[16%] top-[35%] h-2 w-40 rounded-full bg-white/10" />
        <div
          className={cn(
            "absolute size-20 rounded-full bg-[var(--brand)]/16 blur-xl",
            index % 2 === 0 ? "right-16 top-16" : "bottom-16 left-16"
          )}
        />
      </div>
    </div>
  )
}