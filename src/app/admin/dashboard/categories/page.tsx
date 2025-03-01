import { ListPageContent } from "@/components/list-page-content"

const categoriesData = [
  { id: 1, name: "Action", description: "Exciting, high-energy content" },
  { id: 2, name: "Drama", description: "Emotionally intense storylines" },
  { id: 3, name: "Comedy", description: "Humorous and light-hearted content" },
  { id: 4, name: "Sci-Fi", description: "Science fiction and futuristic themes" },
  { id: 5, name: "Horror", description: "Scary and suspenseful content" },
  // Add more category data as needed
]

export default function CategoriesPage() {
  return (
    <ListPageContent
      title="Categories"
      description="Manage and filter content categories."
      headers={["ID", "Name", "Description"]}
      data={categoriesData}
    />
  )
}

