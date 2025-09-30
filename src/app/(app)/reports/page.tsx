import CategoryChart from "@/components/reports/category-chart";
import AiInsights from "@/components/reports/ai-insights";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportsPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reports</h1>
      <p className="text-muted-foreground mt-2">
        A visual breakdown of your spending habits.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>
              A chart showing where your money goes.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <CategoryChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
            <CardDescription>
              Intelligent analysis of your spending patterns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
              <AiInsights />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
