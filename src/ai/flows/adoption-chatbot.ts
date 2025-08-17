// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview An AI chatbot for answering questions about pet adoption.
 *
 * - adoptionChatbot - A function that handles the chatbot interactions.
 * - AdoptionChatbotInput - The input type for the adoptionChatbot function.
 * - AdoptionChatbotOutput - The return type for the adoptionChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdoptionChatbotInputSchema = z.object({
  query: z.string().describe('The user query about pet adoption.'),
});
export type AdoptionChatbotInput = z.infer<typeof AdoptionChatbotInputSchema>;

const AdoptionChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type AdoptionChatbotOutput = z.infer<typeof AdoptionChatbotOutputSchema>;

export async function adoptionChatbot(input: AdoptionChatbotInput): Promise<AdoptionChatbotOutput> {
  return adoptionChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adoptionChatbotPrompt',
  input: {schema: AdoptionChatbotInputSchema},
  output: {schema: AdoptionChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot assistant for a pet adoption website called PetLink.
  You should provide concise and informative answers to user questions regarding pet adoption, pet care, and shelter policies.
  Your goal is to help prospective adopters make informed decisions and save time.

  User Query: {{{query}}}
  `,
});

const adoptionChatbotFlow = ai.defineFlow(
  {
    name: 'adoptionChatbotFlow',
    inputSchema: AdoptionChatbotInputSchema,
    outputSchema: AdoptionChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
