"use client"

import React from "react"
import { HeroSection } from "@/components/hero-section"
import { CommunitySection } from "@/components/community-section"
import { CampaignPage } from "@/components/campaign/campaign-page"

export default function Home() {
  const [showCampaign, setShowCampaign] = React.useState(false)

  const handleStartCampaign = () => {
    setShowCampaign(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showCampaign && <CampaignPage onBack={() => setShowCampaign(false)} />}
      {!showCampaign && (
        <>
          <HeroSection />
          <CommunitySection onStartCampaign={handleStartCampaign} />
        </>
      )}
    </main>
  )
}
