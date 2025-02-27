"use client"

import { useState } from "react"
import { ChevronRight, Play, Plus, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Movie {
  id: number
  title: string
  year: string
  image: string
  genres: string[]
  duration?: string
  rating?: string
  description?: string
}

const featuredSlides = [
  {
    id: 1,
    title: "THE LONGEST RIDE",
    subtitle: "WORLD DIGITAL PREMIERE",
    image: "https://picsum.photos/seed/longest-ride/1920/600",
    action: "Streaming Now",
    trailer: "/trailers/nevertheless.mp4"
  },
  {
    id: 2,
    title: "A DOG'S PURPOSE",
    subtitle: "WORLD DIGITAL PREMIERE",
    image: "https://picsum.photos/seed/dogs-purpose/1920/600",
    action: "Streaming Now",
    trailer: "/trailers/trailer.mp4"
  },
  {
    id: 3,
    title: "THE DARK KNIGHT",
    subtitle: "WORLD DIGITAL PREMIERE",
    image: "https://picsum.photos/seed/dark-knight/1920/600",
    action: "Streaming Now",
    trailer: "/trailers/nevertheless.mp4"
  },
]

const top10Movies: Movie[] = [
  {
    id: 1,
    title: "Spider Man Memo",
    year: "2022",
    image: "https://picsum.photos/seed/spider-man/300/450",
    genres: ["Action", "Anime"],
    description: "Miles Morales returns for the next chapter of the Spider-Verse saga.",
  },
  {
    id: 2,
    title: "The Baker",
    year: "2022",
    image: "https://picsum.photos/seed/baker/300/450",
    genres: ["Comedy", "Drama"],
  },
  {
    id: 3,
    title: "My Faithful Dog",
    year: "2022",
    image: "https://picsum.photos/seed/faithful-dog/300/450",
    genres: ["Adventure", "History"],
  },
  // Add more movies...
]

const trendingMovies: Movie[] = [
  {
    id: 1,
    title: "John Wick 4",
    year: "2023",
    image: "https://picsum.photos/seed/john-wick-4/300/450",
    genres: ["Action", "Thriller"],
  },
  {
    id: 2,
    title: "Spider Man Memo",
    year: "2022",
    image: "https://picsum.photos/seed/spider-man/300/450",
    genres: ["Action", "Adventure"],
  },
  // Add more movies...
]

export default function MoviesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(top10Movies[0])
  const { toast } = useToast()

  const handlePlayNow = (movie: Movie) => {
    toast({
      title: "Starting Playback",
      description: `Now playing ${movie.title}`,
    })
  }

  const handleWatchLater = (movie: Movie) => {
    toast({
      title: "Added to Watch Later",
      description: `${movie.title} has been added to your list`,
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length)
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Hero Section with Text and Arrows */}
      <section className="relative bg-[#1a1a2f] py-16 pt-24">
        <div className="container mx-auto px-4 aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg aspect-video"
            >
              {/* <Image
                src={featuredSlides[currentSlide].image || "/placeholder.svg"}
                alt={featuredSlides[currentSlide].title}
                width={1920}
                height={600}
                className="rounded-lg object-cover"
              /> */}
              <video
                src={featuredSlides[currentSlide].trailer}
                autoPlay
                loop
                muted
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-start p-12">
                <div className="max-w-xl space-y-4">
                  <div className="text-sm font-medium text-purple-400">{featuredSlides[currentSlide].subtitle}</div>
                  <h1 className="text-5xl font-bold tracking-tight">{featuredSlides[currentSlide].title}</h1>
                  <Button size="lg" className="bg-purple-600 text-lg">
                    {featuredSlides[currentSlide].action}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="ml-4 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {featuredSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-purple-600" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto space-y-12 px-4 py-8">
        {/* Top 10 Section */}
        <section className="grid gap-8 lg:grid-cols-[400px,1fr]">
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Top 10 this week</h2>
            <div className="space-y-4">
              {top10Movies.map((movie, index) => (
                <button
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className={`flex w-full items-center gap-4 rounded-lg p-2 transition-colors ${
                    selectedMovie.id === movie.id ? "bg-purple-600/20" : "hover:bg-white/5"
                  }`}
                >
                  <span className="text-3xl font-bold text-white/20">{index + 1}</span>
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    width={60}
                    height={90}
                    className="rounded"
                  />
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-400">{movie.year}</div>
                    <div className="font-semibold">{movie.title}</div>
                    <div className="flex gap-2 text-xs text-purple-400">
                      {movie.genres.map((genre) => (
                        <span key={genre}>{genre}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={selectedMovie.image || "/placeholder.svg"}
              alt={selectedMovie.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="mb-2 text-2xl font-bold">{selectedMovie.title}</h3>
              <p className="mb-4 text-gray-300">{selectedMovie.description}</p>
              <div className="flex gap-3">
                <Button className="bg-purple-600" onClick={() => handlePlayNow(selectedMovie)}>
                  <Play className="mr-2 h-4 w-4" />
                  Play Now
                </Button>
                <Button variant="secondary" onClick={() => handleWatchLater(selectedMovie)} className="text-black">
                  <Plus className="mr-2 h-4 w-4" />
                  Watch Later
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* House of the Dragon Banner */}
        <section className="relative overflow-hidden rounded-lg bg-[#1a1a2f]">
          <div className="flex items-center justify-between p-8">
            <div className="flex items-center gap-8">
              <Image
                src="https://picsum.photos/seed/house-dragon-logo/100/100"
                alt="House of the Dragon"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">HOUSE OF THE DRAGON</h2>
                <div className="text-sm text-gray-400">NEW SERIES</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xl font-semibold">STREAMING ON OCT 15</div>
              <Button variant="secondary" className="text-black">Watch Trailer</Button>
            </div>
          </div>
        </section>

        {/* Movie Grid Sections */}
        {["Trending", "Popular Movies", "New Releases", "Recommended For You"].map((section) => (
          <section key={section}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{section}</h2>
              <Link href="#" className="flex items-center text-sm text-purple-400 hover:text-purple-300">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {trendingMovies.map((movie) => (
                <motion.div key={movie.id} className="group relative" whileHover={{ scale: 1.05 }}>
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                    <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-white text-black hover:bg-white/90"
                          onClick={() => handlePlayNow(movie)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white text-black"
                          onClick={() => handleWatchLater(movie)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="font-semibold">{movie.title}</div>
                    <div className="flex gap-2 text-sm text-gray-400">
                      <span>{movie.year}</span>
                      {movie.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="border-purple-400/30 text-purple-400">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

