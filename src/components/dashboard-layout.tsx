"use client"

import React from "react"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"
import { Bell, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarInset } from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // Implement your search logic here
    console.log("Searching for:", term)
  }

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Search onSearch={handleSearch} />
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">
          {React.Children.map(children, (child) =>
            React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { searchTerm }) : child,
          )}
        </main>
      </SidebarInset>
    </div>
  )
}

