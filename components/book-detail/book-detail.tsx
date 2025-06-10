"use client"

import * as React from "react"
import { ArrowLeft, Edit, Play, Share, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { BookReader } from "@/components/book-reader/book-reader"

interface BookDetailProps {
  book: {
    id: number
    title: string
    author: string
    coverUrl: string
    categories: string[]
    type: "Hardcover" | "Paperback" | "E-Book" | "Audiobook"
    publishDate: Date
    status: "Available" | "Borrowed" | "Reserved"
    description?: string
    content?: string
    audioUrl?: string
  }
  onBack: () => void
  onEdit: () => void
}

export function BookDetail({ book, onBack, onEdit }: BookDetailProps) {
  const [isFavorite, setIsFavorite] = React.useState(false)
  const [showReader, setShowReader] = React.useState(false)

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-white hover:bg-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit} className="text-white border-gray-700">
              <Edit className="mr-2 h-4 w-4" />
              Edit Book
            </Button>
            <Button variant="outline" className="text-white border-gray-700">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="aspect-[2/3] relative mb-6 overflow-hidden rounded-md">
                  <Image
                    src={book.coverUrl || "/placeholder.svg"}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                      onClick={() => setShowReader(true)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Now
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`border-gray-700 ${isFavorite ? "text-red-500 hover:text-red-600" : "text-white"}`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  {book.audioUrl && (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full text-white border-gray-700">
                        <Play className="mr-2 h-4 w-4" />
                        Play Audio
                      </Button>
                      <audio controls className="w-full">
                        <source src={book.audioUrl} type="audio/mpeg" />
                      </audio>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
                <p className="text-xl text-gray-400 mb-4">by {book.author}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="bg-gray-700/50 text-gray-300">
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{book.type}</span>
                  <span>•</span>
                  <span>Published {book.publishDate.getFullYear()}</span>
                  <span>•</span>
                  <Badge
                    variant="secondary"
                    className={`${
                      book.status === "Available"
                        ? "bg-green-500/10 text-green-500"
                        : book.status === "Borrowed"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {book.status}
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                  <TabsTrigger value="description" className="text-white">
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="content" className="text-white">
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-white">
                    Reviews
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <p className="text-gray-300 leading-relaxed">
                        {book.description ||
                          "This is a captivating story that takes readers on an unforgettable journey through the complexities of human nature and the power of storytelling. With rich character development and intricate plot twists, this book offers both entertainment and profound insights into the human condition."}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="content" className="mt-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed">
                          {book.content ||
                            "Chapter 1: The Beginning\n\nIt was a dark and stormy night when our story begins. The protagonist, unaware of the adventures that lay ahead, was about to embark on a journey that would change their life forever..."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-6">
                      <p className="text-gray-400">No reviews yet. Be the first to review this book!</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {showReader && <BookReader book={book} onBack={() => setShowReader(false)} />}
    </div>
  )
}
