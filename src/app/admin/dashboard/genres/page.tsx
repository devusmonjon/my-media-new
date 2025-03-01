import { ListPageContent } from "@/components/list-page-content"

const genresData = [
  { id: 1, name: "Romance", description: "Love stories and relationships" },
  { id: 2, name: "Thriller", description: "Suspenseful and exciting content" },
  { id: 3, name: "Documentary", description: "Factual and educational content" },
  { id: 4, name: "Animation", description: "Animated films and series" },
  { id: 5, name: "Fantasy", description: "Magical and imaginative stories" },
  // Add more genre data as needed
]

export default function GenresPage() {
  return (
    <ListPageContent
      title="Genres"
      description="Manage and filter content genres."
      headers={["ID", "Name", "Description"]}
      data={genresData}
    />
  )
}

