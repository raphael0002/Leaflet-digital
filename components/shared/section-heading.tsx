import { cn } from "@/lib/utils"

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        "font-heading text-[32px] font-bold leading-[1.1] tracking-normal text-[var(--text)] md:text-[42px] lg:text-[52px]",
        className
      )}
    >
      {children}
    </h2>
  )
}
