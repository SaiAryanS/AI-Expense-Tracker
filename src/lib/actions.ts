
'use server';

import {revalidatePath} from 'next/cache';
import {ObjectId} from 'mongodb';
import db from './db';
import type {User} from './types';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
  data: Partial<Pick<User, 'displayName' | 'currency' | 'avatarUrl'>>
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

const signupSchema = z.object({
  displayName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signup(data: unknown) {
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid input.' };
  }

  const { displayName, email, password } = parsed.data;
  const users = await getUsersCollection();

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return { success: false, message: 'User with this email already exists.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await users.insertOne({
    displayName,
    email,
    password: hashedPassword,
    currency: 'USD',
    createdAt: new Date(),
  } as Omit<User, '_id'> & {password: string});

  if (result.insertedId) {
    cookies().set('userId', result.insertedId.toString(), { httpOnly: true });
  } else {
    return { success: false, message: 'Failed to create user.' };
  }

  revalidatePath('/');
  redirect('/dashboard');
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function login(data: unknown) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid input.' };
  }

  const { email, password } = parsed.data;
  const users = await getUsersCollection();

  const user = await users.findOne({ email });
  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: 'Invalid email or password.' };
  }
  
  cookies().set('userId', user._id.toString(), { httpOnly: true });
  revalidatePath('/');
  redirect('/dashboard');
}

export async function logout() {
  cookies().delete('userId');
  redirect('/login');
}
