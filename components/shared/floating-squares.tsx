import { cn } from "@/lib/utils"

export function FloatingSquares({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none hidden grid-cols-3 gap-4 lg:grid", className)} aria-hidden>
      {Array.from({ length: 9 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "size-16 rounded-[14px] bg-[#343434] opacity-25 xl:size-[88px]",
            (index === 0 || index === 8) && "opacity-0"
          )}
        />
      ))}
    </div>
  )
}
