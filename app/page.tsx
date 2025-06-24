"use client"

import React from "react"
import { CommunitySection } from "@/components/community-section"
import { CampaignPage } from "@/components/campaign/campaign-page"
import { PosterSection } from "@/components/marketing/poster-section"

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
          <PosterSection />
          <CommunitySection onStartCampaign={handleStartCampaign} />
        </>
      )}
    </main>
  )
}
