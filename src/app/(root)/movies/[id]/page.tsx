"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp, Share2, Plus, Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  content: string
  avatar: string
}

const movie = {
  id: 1,
  title: "John Wick 4",
  rating: 8.2,
  views: 2243,
  likes: 1,
  year: "2023",
  duration: "170 mins",
  ageRating: "TV-MA",
  genres: ["Action", "Crime", "Thriller"],
  description:
    "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
  cast: "Brooke Mulford",
  crew: "Alaya Pacheco, Ricky Aleman, Sarah Neal",
  posterImage: "https://picsum.photos/seed/john-wick-4-poster/600/900",
  backdropImage:
    "https://picsum.photos/seed/john-wick-4-backdrop/1920/1080",
  trailerUrl: "/videos/john-wick-4.mp4",
}

const recommendedMovies = [
  {
    id: 1,
    title: "Warlock of Dusk",
    image: "https://picsum.photos/seed/warlock/300/450",
    rating: 4.5,
    year: "2023",
  },
  {
    id: 2,
    title: "The White House",
    image: "https://picsum.photos/seed/white-house/300/450",
    rating: 4.3,
    year: "2023",
  },
  {
    id: 3,
    title: "The Sleeping Angel",
    image: "https://picsum.photos/seed/sleeping-angel/300/450",
    rating: 4.7,
    year: "2023",
  },
  {
    id: 4,
    title: "The Post",
    image: "https://picsum.photos/seed/the-post/300/450",
    rating: 4.2,
    year: "2022",
  },
  {
    id: 5,
    title: "Spider Man Memo",
    image: "https://picsum.photos/seed/spider-man/300/450",
    rating: 4.8,
    year: "2023",
  },
  {
    id: 6,
    title: "Man in the Black",
    image: "https://picsum.photos/seed/man-black/300/450",
    rating: 4.4,
    year: "2023",
  },
]

const reviews: Review[] = [
  {
    id: 1,
    author: "Jane Doe",
    rating: 5,
    date: "September 20, 2024",
    content:
      "John Wick: Chapter 4 is a non-stop thrill ride, packed with jaw-dropping action, breathtaking visuals, and Keanu Reeves in peak form. The film masterfully expands the Wick universe while maintaining relentless intensity. With stunning choreography and standout performances, it's a must-see for action fans. Pure adrenaline from start to finish!",
    avatar: "https://picsum.photos/seed/jane/100/100",
  },
]

export default function MoviePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedSource, setSelectedSource] = useState(1)
  const [userRating, setUserRating] = useState(0)
  const { toast } = useToast()

  const handlePlay = () => {
    setIsPlaying(true)
    toast({
      title: "Starting Playback",
      description: "Now playing John Wick 4",
    })
  }

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} for John Wick 4`,
    })
  }

  const handleSourceChange = (source: number) => {
    setSelectedSource(source)
    toast({
      title: "Source Changed",
      description: `Switched to Link ${source}`,
    })
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Review Submitted",
      description: "Thank you for your review!",
    })
  }

  return (
    <div className="min-h-[90vh] bg-[#0a0a1a] container mx-auto mt-16">
      {/* Hero Section */}
      <div className="relative aspect-video w-full overflow-hidden">
        {!isPlaying ? <Image
          src={movie.backdropImage || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        /> : <iframe src="https://mover.uz/video/embed/2rkr3wQf" frameBorder="0" allowFullScreen className="w-full h-full"></iframe>}
        {!isPlaying && <div className="absolute inset-0 bg-black/30" />}

        {!isPlaying && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
            onClick={handlePlay}
          >
            <div className="rounded-full bg-purple-600/90 p-5 backdrop-blur-sm transition-transform hover:scale-110">
              <Play className="h-12 w-12 fill-white" />
            </div>
          </motion.button>
        )}
      </div>

      <main className=" px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
          {/* Movie Poster and Actions */}
          <div className="space-y-4">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <Image src={movie.posterImage || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            </div>
            <div className="grid gap-2">
              <div className="flex gap-2">
                <Button className="flex-1 bg-transparent border-accent-foreground" variant="outline" onClick={() => handleAction("Liked")}>
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {movie.likes} like
                </Button>
                <Button variant="outline" className="bg-transparent border-accent-foreground" onClick={() => handleAction("Shared")}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="bg-transparent border-accent-foreground" onClick={() => handleAction("Added to Watchlist")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" className="w-full bg-transparent border-accent-foreground" onClick={() => handleAction("Download Started")}>
                <Download className="mr-2 h-4 w-4" />
                Download Videos
              </Button>
            </div>
          </div>

          {/* Movie Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-500 stroke-yellow-500" />
                  <span className="font-semibold">{movie.rating}</span>
                </div>
                <span>{movie.views} Views</span>
                <span>{movie.duration}</span>
                <span>{movie.year}</span>
                <span>{movie.ageRating}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="border-purple-400/50 text-purple-400">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-400">{movie.description}</p>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Cast:</span> {movie.cast}
                </p>
                <p>
                  <span className="text-gray-400">Crew:</span> {movie.crew}
                </p>
              </div>
            </div>

            {/* Source Selection */}
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Change Source:</div>
              <div className="flex gap-2">
                <Button
                  variant={selectedSource === 1 ? "default" : "outline"}
                  className={selectedSource === 1 ? "bg-purple-600" : "text-black"}
                  onClick={() => handleSourceChange(1)}
                >
                  Link 1
                </Button>
                <Button
                  variant={selectedSource === 2 ? "default" : "outline"}
                  className={selectedSource === 2 ? "bg-purple-600" : "text-black"}
                  onClick={() => handleSourceChange(2)}
                >
                  Link 2
                </Button>
              </div>
            </div>

            {/* Recommended Movies */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Recommended For You</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {recommendedMovies.map((movie) => (
                  <div key={movie.id} className="space-y-2">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                      <Image
                        src={movie.image || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                          <span className="ml-1">{movie.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Add a review</h2>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <p className="text-sm text-gray-400">
                  Your email address will not be published. Required fields are marked *
                </p>
                <div className="space-y-2">
                  <div className="text-sm">Your rating *</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setUserRating(rating)}
                        className="transition-colors"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            rating <= userRating ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">Your review *</div>
                  <Textarea required className="min-h-[150px] bg-gray-900/50 border-accent-foreground" placeholder="Write your review here..." />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm">Name *</div>
                    <Input required className="bg-gray-900/50 border-accent-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">Email *</div>
                    <Input required type="email" className="bg-gray-900/50 border-accent-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="save-info" />
                  <label htmlFor="save-info" className="text-sm text-gray-400">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>
                <Button type="submit" className="bg-purple-600">
                  Submit
                </Button>
              </form>

              {/* Existing Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.author}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="font-semibold">{review.author}</div>
                        <div className="text-gray-400">{review.date}</div>
                      </div>
                      <p className="text-gray-300">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

