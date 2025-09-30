"use client";

import * as React from "react";
import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { categories as allCategories } from "@/lib/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Expense } from "@/lib/types";

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#84cc16",
  "#22c55e",
];

const chartConfig = allCategories.reduce((config, category, index) => {
  config[category] = {
    label: category,
    color: CHART_COLORS[index % CHART_COLORS.length],
  };
  return config;
}, {} as ChartConfig);

export default function CategoryChart({ expenses }: { expenses: Expense[] }) {
  const [timeRange, setTimeRange] = React.useState("this_year");

  const chartData = React.useMemo(() => {
    const now = new Date();
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.expenseDate);
      if (timeRange === "this_month") {
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      }
      if (timeRange === "last_3_months") {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return expenseDate >= threeMonthsAgo;
      }
      // "this_year"
      return expenseDate.getFullYear() === now.getFullYear();
    });

    const dataByCategory = filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = { category: expense.category, total: 0 };
      }
      acc[expense.category].total += expense.amount;
      return acc;
    }, {} as Record<string, { category: string; total: number }>);

    return Object.values(dataByCategory).map((item) => ({
      ...item,
      fill: chartConfig[item.category]?.color,
    }));
  }, [timeRange, expenses]);

  return (
    <div className="space-y-4">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[180px] ml-auto">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this_month">This Month</SelectItem>
          <SelectItem value="last_3_months">Last 3 Months</SelectItem>
          <SelectItem value="this_year">This Year</SelectItem>
        </SelectContent>
      </Select>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-[300px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="total" nameKey="category" innerRadius={60}>
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.category}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="category" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
