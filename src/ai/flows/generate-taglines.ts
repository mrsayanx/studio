// use server'

/**
 * @fileOverview Generates AI-driven taglines and ad copy options for service promotion.
 *
 * - generateTaglines - A function that generates taglines and ad copy.
 * - GenerateTaglinesInput - The input type for the generateTaglines function.
 * - GenerateTaglinesOutput - The return type for the generateTaglines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTaglinesInputSchema = z.object({
  serviceName: z.string().describe('The name of the service to promote.'),
  brandName: z.string().describe('The name of the brand.'),
  brandKeywords: z.string().describe('Keywords associated with the brand.'),
});

export type GenerateTaglinesInput = z.infer<typeof GenerateTaglinesInputSchema>;

const GenerateTaglinesOutputSchema = z.object({
  taglines: z.array(z.string()).describe('An array of generated taglines.'),
  adCopy: z.string().describe('Generated ad copy for the service.'),
});

export type GenerateTaglinesOutput = z.infer<typeof GenerateTaglinesOutputSchema>;

export async function generateTaglines(input: GenerateTaglinesInput): Promise<GenerateTaglinesOutput> {
  return generateTaglinesFlow(input);
}

const generateTaglinesPrompt = ai.definePrompt({
  name: 'generateTaglinesPrompt',
  input: {schema: GenerateTaglinesInputSchema},
  output: {schema: GenerateTaglinesOutputSchema},
  prompt: `You are a marketing expert specializing in creating compelling taglines and ad copy. Generate several taglines and an ad copy for the specified service.

Service Name: {{{serviceName}}}
Brand Name: {{{brandName}}}
Brand Keywords: {{{brandKeywords}}}

Taglines (5 variations, short and catchy):
Ad Copy:`, // Fixed the typo here
});

const generateTaglinesFlow = ai.defineFlow({
    name: 'generateTaglinesFlow',
    inputSchema: GenerateTaglinesInputSchema,
    outputSchema: GenerateTaglinesOutputSchema,
  },
  async input => {
    const {output} = await generateTaglinesPrompt(input);
    return output!;
  }
);
