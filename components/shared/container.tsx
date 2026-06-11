import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        wide ? "max-w-[1320px]" : "max-w-[1200px]",
        className
      )}
    >
      {children}
    </div>
  )
}
