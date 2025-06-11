"use client"

import * as React from "react"
import { ArrowLeft, Heart, Share, Users, CheckCircle, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CampaignPageProps {
  onBack: () => void
}

const rewards = [
  {
    id: 1,
    title: "Early Supporter",
    amount: 10,
    description: "Get your name in the credits and early access to new features",
    backers: 234,
    estimated: "March 2024",
    perks: ["Name in credits", "Early access", "Supporter badge"],
  },
  {
    id: 2,
    title: "Book Lover",
    amount: 25,
    description: "Everything above plus exclusive digital book collection and AI writing assistant",
    backers: 156,
    estimated: "March 2024",
    perks: ["All previous perks", "Digital book collection", "AI writing assistant", "Priority support"],
  },
  {
    id: 3,
    title: "Content Creator",
    amount: 50,
    description: "Perfect for writers and podcasters with advanced AI tools and analytics",
    backers: 89,
    estimated: "April 2024",
    perks: ["All previous perks", "Advanced AI tools", "Analytics dashboard", "Custom branding", "API access"],
  },
  {
    id: 4,
    title: "Premium Patron",
    amount: 100,
    description: "Ultimate package with lifetime access and exclusive features",
    backers: 34,
    estimated: "April 2024",
    perks: [
      "All previous perks",
      "Lifetime access",
      "Exclusive features",
      "Direct developer contact",
      "Custom integrations",
    ],
  },
]

export function CampaignPage({ onBack }: CampaignPageProps) {
  const [selectedReward, setSelectedReward] = React.useState<number | null>(null)
  const [customAmount, setCustomAmount] = React.useState("")
  const [supporterInfo, setSupporterInfo] = React.useState({
    name: "",
    email: "",
    message: "",
  })

  const currentAmount = 47850
  const goalAmount = 75000
  const progressPercentage = (currentAmount / goalAmount) * 100
  const daysLeft = 23
  const totalBackers = 513

  const handleSupport = () => {
    // In a real implementation, this would integrate with payment processing
    console.log("Processing support:", { selectedReward, customAmount, supporterInfo })
    alert("Thank you for your support! This would integrate with a payment processor.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share Campaign
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Follow Updates
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=800&text=Campaign+Hero&bg=6366f1&color=white"
                alt="Campaign Hero"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold mb-2">Support Our Digital Library Revolution</h1>
                <p className="text-xl">Help us build the future of reading, writing, and learning</p>
              </div>
            </div>

            {/* Campaign Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">${currentAmount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">raised of ${goalAmount.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">{totalBackers}</div>
                  <div className="text-sm text-muted-foreground">backers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600">{daysLeft}</div>
                  <div className="text-sm text-muted-foreground">days left</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{progressPercentage.toFixed(1)}% funded</span>
                    <span>${(goalAmount - currentAmount).toLocaleString()} to go</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Campaign Details */}
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="story">Our Story</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-6">
                <Card>
                  <CardContent className="p-6 prose max-w-none dark:prose-invert">
                    <h3>Revolutionizing Digital Reading and Learning</h3>
                    <p>
                      We're building more than just another digital library. Our platform combines the best of
                      traditional reading with cutting-edge AI technology to create an immersive, personalized learning
                      experience.
                    </p>
                    <h4>Why This Matters</h4>
                    <ul>
                      <li>Access to knowledge should be universal and barrier-free</li>
                      <li>AI can enhance learning without replacing human creativity</li>
                      <li>Communities of readers and writers deserve better tools</li>
                      <li>The future of education is interactive and personalized</li>
                    </ul>
                    <h4>What We've Built So Far</h4>
                    <p>
                      Our team has already created a working prototype with book reading, podcast streaming, article
                      browsing, and AI-powered writing assistance. But we need your help to take it to the next level.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "📚", title: "Smart Library", desc: "AI-curated book recommendations" },
                    { icon: "🎧", title: "Podcast Platform", desc: "High-quality audio streaming" },
                    { icon: "📰", title: "News Aggregation", desc: "Personalized news feeds" },
                    { icon: "✍️", title: "AI Writing Assistant", desc: "Help with writing and editing" },
                    { icon: "🌐", title: "Multi-language Support", desc: "Real-time translation" },
                    { icon: "👥", title: "Community Features", desc: "Connect with other readers" },
                  ].map((feature, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{feature.icon}</div>
                          <div>
                            <h4 className="font-semibold">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { date: "March 2024", title: "Beta Launch", status: "upcoming" },
                        { date: "April 2024", title: "Mobile Apps", status: "upcoming" },
                        { date: "May 2024", title: "Advanced AI Features", status: "upcoming" },
                        { date: "June 2024", title: "Community Platform", status: "upcoming" },
                      ].map((milestone, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded-full bg-blue-600" />
                          <div className="flex-1">
                            <div className="font-semibold">{milestone.title}</div>
                            <div className="text-sm text-muted-foreground">{milestone.date}</div>
                          </div>
                          <Badge variant="outline">{milestone.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Alex Chen", role: "Lead Developer", avatar: "AC" },
                    { name: "Sarah Johnson", role: "UX Designer", avatar: "SJ" },
                    { name: "Mike Rodriguez", role: "AI Engineer", avatar: "MR" },
                    { name: "Emily Davis", role: "Content Strategist", avatar: "ED" },
                  ].map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Support Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Support This Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reward Tiers */}
                <div className="space-y-3">
                  {rewards.map((reward) => (
                    <Card
                      key={reward.id}
                      className={`cursor-pointer transition-colors ${
                        selectedReward === reward.id ? "ring-2 ring-blue-600" : ""
                      }`}
                      onClick={() => setSelectedReward(reward.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{reward.title}</h4>
                          <Badge>${reward.amount}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                        <div className="space-y-1">
                          {reward.perks.map((perk, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {perk}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                          <span>{reward.backers} backers</span>
                          <span>Est. {reward.estimated}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Or enter custom amount</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>

                {/* Supporter Info */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={supporterInfo.name}
                      onChange={(e) => setSupporterInfo({ ...supporterInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={supporterInfo.email}
                      onChange={(e) => setSupporterInfo({ ...supporterInfo, email: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSupport}
                  className="w-full"
                  size="lg"
                  disabled={!selectedReward && !customAmount}
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Support Project
                </Button>
              </CardContent>
            </Card>

            {/* Recent Backers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Supporters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Anonymous", amount: 50, time: "2 hours ago" },
                    { name: "BookLover23", amount: 25, time: "4 hours ago" },
                    { name: "Sarah M.", amount: 100, time: "6 hours ago" },
                    { name: "Anonymous", amount: 10, time: "8 hours ago" },
                  ].map((backer, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div>
                        <div className="font-medium">{backer.name}</div>
                        <div className="text-muted-foreground">{backer.time}</div>
                      </div>
                      <Badge variant="outline">${backer.amount}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
