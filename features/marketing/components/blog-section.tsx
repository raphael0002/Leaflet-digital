// features/marketing/components/blog-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { MotionCard } from "@/components/animations/motion-card"
import { cn } from "@/lib/utils"
import { blogPosts, categoryColors } from "../data/blogs"
import { BlogPost } from "../types"
import { SectionLabel } from "@/components/shared/section-label"
import { premiumEase } from "@/lib/motion"

/* ------------------------------------------------------------------ */
/*  Variants                                                           */
/* ------------------------------------------------------------------ */

const sectionOrchestrator = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
}

const headerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.02,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
}

const fadeUpLarge = {
  hidden: { opacity: 0, y: 36, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: premiumEase },
  },
}

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: premiumEase, delay: 0.15 },
  },
}

const sideStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.28,
    },
  },
}

const sideItem = {
  hidden: { opacity: 0, x: 18, y: 6 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.56, ease: premiumEase },
  },
}

const glowPulse = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 0.3,
    scale: 1,
    transition: { duration: 1.4, ease: premiumEase },
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCategoryColor(category: string) {
  return categoryColors[category] ?? "text-[var(--brand)]"
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function BlogSection() {
  const [featured, ...rest] = blogPosts
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, {
    amount: 0.08,
    margin: "0px 0px -6% 0px",
  })

  return (
    <section
      id="journal"
      ref={sectionRef}
      className="relative w-full border-t border-white/[0.08] bg-[var(--background)]"
    >
      {/* Section label */}
      <motion.div
        variants={labelReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionLabel className="flex items-center gap-3">
          Insights &amp; field notes
        </SectionLabel>
      </motion.div>

      <Container wide className="relative py-20 md:py-28">
        {/* Ambient glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(248,130,33,0.18), transparent 70%)",
          }}
          variants={glowPulse}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />

        {/* ---- Master orchestrator ---- */}
        <motion.div
          variants={sectionOrchestrator}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* ---- Header ---- */}
          <motion.div variants={headerStagger}>
            <motion.div variants={fadeUp}>
              <div className="mt-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <h2 className="max-w-2xl text-balance font-heading text-[36px] font-extrabold leading-[1.08] tracking-tight text-[#f8f1ea] md:text-[52px]">
                  Writing from the studio
                </h2>

                <Link
                  href="/blog"
                  className={cn(
                    buttonVariants({ variant: "outlineDark", size: "sm" }),
                    "h-10 gap-2 border-white/[0.12] bg-transparent px-5 text-[13px] text-white/60 hover:border-white/[0.22] hover:bg-white/[0.04]"
                  )}
                >
                  View all posts
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/46 sm:text-[15px]">
                Essays, playbooks and lessons from shipping software
                with distributed teams.
              </p>
            </motion.div>
          </motion.div>

          {/* ---- Divider ---- */}
          <motion.div
            className="mt-14 h-px w-full origin-left bg-white/[0.06]"
            variants={lineReveal}
          />

          {/* ---- Content grid ---- */}
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Featured */}
            <motion.div className="md:col-span-7" variants={fadeUpLarge}>
              <FeaturedCard post={featured} />
            </motion.div>

            {/* Side list */}
            <motion.div
              className="md:col-span-5 md:border-l md:border-white/[0.08] md:pl-10"
              variants={sideStagger}
            >
              {rest.map((post, i) => (
                <motion.div key={post.slug} variants={sideItem}>
                  <SideListItem
                    post={post}
                    isLast={i === rest.length - 1}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Featured Card                                                      */
/* ------------------------------------------------------------------ */

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <MotionCard className="group overflow-hidden !border-none !bg-transparent !shadow-none p-0">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image area */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[var(--muted)]">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[16px]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(248,130,33,0.18), rgba(245,243,238,0.04) 55%, transparent 85%)",
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          />

          <span className="absolute left-5 top-5 inline-flex items-center rounded-[8px] border border-white/[0.08] bg-[var(--background)]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 backdrop-blur-md">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className="py-7 md:py-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{post.readTime}</span>
          </div>

          <h3 className="mt-4 text-balance text-[24px] font-bold leading-[1.15] tracking-tight text-[#f8f1ea] transition-colors duration-300 ease-[var(--ease-premium)] group-hover:text-[var(--brand)] sm:text-[28px] md:text-[30px]">
            {post.title}
          </h3>

          <p className="mt-4 line-clamp-3 max-w-xl text-[14px] leading-relaxed text-white/46">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-[13px] font-medium text-white/60">
              By {post.author}
            </span>
            <motion.span
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.28, ease: premiumEase }}
            >
              Read article
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.span>
          </div>
        </div>
      </Link>
    </MotionCard>
  )
}

/* ------------------------------------------------------------------ */
/*  Side List Item                                                     */
/* ------------------------------------------------------------------ */

function SideListItem({
  post,
  isLast,
}: {
  post: BlogPost
  isLast: boolean
}) {
  return (
    <article
      className={cn(
        "group",
        !isLast && "border-b border-white/[0.08] pb-7 mb-7"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col items-start gap-1 transition-colors duration-300 ease-[var(--ease-premium)]"
      >
        <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-white/30">
          <span className={getCategoryColor(post.category)}>
            {post.category}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{post.date}</span>
        </div>

        <h4 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#f8f1ea] transition-colors duration-300 ease-[var(--ease-premium)] group-hover:text-[var(--brand)]">
          {post.title}
        </h4>

        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-white/40">
          {post.excerpt}
        </p>

        <div className="mt-3 w-full flex items-center justify-between">
          <span className="text-[12px] text-white/30">
            {post.readTime}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-all duration-300 ease-[var(--ease-premium)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
        </div>
      </Link>
    </article>
  )
}