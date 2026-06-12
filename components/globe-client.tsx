"use client"
 
import dynamic from "next/dynamic"
import { GlobeConfig, Position } from "./ui/globe"
 
// Skeleton shown while the JS bundle loads
function GlobeSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full animate-pulse rounded-full bg-white/[0.04]"
    />
  )
}
 
// Dynamic import — ssr:false is the key guard
const WorldDynamic = dynamic(
  () => import("./ui/globe").then((m) => ({ default: m.World })),
  {
    ssr: false,
    loading: GlobeSkeleton,
  },
)
 
interface GlobeClientProps {
  globeConfig: GlobeConfig
  data: Position[]
}
 
export function GlobeClient({ globeConfig, data }: GlobeClientProps) {
  return <WorldDynamic globeConfig={globeConfig} data={data} />
}
