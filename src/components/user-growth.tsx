"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "2023-01-01",
    users: 1200,
  },
  {
    date: "2023-02-01",
    users: 1800,
  },
  {
    date: "2023-03-01",
    users: 2400,
  },
  {
    date: "2023-04-01",
    users: 3200,
  },
  {
    date: "2023-05-01",
    users: 4000,
  },
  {
    date: "2023-06-01",
    users: 4800,
  },
  {
    date: "2023-07-01",
    users: 5600,
  },
  {
    date: "2023-08-01",
    users: 6400,
  },
  {
    date: "2023-09-01",
    users: 7200,
  },
  {
    date: "2023-10-01",
    users: 8000,
  },
  {
    date: "2023-11-01",
    users: 8800,
  },
  {
    date: "2023-12-01",
    users: 9600,
  },
]

export function UserGrowth() {
  return (
    <ChartContainer
      config={{
        users: {
          label: "Users",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          <Area
            type="monotone"
            dataKey="users"
            strokeWidth={2}
            fillOpacity={0.2}
            style={{
              stroke: "var(--color-users)",
              fill: "var(--color-users)",
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
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

