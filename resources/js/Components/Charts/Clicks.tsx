"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import moment from "moment"
import { useMemo } from "react"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Clicks({days} : { days : { date : string, count : number}[] }) {

    const chartData = useMemo(() => {
        const today = moment();
        const last14Days = Array.from({ length: 14 }, (_, index) => {
            const date = today.clone().subtract(index, 'days');
            const formattedDate = date.format('YYYY-MM-DD');
            const count = days.find(({ date }) => date === formattedDate)?.count || 0;
    
            return {
                date: date.format('dd'), // Format for the chart
                clicks: count,
            };
        }).reverse();
    
        return last14Days;
    }, [days]);
    return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Clicks</CardTitle>
        <CardDescription>{moment().subtract(14, "days").format("DD MMMM YYYY")} - {moment().format("DD MMMM YYYY")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="clicks" fill="var(--color-clicks)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm hidden">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
