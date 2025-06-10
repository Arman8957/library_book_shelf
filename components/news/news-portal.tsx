"use client"
import { ArrowLeft, Search, Menu, User, Share, Facebook, Twitter, Mail, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface NewsPortalProps {
  article: {
    id: number
    title: string
    excerpt: string
    imageUrl: string
    publishDate: Date
    author: string
    category: string
    readTime: string
    content?: string
  }
  onBack: () => void
}

const trendingNews = [
  {
    id: 1,
    title: "Breaking: Major Publishing Merger Announced",
    imageUrl: "/placeholder.svg?height=100&width=150&text=Breaking+News&bg=dc2626&color=white",
    category: "Business",
  },
  {
    id: 2,
    title: "Bestselling Author Wins Literary Prize",
    imageUrl: "/placeholder.svg?height=100&width=150&text=Literary+Prize&bg=059669&color=white",
    category: "Awards",
  },
  {
    id: 3,
    title: "New Study on Reading Benefits Released",
    imageUrl: "/placeholder.svg?height=100&width=150&text=Study+Results&bg=3b82f6&color=white",
    category: "Research",
  },
]

const sidebarArticles = [
  {
    id: 4,
    title: "Local Bookstore Chain Expands Nationwide",
    excerpt: "Independent bookstore chain announces plans for 50 new locations across the country.",
    imageUrl: "/placeholder.svg?height=80&width=120&text=Bookstore+News&bg=7c3aed&color=white",
    category: "Business",
  },
  {
    id: 5,
    title: "Digital Reading Trends Among Teenagers",
    excerpt: "New research reveals surprising patterns in how Gen Z consumes literature.",
    imageUrl: "/placeholder.svg?height=80&width=120&text=Teen+Reading&bg=f59e0b&color=white",
    category: "Education",
  },
  {
    id: 6,
    title: "Author Interview: Writing in the Digital Age",
    excerpt: "Bestselling novelist shares insights on adapting to modern publishing.",
    imageUrl: "/placeholder.svg?height=80&width=120&text=Author+Interview&bg=10b981&color=white",
    category: "Interviews",
  },
]

export function NewsPortal({ article, onBack }: NewsPortalProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const fullContent =
    article.content ||
    `
    ${article.excerpt}

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentibus voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

    Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
  `

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-red-600 text-white">
        <div className="border-b border-red-500 py-2">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span>Tuesday, January 23, 2024</span>
              <span>New York, NY</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Subscribe</span>
              <span>Sign In</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-red-700">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <Button variant="ghost" className="text-white hover:bg-red-700">
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">LIBRARY POST</h1>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Input placeholder="Search news..." className="bg-white text-black pl-10 w-64" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <Button variant="ghost" className="text-white hover:bg-red-700">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-red-700 border-t border-red-500">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-8 py-3 text-sm font-medium">
              <a href="#" className="hover:text-red-200">
                HOME
              </a>
              <a href="#" className="hover:text-red-200">
                BOOKS
              </a>
              <a href="#" className="hover:text-red-200">
                AUTHORS
              </a>
              <a href="#" className="hover:text-red-200">
                PUBLISHING
              </a>
              <a href="#" className="hover:text-red-200">
                TECHNOLOGY
              </a>
              <a href="#" className="hover:text-red-200">
                REVIEWS
              </a>
              <a href="#" className="hover:text-red-200">
                OPINION
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Breaking News Ticker */}
      <div className="bg-black text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <Badge className="bg-red-600 text-white font-bold">BREAKING</Badge>
            <div className="flex items-center gap-8 text-sm">
              {trendingNews.map((news, index) => (
                <span key={news.id} className="whitespace-nowrap">
                  {news.title}
                  {index < trendingNews.length - 1 && <span className="mx-4">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-3">
            <div className="mb-6">
              <Badge className="bg-red-600 text-white mb-4">{article.category}</Badge>
              <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">By {article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-4 mb-8 pb-4 border-b">
                <span className="text-gray-600 font-medium">Share:</span>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-50">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                  <Share className="h-4 w-4 mr-2" />
                  More
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <Image
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {fullContent.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-800 leading-relaxed text-lg">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-600 font-medium">Tags:</span>
                <Badge variant="outline">Publishing</Badge>
                <Badge variant="outline">Technology</Badge>
                <Badge variant="outline">Digital Media</Badge>
                <Badge variant="outline">Innovation</Badge>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Trending Now */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-red-600">TRENDING NOW</h3>
                <div className="space-y-4">
                  {trendingNews.map((news, index) => (
                    <div key={news.id} className="flex gap-3">
                      <span className="text-2xl font-bold text-red-600">{index + 1}</span>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {news.category}
                        </Badge>
                        <h4 className="font-semibold text-sm leading-tight hover:text-red-600 cursor-pointer">
                          {news.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* More Stories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-red-600">MORE STORIES</h3>
                <div className="space-y-6">
                  {sidebarArticles.map((sidebarArticle) => (
                    <div key={sidebarArticle.id} className="flex gap-3">
                      <Image
                        src={sidebarArticle.imageUrl || "/placeholder.svg"}
                        alt={sidebarArticle.title}
                        width={80}
                        height={60}
                        className="rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-1 text-xs">
                          {sidebarArticle.category}
                        </Badge>
                        <h4 className="font-semibold text-sm mb-1 leading-tight hover:text-red-600 cursor-pointer">
                          {sidebarArticle.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{sidebarArticle.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advertisement */}
            <Card className="bg-gray-100">
              <CardContent className="p-6 text-center">
                <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
                  <span className="text-gray-500">Advertisement</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
