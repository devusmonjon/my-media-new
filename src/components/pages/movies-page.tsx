"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Film, MoreHorizontal, Plus, Search, Edit, Trash, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for movies
const mockMovies = [
  {
    id: "1",
    title: "The Last Journey",
    slug: "the-last-journey",
    description: "An epic adventure across unknown lands.",
    published_year: "2023",
    duration: 120,
    genres: ["Action", "Adventure"],
    tags: ["Epic", "Journey"],
    country: "United States",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    video: "https://example.com/video1.mp4",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Cosmic Adventures",
    slug: "cosmic-adventures",
    description: "A journey through the cosmos and beyond.",
    published_year: "2022",
    duration: 135,
    genres: ["Sci-Fi", "Adventure"],
    tags: ["Space", "Cosmic"],
    country: "United Kingdom",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    video: "https://example.com/video2.mp4",
    createdAt: "2022-11-20T14:45:00Z",
  },
  {
    id: "3",
    title: "Midnight Shadows",
    slug: "midnight-shadows",
    description: "A thriller that will keep you on the edge of your seat.",
    published_year: "2023",
    duration: 110,
    genres: ["Thriller", "Mystery"],
    tags: ["Night", "Suspense"],
    country: "Canada",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    video: "https://example.com/video3.mp4",
    createdAt: "2023-02-10T09:15:00Z",
  },
  {
    id: "4",
    title: "Lost in Time",
    slug: "lost-in-time",
    description: "A time-traveling adventure that spans centuries.",
    published_year: "2021",
    duration: 145,
    genres: ["Sci-Fi", "Drama"],
    tags: ["Time Travel", "History"],
    country: "France",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    video: "https://example.com/video4.mp4",
    createdAt: "2021-08-05T16:20:00Z",
  },
  {
    id: "5",
    title: "The Last Stand",
    slug: "the-last-stand",
    description: "An action-packed thriller about one man's fight for justice.",
    published_year: "2022",
    duration: 118,
    genres: ["Action", "Thriller"],
    tags: ["Fight", "Justice"],
    country: "Australia",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    video: "https://example.com/video5.mp4",
    createdAt: "2022-04-30T11:50:00Z",
  },
]

