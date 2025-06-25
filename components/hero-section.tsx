"use client"

import { Button } from "@/components/ui/button"

type HeroSectionProps = {
  /* Optional click-handler for a CTA button */
  onStartCampaign?: () => void
}

/**
 * Fallback Hero section.
 * This prevents “Component cannot be found. Please make sure it is a default export.”
 * errors when any part of the codebase imports `@/components/hero-section`.
 */
export default function HeroSection({ onStartCampaign }: HeroSectionProps) {
  return (
    <section className="w-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-lg p-10 mb-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to the Digital Library&nbsp;Platform</h1>
        <p className="text-lg opacity-90">Read books, listen to podcasts, and support the project you love.</p>

        {onStartCampaign && (
          <Button size="lg" className="bg-white text-black hover:bg-white/90" onClick={onStartCampaign}>
            Start your campaign
          </Button>
        )}
      </div>
    </section>
  )
}
