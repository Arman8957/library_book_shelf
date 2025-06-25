"use client"

import { ArrowLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Podcast = {
  id: number
  title: string
  host: string
  coverUrl: string
  description?: string
}

interface Props {
  podcast: Podcast
  onBack: () => void
  onPlay: (p: Podcast) => void
}

export default function PodcastDetailPage({ podcast, onBack, onPlay }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/75 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold truncate">{podcast.title}</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        <Image
          src={podcast.coverUrl || "/placeholder.svg"}
          alt={podcast.title}
          width={300}
          height={300}
          className="w-60 h-60 rounded-lg object-cover"
        />

        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{podcast.title}</h2>
          <p className="text-muted-foreground">by {podcast.host}</p>
          <p className="prose dark:prose-invert">
            {podcast.description || "This is a demo podcast detail page. Replace this with real data as needed."}
          </p>

          <Button onClick={() => onPlay(podcast)}>
            <Play className="mr-2 h-4 w-4" />
            Play Latest Episode
          </Button>
        </div>
      </main>
    </div>
  )
}
