"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en">
      <body className="grid min-h-screen place-items-center bg-[#080808] p-6 text-white">
        <div className="max-w-xl rounded-[24px] border border-white/10 bg-[#1a1a1a] p-8">
          <h1 className="font-sans text-4xl font-bold">Something went wrong.</h1>
          <p className="mt-4 text-white/62">
            The page could not be loaded properly. Please try again or return to the homepage.
          </p>
          <Button className="mt-8" variant="orange" onClick={() => unstable_retry()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  )
}
