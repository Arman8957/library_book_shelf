"use client"

import * as React from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  X,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

interface VideoPlayerProps {
  video: {
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
  onClose: () => void
}

const relatedVideos = [
  {
    id: 2,
    title: "Digital Publishing Revolution",
    thumbnailUrl: "/placeholder.svg?height=120&width=200&text=Digital+Publishing&bg=3b82f6&color=white",
    duration: "38:15",
    views: 8900,
    author: "Mark Thompson",
  },
  {
    id: 3,
    title: "Building Reading Communities Online",
    thumbnailUrl: "/placeholder.svg?height=120&width=200&text=Reading+Communities&bg=10b981&color=white",
    duration: "52:18",
    views: 15200,
    author: "Lisa Chen",
  },
  {
    id: 4,
    title: "The Future of Audiobooks",
    thumbnailUrl: "/placeholder.svg?height=120&width=200&text=Audiobooks+Future&bg=f59e0b&color=white",
    duration: "41:27",
    views: 9800,
    author: "James Rodriguez",
  },
]

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [volume, setVolume] = React.useState([75])
  const [progress, setProgress] = React.useState([0])
  const [isLiked, setIsLiked] = React.useState(false)
  const [isDisliked, setIsDisliked] = React.useState(false)
  const [isSubscribed, setIsSubscribed] = React.useState(false)

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
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-black/90 backdrop-blur-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-gray-800">
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-white font-semibold">Library Video Player</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <Image src={video.thumbnailUrl || "/placeholder.svg"} alt={video.title} fill className="object-cover" />

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group hover:bg-black/60 transition-colors">
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="w-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <div className="w-20">
                        <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
                      </div>
                      <span className="text-white text-sm">0:00 / {video.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-sm">
                    {formatViews(video.views)} views • {formatDate(video.publishDate)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsLiked(!isLiked)
                        if (isDisliked) setIsDisliked(false)
                      }}
                      className={`text-white hover:bg-gray-800 ${isLiked ? "text-blue-500" : ""}`}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {video.likes + (isLiked ? 1 : 0)}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsDisliked(!isDisliked)
                        if (isLiked) setIsLiked(false)
                      }}
                      className={`text-white hover:bg-gray-800 ${isDisliked ? "text-red-500" : ""}`}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {video.dislikes + (isDisliked ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Channel Info */}
              <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48&text=Author" />
                    <AvatarFallback>{video.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">{video.author}</h3>
                    <p className="text-gray-400 text-sm">125K subscribers</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`${
                    isSubscribed ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>

              {/* Description */}
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{video.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="space-y-4">
            <h2 className="text-white font-semibold text-lg">Up Next</h2>
            {relatedVideos.map((relatedVideo) => (
              <Card
                key={relatedVideo.id}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={relatedVideo.thumbnailUrl || "/placeholder.svg"}
                        alt={relatedVideo.title}
                        width={120}
                        height={68}
                        className="rounded object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 text-xs rounded">
                        {relatedVideo.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">{relatedVideo.title}</h3>
                      <p className="text-gray-400 text-xs">{relatedVideo.author}</p>
                      <p className="text-gray-400 text-xs">{formatViews(relatedVideo.views)} views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
