"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

export function AudioPlayer({ podcast, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
      } else {
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 to-black text-white flex flex-col">
      <div className="container mx-auto max-w-4xl flex-1 flex flex-col">
        <div className="flex items-center py-6">
          <Button variant="ghost" onClick={onClose} className="text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 py-8">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={podcast.coverUrl || "/placeholder.svg?height=400&width=400&text=Podcast"}
              alt={podcast.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center md:items-start max-w-md">
            <h1 className="text-3xl font-bold mb-2">{podcast.title || "Podcast Title"}</h1>
            <h2 className="text-xl text-gray-300 mb-4">{podcast.host || "Podcast Host"}</h2>
            <p className="text-gray-400 mb-6 text-center md:text-left">
              {podcast.description || "No description available for this episode."}
            </p>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-lg rounded-t-xl p-6 sticky bottom-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
              <span className="text-sm text-gray-400">{formatTime(duration)}</span>
            </div>

            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  onClick={togglePlay}
                  variant="secondary"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-white text-black hover:bg-white/90"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src="/sample-audio.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />
    </div>
  )
}
