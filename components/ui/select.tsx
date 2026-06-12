// components/ui/select.tsx
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { ChevronDown, ChevronUp, Check } from "lucide-react"

import { cn } from "@/lib/utils"

// ─── Re-export root as-is ─────────────────────────────────────────────
const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group

// ─── Value ────────────────────────────────────────────────────────────
function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left truncate", className)}
      {...props}
    />
  )
}

// ─── Trigger ──────────────────────────────────────────────────────────
function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        // Layout
        "flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3",
        // Typography — matches Input / Textarea
        "font-sans text-[13px] text-white",
        // Background + border — matches Input fieldStyles
        "border border-white/[0.08] bg-[var(--background-soft)]",
        // Focus
        "outline-none focus-visible:border-[var(--brand)]/40 focus-visible:ring-2 focus-visible:ring-[var(--brand)]/15",
        // Hover
        "hover:border-white/[0.14] hover:bg-white/[0.04]",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-40",
        // Placeholder text colour
        "data-[placeholder]:text-white/30",
        // Transition
        "transition-colors duration-200",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0 text-white/30 transition-transform duration-200 group-data-[open]:rotate-180"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

// ─── Content (popup + positioner) ────────────────────────────────────
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            // Size
            "w-[var(--anchor-width)] min-w-[10rem]",
            "max-h-[var(--available-height,320px)] overflow-y-auto",
            // Visual
            "rounded-lg border border-white/[0.08] bg-[var(--card)]",
            "shadow-[0_16px_48px_rgba(0,0,0,0.32)]",
            // Scroll padding
            "p-1",
            // Enter animation
            "origin-[var(--transform-origin)]",
            "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-[0.98]",
            "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-[0.98]",
            "duration-150",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

// ─── Item ─────────────────────────────────────────────────────────────
function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Layout
        "relative flex w-full cursor-pointer select-none items-center",
        "rounded-md px-3 py-2 pr-8",
        // Typography
        "font-sans text-[13px] text-white/70",
        // States
        "outline-none",
        "data-[highlighted]:bg-white/[0.06] data-[highlighted]:text-white",
        "data-[selected]:text-white",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        // Transition
        "transition-colors duration-150",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>

      {/* Check indicator — only visible when selected */}
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2.5 flex h-4 w-4 items-center justify-center" />
        }
      >
        <Check className="h-3.5 w-3.5 text-[var(--brand)]" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

// ─── Group label ──────────────────────────────────────────────────────
function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30",
        className,
      )}
      {...props}
    />
  )
}

// ─── Separator ────────────────────────────────────────────────────────
function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-white/[0.06]", className)}
      {...props}
    />
  )
}

// ─── Scroll arrows ────────────────────────────────────────────────────
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up"
      className={cn(
        "flex w-full cursor-default items-center justify-center py-1 text-white/30",
        className,
      )}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down"
      className={cn(
        "flex w-full cursor-default items-center justify-center py-1 text-white/30",
        className,
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}