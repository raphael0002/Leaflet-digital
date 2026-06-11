"use client"

import type { ComponentType } from "react"

import { cn } from "@/lib/utils"

type Logo = {
  label: string
  Icon?: ComponentType<{ className?: string }>
}

type InfiniteLogoStripProps = {
  logos: Logo[]
  className?: string
}

export function InfiniteLogoStrip({ logos, className }: InfiniteLogoStripProps) {
  if (!logos.length) return null

  return (
    <div
      className={cn(
        "logo-marquee group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div className="logo-marquee-track flex w-max items-center">
        <LogoGroup logos={logos} />
        <LogoGroup logos={logos} ariaHidden />
      </div>
    </div>
  )
}

function LogoGroup({
  logos,
  ariaHidden,
}: {
  logos: Logo[]
  ariaHidden?: boolean
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={ariaHidden}
    >
      {logos.map(({ label, Icon }, index) => (
        <div
          key={`${label}-${index}`}
          className="flex min-w-[160px] items-center justify-center gap-3 text-white/42 transition-all duration-500 ease-[var(--ease-premium)] hover:text-white/80"
        >
          {Icon ? <Icon className="size-5 md:size-6" /> : null}
          <span className="font-heading text-xl font-bold tracking-tight md:text-3xl">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
