"use client"

import { useState } from "react"
import { ChevronRight, Play, Clock, Star, Heart, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { handleWatch } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Episode {
  id: number
  number: string
  title: string
  duration: string
  image: string
  description: string
  views: number
  rating: number
  releaseDate: string
}

interface CastMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  socialLinks: {
    twitter?: string
    instagram?: string
    imdb?: string
  }
}

interface SimilarShow {
  id: number
  title: string
  genres: string[]
  image: string
  rating: number
  year: string
  description: string
}

const episodes: Episode[] = [
  {
    id: 1,
    number: "S01E01",
    title: "All or Nothing",
    duration: "15:00",
    image: "https://picsum.photos/seed/ep1/400/225",
    description:
      "In this gripping series premiere, we dive deep into the complex world of Washington politics as former First Lady Elaine Barrish Hammond accepts the position of Secretary of State, setting the stage for an intense political drama.",
    views: 1200000,
    rating: 4.8,
    releaseDate: "2023-09-15",
  },
  {
    id: 2,
    number: "S01E02",
    title: "Check Out Time",
    duration: "45:00",
    image: "https://picsum.photos/seed/ep2/400/225",
    description:
      "A national crisis forces Secretary Hammond to make a difficult decision that could impact her family's legacy, while her son T.J. struggles with personal demons.",
    views: 980000,
    rating: 4.9,
    releaseDate: "2023-09-22",
  },
  {
    id: 3,
    number: "S01E03",
    title: "Decision, Decision",
    duration: "25:10",
    image: "https://picsum.photos/seed/ep3/400/225",
    description:
      "The Hammond family faces a pivotal moment as Douglas's engagement announcement creates waves in Washington's social circles.",
    views: 1100000,
    rating: 4.7,
    releaseDate: "2023-09-29",
  },
  {
    id: 4,
    number: "S01E04",
    title: "Fallback",
    duration: "35:50",
    image: "https://picsum.photos/seed/ep4/400/225",
    description:
      "A diplomatic crisis in the Middle East tests Elaine's skills as Secretary of State, while Bud Hammond returns to the spotlight.",
    views: 950000,
    rating: 4.6,
    releaseDate: "2023-10-06",
  },
  {
    id: 5,
    number: "S01E05",
    title: "Family Ties",
    duration: "45:10",
    image: "https://picsum.photos/seed/ep5/400/225",
    description:
      "The past comes back to haunt the Hammond family as old secrets threaten to destroy everything they've built.",
    views: 1300000,
    rating: 4.9,
    releaseDate: "2023-10-13",
  },
  {
    id: 6,
    number: "S01E06",
    title: "Friended",
    duration: "25:22",
    image: "https://picsum.photos/seed/ep6/400/225",
    description:
      "As political tensions rise, Elaine must navigate a complex web of alliances while protecting her family's interests.",
    views: 1150000,
    rating: 4.8,
    releaseDate: "2023-10-20",
  },
]

const cast: CastMember[] = [
  {
    id: 1,
    name: "Brooke Mulford",
    role: "Elaine Barrish Hammond",
    image: "https://picsum.photos/seed/brooke/200/200",
    bio: "Award-winning actress known for her powerful portrayal of strong female characters. Her role as Elaine Barrish Hammond has earned her critical acclaim and multiple Emmy nominations.",
    socialLinks: {
      twitter: "https://twitter.com/brookemulford",
      instagram: "https://instagram.com/brookemulford",
      imdb: "https://imdb.com/name/brookemulford",
    },
  },
  {
    id: 2,
    name: "Ricky Aleman",
    role: "Douglas Hammond",
    image: "https://picsum.photos/seed/ricky/200/200",
    bio: "Rising star Ricky Aleman brings depth and nuance to the role of Douglas Hammond, the ambitious and complicated son of former First Lady Elaine Barrish.",
    socialLinks: {
      twitter: "https://twitter.com/rickyaleman",
      instagram: "https://instagram.com/rickyaleman",
    },
  },
  {
    id: 3,
    name: "Alaya Pacheco",
    role: "Susan Berg",
    image: "https://picsum.photos/seed/alaya/200/200",
    bio: "Versatile actress Alaya Pacheco shines as Susan Berg, the determined journalist whose complicated relationship with the Hammond family drives much of the series' drama.",
    socialLinks: {
      twitter: "https://twitter.com/alayapacheco",
      instagram: "https://instagram.com/alayapacheco",
      imdb: "https://imdb.com/name/alayapacheco",
    },
  },
]

const similarShows: SimilarShow[] = [
  {
    id: 1,
    title: "The Unstoppable Soldier",
    genres: ["Drama", "Reality"],
    image: "https://picsum.photos/seed/soldier/400/225",
    rating: 4.7,
    year: "2023",
    description:
      "A gripping military drama that follows the life of a decorated veteran facing new challenges in civilian life.",
  },
  {
    id: 2,
    title: "The Brady Bunch",
    genres: ["Family", "Reality"],
    image: "https://picsum.photos/seed/brady/400/225",
    rating: 4.5,
    year: "2022",
    description:
      "A modern take on the classic family sitcom, exploring contemporary family dynamics with heart and humor.",
  },
  {
    id: 3,
    title: "Love and War",
    genres: ["Music", "Romance"],
    image: "https://picsum.photos/seed/love/400/225",
    rating: 4.8,
    year: "2023",
    description:
      "A passionate love story set against the backdrop of a world in conflict, featuring stunning musical performances.",
  },
  {
    id: 4,
    title: "Falling Water",
    genres: ["International", "Reality"],
    image: "https://picsum.photos/seed/water/400/225",
    rating: 4.6,
    year: "2023",
    description:
      "An atmospheric thriller that weaves together the dreams of three unrelated people in unexpected ways.",
  },
  {
    id: 5,
    title: "Day Dreamers",
    genres: ["International", "Music"],
    image: "https://picsum.photos/seed/dream/400/225",
    rating: 4.9,
    year: "2023",
    description:
      "Follow the journeys of aspiring musicians as they chase their dreams in the competitive music industry.",
  },
  {
    id: 6,
    title: "American Nightmare",
    genres: ["Drama", "Reality"],
    image: "https://picsum.photos/seed/nightmare/400/225",
    rating: 4.7,
    year: "2023",
    description:
      "A dark exploration of the American dream gone wrong, told through interconnected stories of ambition and despair.",
  },
]

