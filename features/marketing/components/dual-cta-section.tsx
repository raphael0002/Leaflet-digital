// features/marketing/components/dual-cta-section.tsx
"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import type { GlobeConfig, Position } from "@/components/ui/globe"
import {
  fadeUpScale,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"
import { GlobeClient } from "@/components/globe-client"

// ─── Animation variants ───────────────────────────────────────────────────────

const grid = sectionStagger(0.14, 0.06)
const card = fadeUpScale(36, 0.97, 0.68)

// ─── Globe data ───────────────────────────────────────────────────────────────

const GLOBE_CONFIG: GlobeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#f88221",
  atmosphereAltitude: 0.15,
  emissive: "#062056",
  emissiveIntensity: 0.12,
  shininess: 0.9,
  polygonColor: "rgba(248,130,33,0.45)",
  ambientLight: "#88ccff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#f88221",
  arcTime: 1800,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.6,
}

const ARC_COLORS = ["#f88221", "#ff6b35", "#ffa94d"] as const

const GLOBE_ARCS: Position[] = [
  { order: 1, startLat: 28.6139,   startLng: 77.209,    endLat: 40.7128,   endLng: -74.006,    arcAlt: 0.4, color: ARC_COLORS[0] },
  { order: 1, startLat: 51.5074,   startLng: -0.1278,   endLat: 35.6762,   endLng: 139.6503,   arcAlt: 0.5, color: ARC_COLORS[1] },
  { order: 1, startLat: -19.8856,  startLng: -43.9512,  endLat: -22.9068,  endLng: -43.1729,   arcAlt: 0.1, color: ARC_COLORS[2] },
  { order: 2, startLat: -33.8688,  startLng: 151.2093,  endLat: 48.8566,   endLng: 2.3522,     arcAlt: 0.6, color: ARC_COLORS[2] },
  { order: 2, startLat: 1.3521,    startLng: 103.8198,  endLat: 55.7558,   endLng: 37.6173,    arcAlt: 0.3, color: ARC_COLORS[0] },
  { order: 2, startLat: -15.7855,  startLng: -47.909,   endLat: 36.1628,   endLng: -115.1194,  arcAlt: 0.3, color: ARC_COLORS[1] },
  { order: 3, startLat: 37.5665,   startLng: 126.978,   endLat: -22.9068,  endLng: -43.1729,   arcAlt: 0.7, color: ARC_COLORS[1] },
  { order: 3, startLat: 25.2048,   startLng: 55.2708,   endLat: -34.6037,  endLng: -58.3816,   arcAlt: 0.5, color: ARC_COLORS[2] },
  { order: 3, startLat: 21.3099,   startLng: -157.8581, endLat: 40.7128,   endLng: -74.006,    arcAlt: 0.3, color: ARC_COLORS[0] },
  { order: 4, startLat: 34.0522,   startLng: -118.2437, endLat: 31.2304,   endLng: 121.4737,   arcAlt: 0.4, color: ARC_COLORS[2] },
  { order: 4, startLat: 52.52,     startLng: 13.405,    endLat: 28.6139,   endLng: 77.209,     arcAlt: 0.3, color: ARC_COLORS[0] },
  { order: 4, startLat: -34.6037,  startLng: -58.3816,  endLat: 22.3193,   endLng: 114.1694,   arcAlt: 0.7, color: ARC_COLORS[1] },
  { order: 5, startLat: -6.2088,   startLng: 106.8456,  endLat: 51.5074,   endLng: -0.1278,    arcAlt: 0.4, color: ARC_COLORS[0] },
  { order: 5, startLat: 22.3193,   startLng: 114.1694,  endLat: -33.8688,  endLng: 151.2093,   arcAlt: 0.2, color: ARC_COLORS[1] },
  { order: 5, startLat: 14.5995,   startLng: 120.9842,  endLat: 51.5072,   endLng: -0.1276,    arcAlt: 0.3, color: ARC_COLORS[2] },
  { order: 6, startLat: -15.4326,  startLng: 28.3159,   endLat: 1.0941,    endLng: -63.3455,   arcAlt: 0.7, color: ARC_COLORS[0] },
  { order: 6, startLat: 37.5665,   startLng: 126.978,   endLat: 35.6762,   endLng: 139.6503,   arcAlt: 0.1, color: ARC_COLORS[1] },
  { order: 6, startLat: 22.3193,   startLng: 114.1694,  endLat: 51.5072,   endLng: -0.1276,    arcAlt: 0.3, color: ARC_COLORS[2] },
  { order: 7, startLat: -8.8332,   startLng: 13.2648,   endLat: -33.9361,  endLng: 18.4365,    arcAlt: 0.2, color: ARC_COLORS[0] },
  { order: 7, startLat: 49.2827,   startLng: -123.1207, endLat: 52.3676,   endLng: 4.9041,     arcAlt: 0.2, color: ARC_COLORS[1] },
  { order: 7, startLat: 1.3521,    startLng: 103.8198,  endLat: 40.7128,   endLng: -74.006,    arcAlt: 0.5, color: ARC_COLORS[2] },
  { order: 8, startLat: 41.9028,   startLng: 12.4964,   endLat: 34.0522,   endLng: -118.2437,  arcAlt: 0.2, color: ARC_COLORS[0] },
  { order: 8, startLat: 11.9866,   startLng: 8.5718,    endLat: 35.6762,   endLng: 139.6503,   arcAlt: 0.3, color: ARC_COLORS[1] },
  { order: 8, startLat: -22.9068,  startLng: -43.1729,  endLat: -34.6037,  endLng: -58.3816,   arcAlt: 0.1, color: ARC_COLORS[2] },
]

