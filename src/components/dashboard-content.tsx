"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentContent } from "@/components/recent-content"
import { TopContent } from "@/components/top-content"
import { UserActivity } from "@/components/user-activity"
import { ContentDistribution } from "@/components/content-distribution"
import { UserGrowth } from "@/components/user-growth"
import { Film, Tv, Users, Eye } from "lucide-react"

interface DashboardContentProps {
  searchTerm?: string
}

export function DashboardContent({ searchTerm }: DashboardContentProps) {
  const [filteredData, setFilteredData] = useState({
    totalMovies: 1248,
    totalSeries: 342,
    totalUsers: 24389,
    totalViews: 1200000,
  })

  useEffect(() => {
    if (searchTerm) {
      // Implement your search logic here
      // This is just a mock implementation
      setFilteredData({
        totalMovies: 100,
        totalSeries: 50,
        totalUsers: 1000,
        totalViews: 500000,
      })
    } else {
      setFilteredData({
        totalMovies: 1248,
        totalSeries: 342,
        totalUsers: 24389,
        totalViews: 1200000,
      })
    }
  }, [searchTerm])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your StreamFlix admin dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredData.totalMovies}</div>
            <p className="text-xs text-muted-foreground">+12 added this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Series</CardTitle>
            <Tv className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredData.totalSeries}</div>
            <p className="text-xs text-muted-foreground">+8 added this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+2,345 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(filteredData.totalViews / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Platform activity for the past 30 days.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>Breakdown by content type and genre.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentDistribution />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
                <CardDescription>Recently added movies and series.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentContent />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Top Content</CardTitle>
                <CardDescription>Most viewed content this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <TopContent />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Content Growth</CardTitle>
                <CardDescription>New content added over time.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Content by Genre</CardTitle>
                <CardDescription>Distribution across genres.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentDistribution />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <UserGrowth />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Recent user engagement.</CardDescription>
              </CardHeader>
              <CardContent>
                <UserActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

