"use client"

import * as React from "react"
import { ArrowLeft, Download, Share, Bookmark, Star, Quote, Eye, Calendar, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ArticleViewerProps {
  article: {
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
  onBack: () => void
}

const relatedArticles = [
  {
    id: 7,
    title: "Machine Learning Applications in Text Analysis",
    author: "Dr. Emily Chen",
    publishDate: new Date("2024-01-08"),
    citations: 42,
  },
  {
    id: 8,
    title: "Natural Language Processing: Recent Advances",
    author: "Prof. Michael Brown",
    publishDate: new Date("2024-01-05"),
    citations: 38,
  },
  {
    id: 9,
    title: "Digital Humanities and Computational Methods",
    author: "Dr. Lisa Wang",
    publishDate: new Date("2024-01-03"),
    citations: 29,
  },
]

const references = [
  "Smith, J. (2023). Digital transformation in publishing. Journal of Modern Publishing, 15(3), 45-62.",
  "Johnson, A., & Brown, M. (2023). Reader engagement in digital environments. Digital Media Studies, 8(2), 123-140.",
  "Chen, L. et al. (2022). Interactive media and learning outcomes. Educational Technology Research, 12(4), 78-95.",
  "Williams, R. (2022). The future of e-books: Trends and predictions. Publishing Today, 9(1), 12-28.",
  "Davis, K. (2021). User experience in digital reading platforms. UX Research Quarterly, 6(3), 156-171.",
]

export function ArticleViewer({ article, onBack }: ArticleViewerProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  const [userRating, setUserRating] = React.useState(0)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const fullContent = `
    ${article.content}

    ## Introduction

    The digital revolution has fundamentally transformed how we consume written content. From the early days of simple e-book readers to today's sophisticated interactive platforms, the evolution of digital reading represents one of the most significant shifts in human information consumption patterns.

    ## Methodology

    This comprehensive analysis examines the technological, social, and cognitive aspects of digital reading evolution. We conducted extensive research across multiple databases, analyzing user behavior patterns, technological adoption rates, and cognitive impact studies spanning the last two decades.

    ## Key Findings

    ### 1. Technological Evolution
    
    The progression from basic e-ink displays to high-resolution, color-capable screens has dramatically improved the reading experience. Modern devices now support multimedia integration, allowing for embedded videos, interactive diagrams, and real-time annotations.

    ### 2. User Behavior Changes
    
    Reading patterns have shifted significantly with digital adoption. Users now expect:
    - Instant access to content
    - Searchable text functionality
    - Social sharing capabilities
    - Personalized recommendations
    - Cross-device synchronization

    ### 3. Cognitive Impact
    
    Research indicates that digital reading affects comprehension and retention differently than traditional print media. While digital formats offer enhanced accessibility and convenience, they may impact deep reading and sustained attention spans.

    ## Discussion

    The implications of these findings extend beyond mere technological advancement. Educational institutions, publishers, and content creators must adapt their strategies to accommodate changing reader preferences while maintaining content quality and educational value.

    ## Conclusion

    As we move forward, the integration of artificial intelligence, augmented reality, and adaptive learning technologies will further transform the digital reading landscape. Understanding these trends is crucial for stakeholders across the publishing ecosystem.

    ## Future Research Directions

    Future studies should focus on:
    - Long-term cognitive effects of digital reading
    - Optimal design patterns for different content types
    - Integration of emerging technologies like VR/AR
    - Accessibility improvements for diverse user groups
  `

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-blue-600" : ""}
              >
                <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

            {/* Author and Meta Info */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48&text=Author" />
                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{article.author}</p>
                  <p className="text-sm text-muted-foreground">Senior Researcher</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.publishDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {article.downloads} views
                </div>
                <div className="flex items-center gap-1">
                  <Quote className="h-4 w-4" />
                  {article.citations} citations
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {article.rating}
                </div>
              </div>
            </div>

            {/* Abstract */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Abstract</h2>
                <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Article Content */}
          <Tabs defaultValue="article" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="article">Article</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="article" className="mt-6">
              <div className="prose prose-lg max-w-none">
                {fullContent.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("##")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith("###")) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={index} className="list-disc pl-6 mb-4">
                        <li>{paragraph.replace("- ", "")}</li>
                      </ul>
                    )
                  }
                  return (
                    <p key={index} className="mb-4 text-foreground leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="references" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">References</h3>
                  <ol className="space-y-3">
                    {references.map((ref, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">[{index + 1}]</span> {ref}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{article.downloads}</div>
                    <div className="text-sm text-muted-foreground">Total Downloads</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{article.citations}</div>
                    <div className="text-sm text-muted-foreground">Citations</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">{article.rating}</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Article Actions */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Article Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Article
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Quote className="mr-2 h-4 w-4" />
                  Cite Article
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.map((related) => (
                  <div key={related.id} className="border-b border-border pb-3 last:border-b-0">
                    <h4 className="font-medium text-sm mb-1 hover:text-blue-600 cursor-pointer">{related.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{related.author}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(related.publishDate)}</span>
                      <span>{related.citations} citations</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Article Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Article Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Published:</span>
                  <div className="text-muted-foreground">{formatDate(article.publishDate)}</div>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <div className="text-muted-foreground">{article.category}</div>
                </div>
                <div>
                  <span className="font-medium">Reading Time:</span>
                  <div className="text-muted-foreground">{article.readTime}</div>
                </div>
                <div>
                  <span className="font-medium">DOI:</span>
                  <div className="text-muted-foreground">10.1000/article.{article.id}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
