"use client"

import * as React from "react"
import { Save, Download, Globe, Mic, Sparkles, CheckCircle, Languages, ArrowLeft } from "lucide-react"
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

interface ArticleWriterProps {
  onBack: () => void
}

export function ArticleWriter({ onBack }: ArticleWriterProps) {
  const [articleData, setArticleData] = React.useState({
    title: "",
    author: "",
    category: "",
    abstract: "",
    content: "",
    tags: "",
    targetLanguage: "en",
  })
  const [selectedAI, setSelectedAI] = React.useState("chatgpt")
  const [isGeneratingAI, setIsGeneratingAI] = React.useState(false)
  const [isTranslating, setIsTranslating] = React.useState(false)
  const [isGrammarChecking, setIsGrammarChecking] = React.useState(false)
  const [grammarEnabled, setGrammarEnabled] = React.useState(true)
  const [translatedContent, setTranslatedContent] = React.useState("")
  const [grammarSuggestions, setGrammarSuggestions] = React.useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setArticleData((prev) => ({ ...prev, [field]: value }))
  }

  const generateWithAI = async (prompt: string) => {
    setIsGeneratingAI(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const aiContent = `Generated content using ${aiProviders.find((p) => p.id === selectedAI)?.name}:\n\n${prompt}\n\nThis is a comprehensive analysis that explores the various aspects of the topic. The research methodology employed in this study follows established academic standards and incorporates both quantitative and qualitative approaches to ensure robust findings.\n\nKey findings indicate significant trends that warrant further investigation. The implications of these results extend beyond the immediate scope of this research and suggest areas for future study.`

    setArticleData((prev) => ({ ...prev, content: prev.content + aiContent }))
    setIsGeneratingAI(false)
  }

  const checkGrammar = async () => {
    setIsGrammarChecking(true)
    // Simulate Grammarly check
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const suggestions = [
      "Consider using 'furthermore' instead of 'also' for better flow",
      "The sentence could be more concise",
      "Check subject-verb agreement in paragraph 3",
    ]

    setGrammarSuggestions(suggestions)
    setIsGrammarChecking(false)
  }

  const translateContent = async () => {
    setIsTranslating(true)
    // Simulate translation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTranslatedContent(`[Translated to ${articleData.targetLanguage}] ${articleData.content}`)
    setIsTranslating(false)
  }

  const saveArticle = () => {
    console.log("Saving article:", articleData)
    // Here you would typically save to a database
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
            <h1 className="text-2xl font-bold">Article Writer Studio</h1>
          </div>
          <Button onClick={saveArticle} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
            <Save className="mr-2 h-4 w-4" />
            Save Article
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
                <TabsTrigger value="grammar">Grammar</TabsTrigger>
                <TabsTrigger value="translate">Translate</TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Article Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={articleData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Enter article title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={articleData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          placeholder="Enter author name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="psychology">Psychology</SelectItem>
                            <SelectItem value="environment">Environment</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={articleData.tags}
                          onChange={(e) => handleInputChange("tags", e.target.value)}
                          placeholder="research, analysis, study"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="abstract">Abstract</Label>
                      <Textarea
                        id="abstract"
                        value={articleData.abstract}
                        onChange={(e) => handleInputChange("abstract", e.target.value)}
                        placeholder="Write a brief abstract of your article..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={articleData.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        placeholder="Start writing your article..."
                        className="min-h-[500px]"
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
                      AI Writing Assistant
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
                        onClick={() => generateWithAI("Generate an introduction for this article")}
                        disabled={isGeneratingAI}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Generate Introduction"}
                      </Button>
                      <Button
                        onClick={() => generateWithAI("Generate a conclusion for this article")}
                        disabled={isGeneratingAI}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Generate Conclusion"}
                      </Button>
                      <Button
                        onClick={() => generateWithAI("Expand on the main points")}
                        disabled={isGeneratingAI}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Expand Content"}
                      </Button>
                      <Button
                        onClick={() => generateWithAI("Improve the writing style")}
                        disabled={isGeneratingAI}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        {isGeneratingAI ? "Generating..." : "Improve Style"}
                      </Button>
                    </div>

                    <div className="p-4 bg-accent/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Tip:</strong> Use AI assistance to overcome writer's block, generate ideas, or improve
                        your content. The AI will work with your existing content to provide relevant suggestions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="grammar">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Grammar & Style Check
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="grammar-toggle" className="text-sm">
                          Auto-check
                        </Label>
                        <Switch id="grammar-toggle" checked={grammarEnabled} onCheckedChange={setGrammarEnabled} />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={checkGrammar}
                      disabled={isGrammarChecking || !articleData.content}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isGrammarChecking ? "Checking..." : "Check Grammar & Style"}
                    </Button>

                    {grammarSuggestions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Suggestions:</h4>
                        {grammarSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-400"
                          >
                            <p className="text-sm">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="p-4 bg-accent/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Powered by Grammarly:</strong> Get real-time suggestions for grammar, spelling,
                        punctuation, and style improvements to make your writing more effective.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="translate">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Languages className="mr-2 h-5 w-5" />
                      Translation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Target Language</Label>
                      <Select onValueChange={(value) => handleInputChange("targetLanguage", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
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
                      disabled={!articleData.content || isTranslating}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isTranslating ? "Translating..." : "Translate Article"}
                    </Button>

                    {translatedContent && (
                      <div className="space-y-2">
                        <Label>Translated Content</Label>
                        <Textarea value={translatedContent} readOnly className="min-h-[200px]" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                  Publish Online
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="mr-2 h-4 w-4" />
                  Generate Audio
                </Button>
              </CardContent>
            </Card>

            {/* Writing Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Writing Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Words:</span>
                  <Badge variant="secondary">{articleData.content.split(" ").length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Characters:</span>
                  <Badge variant="secondary">{articleData.content.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Reading Time:</span>
                  <Badge variant="secondary">{Math.ceil(articleData.content.split(" ").length / 200)} min</Badge>
                </div>
              </CardContent>
            </Card>

            {/* AI Status */}
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Connected to {aiProviders.find((p) => p.id === selectedAI)?.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${grammarEnabled ? "bg-green-500" : "bg-gray-400"}`}></div>
                  <span className="text-sm">Grammar Check {grammarEnabled ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Translation Ready</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
