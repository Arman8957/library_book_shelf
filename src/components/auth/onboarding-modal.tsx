"use client"

import * as React from "react"
import { ChevronRight, Snowflake, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const steps = [
  {
    title: "Create Your Account",
    fields: [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
    ],
  },
  {
    title: "Personal Information",
    fields: [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    ],
  },
  {
    title: "Preferences",
    fields: [
      { name: "favoriteGenre", label: "Favorite Genre", type: "text" },
      {
        name: "notificationPreference",
        label: "Notification Preference",
        type: "select",
        options: ["Email", "SMS", "Push"],
      },
    ],
  },
]

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = React.useState(0)

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <Button variant="ghost" className="absolute right-4 top-4 text-gray-400 hover:text-white" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Snowflake className="w-12 h-12 text-[#CCFF00]" />
            <DialogTitle className="text-2xl font-bold text-white">{steps[step].title}</DialogTitle>
          </div>

          <form className="w-full space-y-4">
            {steps[step].fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-white">
                  {field.label}
                </Label>
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-[#CCFF00] focus:ring-[#CCFF00]"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    className="bg-gray-800 text-white border-gray-700 focus:border-[#CCFF00] focus:ring-[#CCFF00]"
                  />
                )}
              </div>
            ))}
          </form>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === step ? "w-8 bg-[#CCFF00]" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90" onClick={handleNext}>
            {step === steps.length - 1 ? (
              "Complete Sign Up"
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

