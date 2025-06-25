"use client"

import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, X } from "lucide-react"

interface Props {
  podcast: { title: string; host: string; coverUrl: string } | null
  isPlaying: boolean
  currentTime: number
  volume: number
  onPlayPause: () => void
  onSeek: (t: number) => void
  onVolumeChange: (v: number) => void
  onExpand: () => void
  onSkipBack: () => void
  onSkipForward: () => void
  onClose: () => void
}

/*  A lightweight sticky bar that only appears while a podcast is loaded.  */
export default function PersistentAudioPlayer({
  podcast,
  isPlaying,
  currentTime,
  volume,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onClose,
}: Props) {
  if (!podcast) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-background border-t px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <Image
          src={podcast.coverUrl || "/placeholder.svg"}
          alt={podcast.title}
          width={48}
          height={48}
          className="w-12 h-12 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium truncate">{podcast.title}</div>
          <div className="text-xs text-muted-foreground truncate">{podcast.host}</div>
          <Slider value={[currentTime]} max={100} step={1} onValueChange={(v) => onSeek(v[0])} className="mt-1" />
        </div>

        <Button variant="ghost" size="icon" onClick={onPlayPause}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>
        <Slider
          className="w-24 hidden sm:block"
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(v) => onVolumeChange(v[0])}
        />
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
