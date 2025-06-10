"use client"

import { Button } from "@/components/ui/button"

interface AuthButtonsProps {
  onOpenSignUp: () => void
  onOpenSignIn: () => void
}

export function AuthButtons({ onOpenSignUp, onOpenSignIn }: AuthButtonsProps) {
  return (
    <div className="flex gap-4">
      <Button variant="ghost" onClick={onOpenSignIn} className="hover:bg-accent">
        Sign In
      </Button>
      <Button onClick={onOpenSignUp} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
        Sign Up
      </Button>
    </div>
  )
}
