"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Star, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface MarketingPoster {
  id: number
  title: string
  subtitle: string
  description: string
  imageUrl: string
  ctaText: string
  ctaLink: string
  badge?: string
  stats?: {
    rating: number
    users: string
    duration: string
  }
}

const marketingPosters: MarketingPoster[] = [
  {
    id: 1,
    title: "Transform Your Reading Experience",
    subtitle: "AI-Powered Book Recommendations",
    description:
      "Discover your next favorite book with our advanced AI that learns your preferences and suggests perfect matches.",
    imageUrl: "/placeholder.svg?height=400&width=600&text=AI+Book+Recommendations&bg=6366f1&color=white",
    ctaText: "Try AI Recommendations",
    ctaLink: "#",
    badge: "New Feature",
    stats: {
      rating: 4.9,
      users: "50K+",
      duration: "Free Trial",
    },
  },
  {
    id: 2,
    title: "Write & Publish Your Story",
    subtitle: "From Idea to Bestseller",
    description:
      "Complete writing suite with AI assistance, professional editing tools, and direct publishing to major platforms.",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Writing+Suite&bg=059669&color=white",
    ctaText: "Start Writing Today",
    ctaLink: "#",
    badge: "Popular",
    stats: {
      rating: 4.8,
      users: "25K+",
      duration: "7-day Free",
    },
  },
  {
    id: 3,
    title: "Join Reading Communities",
    subtitle: "Connect with Fellow Book Lovers",
    description:
      "Participate in book clubs, discussions, and exclusive author events. Build lasting connections through shared stories.",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Reading+Communities&bg=dc2626&color=white",
    ctaText: "Join Community",
    ctaLink: "#",
    badge: "Trending",
    stats: {
      rating: 4.7,
      users: "100K+",
      duration: "Always Free",
    },
  },
]

export function PosterSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % marketingPosters.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + marketingPosters.length) % marketingPosters.length)
  }

  const currentPoster = marketingPosters[currentSlide]

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center text-white relative z-10">
                  {currentPoster.badge && (
                    <Badge className="w-fit mb-4 bg-[#CCFF00] text-black font-semibold">{currentPoster.badge}</Badge>
                  )}

                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{currentPoster.title}</h2>

                  <h3 className="text-xl lg:text-2xl font-medium mb-6 text-blue-100">{currentPoster.subtitle}</h3>

                  <p className="text-lg mb-8 text-blue-50 leading-relaxed">{currentPoster.description}</p>

                  {currentPoster.stats && (
                    <div className="flex items-center gap-6 mb-8 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{currentPoster.stats.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{currentPoster.stats.users} users</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{currentPoster.stats.duration}</span>
                      </div>
                    </div>
                  )}

                  <Button size="lg" className="w-fit bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-semibold px-8">
                    {currentPoster.ctaText}
                  </Button>
                </div>

                {/* Image Side */}
                <div className="relative">
                  <Image
                    src={currentPoster.imageUrl || "/placeholder.svg"}
                    alt={currentPoster.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-purple-600/20" />
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextSlide}
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {marketingPosters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? "bg-[#CCFF00]" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
