"use client"

import { useState } from "react"
import { LibrarySearch } from "@/components/library-search"
import { AuthButtons } from "@/components/auth/auth-buttons"
import { OnboardingModal } from "@/components/auth/onboarding-modal"
import { InviteModal } from "@/components/invite/invite-modal"
import { BookCard } from "@/components/book-card"
import { CommunitySection } from "@/components/community-section"
import { AudioPodcastSection } from "@/components/audio-podcast/audio-podcast-section"
import { VideoPodcastSection } from "@/components/video-podcast/video-podcast-section"
import { NewsSection } from "@/components/news/news-section"
import { ArticlesSection } from "@/components/articles/articles-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { UserPlus, FileText, Newspaper, BookOpen } from "lucide-react"
import { BookWriter } from "@/components/book-writer/book-writer"
import { BookDetail } from "@/components/book-detail/book-detail"
import { EnhancedBookEdit } from "@/components/book-edit/enhanced-book-edit"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { PosterSection } from "@/components/marketing/poster-section"
import { AudioPlayer } from "@/components/audio-podcast/audio-player"
import { VideoPlayer } from "@/components/video-podcast/video-player"
import { NewsPortal } from "@/components/news/news-portal"
import { ArticlesPage } from "@/components/articles/articles-page"
import { ArticleViewer } from "@/components/articles/article-viewer"
import { ArticleWriter } from "@/components/writing/article-writer"
import { NewsWriter } from "@/components/writing/news-writer"
import { AllNewsPage } from "@/components/news/all-news-page"
import { AllEpisodesPage } from "@/components/video-podcast/all-episodes-page"
import { AllAudioPodcastsPage } from "@/components/audio-podcast/all-audio-podcasts-page"
import { PodcastDetailPage } from "@/components/audio-podcast/podcast-detail-page"

