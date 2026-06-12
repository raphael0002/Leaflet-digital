"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe"
import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import { cn } from "@/lib/utils"

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
]

const marqueeImages = [
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

export function DualCTASection() {
  return (
    <section className="bg-[var(--background)] pb-16 md:pb-28">
      <Container wide>
        <StaggerReveal className="grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <CTACard
              label="For businesses"
              title="Scale your digital presence"
              body="Ready to grow with a dedicated tech partner that ships fast and builds for the long run?"
              href="/contact"
              button="Start a Project"
              variant="orange"
              visual={<BusinessGlobeVisual />}
            />
          </StaggerItem>
          <StaggerItem>
            <CTACard
              label="For agencies"
              title="White-label that delivers"
              body="Reliable white-label development and design support - plug us in and ship under your brand."
              href="/contact"
              button="Partner with us"
              variant="outlineDark"
              visual={<AgencyMarqueeVisual />}
            />
          </StaggerItem>
        </StaggerReveal>
      </Container>
    </section>
  )
}

function CTACard({
  label,
  title,
  body,
  href,
  button,
  variant,
  visual,
}: {
  label: string
  title: ReactNode
  body: string
  href: string
  button: string
  variant: "orange" | "outlineDark"
  visual: ReactNode
}) {
  return (
    <div className="group relative flex min-h-[420px] overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-8 transition-colors duration-300 hover:border-white/[0.14] md:p-10">
      <div className="absolute inset-0 opacity-65 transition-opacity duration-500 group-hover:opacity-95">
        {visual}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-fit bg-[radial-gradient(circle_at_50%_0%,rgba(248,130,33,0.16),transparent_66%)]" />

      <div className="relative z-10 mt-auto max-w-sm">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f0b680] w-fit">
          {label}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-white md:text-[2rem] w-fit">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/62">{body}</p>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant, size: "lg" }),
            "mt-7"
          )}
        >
          {button}
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

function BusinessGlobeVisual() {
  return (
    <div className="absolute left-1/2 top-[50%] h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2">
      <div className="pointer-events-none absolute inset-10 rounded-full bg-[var(--brand)]/12 blur-3xl" />
      <Globe3D
        markers={sampleMarkers}
        className="pointer-events-auto h-full"
        config={{
          atmosphereColor: "#f88221",
          atmosphereIntensity: 0.5,
          bumpScale: 5,
          autoRotateSpeed: 0.3,
          showAtmosphere: true,
          radius: 4,
        }}
        
      />
    </div>
  )
}

function AgencyMarqueeVisual() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(248,130,33,0.2),transparent_34%)]" />
      <ThreeDMarquee
        images={marqueeImages}
        className="absolute left-1/2 top-1/2 h-[500px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-none"
      />
    </div>
  )
}
