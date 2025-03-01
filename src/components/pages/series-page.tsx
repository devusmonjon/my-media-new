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
import { Tv, MoreHorizontal, Plus, Search, Edit, Trash, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for series
const mockSeries = [
  {
    id: "1",
    title: "Cosmic Adventures",
    slug: "cosmic-adventures",
    description: "A journey through the cosmos and beyond.",
    published_year: "2022",
    duration: 45,
    genres: ["Sci-Fi", "Adventure"],
    tags: ["Space", "Cosmic"],
    country: "United States",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    seasons: 2,
    episodes: 16,
    createdAt: "2022-11-20T14:45:00Z",
  },
  {
    id: "2",
    title: "Criminal Minds",
    slug: "criminal-minds",
    description: "A team of profilers analyze the nation's most dangerous criminal minds.",
    published_year: "2020",
    duration: 42,
    genres: ["Crime", "Drama", "Mystery"],
    tags: ["FBI", "Profiler"],
    country: "United States",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    seasons: 3,
    episodes: 30,
    createdAt: "2020-09-15T10:30:00Z",
  },
  {
    id: "3",
    title: "Supernatural Encounters",
    slug: "supernatural-encounters",
    description: "Two brothers hunt demons, ghosts and other supernatural beings.",
    published_year: "2021",
    duration: 50,
    genres: ["Fantasy", "Horror", "Mystery"],
    tags: ["Supernatural", "Demons"],
    country: "Canada",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    seasons: 2,
    episodes: 20,
    createdAt: "2021-03-25T16:20:00Z",
  },
  {
    id: "4",
    title: "The Kingdom",
    slug: "the-kingdom",
    description: "A historical drama set in a fictional medieval kingdom.",
    published_year: "2023",
    duration: 55,
    genres: ["Drama", "History"],
    tags: ["Medieval", "Kingdom"],
    country: "United Kingdom",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    seasons: 1,
    episodes: 8,
    createdAt: "2023-01-10T09:15:00Z",
  },
  {
    id: "5",
    title: "Tech Titans",
    slug: "tech-titans",
    description: "A drama about the rise of tech companies in Silicon Valley.",
    published_year: "2022",
    duration: 48,
    genres: ["Drama"],
    tags: ["Technology", "Business"],
    country: "United States",
    cover: "/placeholder.svg?height=100&width=180",
    poster: "/placeholder.svg?height=100&width=70",
    seasons: 2,
    episodes: 18,
    createdAt: "2022-06-05T11:50:00Z",
  },
]

// Mock data for genres, tags, and countries
const mockGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Sci-Fi",
  "Thriller",
]
const mockTags = [
  "Space",
  "Cosmic",
  "FBI",
  "Profiler",
  "Supernatural",
  "Demons",
  "Medieval",
  "Kingdom",
  "Technology",
  "Business",
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

export function SeriesPage() {
  const [series, setSeries] = useState(mockSeries)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentSeries, setCurrentSeries] = useState<any>(null)
  const [newSeries, setNewSeries] = useState({
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
    seasons: 1,
    episodes: 0,
  })

  const filteredSeries = series.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddSeries = () => {
    const id = (series.length + 1).toString()
    const createdAt = new Date().toISOString()
    setSeries([...series, { ...newSeries, id, createdAt }])
    setIsAddDialogOpen(false)
    setNewSeries({
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
      seasons: 1,
      episodes: 0,
    })
  }

  const handleEditSeries = () => {
    if (!currentSeries) return

    const updatedSeries = series.map((s) => (s.id === currentSeries.id ? currentSeries : s))

    setSeries(updatedSeries)
    setIsEditDialogOpen(false)
    setCurrentSeries(null)
  }

  const handleDeleteSeries = () => {
    if (!currentSeries) return

    const updatedSeries = series.filter((s) => s.id !== currentSeries.id)
    setSeries(updatedSeries)
    setIsDeleteDialogOpen(false)
    setCurrentSeries(null)
  }

  const openEditDialog = (series: any) => {
    setCurrentSeries({ ...series })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (series: any) => {
    setCurrentSeries(series)
    setIsDeleteDialogOpen(true)
  }

  const openViewDialog = (series: any) => {
    setCurrentSeries(series)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Series</h1>
          <p className="text-muted-foreground">Manage your TV series collection</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Series
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Series</DialogTitle>
              <DialogDescription>Fill in the details to add a new TV series to your collection.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newSeries.title}
                    onChange={(e) => setNewSeries({ ...newSeries, title: e.target.value })}
                    placeholder="Series title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={newSeries.slug}
                    onChange={(e) => setNewSeries({ ...newSeries, slug: e.target.value })}
                    placeholder="series-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={newSeries.published_year}
                    onChange={(e) => setNewSeries({ ...newSeries, published_year: e.target.value })}
                    placeholder="2023"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Episode Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newSeries.duration || ""}
                    onChange={(e) => setNewSeries({ ...newSeries, duration: Number.parseInt(e.target.value) || 0 })}
                    placeholder="45"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasons">Seasons</Label>
                  <Input
                    id="seasons"
                    type="number"
                    value={newSeries.seasons || ""}
                    onChange={(e) => setNewSeries({ ...newSeries, seasons: Number.parseInt(e.target.value) || 1 })}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="episodes">Episodes</Label>
                  <Input
                    id="episodes"
                    type="number"
                    value={newSeries.episodes || ""}
                    onChange={(e) => setNewSeries({ ...newSeries, episodes: Number.parseInt(e.target.value) || 0 })}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={(value) => setNewSeries({ ...newSeries, country: value })}>
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
                  <Label htmlFor="cover">Cover Image URL</Label>
                  <Input
                    id="cover"
                    value={newSeries.cover}
                    onChange={(e) => setNewSeries({ ...newSeries, cover: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poster">Poster Image URL</Label>
                  <Input
                    id="poster"
                    value={newSeries.poster}
                    onChange={(e) => setNewSeries({ ...newSeries, poster: e.target.value })}
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSeries.description}
                  onChange={(e) => setNewSeries({ ...newSeries, description: e.target.value })}
                  placeholder="Series description"
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
                        variant={newSeries.genres.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (newSeries.genres.includes(genre)) {
                            setNewSeries({
                              ...newSeries,
                              genres: newSeries.genres.filter((g) => g !== genre),
                            })
                          } else {
                            setNewSeries({
                              ...newSeries,
                              genres: [...newSeries.genres, genre],
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
                        variant={newSeries.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (newSeries.tags.includes(tag)) {
                            setNewSeries({
                              ...newSeries,
                              tags: newSeries.tags.filter((t) => t !== tag),
                            })
                          } else {
                            setNewSeries({
                              ...newSeries,
                              tags: [...newSeries.tags, tag],
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
              <Button onClick={handleAddSeries}>Add Series</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Series Collection</CardTitle>
          <CardDescription>You have {series.length} TV series in your collection.</CardDescription>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search series..."
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
                <TableHead>Series</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Seasons</TableHead>
                <TableHead>Episodes</TableHead>
                <TableHead>Genres</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSeries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No series found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSeries.map((series) => (
                  <TableRow key={series.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src={series.poster} alt={series.title} />
                          <AvatarFallback className="rounded-md">
                            <Tv className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{series.title}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {series.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{series.published_year}</TableCell>
                    <TableCell>{series.seasons}</TableCell>
                    <TableCell>{series.episodes}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {series.genres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{series.country}</TableCell>
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
                          <DropdownMenuItem onClick={() => openViewDialog(series)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(series)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(series)}
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

      {/* Edit Series Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Series</DialogTitle>
            <DialogDescription>Update the details of this TV series.</DialogDescription>
          </DialogHeader>
          {currentSeries && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={currentSeries.title}
                    onChange={(e) => setCurrentSeries({ ...currentSeries, title: e.target.value })}
                    placeholder="Series title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-slug">Slug</Label>
                  <Input
                    id="edit-slug"
                    value={currentSeries.slug}
                    onChange={(e) => setCurrentSeries({ ...currentSeries, slug: e.target.value })}
                    placeholder="series-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    value={currentSeries.published_year}
                    onChange={(e) => setCurrentSeries({ ...currentSeries, published_year: e.target.value })}
                    placeholder="2023"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Episode Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={currentSeries.duration || ""}
                    onChange={(e) =>
                      setCurrentSeries({ ...currentSeries, duration: Number.parseInt(e.target.value) || 0 })
                    }
                    placeholder="45"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-seasons">Seasons</Label>
                  <Input
                    id="edit-seasons"
                    type="number"
                    value={currentSeries.seasons || ""}
                    onChange={(e) =>
                      setCurrentSeries({ ...currentSeries, seasons: Number.parseInt(e.target.value) || 1 })
                    }
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-episodes">Episodes</Label>
                  <Input
                    id="edit-episodes"
                    type="number"
                    value={currentSeries.episodes || ""}
                    onChange={(e) =>
                      setCurrentSeries({ ...currentSeries, episodes: Number.parseInt(e.target.value) || 0 })
                    }
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-country">Country</Label>
                  <Select onValueChange={(value) => setCurrentSeries({ ...currentSeries, country: value })}>
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
                  <Label htmlFor="edit-cover">Cover Image URL</Label>
                  <Input
                    id="edit-cover"
                    value={currentSeries.cover}
                    onChange={(e) => setCurrentSeries({ ...currentSeries, cover: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-poster">Poster Image URL</Label>
                  <Input
                    id="edit-poster"
                    value={currentSeries.poster}
                    onChange={(e) => setCurrentSeries({ ...currentSeries, poster: e.target.value })}
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentSeries.description}
                  onChange={(e) => setCurrentSeries({ ...currentSeries, description: e.target.value })}
                  placeholder="Series description"
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
                        variant={currentSeries.genres.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (currentSeries.genres.includes(genre)) {
                            setCurrentSeries({
                              ...currentSeries,
                              genres: currentSeries.genres.filter((g) => g !== genre),
                            })
                          } else {
                            setCurrentSeries({
                              ...currentSeries,
                              genres: [...currentSeries.genres, genre],
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
                        variant={currentSeries.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (currentSeries.tags.includes(tag)) {
                            setCurrentSeries({
                              ...currentSeries,
                              tags: currentSeries.tags.filter((t) => t !== tag),
                            })
                          } else {
                            setCurrentSeries({
                              ...currentSeries,
                              tags: [...currentSeries.tags, tag],
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
            <Button onClick={handleEditSeries}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Series Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Series</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this TV series? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSeries}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Series Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>View Series</DialogTitle>
          </DialogHeader>
          {currentSeries && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="view-title">Title</Label>
                  <Input id="view-title" value={currentSeries.title} readOnly placeholder="Series title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-slug">Slug</Label>
                  <Input id="view-slug" value={currentSeries.slug} readOnly placeholder="series-slug" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-year">Year</Label>
                  <Input id="view-year" value={currentSeries.published_year} readOnly placeholder="2023" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-duration">Episode Duration (minutes)</Label>
                  <Input
                    id="view-duration"
                    type="number"
                    value={currentSeries.duration || ""}
                    readOnly
                    placeholder="45"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-seasons">Seasons</Label>
                  <Input id="view-seasons" type="number" value={currentSeries.seasons || ""} readOnly placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-episodes">Episodes</Label>
                  <Input
                    id="view-episodes"
                    type="number"
                    value={currentSeries.episodes || ""}
                    readOnly
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-country">Country</Label>
                  <Input id="view-country" value={currentSeries.country} readOnly placeholder="Select country" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-cover">Cover Image URL</Label>
                  <Input
                    id="view-cover"
                    value={currentSeries.cover}
                    readOnly
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-poster">Poster Image URL</Label>
                  <Input
                    id="view-poster"
                    value={currentSeries.poster}
                    readOnly
                    placeholder="https://example.com/poster.jpg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="view-description">Description</Label>
                <Textarea
                  id="view-description"
                  value={currentSeries.description}
                  readOnly
                  placeholder="Series description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Genres</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentSeries.genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentSeries.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