const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "/placeholder.svg?height=300&width=200&text=The+Great+Gatsby",
    categories: ["Classic", "Fiction"],
    type: "Hardcover" as const,
    publishDate: new Date("1925-04-10"),
    status: "Available" as const,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverUrl: "/placeholder.svg?height=300&width=200&text=1984",
    categories: ["Science Fiction", "Dystopian"],
    type: "Paperback" as const,
    publishDate: new Date("1949-06-08"),
    status: "Borrowed" as const,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "/placeholder.svg?height=300&width=200&text=To+Kill+a+Mockingbird",
    categories: ["Classic", "Fiction"],
    type: "E-Book" as const,
    publishDate: new Date("1960-07-11"),
    status: "Reserved" as const,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "/placeholder.svg?height=300&width=200&text=Pride+and+Prejudice",
    categories: ["Classic", "Romance"],
    type: "Audiobook" as const,
    publishDate: new Date("1813-01-28"),
    status: "Available" as const,
  },
]

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [currentView, setCurrentView] = useState<
    | "library"
    | "writer"
    | "detail"
    | "edit"
    | "audio"
    | "video"
    | "news"
    | "articles"
    | "article-view"
    | "article-writer"
    | "news-writer"
    | "all-news"
    | "all-episodes"
    | "all-audio-podcasts"
    | "podcast-detail"
  >("library")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [selectedAudio, setSelectedAudio] = useState<any>(null)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [selectedNews, setSelectedNews] = useState<any>(null)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null)

  const handleBookClick = (book: any) => {
    setSelectedBook(book)
    setCurrentView("detail")
  }

  const handleEditBook = () => {
    setCurrentView("edit")
  }

  const handleBackToLibrary = () => {
    setCurrentView("library")
    setSelectedBook(null)
    setSelectedAudio(null)
    setSelectedVideo(null)
    setSelectedNews(null)
    setSelectedArticle(null)
    setSelectedPodcast(null)
  }

  const handleSaveBook = (updatedBook: any) => {
    console.log("Saving book:", updatedBook)
    setCurrentView("detail")
  }

  const handleAudioClick = (podcast: any) => {
    setSelectedAudio(podcast)
    setCurrentView("audio")
  }

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video)
    setCurrentView("video")
  }

  const handleNewsClick = (article: any) => {
    setSelectedNews(article)
    setCurrentView("news")
  }

  const handleArticlesPageClick = () => {
    setCurrentView("articles")
  }

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article)
    setCurrentView("article-view")
  }

  const handleAllNewsClick = () => {
    setCurrentView("all-news")
  }

  const handleAllEpisodesClick = () => {
    setCurrentView("all-episodes")
  }

  const handleAllAudioPodcastsClick = () => {
    setCurrentView("all-audio-podcasts")
  }

  const handlePodcastDetailClick = (podcast: any) => {
    setSelectedPodcast(podcast)
    setCurrentView("podcast-detail")
  }

  if (currentView === "all-news") {
    return <AllNewsPage onBack={handleBackToLibrary} onNewsClick={handleNewsClick} />
  }

  if (currentView === "all-episodes") {
    return <AllEpisodesPage onBack={handleBackToLibrary} onEpisodeClick={handleVideoClick} />
  }

  if (currentView === "all-audio-podcasts") {
    return <AllAudioPodcastsPage onBack={handleBackToLibrary} onPodcastClick={handlePodcastDetailClick} />
  }

  if (currentView === "podcast-detail" && selectedPodcast) {
    return <PodcastDetailPage podcast={selectedPodcast} onBack={handleBackToLibrary} onPlay={handleAudioClick} />
  }

  if (currentView === "writer") {
    return <BookWriter />
  }

  if (currentView === "article-writer") {
    return <ArticleWriter onBack={handleBackToLibrary} />
  }

  if (currentView === "news-writer") {
    return <NewsWriter onBack={handleBackToLibrary} />
  }

  if (currentView === "detail" && selectedBook) {
    return <BookDetail book={selectedBook} onBack={handleBackToLibrary} onEdit={handleEditBook} />
  }

  if (currentView === "edit" && selectedBook) {
    return <EnhancedBookEdit book={selectedBook} onBack={() => setCurrentView("detail")} onSave={handleSaveBook} />
  }

  if (currentView === "audio" && selectedAudio) {
    return <AudioPlayer podcast={selectedAudio} onClose={() => setCurrentView("library")} />
  }

  if (currentView === "video" && selectedVideo) {
    return <VideoPlayer video={selectedVideo} onClose={() => setCurrentView("library")} />
  }

  if (currentView === "news" && selectedNews) {
    return <NewsPortal article={selectedNews} onBack={() => setCurrentView("library")} />
  }

  if (currentView === "articles") {
    return <ArticlesPage onBack={handleBackToLibrary} onArticleClick={handleArticleClick} />
  }

  if (currentView === "article-view" && selectedArticle) {
    return <ArticleViewer article={selectedArticle} onBack={() => setCurrentView("articles")} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Library Search</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={() => setCurrentView("writer")} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
              <BookOpen className="mr-2 h-4 w-4" />
              Write Book
            </Button>
            <Button
              onClick={() => setCurrentView("article-writer")}
              variant="outline"
              className="border-border hover:bg-accent"
            >
              <FileText className="mr-2 h-4 w-4" />
              Write Article
            </Button>
            <Button
              onClick={() => setCurrentView("news-writer")}
              variant="outline"
              className="border-border hover:bg-accent"
            >
              <Newspaper className="mr-2 h-4 w-4" />
              Write News
            </Button>
            <Button onClick={() => setIsInviteOpen(true)} variant="outline" className="border-border hover:bg-accent">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Team
            </Button>
            <AuthButtons onOpenSignUp={() => setIsSignUpOpen(true)} onOpenSignIn={() => setIsSignInOpen(true)} />
          </div>
        </div>
      </header>

      <main>
        {/* Poster/Marketing Section */}
        <section className="px-8">
          <PosterSection />
        </section>

        {/* Hero Section with Search */}
        <section className="py-8 px-8">
          <LibrarySearch onBookClick={handleBookClick} />
        </section>

        {/* Featured Books */}
        <section className="py-8 px-8 bg-accent/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} {...book} onClick={() => handleBookClick(book)} />
              ))}
            </div>
          </div>
        </section>

        {/* Audio Podcasts */}
        <section className="px-8">
          <AudioPodcastSection onPodcastClick={handlePodcastDetailClick} onViewAllClick={handleAllAudioPodcastsClick} />
        </section>

        {/* Video Podcasts */}
        <section className="px-8 bg-accent/10">
          <VideoPodcastSection onVideoClick={handleVideoClick} onViewAllClick={handleAllEpisodesClick} />
        </section>

        {/* News Section */}
        <section className="px-8">
          <NewsSection onNewsClick={handleNewsClick} onViewAllClick={handleAllNewsClick} />
        </section>

        {/* Articles Section */}
        <section className="px-8 bg-accent/10">
          <ArticlesSection onViewAllClick={handleArticlesPageClick} onArticleClick={handleArticleClick} />
        </section>

        {/* Community Section */}
        <section className="px-8 bg-accent/20">
          <CommunitySection />
        </section>
      </main>

      <Footer />

      <OnboardingModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />

      <InviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </div>
  )
}
