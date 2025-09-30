import type { User, Expense } from './types';
import db from './db';
import { ObjectId } from 'mongodb';

const getExpensesCollection = async () => {
  const client = await db;
  return client.db().collection<Expense>('expenses');
};

const getUsersCollection = async () => {
  const client = await db;
  return client.db().collection<User>('users');
};

export const categories = ["Food", "Transport", "Utilities", "Entertainment", "Shopping", "Health", "Other"];

export async function getUser(userId: string): Promise<User | null> {
  const users = await getUsersCollection();
  // In a real app, you'd find a user by their session, but here we'll just get the first one.
  const user = await users.findOne({}); 
  if (user) {
    return {
      ...user,
      _id: user._id.toString(),
      createdAt: new Date(user.createdAt),
    };
  }
  // If no user, create a default one for demo purposes
  const newUser: Omit<User, '_id'> = {
    email: 'dev@example.com',
    displayName: 'Dev User',
    currency: 'USD',
    createdAt: new Date('2023-01-01'),
  };
  const result = await users.insertOne(newUser as User);
  return {
    ...newUser,
    _id: result.insertedId.toString(),
  }
}

export async function getExpenses(): Promise<Expense[]> {
  const expensesCollection = await getExpensesCollection();
  const expenses = await expensesCollection.find({}).sort({ expenseDate: -1 }).toArray();

  if(expenses.length === 0) {
    // seed data if empty
    await seedData();
    const newExpenses = await expensesCollection.find({}).sort({ expenseDate: -1 }).toArray();
    return newExpenses.map(e => ({...e, _id: e._id.toString() }));
  }

  return expenses.map(e => ({...e, _id: e._id.toString() }));
}


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

async function seedData() {
    const expensesCollection = await getExpensesCollection();
    const mockExpenses: Omit<Expense, '_id'>[] = Array.from({ length: 75 }, (_, i) => {
        const category = categories[i % categories.length];
        const description = descriptions[i % descriptions.length];
        const amount = parseFloat((Math.random() * 200 + 5).toFixed(2));
        const expenseDate = generateRandomDate(new Date(new Date().getFullYear(), 0, 1), new Date());
        
        return {
          userId: 'user_1', // In a real app, this would be the logged-in user's ID
          amount,
          category,
          description: `${description} #${i+1}`,
          expenseDate,
          createdAt: new Date(expenseDate.getTime() + Math.random() * 1000 * 60 * 60),
        };
      });

      await expensesCollection.insertMany(mockExpenses as any[]);
}
export const mockUser: User = {
  _id: 'user_1',
  email: 'dev@example.com',
  displayName: 'Dev User',
  currency: 'USD',
  createdAt: new Date('2023-01-01'),
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