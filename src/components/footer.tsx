import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-center md:text-left">
            <p>© 2024 Copyright by Arman</p>
            <a
              href="mailto:mdarmanya.h@gmail.com"
              className="flex items-center gap-2 hover:text-[#CCFF00] transition-colors"
            >
              <Mail className="h-4 w-4" />
              mdarmanya.h@gmail.com
            </a>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#CCFF00]">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#CCFF00]">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-[#CCFF00]">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

