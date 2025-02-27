"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Search, Filter, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import MovieCard from "@/components/movie-card"

interface FilterOption {
  label: string
  value: string
}

const categories: FilterOption[] = [
  { label: "All genres", value: "all" },
  { label: "Action", value: "action" },
  { label: "Adventure", value: "adventure" },
  { label: "Anime", value: "anime" },
  { label: "Comedy", value: "comedy" },
  { label: "Crime", value: "crime" },
  { label: "Documentary", value: "documentary" },
  { label: "Drama", value: "drama" },
  { label: "Family", value: "family" },
  { label: "Horror", value: "horror" },
  { label: "Romance", value: "romance" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "Thriller", value: "thriller" },
]

const years: FilterOption[] = [
  { label: "All Years", value: "all" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "2019", value: "2019" },
]

const views: FilterOption[] = [
  { label: "Most Viewed", value: "most" },
  { label: "Least Viewed", value: "least" },
]

  
  const movies = [
    {
      id: 1,
      title: "John Wick 4",
      posterImage: "https://picsum.photos/seed/john-wick-4/300/450",
      year: "2023",
      duration: "170 mins",
      rating: 4.5,
      ageRating: "TV-MA",
      categories: ["Action", "Crime", "Thriller"],
      quality: "4K",
      isPremium: true,
      description: "John Wick uncovers a path to defeating The High Table.",
      trailerUrl: "/videos/john-wick-4.mp4",
      views: 12500,
      releaseDate: "2023-03-24",
      cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
      director: "Chad Stahelski",
      language: "English",
    },
    {
      id: 2,
      title: "Spider Man Memo",
      posterImage: "https://picsum.photos/seed/spider-man/300/450",
      year: "2022",
      duration: "140 mins",
      rating: 4.8,
      ageRating: "PG-13",
      categories: ["Action", "Adventure"],
      quality: "4K",
      isPremium: true,
      description: "Miles Morales returns for the next chapter of the Spider-Verse saga.",
      trailerUrl: "/videos/spider-verse.mp4",
      views: 15700,
      releaseDate: "2023-06-02",
      cast: ["Shameik Moore", "Hailee Steinfeld"],
      director: "Joaquim Dos Santos",
      language: "English",
    },
    // Add more movies...
  ]

export default function FilterPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedYear, setSelectedYear] = useState<string>("all")
    const [selectedView, setSelectedView] = useState<string>("most")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [categoryFilter, setCategoryFilter] = useState("")
    const [yearFilter, setYearFilter] = useState("")
    const [viewFilter, setViewFilter] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const itemsPerPage = 12
  
    const [filteredCategories, setFilteredCategories] = useState(categories)
    const [filteredYears, setFilteredYears] = useState(years)
    const [filteredViews, setFilteredViews] = useState(views)
  
    useEffect(() => {
      setFilteredCategories(categories.filter((c) => c.label.toLowerCase().includes(categoryFilter.toLowerCase())))
    }, [categoryFilter])
  
    useEffect(() => {
      setFilteredYears(years.filter((y) => y.label.toLowerCase().includes(yearFilter.toLowerCase())))
    }, [yearFilter])
  
    useEffect(() => {
      setFilteredViews(views.filter((v) => v.label.toLowerCase().includes(viewFilter.toLowerCase())))
    }, [viewFilter])
  
    // Filter movies based on selected filters and search query
    const filteredMovies = movies.filter((movie) => {
      const matchesCategory =
        selectedCategory === "all" || movie.categories.some((c) => c.toLowerCase() === selectedCategory)
      const matchesYear = selectedYear === "all" || movie.year === selectedYear
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesYear && matchesSearch
    })
  
    // Sort movies based on views
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (selectedView === "most") {
        return b.views - a.views
      }
      return a.views - b.views
    })
  
    // Paginate movies
    const totalPages = Math.ceil(sortedMovies.length / itemsPerPage)
    const currentMovies = sortedMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen)
    }

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#13131f] transition-transform duration-300 ease-in-out transform",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:w-80",
        )}
      >
        <Button variant="ghost" size="icon" className="absolute right-4 top-4 lg:hidden" onClick={toggleSidebar}>
          <X className="h-6 w-6" />
        </Button>

        <div className={cn("p-6 space-y-8 fixed", !isSidebarOpen && "pt-24")}>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm font-normal h-8",
                  selectedCategory === category.value
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white",
                )}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Movies by year</h3>
            <div className="grid grid-cols-2 gap-2">
              {years.map((year) => (
                <Button
                  key={year.value}
                  variant="outline"
                  className={cn(
                    "text-sm h-8",
                    selectedYear === year.value
                      ? "bg-purple-600 text-white hover:bg-purple-700 border-purple-600"
                      : "bg-[#1a1a2f] border-gray-800 text-gray-300 hover:bg-gray-800/50",
                  )}
                  onClick={() => setSelectedYear(year.value)}
                >
                  {year.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80">
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Movies</h1>
              <div className="text-sm text-gray-400">
                <span className="hover:text-purple-400 cursor-pointer">Home</span>
                <span className="mx-2">/</span>
                <span>Movies</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#1a1a2f] border-gray-800 h-10"
                />
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px] bg-[#1a1a2f] border-gray-800">
                  Sci-Fi
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-[#1a1a2f] border-gray-800">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.value} onClick={() => setSelectedCategory(category.value)}>
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px] bg-[#1a1a2f] border-gray-800">
                  2021
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1a1a2f] border-gray-800">
                {years.map((year) => (
                  <DropdownMenuItem key={year.value} onClick={() => setSelectedYear(year.value)}>
                    {year.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px] bg-[#1a1a2f] border-gray-800">
                  Most Viewed
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1a1a2f] border-gray-800">
                {views.map((view) => (
                  <DropdownMenuItem key={view.value} onClick={() => setSelectedView(view.value)}>
                    {view.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-purple-600 hover:bg-purple-700">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>

          {/* Results count */}
          <div className="mb-6 text-sm text-gray-400">
            Showing {currentMovies.length} of {filteredMovies.length} results
          </div>

          {/* Movie grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                description={movie.description}
                duration={movie.duration}
                imageId={movie.id}
                rating={""+movie.rating}
                title={movie.title}
                trailerUrl={movie.trailerUrl}
                year={movie.year}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className={cn("h-8 w-8 p-0", currentPage === index + 1 && "bg-purple-600")}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

