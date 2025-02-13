"use client"

import * as React from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
}

const roles = [
  {
    label: "Owner",
    description: "Admin-level access to all resources.",
  },
  {
    label: "Developer",
    description: "Can view, comment and edit.",
  },
  {
    label: "Viewer",
    description: "Can view and comment.",
  },
  {
    label: "Billing",
    description: "Can view, comment and manage billing.",
  },
]

interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [members, setMembers] = React.useState<TeamMember[]>([
    {
      id: "1",
      name: "Arman",
      email: "mdarmanya.h@gmail.com",
      role: "Owner",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Hasan",
      email: "hasan@gmail.com",
      role: "Member",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Safa",
      email: "safa@blazedigital.com",
      role: "Developer",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [searchTerm, setSearchTerm] = React.useState("")

  const updateMemberRole = (memberId: string, newRole: string) => {
    setMembers(members.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Team Members</DialogTitle>
          <p className="text-sm text-gray-400">Invite your team members to collaborate.</p>
          <Button variant="ghost" className="absolute right-4 top-4 text-gray-400 hover:text-white" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search members..."
            className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-4 space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.email}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                    {member.role}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  {roles.map((role) => (
                    <DropdownMenuItem
                      key={role.label}
                      className="flex items-center justify-between text-white hover:bg-gray-700"
                      onClick={() => updateMemberRole(member.id, role.label)}
                    >
                      <div>
                        <p>{role.label}</p>
                        <p className="text-xs text-gray-400">{role.description}</p>
                      </div>
                      {member.role === role.label && <Check className="h-4 w-4 text-[#CCFF00]" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">Add New Member</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

