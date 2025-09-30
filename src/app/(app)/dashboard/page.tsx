import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Wallet } from "lucide-react";
import { getExpenses, getUser } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import QuickAddExpense from "@/components/dashboard/quick-add-expense";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const [expenses, user] = await Promise.all([getExpenses(), getUser()]);

  if (!user) {
    redirect('/login');
  }

  const totalThisMonth = expenses
    .filter((exp) => {
      const expDate = new Date(exp.expenseDate);
      return (
        expDate.getMonth() === thisMonth && expDate.getFullYear() === thisYear
      );
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalThisYear = expenses
    .filter((exp) => new Date(exp.expenseDate).getFullYear() === thisYear)
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spent (This Month)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalThisMonth, user.currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              in {now.toLocaleString("default", { month: "long" })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spent (This Year)
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalThisYear, user.currency)}
            </div>
            <p className="text-xs text-muted-foreground">in {thisYear}</p>
          </CardContent>
        </Card>
        <QuickAddExpense />
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your 10 most recent expenses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransactions expenses={expenses.slice(0, 10)} user={user} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
