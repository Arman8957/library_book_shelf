"use client"

import * as React from "react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { PersistentAudioPlayer } from "@/components/audio-podcast/persistent-audio-player"
import { AITextAssistant } from "@/components/ai-assistant/ai-text-assistant"

interface AppContextType {
  // Audio Player State
  currentPodcast: any | null
  isPlaying: boolean
  currentTime: number
  volume: number
  setCurrentPodcast: (podcast: any) => void
  setIsPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void

  // AI Assistant State
  selectedText: string
  assistantPosition: { x: number; y: number }
  showAssistant: boolean
  setSelectedText: (text: string) => void
  setAssistantPosition: (position: { x: number; y: number }) => void
  setShowAssistant: (show: boolean) => void
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Audio Player State
  const [currentPodcast, setCurrentPodcast] = React.useState<any | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [volume, setVolume] = React.useState(75)

  // AI Assistant State
  const [selectedText, setSelectedText] = React.useState("")
  const [assistantPosition, setAssistantPosition] = React.useState({ x: 0, y: 0 })
  const [showAssistant, setShowAssistant] = React.useState(false)

  // Audio Player Handlers
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 15))
  }

  const handleSkipForward = () => {
    setCurrentTime(currentTime + 15)
  }

  const handleSeek = (time: number) => {
    setCurrentTime(time)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
  }

  const handleExpand = () => {
    // This would open the full audio player
    console.log("Expand audio player")
  }

  const handleClose = () => {
    setCurrentPodcast(null)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // AI Assistant Handlers
  const handleCloseAssistant = () => {
    setShowAssistant(false)
    setSelectedText("")
  }

  // Global text selection handler
  React.useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        setSelectedText(selection.toString().trim())
        setAssistantPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        })
        setShowAssistant(true)
      }
    }

    document.addEventListener("mouseup", handleTextSelection)
    return () => document.removeEventListener("mouseup", handleTextSelection)
  }, [])

  const contextValue: AppContextType = {
    currentPodcast,
    isPlaying,
    currentTime,
    volume,
    setCurrentPodcast,
    setIsPlaying,
    setCurrentTime,
    setVolume,
    selectedText,
    assistantPosition,
    showAssistant,
    setSelectedText,
    setAssistantPosition,
    setShowAssistant,
  }

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}

        {/* Persistent Audio Player */}
        <PersistentAudioPlayer
          podcast={currentPodcast}
          isPlaying={isPlaying}
          currentTime={currentTime}
          volume={volume}
          onPlayPause={handlePlayPause}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onExpand={handleExpand}
          onClose={handleClose}
        />

        {/* AI Text Assistant */}
        {showAssistant && selectedText && (
          <AITextAssistant selectedText={selectedText} position={assistantPosition} onClose={handleCloseAssistant} />
        )}
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
