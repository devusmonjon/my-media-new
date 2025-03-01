import { ListPageContent } from "@/components/list-page-content"

const castData = [
  { id: 1, name: "Tom Hanks", role: "Actor", appearances: 25 },
  { id: 2, name: "Meryl Streep", role: "Actress", appearances: 32 },
  { id: 3, name: "Leonardo DiCaprio", role: "Actor", appearances: 28 },
  { id: 4, name: "Viola Davis", role: "Actress", appearances: 18 },
  { id: 5, name: "Denzel Washington", role: "Actor", appearances: 22 },
  // Add more cast data as needed
]

export default function CastPage() {
  return (
    <ListPageContent
      title="Cast"
      description="Manage and filter cast members."
      headers={["ID", "Name", "Role", "Appearances"]}
      data={castData}
    />
  )
}