const MARQUEE_IMAGES = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
]

// ─── Section ──────────────────────────────────────────────────────────────────

export function DualCTASection() {
  return (
    <section className="bg-[var(--background)] pb-16 md:pb-28">
      <Container wide>
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-6 lg:grid-cols-2"
        >
          <motion.div variants={card}>
            <CTACard
              label="For businesses"
              title="Scale your digital presence"
              body="Ready to grow with a dedicated tech partner that ships fast and builds for the long run?"
              href="/contact"
              button="Start a Project"
              variant="orange"
              visual={<BusinessGlobeVisual />}
            />
          </motion.div>
          <motion.div variants={card}>
            <CTACard
              label="For agencies"
              title="White-label that delivers"
              body="Reliable white-label development and design support — plug us in and ship under your brand."
              href="/contact"
              button="Partner with us"
              variant="outlineDark"
              visual={<AgencyMarqueeVisual />}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// ─── Card shell ───────────────────────────────────────────────────────────────

interface CTACardProps {
  label: string
  title: ReactNode
  body: string
  href: string
  button: string
  variant: "orange" | "outlineDark"
  visual: ReactNode
}

function CTACard({ label, title, body, href, button, variant, visual }: CTACardProps) {
  return (
    <div className="group relative flex min-h-[420px] overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-8 transition-colors duration-300 hover:border-white/[0.14] md:p-10">
      {/* Visual layer — pointer-events: none so clicks fall through to the CTA */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-65 transition-opacity duration-500 group-hover:opacity-95"
      >
        {visual}
      </div>

      {/* Radial top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-fit bg-[radial-gradient(circle_at_50%_0%,rgba(248,130,33,0.16),transparent_66%)]"
      />

      {/* Copy + CTA */}
      <div className="relative z-10 mt-auto max-w-sm">
        <p className="w-fit font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f0b680]">
          {label}
        </p>
        <h3 className="mt-3 w-fit font-heading text-2xl font-semibold leading-tight tracking-tight text-white md:text-[2rem]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/60">{body}</p>
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size: "lg" }), "mt-7")}
        >
          {button}
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

// ─── Visuals ──────────────────────────────────────────────────────────────────

function BusinessGlobeVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-10 rounded-full bg-[var(--brand,#f88221)]/[0.08] blur-3xl"
      />
      <div className="absolute -bottom-10 h-[460px] w-full">
        <GlobeClient globeConfig={GLOBE_CONFIG} data={GLOBE_ARCS} />
      </div>
    </div>
  )
}

function AgencyMarqueeVisual() {
  return (
    <div className="absolute inset-0">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(248,130,33,0.2),transparent_34%)]"
      />
      <ThreeDMarquee
        images={MARQUEE_IMAGES}
        className="absolute left-1/2 top-1/2 h-[500px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-none"
      />
    </div>
  )
}