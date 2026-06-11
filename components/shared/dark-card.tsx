import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function DarkCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "rounded-[20px] border border-white/[0.08] bg-[var(--card)] p-6 shadow-none ring-0 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--brand-border)] hover:bg-[var(--card-hover)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-8",
        className
      )}
      {...props}
    />
  )
}
