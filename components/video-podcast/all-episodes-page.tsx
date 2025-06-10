"use client"

import * as React from "react"
import { ArrowLeft, Search, Filter, Play, Eye, Calendar, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface VideoPodcast {
  id: number
  title: string
  description: string
  thumbnailUrl: string
  duration: string
  views: number
  publishDate: Date
  category: string
  author: string
  likes: number
  dislikes: number
  rating: number
  featured?: boolean
}

const allEpisodes: VideoPodcast[] = [
  {
    id: 1,
    title: "The Art of Storytelling in Modern Literature",
    description: "Exploring how contemporary authors craft compelling narratives that resonate with today's readers.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Storytelling+Masterclass&bg=6366f1&color=white",
    duration: "45:32",
    views: 125000,
    publishDate: new Date("2024-01-15"),
    category: "Literature",
    author: "Dr. Sarah Mitchell",
    likes: 12500,
    dislikes: 230,
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    title: "Digital Publishing Revolution",
    description: "How technology is transforming the way we create, distribute, and consume written content.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Digital+Revolution&bg=059669&color=white",
    duration: "38:15",
    views: 89000,
    publishDate: new Date("2024-01-10"),
    category: "Technology",
    author: "Mark Thompson",
    likes: 8900,
    dislikes: 120,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Building Reading Communities Online",
    description: "Strategies for creating engaging book clubs and reading communities in the digital age.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Online+Communities&bg=dc2626&color=white",
    duration: "52:18",
    views: 152000,
    publishDate: new Date("2024-01-08"),
    category: "Community",
    author: "Lisa Chen",
    likes: 15200,
    dislikes: 310,
    rating: 4.9,
  },
  {
    id: 4,
    title: "The Future of Audiobooks",
    description: "Examining trends in audio content creation and the growing popularity of voice-first media.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Audiobook+Future&bg=f59e0b&color=white",
    duration: "41:27",
    views: 98000,
    publishDate: new Date("2024-01-05"),
    category: "Audio",
    author: "James Rodriguez",
    likes: 9800,
    dislikes: 180,
    rating: 4.7,
  },
  {
    id: 5,
    title: "Writing Workshop: Character Development",
    description: "Master the art of creating memorable, three-dimensional characters that readers will love.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Character+Development&bg=8b5cf6&color=white",
    duration: "56:42",
    views: 76000,
    publishDate: new Date("2024-01-03"),
    category: "Writing",
    author: "Emma Williams",
    likes: 7600,
    dislikes: 95,
    rating: 4.8,
  },
  {
    id: 6,
    title: "Book Marketing in the Digital Age",
    description: "Effective strategies for promoting your book and building an author platform online.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Book+Marketing&bg=10b981&color=white",
    duration: "43:15",
    views: 67000,
    publishDate: new Date("2024-01-01"),
    category: "Marketing",
    author: "Alex Johnson",
    likes: 6700,
    dislikes: 140,
    rating: 4.5,
  },
  {
    id: 7,
    title: "The Psychology of Reading Habits",
    description: "Understanding how and why people read, and what motivates different reading behaviors.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Reading+Psychology&bg=f97316&color=white",
    duration: "39:28",
    views: 84000,
    publishDate: new Date("2023-12-28"),
    category: "Psychology",
    author: "Dr. Michael Brown",
    likes: 8400,
    dislikes: 165,
    rating: 4.7,
  },
  {
    id: 8,
    title: "Self-Publishing Success Stories",
    description: "Inspiring interviews with authors who built successful careers through self-publishing.",
    thumbnailUrl: "/placeholder.svg?height=300&width=500&text=Self+Publishing&bg=3b82f6&color=white",
    duration: "48:33",
    views: 91000,
    publishDate: new Date("2023-12-25"),
    category: "Publishing",
    author: "Rachel Davis",
    likes: 9100,
    dislikes: 200,
    rating: 4.6,
  },
]

interface AllEpisodesPageProps {
  onBack: () => void
  onEpisodeClick: (episode: VideoPodcast) => void
}

export function AllEpisodesPage({ onBack, onEpisodeClick }: AllEpisodesPageProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("newest")

  const categories = ["all", ...Array.from(new Set(allEpisodes.map((episode) => episode.category)))]

  const filteredAndSortedEpisodes = React.useMemo(() => {
    const filtered = allEpisodes.filter((episode) => {
      const matchesSearch =
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || episode.category === selectedCategory

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
        case "topRated":
          return b.rating - a.rating
        case "longest":
          return (
            Number.parseInt(b.duration.split(":")[0]) * 60 +
            Number.parseInt(b.duration.split(":")[1]) -
            (Number.parseInt(a.duration.split(":")[0]) * 60 + Number.parseInt(a.duration.split(":")[1]))
          )
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
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const featuredEpisode = filteredAndSortedEpisodes.find((episode) => episode.featured)
  const regularEpisodes = filteredAndSortedEpisodes.filter((episode) => !episode.featured)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">All Episodes</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search episodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-gray-900/50 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters:</span>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="newest" className="text-white hover:bg-gray-700">
                Newest First
              </SelectItem>
              <SelectItem value="oldest" className="text-white hover:bg-gray-700">
                Oldest First
              </SelectItem>
              <SelectItem value="mostViewed" className="text-white hover:bg-gray-700">
                Most Viewed
              </SelectItem>
              <SelectItem value="topRated" className="text-white hover:bg-gray-700">
                Top Rated
              </SelectItem>
              <SelectItem value="longest" className="text-white hover:bg-gray-700">
                Longest Duration
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-gray-400">{filteredAndSortedEpisodes.length} episodes</div>
        </div>
      </section>

      {/* Featured Episode */}
      {featuredEpisode && (
        <section className="p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Featured Episode</h2>
            <Card
              className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => onEpisodeClick(featuredEpisode)}
            >
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative">
                    <Image
                      src={featuredEpisode.thumbnailUrl || "/placeholder.svg"}
                      alt={featuredEpisode.title}
                      width={600}
                      height={400}
                      className="w-full h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16">
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-red-600 text-white">FEATURED</Badge>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {featuredEpisode.duration}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {featuredEpisode.rating}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-blue-600 text-white">{featuredEpisode.category}</Badge>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                      {featuredEpisode.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{featuredEpisode.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-1">
                        <span>{featuredEpisode.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredEpisode.publishDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {formatViews(featuredEpisode.views)} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredEpisode.duration}
                      </div>
                    </div>
                    <Button className="w-fit bg-red-600 hover:bg-red-700 text-white">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Episodes Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">All Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {regularEpisodes.map((episode) => (
            <Card
              key={episode.id}
              className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => onEpisodeClick(episode)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={episode.thumbnailUrl || "/placeholder.svg"}
                    alt={episode.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12">
                      <Play className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">{episode.category}</Badge>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs">
                    {episode.duration}
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {episode.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-2 line-clamp-2">{episode.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{episode.author}</span>
                    <span>{formatViews(episode.views)} views</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{formatDate(episode.publishDate)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedEpisodes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No episodes found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
