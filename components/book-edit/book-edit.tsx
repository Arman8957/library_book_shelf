"use client"

import * as React from "react"
import { ArrowLeft, Save, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface BookEditProps {
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
  }
  onBack: () => void
  onSave: (updatedBook: any) => void
}

export function BookEdit({ book, onBack, onSave }: BookEditProps) {
  const [editedBook, setEditedBook] = React.useState({
    ...book,
    description: book.description || "",
    content: book.content || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setEditedBook((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(editedBook)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-white hover:bg-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Book Cover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[2/3] relative mb-4 overflow-hidden rounded-md">
                  <Image
                    src={editedBook.coverUrl || "/placeholder.svg"}
                    alt={`Cover of ${editedBook.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button variant="outline" className="w-full text-white border-gray-700">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Cover
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Edit Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={editedBook.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author" className="text-white">
                      Author
                    </Label>
                    <Input
                      id="author"
                      value={editedBook.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Type</Label>
                    <Select value={editedBook.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Hardcover">Hardcover</SelectItem>
                        <SelectItem value="Paperback">Paperback</SelectItem>
                        <SelectItem value="E-Book">E-Book</SelectItem>
                        <SelectItem value="Audiobook">Audiobook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Status</Label>
                    <Select value={editedBook.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Borrowed">Borrowed</SelectItem>
                        <SelectItem value="Reserved">Reserved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editedBook.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                    placeholder="Enter book description..."
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-white">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={editedBook.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white min-h-[300px]"
                    placeholder="Enter book content..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
