"use client"

import * as React from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface PersistentAudioPlayerProps {
  podcast: {
    id: number
    title: string
    host: string
    coverUrl: string
    duration: string
  } | null
  isPlaying: boolean
  currentTime: number
  onPlayPause: () => void
  onSkipBack: () => void
  onSkipForward: () => void
  onSeek: (time: number) => void
  onVolumeChange: (volume: number) => void
  onExpand: () => void
  onClose: () => void
  volume: number
}

export function PersistentAudioPlayer({
  podcast,
  isPlaying,
  currentTime,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  onSeek,
  onVolumeChange,
  onExpand,
  onClose,
  volume,
}: PersistentAudioPlayerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Convert duration string to seconds for progress calculation
  const durationInSeconds = React.useMemo(() => {
    if (!podcast) return 0
    const [minutes, seconds] = podcast.duration.split(":").map(Number)
    return minutes * 60 + seconds
  }, [podcast])

  if (!podcast) return null

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="flex items-center gap-4 p-3">
        {/* Podcast Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Image
            src={podcast.coverUrl || "/placeholder.svg"}
            alt={podcast.title}
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-sm truncate">{podcast.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{podcast.host}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onSkipBack}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onPlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onSkipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
          <span className="text-xs text-muted-foreground w-10">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={durationInSeconds}
            step={1}
            onValueChange={(value) => onSeek(value[0])}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">{podcast.duration}</span>
        </div>

        {/* Volume */}
        <div className="hidden lg:flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => onVolumeChange(value[0])}
            className="w-20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onExpand}>
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
