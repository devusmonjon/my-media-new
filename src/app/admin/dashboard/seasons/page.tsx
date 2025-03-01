import { ListPageContent } from "@/components/list-page-content"

const seasonsData = [
  { id: 1, series: "Breaking Bad", season: 1, episodes: 7, year: 2008 },
  { id: 2, series: "Breaking Bad", season: 2, episodes: 13, year: 2009 },
  { id: 3, series: "Game of Thrones", season: 1, episodes: 10, year: 2011 },
  { id: 4, series: "Game of Thrones", season: 2, episodes: 10, year: 2012 },
  { id: 5, series: "The Mandalorian", season: 1, episodes: 8, year: 2019 },
  // Add more season data as needed
]

export default function SeasonsPage() {
  return (
    <ListPageContent
      title="Seasons"
      description="Manage and filter TV show seasons."
      headers={["ID", "Series", "Season", "Episodes", "Year"]}
      data={seasonsData}
    />
  )
}

