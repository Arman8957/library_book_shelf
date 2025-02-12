"use client"
import { cn } from "@/lib/utils"

interface FilterTagsProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}

export function FilterTags({ tags, selectedTags, onTagSelect }: FilterTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "hover:scale-105 hover:shadow-lg",
            selectedTags.includes(tag) ? "bg-[#C45C2E] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
