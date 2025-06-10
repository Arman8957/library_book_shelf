"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, Play, Share2, Clock, Download } from "lucide-react"

const episodes = [
  {
    id: 1,
    title: "The Future of AI in Healthcare",
    date: "May 15, 2023",
    duration: "42 min",
    description: "We explore how artificial intelligence is transforming healthcare delivery and patient outcomes.",
  },
  {
    id: 2,
    title: "Climate Change: The Road Ahead",
    date: "May 8, 2023",
    duration: "38 min",
    description: "Examining the latest climate science and policy solutions to address global warming.",
  },
  {
    id: 3,
    title: "The Psychology of Decision Making",
    date: "May 1, 2023",
    duration: "45 min",
    description: "Understanding how our brains make decisions and how to make better choices.",
  },
  {
    id: 4,
    title: "Financial Independence: Myths and Realities",
    date: "Apr 24, 2023",
    duration: "51 min",
    description: "Breaking down what it really takes to achieve financial freedom in today's economy.",
  },
  {
    id: 5,
    title: "The Science of Sleep",
    date: "Apr 17, 2023",
    duration: "47 min",
    description: "Exploring the latest research on sleep and how it affects our physical and mental health.",
  },
]

export function PodcastDetailPage({ podcast, onBack, onPlay }) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [hoveredEpisodeId, setHoveredEpisodeId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold truncate max-w-md">{podcast?.title || "Podcast"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isSubscribed ? "default" : "outline"}
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={isSubscribed ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              <Heart className={`mr-2 h-4 w-4 ${isSubscribed ? "fill-current" : ""}`} />
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={podcast?.coverUrl || "/placeholder.svg?height=300&width=300&text=Podcast"}
                alt={podcast?.title}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{podcast?.title || "Podcast Title"}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{podcast?.host || "Podcast Host"}</h2>
            <p className="text-gray-700 mb-6">
              {podcast?.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>Updated weekly</span>
              </div>
              <div>{podcast?.episodes || 100}+ episodes</div>
              <div>4.8 ★★★★★ (2.4k ratings)</div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => onPlay(podcast)} className="bg-purple-600 hover:bg-purple-700">
                <Play className="mr-2 h-4 w-4" />
                Play Latest
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="episodes" className="mb-12">
          <TabsList>
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="episodes" className="pt-6">
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  onMouseEnter={() => setHoveredEpisodeId(episode.id)}
                  onMouseLeave={() => setHoveredEpisodeId(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{episode.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>{episode.date}</span>
                        <span className="mx-1">•</span>
                        <span>{episode.duration}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => onPlay({ ...podcast, episode })}
                      variant={hoveredEpisodeId === episode.id ? "default" : "ghost"}
                      size="icon"
                      className={hoveredEpisodeId === episode.id ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{episode.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="about" className="pt-6">
            <div className="prose max-w-none">
              <h3>About {podcast?.title || "this podcast"}</h3>
              <p>
                {podcast?.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."}
              </p>
              <h3>About the host</h3>
              <p>
                {podcast?.host || "The host"} is a renowned expert in their field with years of experience sharing
                knowledge and insights with audiences worldwide.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-5xl font-bold">4.8</div>
                <div className="text-gray-500">out of 5</div>
              </div>
              <Button>Write a Review</Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">User{i}</h4>
                    <div className="text-sm text-gray-500">May {i * 5}, 2023</div>
                  </div>
                  <div className="text-yellow-500 my-1">★★★★★</div>
                  <p className="text-gray-700">
                    This podcast is amazing! I learn something new every episode and the host is fantastic at explaining
                    complex topics.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
