"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { BookCard } from "@/components/book-card"
import { FilterTags } from "./filter-tags"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const bookTypes = ["Hardcover", "Paperback", "E-Book", "Audiobook"] as const
const bookStatuses = ["Available", "Borrowed", "Reserved"] as const

// Generate a larger sample dataset
const generateBooks = (count: number) => {
  const titles = [
    "To Kill a Mockingbird",
    "1984",
    "The Great Gatsby",
    "Pride and Prejudice",
    "The Catcher in the Rye",
    "To the Lighthouse",
    "Brave New World",
    "The Hobbit",
    "Lord of the Rings",
    "Dune",
    "Foundation",
    "Neuromancer",
    "Snow Crash",
  ]
  const authors = [
    "Harper Lee",
    "George Orwell",
    "F. Scott Fitzgerald",
    "Jane Austen",
    "J.D. Salinger",
    "Virginia Woolf",
    "Aldous Huxley",
    "J.R.R. Tolkien",
    "Frank Herbert",
    "Isaac Asimov",
    "William Gibson",
    "Neal Stephenson",
  ]
  const categories = [
    "Fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
    "Fantasy",
    "Biography",
    "History",
    "Poetry",
    "Drama",
    "Children",
    "Young Adult",
    "Thriller",
    "Horror",
    "Classic",
    "Contemporary",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    author: authors[i % authors.length],
    coverUrl: `/placeholder.svg?height=300&width=200&text=Book${i + 1}`,
    categories: [
      categories[Math.floor(Math.random() * categories.length)],
      categories[Math.floor(Math.random() * categories.length)],
    ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
    type: bookTypes[Math.floor(Math.random() * bookTypes.length)],
    publishDate: new Date(
      1900 + Math.floor(Math.random() * 123),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
    ),
    status: bookStatuses[Math.floor(Math.random() * bookStatuses.length)],
  }))
}

const sampleBooks = generateBooks(100) // Generate 100 sample books
const BOOKS_PER_PAGE = 12

export function LibrarySearch() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)

  const filteredBooks = React.useMemo(() => {
    return sampleBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategories =
        selectedCategories.length === 0 || selectedCategories.some((cat) => book.categories.includes(cat))

      return matchesSearch && matchesCategories
    })
  }, [searchTerm, selectedCategories])

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
  const displayedBooks = filteredBooks.slice((currentPage - 1) * BOOKS_PER_PAGE, currentPage * BOOKS_PER_PAGE)

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative mb-6">
        <Input
          type="search"
          placeholder="Search for books..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-800 border-gray-700 rounded-full 
                   focus:outline-none focus:border-[#C45C2E] text-white placeholder:text-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mb-8">
        <FilterTags
          tags={Array.from(new Set(sampleBooks.flatMap((book) => book.categories)))}
          selectedTags={selectedCategories}
          onTagSelect={(tag) => {
            setSelectedCategories((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
            setCurrentPage(1) // Reset to first page when changing filters
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {displayedBooks.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((page) => Math.max(1, page - 1))
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(i + 1)
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {displayedBooks.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No books found matching your criteria</p>
      )}
    </div>
  )
}

