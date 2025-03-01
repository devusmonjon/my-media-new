"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { UserGrowth } from "@/components/user-growth"
import { ContentDistribution } from "@/components/content-distribution"
import { UserActivity } from "@/components/user-activity"

export function StatisticsContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground">Detailed platform statistics and user engagement metrics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>Content and view trends over time.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserGrowth />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Breakdown by content type and genre.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentDistribution />
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
    </div>
  )
}

