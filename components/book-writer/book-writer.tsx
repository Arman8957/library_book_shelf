"use client"

import * as React from "react"
import { Save, Download, Globe, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
]

export function BookWriter() {
  const [bookData, setBookData] = React.useState({
    title: "",
    author: "",
    category: "",
    content: "",
    targetLanguage: "en",
  })
  const [isGeneratingAudio, setIsGeneratingAudio] = React.useState(false)
  const [isTranslating, setIsTranslating] = React.useState(false)
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null)
  const [translatedContent, setTranslatedContent] = React.useState("")

  const handleInputChange = (field: string, value: string) => {
    setBookData((prev) => ({ ...prev, [field]: value }))
  }

  const generateAudioPodcast = async () => {
    setIsGeneratingAudio(true)
    // Simulate audio generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setAudioUrl("/placeholder-audio.mp3")
    setIsGeneratingAudio(false)
  }

  const translateContent = async () => {
    setIsTranslating(true)
    // Simulate translation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTranslatedContent(`[Translated to ${bookData.targetLanguage}] ${bookData.content}`)
    setIsTranslating(false)
  }

  const saveBook = () => {
    console.log("Saving book:", bookData)
    // Here you would typically save to a database
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Book Writer Studio</h1>
          <Button onClick={saveBook} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
            <Save className="mr-2 h-4 w-4" />
            Save Book
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={bookData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter book title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author" className="text-white">
                      Author
                    </Label>
                    <Input
                      id="author"
                      value={bookData.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter author name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content" className="text-white">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={bookData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white min-h-[400px]"
                    placeholder="Start writing your book..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mic className="mr-2 h-5 w-5" />
                  Audio Podcast
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={generateAudioPodcast}
                  disabled={!bookData.content || isGeneratingAudio}
                  className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                >
                  {isGeneratingAudio ? "Generating..." : "Generate Audio"}
                </Button>
                {audioUrl && (
                  <div className="space-y-2">
                    <audio controls className="w-full">
                      <source src={audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <Button variant="outline" className="w-full text-white border-gray-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Audio
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Translation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Target Language</Label>
                  <Select onValueChange={(value) => handleInputChange("targetLanguage", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={translateContent}
                  disabled={!bookData.content || isTranslating}
                  className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                >
                  {isTranslating ? "Translating..." : "Translate Content"}
                </Button>
                {translatedContent && (
                  <div className="p-3 bg-gray-700 rounded-md">
                    <p className="text-sm text-gray-300">{translatedContent}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
