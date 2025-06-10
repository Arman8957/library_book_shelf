"use client"
import { Calendar, User, BookOpen, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
}

interface ArticlesSectionProps {
  onViewAllClick?: () => void
  onArticleClick?: (article: Article) => void
}

const sampleArticles: Article[] = [
  {
    id: 1,
    title: "The Evolution of Digital Reading: From E-books to Interactive Media",
    excerpt:
      "Exploring how digital reading has transformed from simple e-books to immersive, interactive experiences that engage readers in new ways.",
    content: "The landscape of digital reading has undergone a remarkable transformation...",
    imageUrl: "/placeholder.svg?height=250&width=400&text=Digital+Reading",
    publishDate: new Date("2024-01-22"),
    author: "Alexandra Reed",
    category: "Technology",
    readTime: "8 min read",
    tags: ["Digital Media", "E-books", "Innovation"],
  },
  {
    id: 2,
    title: "Building a Personal Library: A Guide for Modern Readers",
    excerpt:
      "Tips and strategies for curating a meaningful personal book collection that reflects your interests and supports your reading goals.",
    content: "Creating a personal library is more than just collecting books...",
    imageUrl: "/placeholder.svg?height=250&width=400&text=Personal+Library",
    publishDate: new Date("2024-01-19"),
    author: "David Martinez",
    category: "Lifestyle",
    readTime: "6 min read",
    tags: ["Book Collection", "Reading", "Organization"],
  },
  {
    id: 3,
    title: "The Psychology of Reading: How Books Shape Our Minds",
    excerpt:
      "An in-depth look at the cognitive and emotional benefits of reading, and how different types of literature affect our mental development.",
    content: "Reading is one of the most powerful tools for mental development...",
    imageUrl: "/placeholder.svg?height=250&width=400&text=Psychology+Reading",
    publishDate: new Date("2024-01-17"),
    author: "Dr. Maria Santos",
    category: "Psychology",
    readTime: "10 min read",
    tags: ["Psychology", "Cognitive Science", "Mental Health"],
  },
  {
    id: 4,
    title: "Sustainable Publishing: The Green Revolution in Book Production",
    excerpt:
      "How the publishing industry is adopting eco-friendly practices to reduce environmental impact while maintaining quality.",
    content: "The publishing industry is embracing sustainability...",
    imageUrl: "/placeholder.svg?height=250&width=400&text=Sustainable+Publishing",
    publishDate: new Date("2024-01-15"),
    author: "Jennifer Green",
    category: "Environment",
    readTime: "7 min read",
    tags: ["Sustainability", "Environment", "Publishing"],
  },
]

export function ArticlesSection({ onViewAllClick, onArticleClick }: ArticlesSectionProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
            <p className="text-muted-foreground">
              In-depth articles and insights from industry experts and thought leaders
            </p>
          </div>
          <Button variant="outline" className="border-border hover:bg-accent" onClick={onViewAllClick}>
            View All Articles
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleArticles.map((article) => (
            <Card
              key={article.id}
              className="bg-card border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer group"
              onClick={() => onArticleClick?.(article)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">{article.category}</Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.publishDate)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#CCFF00] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                    <Button variant="ghost" className="group-hover:text-[#CCFF00] text-sm">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
