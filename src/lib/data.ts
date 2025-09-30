
'use server';

import type { User, Expense } from './types';
import db from './db';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { categories } from './categories';

const getExpensesCollection = async () => {
  const client = await db;
  return client.db().collection<Expense>('expenses');
};

const getUsersCollection = async () => {
  const client = await db;
  return client.db().collection<User & {password: string}>('users');
};

export async function getUser(): Promise<User | null> {
  const userId = cookies().get('userId')?.value;

  if (!userId) {
    return null;
  }

  try {
    const users = await getUsersCollection();
    const user = await users.findOne({ _id: new ObjectId(userId) });
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        _id: userWithoutPassword._id.toString(),
      };
    }
    return null;
  } catch (error) {
    console.error("Database error fetching user:", error);
    return null;
  }
}

export async function getExpenses(): Promise<Expense[]> {
  try {
    const expensesCollection = await getExpensesCollection();
    const userId = cookies().get('userId')?.value;

    if (!userId) {
      return [];
    }

    const expenses = await expensesCollection.find({ userId: userId }).sort({ expenseDate: -1 }).toArray();

    return expenses.map(e => ({...e, _id: e._id.toString(), expenseDate: new Date(e.expenseDate), createdAt: new Date(e.createdAt) }));
  } catch (error) {
    console.error("Database error fetching expenses:", error);
    return [];
  }
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
  const userId = cookies().get('userId')?.value;
  if (!userId) return;

  const expensesCollection = await getExpensesCollection();
  const mockExpenses: Omit<Expense, '_id'>[] = Array.from({ length: 75 }, (_, i) => {
      const category = categories[i % categories.length];
      const description = descriptions[i % descriptions.length];
      const amount = parseFloat((Math.random() * 200 + 5).toFixed(2));
      const expenseDate = generateRandomDate(new Date(new Date().getFullYear(), 0, 1), new Date());
      
      return {
        userId: userId,
        amount,
        category,
        description: `${description} #${i+1}`,
        expenseDate,
        createdAt: new Date(expenseDate.getTime() + Math.random() * 1000 * 60 * 60),
      };
    });

    await expensesCollection.insertMany(mockExpenses as any[]);
}
