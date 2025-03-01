import { ListPageContent } from "@/components/list-page-content"

const countriesData = [
  { id: 1, name: "United States", code: "US", contentCount: 1245 },
  { id: 2, name: "United Kingdom", code: "UK", contentCount: 587 },
  { id: 3, name: "France", code: "FR", contentCount: 324 },
  { id: 4, name: "Japan", code: "JP", contentCount: 456 },
  { id: 5, name: "South Korea", code: "KR", contentCount: 289 },
  // Add more country data as needed
]

export default function CountriesPage() {
  return (
    <ListPageContent
      title="Countries"
      description="Manage and filter content by country of origin."
      headers={["ID", "Name", "Code", "Content Count"]}
      data={countriesData}
    />
  )
}

