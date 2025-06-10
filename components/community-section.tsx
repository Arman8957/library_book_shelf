import { Book, Users, Laptop, Leaf, Palette, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "All", icon: null },
  { name: "Education", icon: Book },
  { name: "Community", icon: Users },
  { name: "Technology", icon: Laptop },
  { name: "Environment", icon: Leaf },
  { name: "Arts & Culture", icon: Palette },
  { name: "Wellness", icon: Heart },
]

const projects = [
  {
    title: "Community Learning Platform",
    category: "Education",
    description: "An online platform for sharing knowledge and skills within our community.",
    raised: 7500,
    goal: 10000,
    daysLeft: 15,
    icon: Book,
  },
  {
    title: "Local Mentorship Program",
    category: "Community",
    description: "Connecting experienced professionals with aspiring individuals in our community.",
    raised: 3200,
    goal: 5000,
    daysLeft: 20,
    icon: Users,
  },
  {
    title: "Tech Workshop Series",
    category: "Technology",
    description: "A series of hands-on workshops to teach practical tech skills to community members.",
    raised: 4500,
    goal: 8000,
    daysLeft: 10,
    icon: Laptop,
  },
  {
    title: "Urban Garden Initiative",
    category: "Environment",
    description: "Creating green spaces and promoting sustainable living in urban areas.",
    raised: 6000,
    goal: 12000,
    daysLeft: 25,
    icon: Leaf,
  },
]

export function CommunitySection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Support Our Community</h2>
        <p className="text-gray-400 mb-8">
          Discover and fund amazing projects that make a difference in our global community.
        </p>
        <Button className="mb-12 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">Start Your Campaign</Button>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              className="rounded-full text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {category.icon && <category.icon className="mr-2 h-4 w-4" />}
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-left border border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
                    {project.category}
                  </Badge>
                </div>
                <project.icon className="h-6 w-6 text-[#CCFF00]" />
              </div>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <Progress value={(project.raised / project.goal) * 100} className="mb-4 bg-gray-700" />
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>${project.raised.toLocaleString()} raised</span>
                <span>${project.goal.toLocaleString()} goal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{project.daysLeft} days left</span>
                <Button className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">Support This Project</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
