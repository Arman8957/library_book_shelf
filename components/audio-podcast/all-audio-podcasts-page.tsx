"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Play } from "lucide-react"

const featuredPodcasts = [
  {
    id: 1,
    title: "The Daily",
    host: "The New York Times",
    coverUrl: "/placeholder.svg?height=300&width=300&text=The+Daily",
    description: "This is what the news should sound like. The biggest stories of our time.",
    episodes: 1245,
    category: "News",
    featured: true,
  },
  {
    id: 2,
    title: "Hidden Brain",
    host: "NPR",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Hidden+Brain",
    description: "Exploring the unconscious patterns that drive human behavior.",
    episodes: 387,
    category: "Science",
    featured: true,
  },
  {
    id: 3,
    title: "Stuff You Should Know",
    host: "iHeartRadio",
    coverUrl: "/placeholder.svg?height=300&width=300&text=SYSK",
    description: "Josh and Chuck explore everything under the sun.",
    episodes: 1500,
    category: "Education",
    featured: true,
  },
]

const topShows = [
  {
    id: 4,
    title: "The Joe Rogan Experience",
    host: "Joe Rogan",
    coverUrl: "/placeholder.svg?height=300&width=300&text=JRE",
    description: "Conversations with various guests.",
    episodes: 2000,
    category: "Talk",
  },
  {
    id: 5,
    title: "Crime Junkie",
    host: "Ashley Flowers",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Crime+Junkie",
    description: "True crime cases that will make you a junkie for more.",
    episodes: 250,
    category: "True Crime",
  },
  {
    id: 6,
    title: "Radiolab",
    host: "WNYC Studios",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Radiolab",
    description: "Investigating a strange world.",
    episodes: 450,
    category: "Science",
  },
  {
    id: 7,
    title: "This American Life",
    host: "Ira Glass",
    coverUrl: "/placeholder.svg?height=300&width=300&text=This+American+Life",
    description: "Stories of ordinary people.",
    episodes: 750,
    category: "Society",
  },
]

const newShows = [
  {
    id: 8,
    title: "SmartLess",
    host: "Jason Bateman, Will Arnett & Sean Hayes",
    coverUrl: "/placeholder.svg?height=300&width=300&text=SmartLess",
    description: "A podcast that connects and unites people from all walks of life.",
    episodes: 150,
    category: "Comedy",
  },
  {
    id: 9,
    title: "Freakonomics Radio",
    host: "Stephen Dubner",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Freakonomics",
    description: "Exploring the hidden side of everything.",
    episodes: 500,
    category: "Economics",
  },
  {
    id: 10,
    title: "99% Invisible",
    host: "Roman Mars",
    coverUrl: "/placeholder.svg?height=300&width=300&text=99%+Invisible",
    description: "Design is everywhere in our lives.",
    episodes: 400,
    category: "Design",
  },
  {
    id: 11,
    title: "Serial",
    host: "Sarah Koenig",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Serial",
    description: "One story told week by week.",
    episodes: 50,
    category: "True Crime",
  },
]

const topEpisodes = [
  {
    id: 101,
    title: "The Case Against Google",
    podcast: "The Daily",
    date: "Today",
    duration: "27 min",
    coverUrl: "/placeholder.svg?height=300&width=300&text=The+Daily",
  },
  {
    id: 102,
    title: "The Science of Happiness",
    podcast: "Hidden Brain",
    date: "Yesterday",
    duration: "42 min",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Hidden+Brain",
  },
  {
    id: 103,
    title: "How Prohibition Works",
    podcast: "Stuff You Should Know",
    date: "2 days ago",
    duration: "55 min",
    coverUrl: "/placeholder.svg?height=300&width=300&text=SYSK",
  },
  {
    id: 104,
    title: "The Future of AI",
    podcast: "Radiolab",
    date: "3 days ago",
    duration: "48 min",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Radiolab",
  },
  {
    id: 105,
    title: "The Housing Market Crisis",
    podcast: "Freakonomics Radio",
    date: "4 days ago",
    duration: "35 min",
    coverUrl: "/placeholder.svg?height=300&width=300&text=Freakonomics",
  },
]

export function AllAudioPodcastsPage({ onBack, onPodcastClick }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="text-white mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Browse</h1>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search podcasts..."
              className="pl-8 bg-gray-800 border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 px-4">
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPodcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => onPodcastClick(podcast)}
              >
                <img
                  src={podcast.coverUrl || "/placeholder.svg"}
                  alt={podcast.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold">{podcast.title}</h3>
                  <p className="text-sm text-gray-300">{podcast.host}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Tabs defaultValue="shows" className="mb-12">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="shows">Top Shows</TabsTrigger>
            <TabsTrigger value="episodes">Top Episodes</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="shows" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {topShows.map((podcast) => (
                <div
                  key={podcast.id}
                  className="cursor-pointer"
                  onClick={() => onPodcastClick(podcast)}
                  onMouseEnter={() => setHoveredId(podcast.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                    <img
                      src={podcast.coverUrl || "/placeholder.svg"}
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                    />
                    {hoveredId === podcast.id && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium truncate">{podcast.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{podcast.host}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="episodes" className="pt-6">
            <div className="space-y-4">
              {topEpisodes.map((episode) => (
                <div
                  key={episode.id}
                  className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => onPodcastClick(episode)}
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <img
                      src={episode.coverUrl || "/placeholder.svg"}
                      alt={episode.podcast}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{episode.title}</h3>
                    <p className="text-sm text-gray-400">{episode.podcast}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{episode.date}</span>
                      <span className="mx-1">•</span>
                      <span>{episode.duration}</span>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="flex-shrink-0">
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="categories" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "News",
                "True Crime",
                "Comedy",
                "Science",
                "Business",
                "Politics",
                "Health",
                "Technology",
                "Society",
                "History",
                "Sports",
                "Arts",
              ].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="h-auto py-6 border-gray-700 hover:bg-gray-800 hover:text-white"
                >
                  {category}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">New Shows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {newShows.map((podcast) => (
              <div
                key={podcast.id}
                className="cursor-pointer"
                onClick={() => onPodcastClick(podcast)}
                onMouseEnter={() => setHoveredId(podcast.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                  <img
                    src={podcast.coverUrl || "/placeholder.svg"}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                  {hoveredId === podcast.id && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <h3 className="font-medium truncate">{podcast.title}</h3>
                <p className="text-sm text-gray-400 truncate">{podcast.host}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
