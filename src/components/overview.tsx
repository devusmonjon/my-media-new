"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "2023-01-01",
    movies: 120,
    series: 40,
    views: 2400,
  },
  {
    date: "2023-02-01",
    movies: 140,
    series: 45,
    views: 3000,
  },
  {
    date: "2023-03-01",
    movies: 170,
    series: 50,
    views: 3500,
  },
  {
    date: "2023-04-01",
    movies: 200,
    series: 55,
    views: 4100,
  },
  {
    date: "2023-05-01",
    movies: 220,
    series: 60,
    views: 4800,
  },
  {
    date: "2023-06-01",
    movies: 250,
    series: 65,
    views: 5200,
  },
  {
    date: "2023-07-01",
    movies: 280,
    series: 70,
    views: 5800,
  },
  {
    date: "2023-08-01",
    movies: 310,
    series: 75,
    views: 6400,
  },
  {
    date: "2023-09-01",
    movies: 340,
    series: 80,
    views: 7000,
  },
  {
    date: "2023-10-01",
    movies: 370,
    series: 85,
    views: 7600,
  },
  {
    date: "2023-11-01",
    movies: 400,
    series: 90,
    views: 8200,
  },
  {
    date: "2023-12-01",
    movies: 430,
    series: 95,
    views: 8800,
  },
]

export function Overview() {
  return (
    <ChartContainer
      config={{
        views: {
          label: "Views",
          color: "hsl(var(--chart-1))",
        },
        movies: {
          label: "Movies",
          color: "hsl(var(--chart-2))",
        },
        series: {
          label: "Series",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", { month: "short" })
            }}
            tickMargin={10}
          />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} tickMargin={10} />
          <Line
            type="monotone"
            dataKey="views"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-views)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-views)",
            }}
          />
          <Line
            type="monotone"
            dataKey="movies"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-movies)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-movies)",
            }}
          />
          <Line
            type="monotone"
            dataKey="series"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-series)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-series)",
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                }}
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

