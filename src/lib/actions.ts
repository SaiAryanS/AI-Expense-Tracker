
'use server';

import {revalidatePath} from 'next/cache';
import {ObjectId} from 'mongodb';
import db from './db';
import type {User} from './types';

async function getExpensesCollection() {
  const client = await db;
  return client.db().collection('expenses');
}

async function getUsersCollection() {
  const client = await db;
  return client.db().collection('users');
}

export async function deleteExpense(expenseId: string) {
  try {
    const expenses = await getExpensesCollection();
    await expenses.deleteOne({_id: new ObjectId(expenseId)});
    revalidatePath('/dashboard');
    revalidatePath('/transactions');
    revalidatePath('/reports');
    return {success: true};
  } catch (error) {
    console.error('Failed to delete expense:', error);
    return {success: false, message: 'Failed to delete expense.'};
  }
}

export async function updateUser(
  userId: string,
  data: Partial<Pick<User, 'displayName' | 'currency'>>
) {
  try {
    const users = await getUsersCollection();
    await users.updateOne({_id: new ObjectId(userId)}, {$set: data});
    revalidatePath('/settings');
    revalidatePath('/dashboard');
    return {success: true};
  } catch (error) {
    console.error('Failed to update user:', error);
    return {success: false, message: 'Failed to update user.'};
  }
}
