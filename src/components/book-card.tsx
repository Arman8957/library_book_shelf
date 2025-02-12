"use client"

import * as React from "react"
import Image from "next/image"
import { format } from "date-fns"
import { BookOpen, Check, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BookCardProps {
  id: number
  title: string
  author: string
  coverUrl: string
  categories: string[]
  type: "Hardcover" | "Paperback" | "E-Book" | "Audiobook"
  publishDate: Date
  status: "Available" | "Borrowed" | "Reserved"
}

export function BookCard({ title, author, coverUrl, categories, type, publishDate, status }: BookCardProps) {
  const [isAdded, setIsAdded] = React.useState(false)

  const handleAddToList = () => {
    setIsAdded(true)
    // You could add an API call here to update the backend
  }

  const statusColors = {
    Available: "bg-green-500/10 text-green-500",
    Borrowed: "bg-yellow-500/10 text-yellow-500",
    Reserved: "bg-blue-500/10 text-blue-500",
  }

  return (
    <Card className="w-full max-w-[280px] bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
      <CardContent className="p-4">
        <div className="relative group">
          <div className="aspect-[2/3] relative mb-4 overflow-hidden rounded-md">
            <Image
              src={coverUrl || "/placeholder.svg"}
              alt={`Cover of ${title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Quick Action Button */}
          <Button
            size="sm"
            className={`absolute bottom-6 right-2 transition-all duration-300 ${
              isAdded ? "bg-green-500 hover:bg-green-600" : "bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
            }`}
            onClick={handleAddToList}
          >
            {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-3">
          {/* Title and Author */}
          <div>
            <h3 className="font-semibold text-lg leading-tight mb-1 text-white">{title}</h3>
            <p className="text-sm text-gray-400">{author}</p>
          </div>

          {/* Book Type and Date */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{type}</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <time dateTime={publishDate.toISOString()}>{format(publishDate, "MMM yyyy")}</time>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Published {format(publishDate, "MMMM do, yyyy")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="bg-gray-700/50 text-gray-300 hover:bg-gray-700">
                {category}
              </Badge>
            ))}
          </div>

          {/* Status */}
          <div className="pt-2 border-t border-gray-700">
            <Badge variant="secondary" className={`${statusColors[status]} border-0`}>
              {status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

