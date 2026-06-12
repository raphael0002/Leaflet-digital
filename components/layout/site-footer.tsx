// features/marketing/components/site-footer.tsx
"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { Container } from "@/components/shared/container"
import { footerColumns } from "@/features/marketing/data/footer-links"
import { fadeUp, sectionStagger } from "@/lib/motion"
import Image from "next/image"

const grid = sectionStagger(0.08, 0.04)
const col = fadeUp(18, 0.5)
const bottomReveal = fadeUp(12, 0.45, 0.2)

const viewport = { once: true, amount: 0.15 as const }

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--background-deep)]">
      <Container wide className="py-16 md:py-24">
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr] xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]"
        >
          <motion.div variants={col}>
            <Link
              href="/"
              className="inline-flex items-start gap-2 font-heading font-bold tracking-wide text-white text-5xl"
            >
              <Image
                src="/logo_white.svg"
                alt="Leaflet Digital Solutions"
                width={64}
                height={64}
                priority
                className="h-11 w-11 object-contain"
              />
              <span className="text-5xl tracking-wider">
                Leaflet
              </span>
            </Link>
            <p className="mt-8 max-w-[220px] text-md leading-7 text-white/64">
              Connecting Your Brand to the Digital World.
            </p>
            <p className="mt-5 max-w-[220px] text-md leading-6 text-white/70">
              Built Remote. Built Different.
              <br />
              Built for Growth.
            </p>
          </motion.div>

          {footerColumns.map((column) => (
            <motion.div key={column.title} variants={col}>
              <h3 className="text-md font-bold text-white">{column.title}</h3>
              <ul className="mt-6 grid gap-4 text-sm text-white/62">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition hover:text-[var(--brand)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={bottomReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-16 flex flex-col gap-5 border-t border-white/[0.08] pt-8 text-sm text-white/58 md:flex-row md:items-center md:justify-between"
        >
          <p>© 2026 Leaflet Digital Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href="#" className="transition hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}