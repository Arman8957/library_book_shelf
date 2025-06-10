"use client"

import * as React from "react"
import { ArrowLeft, Search, Filter, Calendar, User, BookOpen, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  imageUrl: string
  publishDate: Date
  author: string
  category: string
  readTime: string
  tags: string[]
  citations: number
  downloads: number
  rating: number
}

const allArticles: Article[] = [
  {
    id: 1,
    title: "The Evolution of Digital Reading: From E-books to Interactive Media",
    excerpt: "Exploring how digital reading has transformed from simple e-books to immersive, interactive experiences.",
    content: "The landscape of digital reading has undergone a remarkable transformation...",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Digital+Reading+Evolution&bg=6366f1&color=white",
    publishDate: new Date("2024-01-22"),
    author: "Dr. Alexandra Reed",
    category: "Technology",
    readTime: "8 min read",
    tags: ["Digital Media", "E-books", "Innovation"],
    citations: 45,
    downloads: 1250,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Building a Personal Library: A Guide for Modern Readers",
    excerpt: "Tips and strategies for curating a meaningful personal book collection.",
    content: "Creating a personal library is more than just collecting books...",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Personal+Library+Guide&bg=059669&color=white",
    publishDate: new Date("2024-01-19"),
    author: "David Martinez",
    category: "Lifestyle",
    readTime: "6 min read",
    tags: ["Book Collection", "Reading", "Organization"],
    citations: 23,
    downloads: 890,
    rating: 4.6,
  },
  {
    id: 3,
    title: "The Psychology of Reading: How Books Shape Our Minds",
    excerpt: "An in-depth look at the cognitive and emotional benefits of reading.",
    content: "Reading is one of the most powerful tools for mental development...",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Psychology+of+Reading&bg=7c3aed&color=white",
    publishDate: new Date("2024-01-17"),
    author: "Dr. Maria Santos",
    category: "Psychology",
    readTime: "10 min read",
    tags: ["Psychology", "Cognitive Science", "Mental Health"],
    citations: 67,
    downloads: 2100,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Sustainable Publishing: The Green Revolution in Book Production",
    excerpt: "How the publishing industry is adopting eco-friendly practices.",
    content: "The publishing industry is embracing sustainability...",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Sustainable+Publishing&bg=f59e0b&color=white",
    publishDate: new Date("2024-01-15"),
    author: "Jennifer Green",
    category: "Environment",
    readTime: "7 min read",
    tags: ["Sustainability", "Environment", "Publishing"],
    citations: 34,
    downloads: 756,
    rating: 4.7,
  },
  {
    id: 5,
    title: "AI in Literature: Machine Learning and Creative Writing",
    excerpt: "Exploring the intersection of artificial intelligence and literary creation.",
    content: "Artificial intelligence is revolutionizing creative writing...",
    imageUrl: "/placeholder.svg?height=200&width=300&text=AI+Literature&bg=dc2626&color=white",
    publishDate: new Date("2024-01-12"),
    author: "Dr. Robert Kim",
    category: "Technology",
    readTime: "12 min read",
    tags: ["AI", "Machine Learning", "Creative Writing"],
    citations: 89,
    downloads: 3200,
    rating: 4.9,
  },
  {
    id: 6,
    title: "The Future of Academic Publishing: Open Access and Beyond",
    excerpt: "Examining trends in academic publishing and the move toward open access.",
    content: "Academic publishing is undergoing significant changes...",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Academic+Publishing&bg=3b82f6&color=white",
    publishDate: new Date("2024-01-10"),
    author: "Prof. Sarah Johnson",
    category: "Education",
    readTime: "9 min read",
    tags: ["Academic Publishing", "Open Access", "Research"],
    citations: 56,
    downloads: 1800,
    rating: 4.8,
  },
]

interface ArticlesPageProps {
  onBack: () => void
  onArticleClick: (article: Article) => void
}

export function ArticlesPage({ onBack, onArticleClick }: ArticlesPageProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("newest")

  const categories = ["all", ...Array.from(new Set(allArticles.map((article) => article.category)))]

  const filteredAndSortedArticles = React.useMemo(() => {
    const filtered = allArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.publishDate.getTime() - a.publishDate.getTime()
        case "oldest":
          return a.publishDate.getTime() - b.publishDate.getTime()
        case "mostCited":
          return b.citations - a.citations
        case "mostDownloaded":
          return b.downloads - a.downloads
        case "highestRated":
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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
            <h1 className="text-2xl font-bold">All Articles</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-accent/20 border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters:</span>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="mostCited">Most Cited</SelectItem>
              <SelectItem value="mostDownloaded">Most Downloaded</SelectItem>
              <SelectItem value="highestRated">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-muted-foreground">{filteredAndSortedArticles.length} articles found</div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedArticles.map((article) => (
            <Card
              key={article.id}
              className="bg-card border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer group"
              onClick={() => onArticleClick(article)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">{article.category}</Badge>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 text-foreground px-2 py-1 rounded text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {article.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#CCFF00] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{article.excerpt}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{article.citations} citations</span>
                    <span>{article.downloads} downloads</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{article.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
