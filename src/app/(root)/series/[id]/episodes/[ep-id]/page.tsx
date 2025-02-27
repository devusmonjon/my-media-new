"use client";

import { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  Grid,
  LayoutList,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReviewsSection from "@/components/reviews-section";
import useVideo from "@/hooks/useVideo";
const videoId = "7b986b4f-5fdb-48a0-9e0e-6200ea569ecd";
const libraryId = "388347";

interface Episode {
  id: number;
  number: string;
  title: string;
  duration: string;
  image: string;
  progress?: number;
  isVip?: boolean;
  description: string;
}

const allEpisodes: Episode[] = [
  {
    id: 1,
    number: "EP1",
    title: "Welcome to the Playground",
    duration: "44:12",
    image: "https://picsum.photos/seed/arcane1/400/225",
    progress: 100,
    description:
      "Orphaned sisters Vi and Powder bring trouble to Zaun's underground streets in the wake of a heist in posh Piltover.",
  },
  {
    id: 2,
    number: "EP2",
    title: "Some Mysteries Are Better Left Unsolved",
    duration: "40:10",
    image: "https://picsum.photos/seed/arcane2/400/225",
    progress: 75,
    description:
      "As the investigation progresses, more secrets come to light about the mysterious events in Piltover.",
  },
  {
    id: 3,
    number: "EP3",
    title: "The Base Violence Necessary for Change",
    duration: "45:00",
    image: "https://picsum.photos/seed/arcane3/400/225",
    isVip: true,
    description:
      "Tensions rise between the upper and lower city as Vi and Powder face difficult choices.",
  },
  {
    id: 4,
    number: "EP4",
    title: "Happy Progress Day!",
    duration: "42:15",
    image: "https://picsum.photos/seed/arcane4/400/225",
    isVip: true,
    description:
      "The annual Progress Day celebrations are interrupted by unexpected events.",
  },
  {
    id: 5,
    number: "EP5",
    title: "The Enemy Within",
    duration: "43:20",
    image: "https://picsum.photos/seed/arcane5/400/225",
    isVip: true,
    description:
      "As tensions rise in Piltover, a shocking discovery threatens to tear apart relationships.",
  },
  {
    id: 6,
    number: "EP6",
    title: "When These Walls Come Tumbling Down",
    duration: "41:30",
    image: "https://picsum.photos/seed/arcane6/400/225",
    isVip: true,
    description:
      "The divide between Piltover and Zaun grows deeper as violence erupts on the streets.",
  },
  {
    id: 7,
    number: "EP7",
    title: "The Boy Savior",
    duration: "44:45",
    image: "https://picsum.photos/seed/arcane7/400/225",
    isVip: true,
    description: "A young hero emerges as chaos engulfs both cities.",
  },
  {
    id: 8,
    number: "EP8",
    title: "Oil and Water",
    duration: "46:00",
    image: "https://picsum.photos/seed/arcane8/400/225",
    isVip: true,
    description:
      "Past and present collide as long-buried secrets finally come to light.",
  },
  {
    id: 9,
    number: "EP9",
    title: "The Monster You Created",
    duration: "45:15",
    image: "https://picsum.photos/seed/arcane9/400/225",
    isVip: true,
    description:
      "In the explosive season finale, Vi and Jinx must make their final choices.",
  },
];

const popularShows = [
  {
    id: 1,
    title: "Shark Hunters",
    year: "2018",
    image: "https://picsum.photos/seed/shark/400/225",
    genre: "Action",
  },
  {
    id: 2,
    title: "The Wasted Times",
    year: "2028",
    image: "https://picsum.photos/seed/wasted/400/225",
    genre: "Drama · School",
  },
  {
    id: 3,
    title: "Political Animal",
    year: "2019",
    image: "https://picsum.photos/seed/political/400/225",
    genre: "Music · Reality",
  },
  {
    id: 4,
    title: "The Unstoppable Soldier",
    year: "2020",
    image: "https://picsum.photos/seed/soldier/400/225",
    genre: "Drama · Reality",
  },
  {
    id: 5,
    title: "Fireworks Wednesday",
    year: "2019",
    image: "https://picsum.photos/seed/fireworks/400/225",
    genre: "Family · International",
  },
];

export default function EpisodePage() {
  const { video } = useVideo({ videoId, libraryId });
  const [currentEpisode, setCurrentEpisode] = useState(allEpisodes[0]);
  const [isGridView, setIsGridView] = useState(false);
  const [rating, setRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchLater, setWatchLater] = useState<number[]>([]);
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(0);
  const episodesPerPage = 4;
  const pageCount = Math.ceil(allEpisodes.length / episodesPerPage);

  const visibleEpisodes = allEpisodes.slice(
    currentPage * episodesPerPage,
    (currentPage + 1) * episodesPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleNextEpisode = () => {
    const currentIndex = allEpisodes.findIndex(
      (ep) => ep.id === currentEpisode.id
    );
    if (currentIndex < allEpisodes.length - 1) {
      setCurrentEpisode(allEpisodes[currentIndex + 1]);
      setIsPlaying(false);
    }
  };

  const handlePreviousEpisode = () => {
    const currentIndex = allEpisodes.findIndex(
      (ep) => ep.id === currentEpisode.id
    );
    if (currentIndex > 0) {
      setCurrentEpisode(allEpisodes[currentIndex - 1]);
      setIsPlaying(false);
    }
  };

  const handleEpisodeSelect = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
  };

  const handleWatchLater = (episodeId: number) => {
    if (watchLater.includes(episodeId)) {
      setWatchLater((prev) => prev.filter((id) => id !== episodeId));
      toast({
        title: "Removed from Watch Later",
        description: "Episode has been removed from your list",
      });
    } else {
      setWatchLater((prev) => [...prev, episodeId]);
      toast({
        title: "Added to Watch Later",
        description: "Episode has been added to your list",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing options opened",
    });
  };

  return (
    <div className='min-h-screen bg-[#0a0a1a] pt-16'>
      {/* Breadcrumb */}
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center gap-2 text-sm text-gray-400'>
          <Link href='/' className='hover:text-purple-400'>
            Home
          </Link>
          <span>/</span>
          <Link href='/tv-shows' className='hover:text-purple-400'>
            TV Shows
          </Link>
          <span>/</span>
          <Link href='/action-anime' className='hover:text-purple-400'>
            Action, Anime
          </Link>
          <span>/</span>
          <Link href='/arcane' className='hover:text-purple-400'>
            Arcane
          </Link>
          <span>/</span>
          <Link href='/arcane/season-1' className='hover:text-purple-400'>
            Season 1
          </Link>
          <span>/</span>
          <span className='text-white'>{currentEpisode.title}</span>
        </div>
      </div>

      <div className='container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr,400px]'>
        <div className='space-y-8'>
          {/* Main Video Player */}
          <div className='relative aspect-video overflow-hidden rounded-xl bg-black'>
            {" "}
            <iframe
              src={video}
              allow='autoplay; encrypted-media'
              frameBorder={0}
              allowFullScreen
              className='w-full h-full'
            ></iframe>
            {/* Episode Navigation Overlay */}
            <div className='absolute inset-x-0 top-0 flex items-center justify-between p-4'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full bg-black/50 text-white backdrop-blur-sm'
                onClick={handlePreviousEpisode}
                disabled={currentEpisode.id === allEpisodes[0].id}
              >
                <ChevronLeft className='h-6 w-6' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full bg-black/50 text-white backdrop-blur-sm'
                onClick={handleNextEpisode}
                disabled={
                  currentEpisode.id === allEpisodes[allEpisodes.length - 1].id
                }
              >
                <ChevronRight className='h-6 w-6' />
              </Button>
            </div>
          </div>

          {/* Episode Info */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold'>Arcane</h1>
                <div className='mt-2 flex items-center gap-4 text-sm text-gray-400'>
                  <span>Season 1</span>
                  <span>{currentEpisode.title}</span>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full'
                  onClick={() => handleWatchLater(currentEpisode.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      watchLater.includes(currentEpisode.id)
                        ? "fill-purple-600 text-purple-600"
                        : ""
                    }`}
                  />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full'
                  onClick={handleShare}
                >
                  <Share2 className='h-5 w-5' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full'
                  onClick={() => setIsGridView(!isGridView)}
                >
                  {isGridView ? (
                    <LayoutList className='h-5 w-5' />
                  ) : (
                    <Grid className='h-5 w-5' />
                  )}
                </Button>
              </div>
            </div>

            <div className='flex items-center gap-4 text-sm'>
              <div className='flex items-center gap-1'>
                <Star className='h-5 w-5 fill-yellow-500 text-yellow-500' />
                <span className='font-medium'>0</span>
              </div>
              <span>476 Views</span>
              <span>0 Reviews</span>
            </div>

            <p className='text-gray-400'>{currentEpisode.description}</p>
          </div>

          {/* Replace the old review form with the new ReviewsSection */}
          <ReviewsSection />
        </div>

        {/* Sidebar */}
        <div className='space-y-8'>
          {/* Episodes List */}
          <div>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Episodes 1-9</h2>
              <div className='flex gap-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full'
                  onClick={() => setIsGridView(!isGridView)}
                >
                  {isGridView ? (
                    <LayoutList className='h-5 w-5' />
                  ) : (
                    <Grid className='h-5 w-5' />
                  )}
                </Button>
              </div>
            </div>

            <div
              className={`space-y-4 ${
                isGridView ? "grid grid-cols-2 gap-4 space-y-0" : ""
              }`}
            >
              <AnimatePresence mode='wait'>
                {visibleEpisodes.map((episode) => (
                  <motion.div
                    key={episode.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`group relative cursor-pointer `}
                    onClick={() => handleEpisodeSelect(episode)}
                  >
                    <div className='relative aspect-video overflow-hidden rounded-lg'>
                      <Image
                        src={episode.image || "/placeholder.svg"}
                        alt={episode.title}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                      {episode.progress !== undefined && (
                        <div className='absolute bottom-0 left-0 right-0 h-1 bg-gray-800'>
                          <div
                            className='h-full bg-purple-600'
                            style={{ width: `${episode.progress}%` }}
                          />
                        </div>
                      )}
                      {episode.isVip && (
                        <Badge className='absolute right-2 top-2 bg-yellow-500 text-black'>
                          VIP
                        </Badge>
                      )}
                      <div className='absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100'>
                        <div className='absolute bottom-4 left-4 right-4'>
                          <Button className='w-full bg-purple-600' size='sm'>
                            <Play className='mr-2 h-4 w-4' />
                            Play Now
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 space-y-1'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-purple-400'>
                          {episode.number}
                        </span>
                        <span className='text-sm text-gray-400'>
                          {episode.duration}
                        </span>
                      </div>
                      <h3
                        className={`line-clamp-1 font-medium group-hover:text-purple-400 ${
                          currentEpisode.id === episode.id ? "text-primary" : ""
                        }`}
                      >
                        {episode.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className='mt-6 flex items-center justify-center gap-2'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <ChevronLeft className='h-5 w-5' />
              </Button>
              {Array.from({ length: pageCount }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "ghost"}
                  className={`h-8 w-8 rounded-full p-0 ${
                    currentPage === index ? "bg-purple-600" : ""
                  }`}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant='ghost'
                size='icon'
                className='rounded-full'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount - 1}
              >
                <ChevronRight className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Popular TV Shows */}
          <div>
            <h2 className='mb-4 text-lg font-semibold'>Popular TV Shows</h2>
            <div className='space-y-4'>
              {popularShows.map((show, index) => (
                <motion.div
                  key={show.id}
                  className='group flex cursor-pointer items-center gap-4'
                  whileHover={{ scale: 1.02 }}
                >
                  <div className='text-2xl font-bold text-gray-500'>
                    {index + 1}
                  </div>
                  <div className='relative h-16 w-28 flex-none overflow-hidden rounded-lg'>
                    <Image
                      src={show.image || "/placeholder.svg"}
                      alt={show.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium group-hover:text-purple-400'>
                      {show.title}
                    </h3>
                    <div className='text-sm text-gray-400'>{show.year}</div>
                    <div className='text-sm text-purple-400'>{show.genre}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
