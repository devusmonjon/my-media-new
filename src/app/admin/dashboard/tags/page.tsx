import { ListPageContent } from "@/components/list-page-content"

const tagsData = [
  { id: 1, name: "Superhero", count: 45 },
  { id: 2, name: "Time Travel", count: 23 },
  { id: 3, name: "Dystopian", count: 37 },
  { id: 4, name: "Coming of Age", count: 52 },
  { id: 5, name: "Heist", count: 18 },
  // Add more tag data as needed
]

export default function TagsPage() {
  return (
    <ListPageContent
      title="Tags"
      description="Manage and filter content tags."
      headers={["ID", "Name", "Count"]}
      data={tagsData}
    />
  )
}

