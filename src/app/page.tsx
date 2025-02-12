"use client"

import { useState } from "react"
import { LibrarySearch } from "@/components/library-search"
import { AuthButtons } from "@/components/auth/auth-buttons"
import { OnboardingModal } from "@/components/auth/onboarding-modal"
import { InviteModal } from "@/components/invite/invite-modal"
import { BookCard } from "@/components/book-card"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "/placeholder.svg?height=300&width=200&text=The+Great+Gatsby",
    categories: ["Classic", "Fiction"],
    type: "Hardcover",
    publishDate: new Date("1925-04-10"),
    status: "Available",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverUrl: "/placeholder.svg?height=300&width=200&text=1984",
    categories: ["Science Fiction", "Dystopian"],
    type: "Paperback",
    publishDate: new Date("1949-06-08"),
    status: "Borrowed",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "/placeholder.svg?height=300&width=200&text=To+Kill+a+Mockingbird",
    categories: ["Classic", "Fiction"],
    type: "E-Book",
    publishDate: new Date("1960-07-11"),
    status: "Reserved",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "/placeholder.svg?height=300&width=200&text=Pride+and+Prejudice",
    categories: ["Classic", "Romance"],
    type: "Audiobook",
    publishDate: new Date("1813-01-28"),
    status: "Available",
  },
]

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Library Search</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsInviteOpen(true)}
            variant="outline"
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Team
          </Button>
          <AuthButtons onOpenSignUp={() => setIsSignUpOpen(true)} onOpenSignIn={() => setIsSignInOpen(true)} />
        </div>
      </header>
      <main className="p-8">
        <LibrarySearch />

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Featured Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>

        <CommunitySection />
      </main>

      <Footer />

      <OnboardingModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />

      <InviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </div>
  )
}

