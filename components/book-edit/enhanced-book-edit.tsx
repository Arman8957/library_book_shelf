"use client"

import * as React from "react"
import { ArrowLeft, Save, Trash2, Plus, Mic, ImageIcon, Palette, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface Page {
  id: number
  title: string
  content: string
  backgroundColor: string
  textColor: string
  images: Array<{
    id: string
    url: string
    alt: string
    position: { x: number; y: number }
  }>
  audioUrl?: string
}

interface EnhancedBookEditProps {
  book: {
    id: number
    title: string
    author: string
    coverUrl: string
    pages?: Page[]
  }
  onBack: () => void
  onSave: (updatedBook: any) => void
}

export function EnhancedBookEdit({ book, onBack, onSave }: EnhancedBookEditProps) {
  const [editedBook, setEditedBook] = React.useState({
    ...book,
    pages: book.pages || [
      {
        id: 1,
        title: "Chapter 1",
        content: "Start writing your content here...",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        images: [],
      },
    ],
  })
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0)
  const [isGeneratingAudio, setIsGeneratingAudio] = React.useState(false)

  const currentPage = editedBook.pages[currentPageIndex]

  const updatePage = (pageIndex: number, updates: Partial<Page>) => {
    const updatedPages = [...editedBook.pages]
    updatedPages[pageIndex] = { ...updatedPages[pageIndex], ...updates }
    setEditedBook({ ...editedBook, pages: updatedPages })
  }

  const addNewPage = () => {
    const newPage: Page = {
      id: Date.now(),
      title: `Chapter ${editedBook.pages.length + 1}`,
      content: "Start writing your content here...",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      images: [],
    }
    setEditedBook({
      ...editedBook,
      pages: [...editedBook.pages, newPage],
    })
    setCurrentPageIndex(editedBook.pages.length)
  }

  const deletePage = (pageIndex: number) => {
    if (editedBook.pages.length > 1) {
      const updatedPages = editedBook.pages.filter((_, index) => index !== pageIndex)
      setEditedBook({ ...editedBook, pages: updatedPages })
      setCurrentPageIndex(Math.max(0, pageIndex - 1))
    }
  }

  const generatePageAudio = async () => {
    setIsGeneratingAudio(true)
    // Simulate audio generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real implementation, you would call a text-to-speech API
    const utterance = new SpeechSynthesisUtterance(currentPage.content)
    utterance.rate = 0.8
    utterance.pitch = 1

    updatePage(currentPageIndex, { audioUrl: "/placeholder-audio.mp3" })
    setIsGeneratingAudio(false)
  }

  const addImageToPage = () => {
    const newImage = {
      id: Date.now().toString(),
      url: "/placeholder.svg?height=200&width=300&text=New+Image",
      alt: "New image",
      position: { x: 50, y: 50 },
    }
    updatePage(currentPageIndex, {
      images: [...currentPage.images, newImage],
    })
  }

  const handleSave = () => {
    onSave(editedBook)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-white hover:bg-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Button>

          <div className="text-center">
            <h1 className="font-semibold text-white">{editedBook.title}</h1>
            <p className="text-sm text-gray-400">Enhanced Editor</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="text-red-400 border-red-400 hover:bg-red-400/10">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Book
            </Button>
            <Button onClick={handleSave} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Page Index Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Content Index
                  <Button size="sm" onClick={addNewPage} className="bg-[#CCFF00] text-black">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {editedBook.pages.map((page, index) => (
                  <div
                    key={page.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      index === currentPageIndex
                        ? "bg-[#CCFF00] text-black"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => setCurrentPageIndex(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{page.title}</span>
                      {editedBook.pages.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deletePage(index)
                          }}
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs opacity-70 mt-1 truncate">{page.content.substring(0, 50)}...</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                <TabsTrigger value="content" className="text-white">
                  Content
                </TabsTrigger>
                <TabsTrigger value="design" className="text-white">
                  Design
                </TabsTrigger>
                <TabsTrigger value="media" className="text-white">
                  Media
                </TabsTrigger>
                <TabsTrigger value="audio" className="text-white">
                  Audio
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Page Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="page-title" className="text-white">
                        Page Title
                      </Label>
                      <Input
                        id="page-title"
                        value={currentPage.title}
                        onChange={(e) => updatePage(currentPageIndex, { title: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="page-content" className="text-white">
                        Content
                      </Label>
                      <Textarea
                        id="page-content"
                        value={currentPage.content}
                        onChange={(e) => updatePage(currentPageIndex, { content: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white min-h-[400px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Palette className="mr-2 h-5 w-5" />
                      Page Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Background Color</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="color"
                            value={currentPage.backgroundColor}
                            onChange={(e) => updatePage(currentPageIndex, { backgroundColor: e.target.value })}
                            className="w-12 h-10 rounded border border-gray-700"
                          />
                          <Input
                            value={currentPage.backgroundColor}
                            onChange={(e) => updatePage(currentPageIndex, { backgroundColor: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Text Color</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="color"
                            value={currentPage.textColor}
                            onChange={(e) => updatePage(currentPageIndex, { textColor: e.target.value })}
                            className="w-12 h-10 rounded border border-gray-700"
                          />
                          <Input
                            value={currentPage.textColor}
                            onChange={(e) => updatePage(currentPageIndex, { textColor: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="border border-gray-700 rounded-lg p-4">
                      <Label className="text-white mb-2 block">Preview</Label>
                      <div
                        className="p-4 rounded min-h-[200px] relative"
                        style={{
                          backgroundColor: currentPage.backgroundColor,
                          color: currentPage.textColor,
                        }}
                      >
                        <h3 className="text-xl font-bold mb-4">{currentPage.title}</h3>
                        <p className="leading-relaxed">{currentPage.content.substring(0, 200)}...</p>

                        {/* Render images */}
                        {currentPage.images.map((image) => (
                          <div
                            key={image.id}
                            className="absolute"
                            style={{
                              left: `${image.position.x}%`,
                              top: `${image.position.y}%`,
                            }}
                          >
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={image.alt}
                              width={100}
                              height={60}
                              className="rounded border"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <ImageIcon className="mr-2 h-5 w-5" />
                      Images & Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button onClick={addImageToPage} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {currentPage.images.map((image, index) => (
                        <div key={image.id} className="relative group">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.alt}
                            width={150}
                            height={100}
                            className="rounded border border-gray-700 w-full h-24 object-cover"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const updatedImages = currentPage.images.filter((_, i) => i !== index)
                              updatePage(currentPageIndex, { images: updatedImages })
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audio">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Volume2 className="mr-2 h-5 w-5" />
                      Page Audio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={generatePageAudio}
                      disabled={isGeneratingAudio || !currentPage.content}
                      className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      {isGeneratingAudio ? "Generating..." : "Generate Audio for This Page"}
                    </Button>

                    {currentPage.audioUrl && (
                      <div className="space-y-2">
                        <Label className="text-white">Page Audio</Label>
                        <audio controls className="w-full">
                          <source src={currentPage.audioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}

                    <div className="p-4 bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <strong>Tip:</strong> Generate audio for each page individually to create a complete audiobook
                        experience. The audio will be generated based on the current page content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
