"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const userActivity = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "watched",
    content: "The Last Journey",
    time: "10 minutes ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    user: "Michael Chen",
    action: "saved",
    content: "Cosmic Adventures",
    time: "30 minutes ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    action: "watched",
    content: "Midnight Shadows",
    time: "1 hour ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    user: "David Kim",
    action: "saved",
    content: "The Detective",
    time: "2 hours ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    user: "Jessica Lee",
    action: "watched",
    content: "Lost in Time",
    time: "3 hours ago",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function UserActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {userActivity.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={activity.image} alt={activity.user} />
              <AvatarFallback>{activity.user.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{activity.user}</p>
              <p className="text-xs text-muted-foreground">
                {activity.action} "{activity.content}" • {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