export default function SeriesPage() {
  const [selectedSeason, setSelectedSeason] = useState("1")
  const [activeEpisode, setActiveEpisode] = useState(episodes[0])

  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-gradient-to-b from-[#1a1a2f] to-[#0a0a1a]">
        <Image
          src="https://picsum.photos/seed/political-bg/1920/1080"
          alt="Background"
          fill
          className="absolute inset-0 object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/60 to-transparent" />

        <div className="container relative mx-auto px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr,500px]">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Badge className="bg-purple-600">MUSIC</Badge>
                  <Badge className="bg-purple-600">REALITY</Badge>
                </div>
                <h1 className="text-7xl font-bold tracking-tight">
                  <span className="text-white">POLITICAL</span>
                  <br />
                  <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                    ANIMAL
                  </span>
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">4.8</span>
                </div>
                <span>2019</span>
                <span>•</span>
                <span>3 Seasons</span>
                <span>•</span>
                <Badge variant="outline" className="border-primary text-primary">TV-MA</Badge>
                <span>•</span>
                <span>Drama</span>
              </div>

              <p className="max-w-xl text-lg leading-relaxed text-gray-300">
                Set in Washington, D.C., Political Animals is a bold, significant look at a fictional former first
                family in turmoil. Following Elaine Barrish, a former First Lady and current Secretary of State, the
                series explores the complex intersection of family, politics, and power in modern America.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push(handleWatch({type: "series", slug: "neverthless",episode:"ep-slug"}))}>
                  <Play className="mr-2 h-5 w-5" />
                  Start Watching
                </Button>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="w-[180px] bg-black/20 border-gray-800">
                    <SelectValue placeholder="Select Season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Season 1</SelectItem>
                    <SelectItem value="2">Season 2</SelectItem>
                    <SelectItem value="3">Season 3</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full border-gray-800 text-black">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-gray-800 text-black">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-gray-800 text-black">
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Image
                src="https://picsum.photos/seed/political-hero/1000/1200"
                alt="Political Animal"
                width={500}
                height={700}
                className="rounded-lg object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4">
        {/* Episodes Section */}
        <section className="mb-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Episodes</h2>
              <p className="text-sm text-gray-400">Season {selectedSeason}</p>
            </div>
            <Link href="#" className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300">
              All Episodes
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            {/* Featured Episode */}
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={activeEpisode.image || "/placeholder.svg"}
                alt={activeEpisode.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <Badge className="bg-purple-600">{activeEpisode.number}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {activeEpisode.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {activeEpisode.rating}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold">{activeEpisode.title}</h3>
                  <p className="text-gray-300">{activeEpisode.description}</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Play className="mr-2 h-4 w-4" />
                    Play Episode
                  </Button>
                </div>
              </div>
            </div>

            {/* Episode List */}
            <div className="space-y-4">
              {episodes.map((episode) => (
                <motion.button
                  key={episode.id}
                  className={`group relative flex w-full gap-4 rounded-lg p-3 transition-colors ${
                    activeEpisode.id === episode.id ? "bg-purple-600/20" : "hover:bg-white/5"
                  }`}
                  onClick={() => setActiveEpisode(episode)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative aspect-video w-40 flex-none overflow-hidden rounded">
                    <Image
                      src={episode.image || "/placeholder.svg"}
                      alt={episode.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="mb-1 text-sm text-purple-400">{episode.number}</div>
                    <h4 className="font-medium">{episode.title}</h4>
                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-400">
                      <span>{episode.duration}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {episode.rating}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Cast & Crew Section */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold">Cast & Crew</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cast.map((member) => (
              <motion.div
                key={member.id}
                className="group relative overflow-hidden rounded-lg bg-[#1a1a2f]"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-6 p-6">
                  <div className="relative h-32 w-32 flex-none overflow-hidden rounded-lg">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <div className="text-purple-400">{member.role}</div>
                    <p className="text-sm text-gray-400 line-clamp-3">{member.bio}</p>
                    <div className="flex gap-3">
                      {member.socialLinks.twitter && (
                        <Link href={member.socialLinks.twitter} className="text-gray-400 hover:text-purple-400">
                          Twitter
                        </Link>
                      )}
                      {member.socialLinks.instagram && (
                        <Link href={member.socialLinks.instagram} className="text-gray-400 hover:text-purple-400">
                          Instagram
                        </Link>
                      )}
                      {member.socialLinks.imdb && (
                        <Link href={member.socialLinks.imdb} className="text-gray-400 hover:text-purple-400">
                          IMDb
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Similar Shows Section */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold">More Shows like this</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {similarShows.map((show) => (
              <motion.div key={show.id} className="group relative" whileHover={{ scale: 1.05 }}>
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                  <Image
                    src={show.image || "/placeholder.svg"}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="mb-1 font-semibold">{show.title}</h3>
                    <div className="mb-2 flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {show.rating}
                      </div>
                      <span>•</span>
                      <span>{show.year}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {show.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="border-purple-400/30 text-purple-400">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

