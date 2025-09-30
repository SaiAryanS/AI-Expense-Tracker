import TransactionTable from "@/components/transactions/data-table";
import { getExpenses, getUser } from "@/lib/data";
import { redirect } from 'next/navigation';

export default async function TransactionsPage() {
  const user = await getUser();

  if(!user) {
    redirect('/login');
  }

  const expenses = await getExpenses(user._id.toString());

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        All Transactions
      </h1>
      <p className="text-muted-foreground mt-2">
        A complete history of your expenses.
      </p>
      <div className="mt-6">
        <TransactionTable expenses={expenses} user={user} />
      </div>
    </div>
  );
}
