export type User = {
  _id: string;
  email: string;
  displayName: string;
  currency: 'USD' | 'EUR' | 'INR';
  createdAt: Date;
};

export type Expense = {
  _id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  expenseDate: Date;
  createdAt: Date;
};
