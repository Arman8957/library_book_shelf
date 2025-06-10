"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BookCard } from "./book-card"
import { Button } from "./ui/button"

interface Book {
  id: number
  title: string
  author: string
  coverUrl: string
  categories: string[]
  type: "Hardcover" | "Paperback" | "E-Book" | "Audiobook"
  publishDate: Date
  status: "Available" | "Borrowed" | "Reserved"
}

interface BookShowcaseProps {
  books: Book[]
}

export function BookShowcase({ books }: BookShowcaseProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold text-white mb-4">Featured Books</h2>
      <div className="relative">
        <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {books.map((book) => (
            <div key={book.id} className="flex-none w-[280px]">
              <BookCard {...book} />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
