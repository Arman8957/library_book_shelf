"use client"

import * as React from "react"
import { ArrowLeft, Search, Filter, Eye, Share, Bookmark, Clock, User } from "lucide-react"
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
  subtitle?: string
}

const allNewsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Major Publishing Houses Embrace AI-Assisted Writing Tools",
    subtitle: "Technology transforms the literary landscape as authors and publishers adapt to new digital workflows",
    excerpt:
      "Leading publishers are integrating artificial intelligence tools to help authors streamline their writing process while maintaining creative control over their work. The shift represents a fundamental change in how books are conceived, written, and brought to market.",
    imageUrl: "/placeholder.svg?height=400&width=600&text=AI+Writing+Revolution&bg=1a1a1a&color=white",
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
    subtitle: "Community support drives unprecedented expansion of local literary businesses",
    excerpt:
      "Local bookstores are experiencing unprecedented growth as communities rally around supporting independent businesses in the post-pandemic era. Sales have increased by 40% compared to pre-2020 levels.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Bookstore+Growth&bg=1a1a1a&color=white",
    publishDate: new Date("2024-01-18"),
    author: "Michael Chen",
    category: "Business",
    readTime: "3 min read",
    views: 12350,
  },
  {
    id: 3,
    title: "New Study Reveals Reading Habits of Generation Z",
    subtitle: "Digital natives show surprising preferences for physical books and diverse genres",
    excerpt:
      "Research shows younger generations are reading more than ever, but their preferences differ significantly from previous generations. The study surveyed 10,000 readers aged 16-26 across multiple countries.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Gen+Z+Study&bg=1a1a1a&color=white",
    publishDate: new Date("2024-01-16"),
    author: "Dr. Sarah Johnson",
    category: "Research",
    readTime: "7 min read",
    views: 18750,
  },
  {
    id: 4,
    title: "Digital Libraries Expand Access to Rare Manuscripts",
    subtitle: "Universities and museums digitize centuries-old texts for global accessibility",
    excerpt:
      "Universities and museums are digitizing rare books and manuscripts, making them accessible to researchers worldwide. The initiative has already preserved over 50,000 historical documents.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Digital+Archives&bg=1a1a1a&color=white",
    publishDate: new Date("2024-01-14"),
    author: "Robert Kim",
    category: "Education",
    readTime: "4 min read",
    views: 9840,
  },
  {
    id: 5,
    title: "Book Clubs Go Virtual: The Rise of Online Reading Communities",
    subtitle: "Digital platforms transform how readers connect and discuss literature",
    excerpt:
      "Virtual book clubs are transforming how readers connect and discuss literature in the digital age. Membership in online reading communities has grown by 300% since 2020.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Virtual+Book+Clubs&bg=1a1a1a&color=white",
    publishDate: new Date("2024-01-12"),
    author: "Lisa Martinez",
    category: "Community",
    readTime: "6 min read",
    views: 11200,
  },
  {
    id: 6,
    title: "Audiobook Market Reaches New Heights",
    subtitle: "Celebrity narrators and innovative features drive industry growth",
    excerpt:
      "The audiobook industry continues its explosive growth with innovative features and celebrity narrators. Revenue has doubled in the past three years, reaching $4.2 billion annually.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Audiobook+Market&bg=1a1a1a&color=white",
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
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const featuredArticle = filteredAndSortedArticles.find((article) => article.featured)
  const regularArticles = filteredAndSortedArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 px-6 text-xs border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-6">
              <span className="font-medium">{getCurrentDate()}</span>
              <span className="text-gray-600">Today's Paper</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600">Video</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600">Podcasts</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-blue-600 hover:underline cursor-pointer">Subscribe for $1/week</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600 hover:underline cursor-pointer">Log In</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="py-6 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={onBack} className="text-black hover:bg-gray-100 -ml-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Library
                </Button>
              </div>

              <div className="text-center flex-1">
                <h1 className="text-5xl font-serif font-bold text-black tracking-tight">The Library Times</h1>
                <p className="text-xs text-gray-600 mt-1 tracking-widest uppercase">All the News That's Fit to Read</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="border-t border-gray-300 bg-white">
            <div className="flex items-center justify-center gap-8 py-3 text-sm font-medium">
              <a href="#" className="hover:underline text-black">
                U.S.
              </a>
              <a href="#" className="hover:underline text-black">
                WORLD
              </a>
              <a href="#" className="hover:underline text-black">
                BUSINESS
              </a>
              <a href="#" className="hover:underline text-black">
                TECHNOLOGY
              </a>
              <a href="#" className="hover:underline text-black">
                SCIENCE
              </a>
              <a href="#" className="hover:underline text-black">
                HEALTH
              </a>
              <a href="#" className="hover:underline text-black">
                SPORTS
              </a>
              <a href="#" className="hover:underline text-black">
                ARTS
              </a>
              <a href="#" className="hover:underline text-black">
                BOOKS
              </a>
              <a href="#" className="hover:underline text-black">
                OPINION
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Breaking News Banner */}
      {featuredArticle?.urgent && (
        <div className="bg-red-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4">
              <Badge className="bg-white text-red-600 font-bold text-xs px-2 py-1">BREAKING NEWS</Badge>
              <span className="text-sm font-medium">{featuredArticle.title}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-red-700 ml-auto"
                onClick={() => onNewsClick(featuredArticle)}
              >
                Read More →
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <section className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-sm">Filter by:</span>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-white border-gray-300 text-sm">
              <SelectValue placeholder="All Sections" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-sm">
                  {category === "all" ? "All Sections" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-white border-gray-300 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="newest" className="text-sm">
                Most Recent
              </SelectItem>
              <SelectItem value="oldest" className="text-sm">
                Oldest First
              </SelectItem>
              <SelectItem value="mostViewed" className="text-sm">
                Most Read
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-gray-600">{filteredAndSortedArticles.length} articles found</div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto p-8">
            <div className="cursor-pointer group" onClick={() => onNewsClick(featuredArticle)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Badge className="bg-red-600 text-white text-xs font-bold mb-4 px-3 py-1">
                    {featuredArticle.category.toUpperCase()}
                  </Badge>
                  <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight text-black group-hover:text-blue-600 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  {featuredArticle.subtitle && (
                    <h3 className="text-xl font-serif text-gray-700 mb-4 leading-relaxed">
                      {featuredArticle.subtitle}
                    </h3>
                  )}
                  <p className="text-lg text-gray-800 mb-6 leading-relaxed font-serif">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span className="font-medium">By {featuredArticle.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(featuredArticle.publishDate)}</span>
                    </div>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="border-gray-400 hover:bg-gray-50">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-400 hover:bg-gray-50">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(featuredArticle.views)} readers</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <Image
                    src={featuredArticle.imageUrl || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    width={400}
                    height={300}
                    className="w-full h-64 lg:h-80 object-cover border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Articles */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <article
              key={article.id}
              className={`border-b border-gray-200 pb-6 cursor-pointer group ${
                index < 3 ? "border-r border-gray-200 pr-6" : ""
              }`}
              onClick={() => onNewsClick(article)}
            >
              <div className="space-y-4">
                <Image
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover border border-gray-300"
                />
                <div>
                  <Badge className="bg-black text-white text-xs font-medium mb-3 px-2 py-1">
                    {article.category.toUpperCase()}
                  </Badge>
                  <h3 className="text-xl font-serif font-bold mb-2 leading-tight text-black group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  {article.subtitle && (
                    <h4 className="text-sm font-serif text-gray-600 mb-2 leading-relaxed">{article.subtitle}</h4>
                  )}
                  <p className="text-gray-700 mb-4 leading-relaxed font-serif text-sm">{article.excerpt}</p>
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
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No articles found matching your search criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-serif font-bold text-lg mb-4">NEWS</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    Home Page
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    World
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    U.S.
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Politics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-4">OPINION</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    Today's Opinion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Op-Ed Columnists
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Editorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Letters
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-4">ARTS</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    Today's Arts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Books
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Theater
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-4">LIVING</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:underline">
                    Automobiles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Games
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Food
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6 text-center">
            <p className="text-sm text-gray-600 font-serif">© 2024 The Library Times Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
