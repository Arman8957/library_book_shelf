"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

type Podcast = {
  id: number
  title: string
  host: string
  coverUrl: string
}

const demo: Podcast[] = [
  { id: 1, title: "The Daily", host: "NY Times", coverUrl: "/placeholder.svg?height=200&width=200&text=Daily" },
  { id: 2, title: "Hidden Brain", host: "NPR", coverUrl: "/placeholder.svg?height=200&width=200&text=Brain" },
  { id: 3, title: "SYSK", host: "iHeart", coverUrl: "/placeholder.svg?height=200&width=200&text=SYSK" },
  { id: 4, title: "Radiolab", host: "WNYC", coverUrl: "/placeholder.svg?height=200&width=200&text=Radiolab" },
]

interface Props {
  onPodcastClick: (p: Podcast) => void
  onViewAllClick: () => void
}

export default function AudioPodcastSection({ onPodcastClick, onViewAllClick }: Props) {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Audio Podcasts</h2>
          <Button variant="link" onClick={onViewAllClick}>
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {demo.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPodcastClick(p)}
              className="text-left space-y-2 hover:opacity-90 focus:outline-none"
            >
              <Image
                src={p.coverUrl || "/placeholder.svg"}
                alt={p.title}
                width={200}
                height={200}
                className="w-full aspect-square rounded-lg object-cover"
              />
              <div>
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-sm text-muted-foreground truncate">{p.host}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
