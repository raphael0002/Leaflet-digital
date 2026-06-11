import { cn } from "@/lib/utils"

export function LoadingSpinner({
  className,
  label = "Loading",
}: {
  className?: string
  label?: string
}) {
  return (
    <span
      aria-label={label}
      role="status"
      className={cn(
        "inline-block size-4 animate-spin rounded-full border-2 border-white/20 border-t-[var(--brand)]",
        className
      )}
    />
  )
}
