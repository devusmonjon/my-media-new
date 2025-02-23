"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Series {
  id: number
  title: string
  image: string
  year: string
  seasons: number
  description?: string
  trailer?: string
}

interface Episode {
  id: number
  title: string
  image: string
  episodeNumber: string
  seriesTitle: string
}

interface Category {
  id: number
  title: string
  showCount: number
  color: string
  image: string
}

const featuredSeries: Series[] = [
  {
    id: 1,
    title: "Arcane",
    image: "https://picsum.photos/seed/arcane/1920/600",
    year: "2021",
    seasons: 2,
    description:
      "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
      trailer: "/trailers/nevertheless.mp4"
  },
  {
    id: 2,
    title: "Escape to the Farm",
    image: "https://picsum.photos/seed/farm/1920/600",
    year: "2020",
    seasons: 1,
    description:
      "Set in Washington, D.C., Political Animals is a bold and provocative drama series about a fictional former first family in turmoil.",
      trailer: "/trailers/nevertheless.mp4"
  },
]

const tvSeries: Series[] = [
  {
    id: 1,
    title: "Falling Water",
    image: "https://picsum.photos/seed/water/400/225",
    year: "2022",
    seasons: 2,
  },
  {
    id: 2,
    title: "The Unstoppable Soldier",
    image: "https://picsum.photos/seed/soldier/400/225",
    year: "2023",
    seasons: 1,
  },
  {
    id: 3,
    title: "Political Animal",
    image: "https://picsum.photos/seed/political/400/225",
    year: "2023",
    seasons: 3,
  },
  {
    id: 4,
    title: "Fireworks Wednesday",
    image: "https://picsum.photos/seed/fireworks/400/225",
    year: "2023",
    seasons: 1,
  },
]

const featuredEpisodes: Episode[] = [
  {
    id: 1,
    title: "The Dirt Under Your Nails",
    image: "https://picsum.photos/seed/dirt/400/225",
    episodeNumber: "EP9",
    seriesTitle: "The Last Hope",
  },
  {
    id: 2,
    title: "Killing Is A Cycle",
    image: "https://picsum.photos/seed/killing/400/225",
    episodeNumber: "EP8",
    seriesTitle: "Dark Matter",
  },
  {
    id: 3,
    title: "Pretend Like It's the First Time",
    image: "https://picsum.photos/seed/pretend/400/225",
    episodeNumber: "EP7",
    seriesTitle: "Memory Lane",
  },
  {
    id: 4,
    title: "The Message Hidden Within",
    image: "https://picsum.photos/seed/message/400/225",
    episodeNumber: "EP6",
    seriesTitle: "Cryptic",
  },
]

const categories: Category[] = [
  {
    id: 1,
    title: "Reality",
    showCount: 6,
    color: "bg-purple-500",
    image: "https://picsum.photos/seed/reality/100/100",
  },
  { id: 2, title: "Drama", showCount: 5, color: "bg-emerald-500", image: "https://picsum.photos/seed/drama/100/100" },
  { id: 3, title: "Family", showCount: 5, color: "bg-violet-500", image: "https://picsum.photos/seed/family/100/100" },
  { id: 4, title: "Action", showCount: 5, color: "bg-purple-600", image: "https://picsum.photos/seed/action/100/100" },
  {
    id: 5,
    title: "International",
    showCount: 5,
    color: "bg-orange-500",
    image: "https://picsum.photos/seed/international/100/100",
  },
  { id: 6, title: "Music", showCount: 4, color: "bg-cyan-500", image: "https://picsum.photos/seed/music/100/100" },
  { id: 7, title: "Comedy", showCount: 3, color: "bg-pink-500", image: "https://picsum.photos/seed/comedy/100/100" },
  { id: 8, title: "Romance", showCount: 2, color: "bg-red-500", image: "https://picsum.photos/seed/romance/100/100" },
]

export default function SeriesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { toast } = useToast()

  const handlePlayNow = (series: Series) => {
    toast({
      title: "Starting Playback",
      description: `Now playing ${series.title}`,
    })
  }

  const handleWatchLater = (series: Series) => {
    toast({
      title: "Added to Watch Later",
      description: `${series.title} has been added to your list`,
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSeries.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredSeries.length) % featuredSeries.length)
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Hero Section */}
      <section className="relative bg-[#1a1a2f] py-16 pt-24">
        <div className="container mx-auto px-4">
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
                src={featuredSeries[currentSlide].image || "/placeholder.svg"}
                alt={featuredSeries[currentSlide].title}
                width={1920}
                height={600}
                className="rounded-lg object-cover h-full"
              /> */}
              <video
                src={featuredSeries[currentSlide].trailer}
                autoPlay
                loop
                muted
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-start p-12">
                <div className="max-w-xl space-y-4">
                  <h1 className="text-5xl font-bold tracking-tight">{featuredSeries[currentSlide].title}</h1>
                  <p className="text-lg text-gray-300">{featuredSeries[currentSlide].description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{featuredSeries[currentSlide].year}</span>
                    <span>•</span>
                    <span>{featuredSeries[currentSlide].seasons} Seasons</span>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-purple-600"
                      onClick={() => handlePlayNow(featuredSeries[currentSlide])}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Play Now
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => handleWatchLater(featuredSeries[currentSlide])} className="bg-transparent">
                      <Plus className="mr-2 h-5 w-5" />
                      Watch Later
                    </Button>
                  </div>
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
            {featuredSeries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-purple-600" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* TV Series Grid */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">TV Series</h2>
            <div className="flex gap-4">
              <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                Today
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-purple-300">
                This week
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-purple-300">
                This month
              </Button>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tvSeries.map((series) => (
              <motion.div
                key={series.id}
                className="group relative overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={series.image || "/placeholder.svg"}
                  alt={series.title}
                  width={400}
                  height={225}
                  className="aspect-video object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                  <h3 className="font-semibold">{series.title}</h3>
                  <div className="text-sm text-gray-400">{series.seasons} Seasons</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Episodes */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured TV Episode Premieres</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredEpisodes.map((episode) => (
              <div key={episode.id} className="group relative overflow-hidden rounded-lg">
                <Image
                  src={episode.image || "/placeholder.svg"}
                  alt={episode.title}
                  width={400}
                  height={225}
                  className="aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                  <div className="text-sm text-purple-400">{episode.episodeNumber}</div>
                  <h3 className="font-semibold">{episode.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">TV Shows Categories</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href="#"
                className={`flex min-w-[200px] items-center gap-4 rounded-lg ${category.color} p-4 transition-transform hover:scale-105`}
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{category.title}</div>
                  <div className="text-sm text-white/80">{category.showCount} Shows</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

