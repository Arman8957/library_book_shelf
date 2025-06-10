"use client"

import * as React from "react"
import { Play, Eye, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface VideoPodcast {
  id: number
  title: string
  description: string
  thumbnailUrl: string
  duration: string
  views: number
  publishDate: Date
  category: string
  author: string
  likes: number
  dislikes: number
}

const sampleVideoPodcasts: VideoPodcast[] = [
  {
    id: 1,
    title: "The Art of Storytelling in Modern Literature",
    description: "Exploring how contemporary authors craft compelling narratives that resonate with today's readers.",
    thumbnailUrl: "/placeholder.svg?height=200&width=350&text=Storytelling+Masterclass&bg=6366f1&color=white",
    duration: "45:32",
    views: 12500,
    publishDate: new Date("2024-01-15"),
    category: "Literature",
    author: "Dr. Sarah Mitchell",
    likes: 1250,
    dislikes: 23,
  },
  {
    id: 2,
    title: "Digital Publishing Revolution",
    description: "How technology is transforming the way we create, distribute, and consume written content.",
    thumbnailUrl: "/placeholder.svg?height=200&width=350&text=Digital+Revolution&bg=059669&color=white",
    duration: "38:15",
    views: 8900,
    publishDate: new Date("2024-01-10"),
    category: "Technology",
    author: "Mark Thompson",
    likes: 890,
    dislikes: 12,
  },
  {
    id: 3,
    title: "Building Reading Communities Online",
    description: "Strategies for creating engaging book clubs and reading communities in the digital age.",
    thumbnailUrl: "/placeholder.svg?height=200&width=350&text=Online+Communities&bg=dc2626&color=white",
    duration: "52:18",
    views: 15200,
    publishDate: new Date("2024-01-08"),
    category: "Community",
    author: "Lisa Chen",
    likes: 1520,
    dislikes: 31,
  },
  {
    id: 4,
    title: "The Future of Audiobooks",
    description: "Examining trends in audio content creation and the growing popularity of voice-first media.",
    thumbnailUrl: "/placeholder.svg?height=200&width=350&text=Audiobook+Future&bg=f59e0b&color=white",
    duration: "41:27",
    views: 9800,
    publishDate: new Date("2024-01-05"),
    category: "Audio",
    author: "James Rodriguez",
    likes: 980,
    dislikes: 18,
  },
]

// Add props interface
interface VideoPodcastSectionProps {
  onVideoClick?: (video: VideoPodcast) => void
  onViewAllClick?: () => void
}

export function VideoPodcastSection({ onVideoClick, onViewAllClick }: VideoPodcastSectionProps) {
  const [selectedVideo, setSelectedVideo] = React.useState<VideoPodcast | null>(null)

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Video Podcasts</h2>
            <p className="text-muted-foreground">
              Discover engaging video content about books, writing, and literary culture
            </p>
          </div>
          <Button variant="outline" className="border-border hover:bg-accent" onClick={onViewAllClick}>
            View All Episodes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {sampleVideoPodcasts.map((podcast) => (
            <Card
              key={podcast.id}
              className="bg-card border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer group"
              onClick={() => onVideoClick?.(podcast)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={podcast.thumbnailUrl || "/placeholder.svg"}
                    alt={podcast.title}
                    width={350}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                    <Button size="lg" className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
                      <Play className="mr-2 h-5 w-5" />
                      Play
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {podcast.duration}
                  </div>
                  <Badge className="absolute top-2 left-2 bg-[#CCFF00] text-black">{podcast.category}</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{podcast.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{podcast.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">{podcast.author}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {formatViews(podcast.views)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(podcast.publishDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