// Mock data for genres, tags, and countries
const mockGenres = ["Action", "Adventure", "Comedy", "Drama", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"]
const mockTags = [
  "Epic",
  "Journey",
  "Space",
  "Cosmic",
  "Night",
  "Suspense",
  "Time Travel",
  "History",
  "Fight",
  "Justice",
]
const mockCountries = [
  "United States",
  "United Kingdom",
  "Canada",
  "France",
  "Australia",
  "Germany",
  "Japan",
  "South Korea",
  "India",
  "Brazil",
]

export function MoviesPage() {
  const [movies, setMovies] = useState(mockMovies)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentMovie, setCurrentMovie] = useState<any>(null)
  const [newMovie, setNewMovie] = useState({
    title: "",
    slug: "",
    description: "",
    published_year: "",
    duration: 0,
    genres: [] as string[],
    tags: [] as string[],
    country: "",
    cover: "",
    poster: "",
    video: "",
  })

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddMovie = () => {
    const id = (movies.length + 1).toString()
    const createdAt = new Date().toISOString()
    setMovies([...movies, { ...newMovie, id, createdAt }])
    setIsAddDialogOpen(false)
    setNewMovie({
      title: "",
      slug: "",
      description: "",
      published_year: "",
      duration: 0,
      genres: [],
      tags: [],
      country: "",
      cover: "",
      poster: "",
      video: "",
    })
  }

  const handleEditMovie = () => {
    if (!currentMovie) return

    const updatedMovies = movies.map((movie) => (movie.id === currentMovie.id ? currentMovie : movie))

    setMovies(updatedMovies)
    setIsEditDialogOpen(false)
    setCurrentMovie(null)
  }

  const handleDeleteMovie = () => {
    if (!currentMovie) return

    const updatedMovies = movies.filter((movie) => movie.id !== currentMovie.id)
    setMovies(updatedMovies)
    setIsDeleteDialogOpen(false)
    setCurrentMovie(null)
  }

  const openEditDialog = (movie: any) => {
    setCurrentMovie({ ...movie })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (movie: any) => {
    setCurrentMovie(movie)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (movie: any) => {
    setCurrentMovie(movie)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
          <p className="text-muted-foreground">Manage your movie collection</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Movie</DialogTitle>
              <DialogDescription>Fill in the details to add a new movie to your collection.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    placeholder="Movie title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={newMovie.slug}
                    onChange={(e) => setNewMovie({ ...newMovie, slug: e.target.value })}
                    placeholder="movie-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={newMovie.published_year}
                    onChange={(e) => setNewMovie({ ...newMovie, published_year: e.target.value })}
                    placeholder="2023"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newMovie.duration || ""}
                    onChange={(e) => setNewMovie({ ...newMovie, duration: Number.parseInt(e.target.value) || 0 })}
                    placeholder="120"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={(value) => setNewMovie({ ...newMovie, country: value })}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video">Video URL</Label>
                  <Input
                    id="video"
                    value={newMovie.video}
                    onChange={(e) => setNewMovie({ ...newMovie, video: e.target.value })}
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Image URL</Label>
                  <Input
                    id="cover"
                    value={newMovie.cover}
                    onChange={(e) => setNewMovie({ ...newMovie, cover: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poster">Poster Image URL</Label>
                  <Input
                    id="poster"
                    value={newMovie.poster}
                    onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMovie.description}
                  onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                  placeholder="Movie description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Genres</Label>
                  <div className="flex flex-wrap gap-2">
                    {mockGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={newMovie.genres.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (newMovie.genres.includes(genre)) {
                            setNewMovie({
                              ...newMovie,
                              genres: newMovie.genres.filter((g) => g !== genre),
                            })
                          } else {
                            setNewMovie({
                              ...newMovie,
                              genres: [...newMovie.genres, genre],
                            })
                          }
                        }}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {mockTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={newMovie.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (newMovie.tags.includes(tag)) {
                            setNewMovie({
                              ...newMovie,
                              tags: newMovie.tags.filter((t) => t !== tag),
                            })
                          } else {
                            setNewMovie({
                              ...newMovie,
                              tags: [...newMovie.tags, tag],
                            })
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMovie}>Add Movie</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movie Collection</CardTitle>
          <CardDescription>You have {movies.length} movies in your collection.</CardDescription>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Movie</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Genres</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No movies found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMovies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src={movie.poster} alt={movie.title} />
                          <AvatarFallback className="rounded-md">
                            <Film className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{movie.title}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {movie.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{movie.published_year}</TableCell>
                    <TableCell>{movie.duration} min</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {movie.genres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{movie.country}</TableCell>
                    <TableCell>{new Date(movie.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openViewDialog(movie)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(movie)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(movie)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Movie Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
            <DialogDescription>Update the details of this movie.</DialogDescription>
          </DialogHeader>
          {currentMovie && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={currentMovie.title}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, title: e.target.value })}
                    placeholder="Movie title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-slug">Slug</Label>
                  <Input
                    id="edit-slug"
                    value={currentMovie.slug}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, slug: e.target.value })}
                    placeholder="movie-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    value={currentMovie.published_year}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, published_year: e.target.value })}
                    placeholder="2023"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={currentMovie.duration || ""}
                    onChange={(e) =>
                      setCurrentMovie({ ...currentMovie, duration: Number.parseInt(e.target.value) || 0 })
                    }
                    placeholder="120"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-country">Country</Label>
                  <Select
                    defaultValue={currentMovie.country}
                    onValueChange={(value) => setCurrentMovie({ ...currentMovie, country: value })}
                  >
                    <SelectTrigger id="edit-country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-video">Video URL</Label>
                  <Input
                    id="edit-video"
                    value={currentMovie.video}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, video: e.target.value })}
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cover">Cover Image URL</Label>
                  <Input
                    id="edit-cover"
                    value={currentMovie.cover}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, cover: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-poster">Poster Image URL</Label>
                  <Input
                    id="edit-poster"
                    value={currentMovie.poster}
                    onChange={(e) => setCurrentMovie({ ...currentMovie, poster: e.target.value })}
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentMovie.description}
                  onChange={(e) => setCurrentMovie({ ...currentMovie, description: e.target.value })}
                  placeholder="Movie description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Genres</Label>
                  <div className="flex flex-wrap gap-2">
                    {mockGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={currentMovie.genres.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (currentMovie.genres.includes(genre)) {
                            setCurrentMovie({
                              ...currentMovie,
                              genres: currentMovie.genres.filter((g) => g !== genre),
                            })
                          } else {
                            setCurrentMovie({
                              ...currentMovie,
                              genres: [...currentMovie.genres, genre],
                            })
                          }
                        }}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {mockTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={currentMovie.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (currentMovie.tags.includes(tag)) {
                            setCurrentMovie({
                              ...currentMovie,
                              tags: currentMovie.tags.filter((t) => t !== tag),
                            })
                          } else {
                            setCurrentMovie({
                              ...currentMovie,
                              tags: [...currentMovie.tags, tag],
                            })
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditMovie}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Movie Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Movie Details</DialogTitle>
          </DialogHeader>
          {currentMovie && (
            <div className="grid grid-cols-[2fr_3fr] gap-6">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={currentMovie.poster || "/placeholder.svg"}
                    alt={currentMovie.title}
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Genres</h3>
                  <div className="flex flex-wrap gap-1">
                    {currentMovie.genres.map((genre: string) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {currentMovie.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentMovie.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {currentMovie.published_year} • {currentMovie.duration} min • {currentMovie.country}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Description</h3>
                  <p>{currentMovie.description}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Cover Image</h3>
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={currentMovie.cover || "/placeholder.svg"}
                      alt={`${currentMovie.title} cover`}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Video URL</h3>
                  <p className="break-all text-sm">{currentMovie.video}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Added on</h3>
                  <p>{new Date(currentMovie.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Movie Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Movie</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this movie? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentMovie && (
            <div className="flex items-center gap-4 py-4">
              <Avatar className="h-10 w-10 rounded-md">
                <AvatarImage src={currentMovie.poster} alt={currentMovie.title} />
                <AvatarFallback className="rounded-md">
                  <Film className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{currentMovie.title}</div>
                <div className="text-xs text-muted-foreground">
                  {currentMovie.published_year} • {currentMovie.duration} min
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMovie}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

