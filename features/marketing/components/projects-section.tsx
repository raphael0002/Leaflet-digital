import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { FloatingSquares } from "@/components/shared/floating-squares"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { Presence, Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { projects } from "@/features/marketing/data/projects"
import { cn } from "@/lib/utils"

export function ProjectsSection() {
  return (
    <section id="work" className="relative isolate overflow-hidden bg-[var(--background)] py-16 md:py-28">
      <SectionLabel>Our projects</SectionLabel>
      <Container wide className="relative">
        <FloatingSquares className="absolute right-8 top-0 z-0" />
        <Reveal className="relative z-10 max-w-[820px]">
          <SectionHeading>
            Elevating our Partners&apos;
            <br />
            Products with Unparalleled Value
          </SectionHeading>
        </Reveal>

        <StaggerReveal className="relative z-10 mt-10 grid gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
          <Presence>
            {projects.map((project, index) => (
              <StaggerItem
                key={project.title}
                className={cn(index % 2 === 1 && "lg:mt-24")}
              >
                <article className="group transition-transform duration-300 ease-[var(--ease-premium)] hover:-translate-y-1">
                <ProjectVisual index={index} />
                <div className="mt-6 flex items-start justify-between gap-5">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">{project.title}</h3>
                    <p className="mt-3 max-w-[420px] text-sm leading-6 text-white/52">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="h-8 rounded-full border-white/14 bg-transparent px-3 text-white/58"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
                </div>
                </article>
              </StaggerItem>
            ))}
          </Presence>
        </StaggerReveal>

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
