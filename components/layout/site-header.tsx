"use client"

import { useEffect, useRef, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { navLinks } from "@/features/marketing/data/nav-links"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState("")
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    updateScroll()

    const handleScroll = () => {
      if (frameRef.current) return

      frameRef.current = requestAnimationFrame(() => {
        updateScroll()
        frameRef.current = null
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    function updateActiveHash() {
      setActiveHash(window.location.hash)
    }

    updateActiveHash()
    window.addEventListener("hashchange", updateActiveHash)

    return () => window.removeEventListener("hashchange", updateActiveHash)
  }, [])

  useEffect(() => {
    if (pathname !== "/") {
      return
    }

    const sections = navLinks
      .map((link) => link.href.split("#")[1])
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) {
      return
    }

    let activeFrame: number | null = null

    function updateActiveSection() {
      const activationLine = 140
      let currentSection = sections[0]

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSection = section
        } else {
          break
        }
      }

      setActiveHash(`#${currentSection.id}`)
    }

    function scheduleActiveUpdate() {
      if (activeFrame !== null) {
        return
      }

      activeFrame = requestAnimationFrame(() => {
        activeFrame = null
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener("scroll", scheduleActiveUpdate, { passive: true })
    window.addEventListener("resize", scheduleActiveUpdate)

    return () => {
      window.removeEventListener("scroll", scheduleActiveUpdate)
      window.removeEventListener("resize", scheduleActiveUpdate)

      if (activeFrame !== null) {
        cancelAnimationFrame(activeFrame)
      }
    }
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-[var(--ease-premium)]",
        scrolled ? "py-0" : "py-4"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border transition-all duration-500 ease-[var(--ease-premium)]",
          scrolled
            ? [
                "bg-[rgba(8,8,8,0.65)]",
                "border-white/[0.06]",
                "shadow-[0_14px_40px_rgba(0,0,0,0.42)]",
                "backdrop-blur-xl",
                "supports-[backdrop-filter]:bg-[rgba(10,10,10,0.58)]",
                "before:absolute before:inset-x-0 before:top-0 before:h-px",
                "before:bg-gradient-to-r before:from-transparent before:via-white/[0.08] before:to-transparent",
                "before:pointer-events-none",
                "after:absolute after:inset-0 after:rounded-[inherit]",
                "after:shadow-[0_0_80px_rgba(248,130,33,0.03)]",
                "after:pointer-events-none",
                "relative overflow-hidden",
                "px-4 py-3 lg:px-16",
              ].join(" ")
            : "border-transparent bg-transparent px-4 py-4 lg:px-16"
        )}
      >
        {/* ── Mobile layout: [Hamburger] [Logo] ──────────── [Build with us] ── */}
        <div className="flex items-center gap-3 lg:hidden">
          <MobileNav />

          {/* Logo */}
          <Link
            href="/#home"
            className="font-heading text-[22px] font-extrabold tracking-tight text-white"
          >
            Leaflet
          </Link>
        </div>

        {/* ── Desktop: Logo only ── */}
        <Link
          href="/#home"
          className="hidden font-heading text-[28px] font-extrabold tracking-tight text-white lg:block"
        >
          Leaflet
        </Link>

        {/* ── Desktop nav ── */}
        <nav
          className="hidden items-center gap-2 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                const hash = getHashFromHref(link.href)

                if (hash) {
                  setActiveHash(hash)
                }
              }}
              className={cn(
                "relative rounded-md px-4 py-2 text-sm font-semibold text-white/60 transition-all duration-300 ease-[var(--ease-premium)] hover:bg-white/[0.05] hover:text-white",
                isActiveNavLink(link.href, pathname, activeHash) &&
                  "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop CTA (with icon) ── */}
        <Link
          href="/#contact"
          className={cn(
            buttonVariants({ variant: "orange", size: "lg", className: "hover:shadow-none hover:translate-none" }),
            "hidden items-center gap-2 lg:inline-flex"
          )}
        >
          Build with us
        </Link>

        {/* ── Mobile CTA (right side of navbar) ── */}
        <Link
          href="/#contact"
          className={cn(
            buttonVariants({ variant: "orange", size: "lg", className: "px-4 hover:shadow-none hover:translate-none" }),
            "inline-flex items-center gap-1.5 lg:hidden"
          )}
        >
          Build with us
        </Link>
      </div>
    </header>
  )
}

function isActiveNavLink(href: string, pathname: string, activeHash: string) {
  const hashIndex = href.indexOf("#")

  if (hashIndex === -1) {
    return pathname === href
  }

  const path = href.slice(0, hashIndex) || "/"
  const hash = href.slice(hashIndex)

  return pathname === path && activeHash === hash
}

function getHashFromHref(href: string) {
  const hashIndex = href.indexOf("#")

  if (hashIndex === -1) {
    return null
  }

  return href.slice(hashIndex)
}
