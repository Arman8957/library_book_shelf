"use client"

import * as React from "react"
import { Languages, MessageCircle, Lightbulb, Copy, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface AITextAssistantProps {
  selectedText: string
  position: { x: number; y: number }
  onClose: () => void
}

const aiProviders = [
  { id: "chatgpt", name: "ChatGPT", icon: "🤖" },
  { id: "gemini", name: "Gemini", icon: "💎" },
  { id: "claude", name: "Claude", icon: "🧠" },
  { id: "deepseek", name: "DeepSeek", icon: "🔍" },
]

const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
]

export function AITextAssistant({ selectedText, position, onClose }: AITextAssistantProps) {
  const [activeTab, setActiveTab] = React.useState("translate")
  const [selectedProvider, setSelectedProvider] = React.useState("chatgpt")
  const [selectedLanguage, setSelectedLanguage] = React.useState("es")
  const [isLoading, setIsLoading] = React.useState(false)
  const [result, setResult] = React.useState("")

  const handleTranslate = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResult(`Translated text: "${selectedText}" to ${languages.find((l) => l.code === selectedLanguage)?.name}`)
      setIsLoading(false)
    }, 2000)
  }

  const handleExplain = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResult(`Explanation: This text discusses the concept of "${selectedText}" which refers to...`)
      setIsLoading(false)
    }, 2000)
  }

  const handleSummarize = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResult(`Summary: The selected text "${selectedText}" can be summarized as...`)
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <Card
      className="fixed z-50 w-96 max-w-[90vw] bg-background border shadow-xl"
      style={{
        left: Math.min(position.x, window.innerWidth - 400),
        top: Math.min(position.y, window.innerHeight - 500),
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Assistant</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Selected: <span className="font-medium">"{selectedText.slice(0, 50)}..."</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Provider Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">AI Provider</label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aiProviders.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  <div className="flex items-center gap-2">
                    <span>{provider.icon}</span>
                    {provider.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="translate">Translate</TabsTrigger>
            <TabsTrigger value="explain">Explain</TabsTrigger>
            <TabsTrigger value="summarize">Summarize</TabsTrigger>
          </TabsList>

          <TabsContent value="translate" className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Translate to</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
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
            <Button onClick={handleTranslate} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
              Translate
            </Button>
          </TabsContent>

          <TabsContent value="explain" className="space-y-3">
            <p className="text-sm text-muted-foreground">Get a detailed explanation of the selected text</p>
            <Button onClick={handleExplain} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
              Explain
            </Button>
          </TabsContent>

          <TabsContent value="summarize" className="space-y-3">
            <p className="text-sm text-muted-foreground">Get a concise summary of the selected text</p>
            <Button onClick={handleSummarize} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <MessageCircle className="mr-2 h-4 w-4" />
              )}
              Summarize
            </Button>
          </TabsContent>
        </Tabs>

        {/* Result */}
        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Result</label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm">{result}</div>
            <Badge variant="outline" className="text-xs">
              Powered by {aiProviders.find((p) => p.id === selectedProvider)?.name}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
