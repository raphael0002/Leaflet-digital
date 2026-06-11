import Link from "next/link"

import { StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { Container } from "@/components/shared/container"
import { footerColumns } from "@/features/marketing/data/footer-links"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--background-deep)]">
      <Container wide className="py-16 md:py-24">
        <StaggerReveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr] xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <StaggerItem>
            <Link href="/" className="font-heading text-2xl font-extrabold text-white">
              Leaflet
            </Link>
            <p className="mt-8 max-w-[220px] text-sm leading-7 text-white/64">
              Connecting Your Brand to the Digital World.
            </p>
            <p className="mt-5 max-w-[190px] text-sm leading-6 text-white/70">
              Built Remote. Built Different.
              <br />
              Built
              <br />
              for Growth.
            </p>
          </StaggerItem>

          {footerColumns.map((column) => (
            <StaggerItem key={column.title}>
              <h3 className="text-base font-semibold text-white">{column.title}</h3>
              <ul className="mt-6 grid gap-4 text-sm text-white/62">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-[var(--brand)]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/[0.08] pt-8 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Leaflet Digital Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href="#" className="transition hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
