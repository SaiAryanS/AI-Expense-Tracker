import type { User, Expense } from './types';

export const mockUser: User = {
  _id: 'user_1',
  email: 'dev@example.com',
  displayName: 'Dev User',
  currency: 'USD',
  createdAt: new Date('2023-01-01'),
};

export const categories = ["Food", "Transport", "Utilities", "Entertainment", "Shopping", "Health", "Other"];
const descriptions = [
  "Groceries from supermarket",
  "Monthly metro pass",
  "Electricity bill",
  "Movie tickets",
  "New pair of shoes",
  "Pharmacy purchase",
  "Lunch with colleagues",
  "Uber ride home",
  "Internet bill",
  "Concert ticket",
  "Online order",
  "Doctor's visit"
];

const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const mockExpenses: Expense[] = Array.from({ length: 75 }, (_, i) => {
  const category = categories[i % categories.length];
  const description = descriptions[i % descriptions.length];
  const amount = parseFloat((Math.random() * 200 + 5).toFixed(2));
  const expenseDate = generateRandomDate(new Date(new Date().getFullYear(), 0, 1), new Date());
  
  return {
    _id: `exp_${i + 1}`,
    userId: 'user_1',
    amount,
    category,
    description: `${description} #${i+1}`,
    expenseDate,
    createdAt: new Date(expenseDate.getTime() + Math.random() * 1000 * 60 * 60),
  };
}).sort((a, b) => b.expenseDate.getTime() - a.expenseDate.getTime());
