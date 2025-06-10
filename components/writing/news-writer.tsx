"use client"

import * as React from "react"
import { Save, Download, Globe, Mic, Sparkles, ArrowLeft, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const aiProviders = [
  { id: "chatgpt", name: "ChatGPT", icon: "🤖" },
  { id: "gemini", name: "Gemini", icon: "💎" },
  { id: "grok", name: "Grok", icon: "🚀" },
  { id: "claude", name: "Claude", icon: "🧠" },
]

const newsCategories = [
  "Breaking News",
  "Business",
  "Technology",
  "Education",
  "Entertainment",
  "Sports",
  "Politics",
  "Health",
  "Science",
  "World News",
]

interface NewsWriterProps {
  onBack: () => void
}

export function NewsWriter({ onBack }: NewsWriterProps) {
  const [newsData, setNewsData] = React.useState({
    headline: "",
    subheadline: "",
    author: "",
    category: "",
    location: "",
    content: "",
    tags: "",
    urgency: "normal",
  })
  const [selectedAI, setSelectedAI] = React.useState("chatgpt")
  const [isGeneratingAI, setIsGeneratingAI] = React.useState(false)
  const [grammarEnabled, setGrammarEnabled] = React.useState(true)

  const handleInputChange = (field: string, value: string) => {
    setNewsData((prev) => ({ ...prev, [field]: value }))
  }

  const generateWithAI = async (prompt: string) => {
    setIsGeneratingAI(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const aiContent = `Generated news content using ${aiProviders.find((p) => p.id === selectedAI)?.name}:\n\n${prompt}\n\nIn a developing story, sources close to the matter have confirmed significant developments that are expected to impact the industry. The situation continues to evolve, with stakeholders monitoring the circumstances closely.\n\nFurther details are expected to emerge as the story develops. We will continue to provide updates as more information becomes available.`

    setNewsData((prev) => ({ ...prev, content: prev.content + aiContent }))
    setIsGeneratingAI(false)
  }

  const saveNews = () => {
    console.log("Saving news:", newsData)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">News Writer Studio</h1>
          </div>
          <Button onClick={saveNews} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
            <Save className="mr-2 h-4 w-4" />
            Publish News
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="ai-assist">AI Assistant</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="publish">Publish</TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>News Article Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="headline">Headline</Label>
                      <Input
                        id="headline"
                        value={newsData.headline}
                        onChange={(e) => handleInputChange("headline", e.target.value)}
                        placeholder="Enter compelling headline"
                        className="text-lg font-semibold"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subheadline">Subheadline</Label>
                      <Input
                        id="subheadline"
                        value={newsData.subheadline}
                        onChange={(e) => handleInputChange("subheadline", e.target.value)}
                        placeholder="Enter subheadline for additional context"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={newsData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          placeholder="Reporter name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {newsCategories.map((category) => (
                              <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newsData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select onValueChange={(value) => handleInputChange("urgency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breaking">🔴 Breaking News</SelectItem>
                          <SelectItem value="urgent">🟡 Urgent</SelectItem>
                          <SelectItem value="normal">🟢 Normal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="content">Article Content</Label>
                      <Textarea
                        id="content"
                        value={newsData.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        placeholder="Write your news article following the inverted pyramid structure..."
                        className="min-h-[500px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={newsData.tags}
                        onChange={(e) => handleInputChange("tags", e.target.value)}
                        placeholder="breaking, technology, business"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-assist">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5" />
                      AI News Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Select AI Provider</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {aiProviders.map((provider) => (
                          <Button
                            key={provider.id}
                            variant={selectedAI === provider.id ? "default" : "outline"}
                            onClick={() => setSelectedAI(provider.id)}
                            className="flex items-center gap-2"
                          >
                            <span>{provider.icon}</span>
                            {provider.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        onClick={() => generateWithAI("Generate a compelling lead paragraph")}
                        disabled={isGeneratingAI}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Generate Lead"}
                      </Button>
                      <Button
                        onClick={() => generateWithAI("Add supporting quotes and details")}
                        disabled={isGeneratingAI}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Add Quotes"}
                      </Button>
                      <Button
                        onClick={() => generateWithAI("Create background context")}
                        disabled={isGeneratingAI}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Add Context"}
                      </Button>
                      <Button
                        onClick={() => generateWithAI("Suggest related angles")}
                        disabled={isGeneratingAI}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Related Angles"}
                      </Button>
                    </div>

                    <div className="p-4 bg-accent/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>News Writing Tips:</strong> Follow the inverted pyramid structure - most important
                        information first, followed by supporting details and background information.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ImageIcon className="mr-2 h-5 w-5" />
                      Media & Assets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Upload Featured Image
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline">Add Photo Gallery</Button>
                      <Button variant="outline">Embed Video</Button>
                    </div>

                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Drag and drop images here or click to upload
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="publish">
                <Card>
                  <CardHeader>
                    <CardTitle>Publication Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Publication Date</Label>
                        <Input type="datetime-local" />
                      </div>
                      <div>
                        <Label>Expiry Date</Label>
                        <Input type="datetime-local" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Enable Comments</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Send Push Notifications</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Feature on Homepage</Label>
                        <Switch />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button className="bg-green-600 hover:bg-green-700">Publish Now</Button>
                      <Button variant="outline">Save as Draft</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* News Status */}
            <Card>
              <CardHeader>
                <CardTitle>Article Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Status:</span>
                  <Badge variant="secondary">Draft</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Urgency:</span>
                  <Badge
                    variant={
                      newsData.urgency === "breaking"
                        ? "destructive"
                        : newsData.urgency === "urgent"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {newsData.urgency}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Word Count:</span>
                  <Badge variant="outline">{newsData.content.split(" ").length}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  Preview Online
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="mr-2 h-4 w-4" />
                  Generate Audio
                </Button>
              </CardContent>
            </Card>

            {/* AI Tools */}
            <Card>
              <CardHeader>
                <CardTitle>AI Tools Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">AI Assistant Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${grammarEnabled ? "bg-green-500" : "bg-gray-400"}`}></div>
                    <span className="text-sm">Grammar Check {grammarEnabled ? "Active" : "Inactive"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Translation Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
