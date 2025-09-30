
import { ObjectId } from 'mongodb';

export type User = {
  _id: string | ObjectId;
  email: string;
  displayName: string;
  currency: 'USD' | 'EUR' | 'INR';
  avatarUrl?: string;
  createdAt: Date;
  password?: string;
};

export type Expense = {
  _id: string | ObjectId;
  userId: string;
  amount: number;
  category: string;
  description: string;
  expenseDate: Date;
  createdAt: Date;
};
