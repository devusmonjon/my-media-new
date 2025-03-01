"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Action", value: 240 },
  { name: "Drama", value: 180 },
  { name: "Comedy", value: 150 },
  { name: "Sci-Fi", value: 120 },
  { name: "Horror", value: 90 },
  { name: "Romance", value: 60 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
]

export function ContentDistribution() {
  return (
    <ChartContainer
      config={{
        content: {
          label: "Content",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelKey="content"
                labelFormatter={(_, payload) => {
                  if (payload && payload.length > 0) {
                    return payload[0].name
                  }
                  return ""
                }}
              />
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

