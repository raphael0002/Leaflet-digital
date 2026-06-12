// components/shared/section-label.tsx
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionLabelProps = {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "2xl:relative 2xl:min-w-12",
      )}
    >
      <div
        className={cn(
          "mb-5 inline-flex bg-[var(--card-soft)] text-center px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white/90 ring-1 ring-[var(--border)] 2xl:absolute 2xl:left-0 2xl:top-2 2xl:z-20 2xl:mb-0 2xl:min-h-[160px] 2xl:min-w-12 2xl:items-center 2xl:justify-center 2xl:[writing-mode:vertical-rl] 2xl:rotate-180",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}