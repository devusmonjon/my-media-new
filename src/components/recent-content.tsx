"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const recentContent = [
  {
    id: 1,
    title: "The Last Journey",
    type: "Movie",
    date: "2 hours ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Cosmic Adventures",
    type: "Series",
    date: "5 hours ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Midnight Shadows",
    type: "Movie",
    date: "1 day ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "The Detective",
    type: "Series",
    date: "2 days ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "Lost in Time",
    type: "Movie",
    date: "3 days ago",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function RecentContent() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {recentContent.map((content) => (
          <div key={content.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={content.image} alt={content.title} />
              <AvatarFallback>{content.title.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{content.title}</p>
                <Badge variant={content.type === "Movie" ? "default" : "secondary"}>{content.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{content.date}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

