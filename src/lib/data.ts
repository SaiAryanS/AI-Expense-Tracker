
'use server';

import type { User, Expense } from './types';
import db from './db';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

const getExpensesCollection = async () => {
  const client = await db;
  return client.db().collection<Expense>('expenses');
};

const getUsersCollection = async () => {
  const client = await db;
  return client.db().collection<User & {password: string}>('users');
};

export async function getUser(): Promise<User | null> {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;

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

export async function getExpenses(userId: string): Promise<Expense[]> {
  if (!userId) {
    return [];
  }
  try {
    const expensesCollection = await getExpensesCollection();
    const expenses = await expensesCollection.find({ userId: userId }).sort({ expenseDate: -1 }).toArray();
    return expenses.map(e => ({...e, _id: e._id.toString(), expenseDate: new Date(e.expenseDate), createdAt: new Date(e.createdAt) }));
  } catch (error) {
    console.error("Database error fetching expenses:", error);
    return [];
  }
}
