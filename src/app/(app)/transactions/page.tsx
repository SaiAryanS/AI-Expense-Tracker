import TransactionTable from "@/components/transactions/data-table";

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        All Transactions
      </h1>
      <p className="text-muted-foreground mt-2">
        A complete history of your expenses.
      </p>
      <div className="mt-6">
        <TransactionTable />
      </div>
    </div>
  );
}
