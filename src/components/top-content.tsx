"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

const topContent = [
  {
    id: 1,
    title: "Galactic Wars: The Final Battle",
    type: "Movie",
    views: 245000,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Criminal Minds",
    type: "Series",
    views: 198000,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "The Lost City",
    type: "Movie",
    views: 176000,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Supernatural Encounters",
    type: "Series",
    views: 154000,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "The Last Stand",
    type: "Movie",
    views: 132000,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function TopContent() {
  const maxViews = Math.max(...topContent.map((content) => content.views))

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-6">
        {topContent.map((content) => (
          <div key={content.id} className="space-y-2">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={content.image} alt={content.title} />
                <AvatarFallback>{content.title.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{content.title}</p>
                  <p className="text-sm text-muted-foreground">{content.type}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Progress value={(content.views / maxViews) * 100} className="h-2" />
                  <p className="ml-2 text-xs text-muted-foreground">{content.views.toLocaleString()} views</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

