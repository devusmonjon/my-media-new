import { ListPageContent } from "@/components/list-page-content"

const episodesData = [
  { id: 1, title: "Pilot", series: "Breaking Bad", season: 1, episode: 1, duration: "58 min" },
  { id: 2, title: "Cat's in the Bag...", series: "Breaking Bad", season: 1, episode: 2, duration: "48 min" },
  { id: 3, title: "Winter Is Coming", series: "Game of Thrones", season: 1, episode: 1, duration: "62 min" },
  { id: 4, title: "The Kingsroad", series: "Game of Thrones", season: 1, episode: 2, duration: "56 min" },
  { id: 5, title: "The Mandalorian", series: "The Mandalorian", season: 1, episode: 1, duration: "39 min" },
  // Add more episode data as needed
]

export default function EpisodesPage() {
  return (
    <ListPageContent
      title="Episodes"
      description="Manage and filter TV show episodes."
      headers={["ID", "Title", "Series", "Season", "Episode", "Duration"]}
      data={episodesData}
    />
  )
}

