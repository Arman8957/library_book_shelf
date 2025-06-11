"use client"

import * as React from "react"
import { ArrowLeft, Search, Filter, Eye, Share, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  imageUrl: string
  publishDate: Date
  author: string
  category: string
  readTime: string
  featured?: boolean
  views: number
  urgent?: boolean
}

const allNewsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Major Publishing Houses Embrace AI-Assisted Writing Tools",
    excerpt:
      "Leading publishers are integrating artificial intelligence tools to help authors streamline their writing process while maintaining creative control over their work.",
    imageUrl: "/placeholder.svg?height=400&width=600&text=AI+Writing+Revolution&bg=000000&color=white",
    publishDate: new Date("2024-01-20"),
    author: "Emily Watson",
    category: "Technology",
    readTime: "5 min read",
    featured: true,
    views: 15420,
    urgent: true,
  },
  {
    id: 2,
    title: "Independent Bookstores See Record Growth in 2024",
    excerpt:
      "Local bookstores are experiencing unprecedented growth as communities rally around supporting independent businesses in the post-pandemic era.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Bookstore+Growth&bg=000000&color=white",
    publishDate: new Date("2024-01-18"),
    author: "Michael Chen",
    category: "Business",
    readTime: "3 min read",
    views: 12350,
  },
  {
    id: 3,
    title: "New Study Reveals Reading Habits of Gen Z",
    excerpt:
      "Research shows younger generations are reading more than ever, but their preferences differ significantly from previous generations.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Gen+Z+Study&bg=000000&color=white",
    publishDate: new Date("2024-01-16"),
    author: "Dr. Sarah Johnson",
    category: "Research",
    readTime: "7 min read",
    views: 18750,
  },
  {
    id: 4,
    title: "Digital Libraries Expand Access to Rare Manuscripts",
    excerpt:
      "Universities and museums are digitizing rare books and manuscripts, making them accessible to researchers worldwide.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Digital+Archives&bg=000000&color=white",
    publishDate: new Date("2024-01-14"),
    author: "Robert Kim",
    category: "Education",
    readTime: "4 min read",
    views: 9840,
  },
  {
    id: 5,
    title: "Book Clubs Go Virtual: The Rise of Online Reading Communities",
    excerpt: "Virtual book clubs are transforming how readers connect and discuss literature in the digital age.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Virtual+Book+Clubs&bg=000000&color=white",
    publishDate: new Date("2024-01-12"),
    author: "Lisa Martinez",
    category: "Community",
    readTime: "6 min read",
    views: 11200,
  },
  {
    id: 6,
    title: "Audiobook Market Reaches New Heights",
    excerpt: "The audiobook industry continues its explosive growth with innovative features and celebrity narrators.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Audiobook+Market&bg=000000&color=white",
    publishDate: new Date("2024-01-10"),
    author: "James Wilson",
    category: "Business",
    readTime: "5 min read",
    views: 14600,
  },
]

interface AllNewsPageProps {
  onBack: () => void
  onNewsClick: (article: NewsArticle) => void
}

export function AllNewsPage({ onBack, onNewsClick }: AllNewsPageProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("newest")

  const categories = ["all", ...Array.from(new Set(allNewsArticles.map((article) => article.category)))]

  const filteredAndSortedArticles = React.useMemo(() => {
    const filtered = allNewsArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.publishDate.getTime() - a.publishDate.getTime()
        case "oldest":
          return a.publishDate.getTime() - b.publishDate.getTime()
        case "mostViewed":
          return b.views - a.views
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const featuredArticle = filteredAndSortedArticles.find((article) => article.featured)
  const regularArticles = filteredAndSortedArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 px-4 text-xs border-b border-gray-300">
            <div className="flex items-center gap-4">
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>Today's Paper</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Subscribe</span>
              <span>Log In</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="py-4 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={onBack} className="text-black hover:bg-gray-100">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>

              <h1 className="text-4xl font-serif font-bold text-center flex-1">THE LIBRARY TIMES</h1>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="border-t border-gray-300">
            <div className="flex items-center justify-center gap-8 py-3 text-sm font-medium">
              <a href="#" className="hover:underline">
                HOME
              </a>
              <a href="#" className="hover:underline">
                BOOKS
              </a>
              <a href="#" className="hover:underline">
                AUTHORS
              </a>
              <a href="#" className="hover:underline">
                PUBLISHING
              </a>
              <a href="#" className="hover:underline">
                TECHNOLOGY
              </a>
              <a href="#" className="hover:underline">
                OPINION
              </a>
              <a href="#" className="hover:underline">
                ARTS
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Breaking News Banner */}
      {featuredArticle?.urgent && (
        <div className="bg-red-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-white text-red-600 font-bold">BREAKING</Badge>
              <span className="text-sm font-medium">{featuredArticle.title}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <section className="bg-gray-50 border-b border-gray-300 p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filter:</span>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-white border-gray-300">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Sections" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-white border-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="newest">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="mostViewed">Most Read</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-gray-600">{filteredAndSortedArticles.length} articles</div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="border-b border-gray-300">
          <div className="max-w-7xl mx-auto p-6">
            <div className="cursor-pointer group" onClick={() => onNewsClick(featuredArticle)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Image
                    src={featuredArticle.imageUrl || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover border border-gray-300"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <Badge className="w-fit mb-3 bg-black text-white text-xs uppercase tracking-wide">
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="text-4xl font-serif font-bold mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed font-serif">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="font-medium">By {featuredArticle.author}</span>
                    <span>•</span>
                    <span>{formatDate(featuredArticle.publishDate)}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <article
              key={article.id}
              className="border-b border-gray-200 pb-6 cursor-pointer group"
              onClick={() => onNewsClick(article)}
            >
              <div className="space-y-3">
                <Image
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover border border-gray-300"
                />
                <div>
                  <Badge className="bg-black text-white text-xs uppercase tracking-wide mb-2">{article.category}</Badge>
                  <h3 className="text-xl font-serif font-bold mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-3 leading-relaxed font-serif text-sm">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{article.author}</span>
                      <span>•</span>
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      <span>{formatViews(article.views)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredAndSortedArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center text-sm text-gray-600">
            <p className="font-serif">© 2024 The Library Times. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
