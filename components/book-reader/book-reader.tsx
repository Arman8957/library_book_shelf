"use client"

import * as React from "react"
import { ArrowLeft, Bookmark, Play, Pause, Volume2, VolumeX, Settings, Palette, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface BookReaderProps {
  book: {
    id: number
    title: string
    author: string
    content?: string
    pages?: Array<{
      id: number
      title: string
      content: string
      audioUrl?: string
    }>
  }
  onBack: () => void
}

interface Highlight {
  id: string
  text: string
  startIndex: number
  endIndex: number
  color: string
  note?: string
}

export function BookReader({ book, onBack }: BookReaderProps) {
  const [currentPage, setCurrentPage] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [fontSize, setFontSize] = React.useState(16)
  const [fontFamily, setFontFamily] = React.useState("serif")
  const [theme, setTheme] = React.useState("light")
  const [highlights, setHighlights] = React.useState<Highlight[]>([])
  const [selectedText, setSelectedText] = React.useState("")
  const [showHighlightMenu, setShowHighlightMenu] = React.useState(false)
  const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 })

  // Sample pages if not provided
  const pages = book.pages || [
    {
      id: 1,
      title: "Chapter 1: The Beginning",
      content:
        book.content ||
        "This is the beginning of our story. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      title: "Chapter 2: The Journey",
      content:
        "The journey continues with new adventures and discoveries. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      setSelectedText(selection.toString())
      setMenuPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 })
      setShowHighlightMenu(true)
    } else {
      setShowHighlightMenu(false)
    }
  }

  const addHighlight = (color: string) => {
    if (selectedText) {
      const newHighlight: Highlight = {
        id: Date.now().toString(),
        text: selectedText,
        startIndex: 0, // In a real implementation, you'd calculate this
        endIndex: selectedText.length,
        color,
      }
      setHighlights([...highlights, newHighlight])
      setShowHighlightMenu(false)
      setSelectedText("")
    }
  }

  const togglePlayback = () => {
    if (isPlaying) {
      // Stop speech synthesis
      window.speechSynthesis.cancel()
    } else {
      // Start speech synthesis
      const utterance = new SpeechSynthesisUtterance(pages[currentPage].content)
      utterance.rate = 0.8
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
    setIsPlaying(!isPlaying)
  }

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    sepia: "bg-yellow-50 text-yellow-900",
  }

  return (
    <div className={`min-h-screen ${themeClasses[theme as keyof typeof themeClasses]}`}>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center">
            <h1 className="font-semibold">{book.title}</h1>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={togglePlayback}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Font Size</label>
                    <Slider
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      max={24}
                      min={12}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Font Family</label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="sans-serif">Sans Serif</SelectItem>
                        <SelectItem value="monospace">Monospace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Theme</label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={theme === "sepia" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("sepia")}
                      >
                        <Palette className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-8">
        <Card className="min-h-[600px]">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">{pages[currentPage].title}</h2>
            <div
              className="prose max-w-none leading-relaxed"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
                lineHeight: 1.8,
              }}
              onMouseUp={handleTextSelection}
            >
              {pages[currentPage].content}
            </div>
          </CardContent>
        </Card>

        {/* Page Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            Previous Page
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {pages.length}
          </span>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
            disabled={currentPage === pages.length - 1}
          >
            Next Page
          </Button>
        </div>
      </main>

      {/* Highlight Menu */}
      {showHighlightMenu && (
        <div
          className="fixed z-50 bg-white border rounded-lg shadow-lg p-2 flex gap-1"
          style={{ left: menuPosition.x - 100, top: menuPosition.y - 50 }}
        >
          <Button size="sm" onClick={() => addHighlight("yellow")} className="bg-yellow-200 hover:bg-yellow-300">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          </Button>
          <Button size="sm" onClick={() => addHighlight("green")} className="bg-green-200 hover:bg-green-300">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
          </Button>
          <Button size="sm" onClick={() => addHighlight("blue")} className="bg-blue-200 hover:bg-blue-300">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
          </Button>
          <Button size="sm" onClick={() => addHighlight("pink")} className="bg-pink-200 hover:bg-pink-300">
            <div className="w-4 h-4 bg-pink-400 rounded"></div>
          </Button>
        </div>
      )}

      {/* Saved Highlights Sidebar */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
        <Card className="w-64">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Bookmark className="mr-2 h-4 w-4" />
              Highlights
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="p-2 border rounded text-sm">
                  <div className={`w-full h-1 bg-${highlight.color}-400 mb-2 rounded`}></div>
                  <p className="text-xs text-muted-foreground truncate">{highlight.text}</p>
                </div>
              ))}
              {highlights.length === 0 && (
                <p className="text-xs text-muted-foreground">No highlights yet. Select text to highlight.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
