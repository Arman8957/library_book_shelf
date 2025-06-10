"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Play } from "lucide-react"

const featuredPodcasts = [
  {
    id: 1,
    title: "The Daily",
    host: "The New York Times",
    coverUrl: "/placeholder.svg?height=300&width=300&text=The+Daily",
    description: "This is what the news should sound like. The biggest stories of our time.",
    episodes: 1245,
    category: "News",
  },
  {
    id: 2,
    title: "Hidden Brain",
    host: "NPR",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Hidden+Brain",
    description: "Exploring the unconscious patterns that drive human behavior.",
    episodes: 387,
    category: "Science",
  },
  {
    id: 3,
    title: "Stuff You Should Know",
    host: "iHeartRadio",
    coverUrl: "/placeholder.svg?height=300&width=300&text=SYSK",
    description: "Josh and Chuck explore everything under the sun.",
    episodes: 1500,
    category: "Education",
  },
  {
    id: 4,
    title: "Radiolab",
    host: "WNYC Studios",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Radiolab",
    description: "Investigating a strange world.",
    episodes: 450,
    category: "Science",
  },
]

export function AudioPodcastSection({ onPodcastClick, onViewAllClick }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Audio Podcasts</h2>
        <Button variant="ghost" onClick={onViewAllClick} className="flex items-center">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredPodcasts.map((podcast) => (
          <Card
            key={podcast.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredId(podcast.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onPodcastClick(podcast)}
          >
            <div className="relative aspect-square">
              <img
                src={podcast.coverUrl || "/placeholder.svg"}
                alt={podcast.title}
                className="w-full h-full object-cover"
              />
              {hoveredId === podcast.id && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold truncate">{podcast.title}</h3>
              <p className="text-sm text-muted-foreground">{podcast.host}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
