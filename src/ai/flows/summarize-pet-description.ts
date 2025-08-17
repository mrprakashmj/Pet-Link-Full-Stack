'use server';
/**
 * @fileOverview AI-powered summarization of pet descriptions for shelter admins.
 *
 * - summarizePetDescription - A function that summarizes a pet's description.
 * - SummarizePetDescriptionInput - The input type for the summarizePetDescription function.
 * - SummarizePetDescriptionOutput - The return type for the summarizePetDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePetDescriptionInputSchema = z.object({
  description: z.string().describe('The full pet description to summarize.'),
});
export type SummarizePetDescriptionInput = z.infer<typeof SummarizePetDescriptionInputSchema>;

const SummarizePetDescriptionOutputSchema = z.object({
  summary: z.string().describe('The summarized pet description.'),
});
export type SummarizePetDescriptionOutput = z.infer<typeof SummarizePetDescriptionOutputSchema>;

export async function summarizePetDescription(input: SummarizePetDescriptionInput): Promise<SummarizePetDescriptionOutput> {
  return summarizePetDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePetDescriptionPrompt',
  input: {schema: SummarizePetDescriptionInputSchema},
  output: {schema: SummarizePetDescriptionOutputSchema},
  prompt: `You are an expert at writing engaging pet descriptions.

  Summarize the following pet description in a way that is compelling to potential adopters, highlighting key personality traits and needs. Keep the summary short and sweet.

  Description: {{{description}}}`,
});

const summarizePetDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizePetDescriptionFlow',
    inputSchema: SummarizePetDescriptionInputSchema,
    outputSchema: SummarizePetDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
