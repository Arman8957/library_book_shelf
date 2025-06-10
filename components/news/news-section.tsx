"use client"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
}

const sampleNews: NewsArticle[] = [
  {
    id: 1,
    title: "Major Publishing Houses Embrace AI-Assisted Writing Tools",
    excerpt:
      "Leading publishers are integrating artificial intelligence tools to help authors streamline their writing process while maintaining creative control.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=AI+Writing+Revolution&bg=3b82f6&color=white",
    publishDate: new Date("2024-01-20"),
    author: "Emily Watson",
    category: "Technology",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Independent Bookstores See Record Growth in 2024",
    excerpt:
      "Local bookstores are experiencing unprecedented growth as communities rally around supporting independent businesses.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Bookstore+Growth&bg=059669&color=white",
    publishDate: new Date("2024-01-18"),
    author: "Michael Chen",
    category: "Business",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "New Study Reveals Reading Habits of Gen Z",
    excerpt:
      "Research shows younger generations are reading more than ever, but their preferences differ significantly from previous generations.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Gen+Z+Study&bg=7c3aed&color=white",
    publishDate: new Date("2024-01-16"),
    author: "Dr. Sarah Johnson",
    category: "Research",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Digital Libraries Expand Access to Rare Manuscripts",
    excerpt:
      "Universities and museums are digitizing rare books and manuscripts, making them accessible to researchers worldwide.",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Digital+Archives&bg=f59e0b&color=white",
    publishDate: new Date("2024-01-14"),
    author: "Robert Kim",
    category: "Education",
    readTime: "4 min read",
  },
]

// Add props interface
interface NewsSectionProps {
  onNewsClick?: (article: NewsArticle) => void
  onViewAllClick?: () => void
}

export function NewsSection({ onNewsClick, onViewAllClick }: NewsSectionProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const featuredArticle = sampleNews.find((article) => article.featured)
  const regularArticles = sampleNews.filter((article) => !article.featured)

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest News</h2>
            <p className="text-muted-foreground">Stay updated with the latest developments in the literary world</p>
          </div>
          <Button variant="outline" className="border-border hover:bg-accent" onClick={onViewAllClick}>
            View All News
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="lg:col-span-2">
              <Card
                className="bg-card border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer group"
                onClick={() => onNewsClick?.(featuredArticle)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={featuredArticle.imageUrl || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      width={600}
                      height={300}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#CCFF00] text-black">Featured</Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{featuredArticle.category}</Badge>
                      <span className="text-sm text-muted-foreground">{featuredArticle.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#CCFF00] transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{featuredArticle.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredArticle.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featuredArticle.publishDate)}
                        </div>
                      </div>
                      <Button variant="ghost" className="group-hover:text-[#CCFF00]">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Articles */}
          <div className="space-y-6">
            {regularArticles.map((article) => (
              <Card
                key={article.id}
                className="bg-card border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer group"
                onClick={() => onNewsClick?.(article)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Image
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      width={120}
                      height={80}
                      className="w-20 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-[#CCFF00] transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{formatDate(article.publishDate)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
