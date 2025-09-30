import { getSpendingInsights } from "@/ai/flows/spending-insights";
import { getExpenses, getUser } from "@/lib/data";

export default async function AiInsights() {
  const [expenses, user] = await Promise.all([getExpenses(), getUser()]);

  if (!user) {
    return (
       <div className="text-destructive text-sm">
        <h4 className="font-semibold mb-2 text-base">Error</h4>
        <p>Could not load user data.</p>
      </div>
    )
  }

  const insightsInput = {
    expenses: expenses.map((e) => ({
      amount: e.amount,
      category: e.category,
      description: e.description,
      expenseDate: e.expenseDate.toISOString(),
    })),
    currency: user.currency,
  };

  try {
    const insights = await getSpendingInsights(insightsInput);

    return (
      <div className="space-y-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2 text-base text-primary">Summary</h4>
          <p className="text-muted-foreground">{insights.summary}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-base text-primary">Trends</h4>
          <p className="text-muted-foreground">{insights.trends}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-base text-primary">Suggestions</h4>
          <p className="text-muted-foreground">{insights.suggestions}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to get AI insights:", error);
    return (
      <div className="text-destructive text-sm">
        <h4 className="font-semibold mb-2 text-base">Error</h4>
        <p>Could not load AI-powered insights. Please ensure your API key is configured correctly.</p>
      </div>
    );
  }
}