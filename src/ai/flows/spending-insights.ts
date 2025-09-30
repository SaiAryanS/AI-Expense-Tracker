'use server';

/**
 * @fileOverview Provides intelligent insights into spending habits using AI analysis.
 *
 * - getSpendingInsights - A function that analyzes expense data and generates summaries,
 *   identifies trends, and suggests potential savings areas.
 * - SpendingInsightsInput - The input type for the getSpendingInsights function.
 * - SpendingInsightsOutput - The return type for the getSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingInsightsInputSchema = z.object({
  expenses: z.array(
    z.object({
      amount: z.number(),
      category: z.string(),
      description: z.string().optional(),
      expenseDate: z.string(),
    })
  ).describe('An array of expense objects.'),
  currency: z.string().default('USD').describe('The user\u0027s preferred currency.'),
});
export type SpendingInsightsInput = z.infer<typeof SpendingInsightsInputSchema>;

const SpendingInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the user\u0027s spending habits.'),
  trends: z.string().describe('Identified trends in the user\u0027s spending.'),
  suggestions: z.string().describe('Suggestions for saving money.'),
});
export type SpendingInsightsOutput = z.infer<typeof SpendingInsightsOutputSchema>;

export async function getSpendingInsights(input: SpendingInsightsInput): Promise<SpendingInsightsOutput> {
  return spendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'spendingInsightsPrompt',
  input: {schema: SpendingInsightsInputSchema},
  output: {schema: SpendingInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the following expense data and provide a summary of spending habits, identify trends, and suggest potential savings areas. Use the currency {{currency}}.

Expenses:
{{#each expenses}}
- Amount: {{amount}}, Category: {{category}}, Description: {{description}}, Date: {{expenseDate}}
{{/each}}`,
});

const spendingInsightsFlow = ai.defineFlow(
  {
    name: 'spendingInsightsFlow',
    inputSchema: SpendingInsightsInputSchema,
    outputSchema: SpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
