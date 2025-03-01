"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface SearchProps {
  onSearch: (term: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  )
}

